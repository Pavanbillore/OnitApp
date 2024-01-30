import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    ScrollView,
    ImageBackground,
    Alert,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    PermissionsAndroid,
    TextInput
} from 'react-native';
import Toast from 'react-native-simple-toast';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import OnitInput from '../../utils/components/OnitInput';
import { COLORS } from '../../const/constants';
import Icon from '../../utils/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import {
    login,
    setAccessToken,
    setCityRedux,
    setCountryRedux,
    setCurrentAddress,
    setIsAuthorized,
    setPincodeRedux,
    setProfileImageUrl,
    setRegion,
    setUserData,
    setUserId,
    setUserNumber,
    updateLatitude,
    updateLongitude,
} from '../../backend/slice';
import { enableLatestRenderer } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import ActivityLoader from '../../utils/components/ActivityLoader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { API, BASE_URL } from '../../utils/components/api';

const { width, height } = Dimensions.get('screen');

const ValidateSchema = yup.object().shape({
    name: yup.string().required('Enter your Name'),
    // addressLine: yup.string().required('Enter your Address'),
    pincode: yup.string().required('Enter your Pincode'),
    // city: yup.string().required('Enter your City Name'),
    // state: yup.string().required('Enter your State'),
    // country: yup.string().required('Enter your Country'),
});

const includeExtra = true;
const Signup = (props: any) => {
    const { navigation, route } = props;
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState<any>(null);
    const [profileModal, setProfileModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [referralcode, setReferralcode] = useState('')
    const phoneInput = useRef(null);

    useEffect(() => {
        setPhoneNumber(userNumber);
        // console.log("response", phoneNumber);
        console.log("response", response);
    }, []);

    const {
        cityRedux,
        region,
        latitude,
        longitude,
        currentAddress,
        pincodeRedux,
        countryRedux,
        accessToken,
        isAuthorized,
        userData,
        profileImageUrl,
        userId,
        userNumber,

    } = useSelector((region: any) => region.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        enableLatestRenderer();
        if (!latitude) {
            CheckIfLocationEnabled();
        }
        // GetCurrentLocation();
        // console.log(longitude + ' and ' + latitude);
        // console.log(currentAddress, 'ADD');
        // let addd: string = currentAddress;
        // let pin = addd.split(',');
        // console.log('SPLIT', pin[6]);
    }, []);
    const CheckIfLocationEnabled = async () => {
        let enabled = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false },
            );
        } else {
            // setLocationServiceEnabled(false);
            // console.log(enabled);
        }
    };

    const GetCurrentLocation = async () => {
        try {
            setVisible(true);
            Geolocation.getCurrentPosition(
                position => {
                    console.log(position);

                    dispatch(updateLatitude(position.coords.latitude));
                    dispatch(updateLongitude(position.coords.longitude));
                    Geocode();
                },

                error => console.log('GEOLOCATION', error),
                // {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
            );
            setVisible(false);
        } catch (error) {
            setVisible(false);
            Toast.showWithGravity(
                'Not find please fill location details',
                Toast.LONG,
                Toast.TOP,
            );
            console.log('CERROR', error);
        }
    };

    const Geocode = async () => {
        console.log('CITYy', cityRedux + 'RED' + region);
        if (!cityRedux && !region) {
            try {
                Geocoder.init('AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw');
                // Geocoder.init('AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o');
                Geocoder.from(latitude, longitude)
                    .then((json: any) => {
                        // var addressComponent = json.results[0].address_components[2].long_name;
                        console.log(
                            'GEOCODER',
                            json.results[0].address_components[2].long_name,
                        );
                        let pinArray = json.results[0].address_components.find(
                            (item: any, index: any, final: any) => {
                                if (final.length - 1 == index) {
                                    return item.long_name;
                                }
                            },
                        );
                        setPincode(pinArray.long_name)
                        console.log('GEOCODER', pincode);
                        // getAddress();
                    })
                    .catch(error => console.log(error));
                setVisible(false);
            } catch (error) {
                console.log('GeoCOder Error', error);
                setVisible(false);
            }
        } else {
            console.log("city", cityRedux);
            // setCity(cityRedux)
            // setState(region)
        }
    };

    const getAddress = async () => {
        console.log('pncode -->>', pincode);
        try {
            const res = await axios({
                url: `https://api.postalpincode.in/pincode/${pincode}`,
            });
            if (res?.data[0]) {
                console.log("res data", res?.data[0]?.PostOffice[0]);
                // dispatch(setCityRedux(res.data[0]?.PostOffice[0]?.District));
                // dispatch(setRegion(res.data[0]?.PostOffice[0]?.State));
                // dispatch(setCountryRedux(res.data[0]?.PostOffice[0]?.Country));
                dispatch(setPincodeRedux(res.data[0]?.PostOffice[0]?.Pincode));
                setVisible(false);
            } else {
                setVisible(false);
                // ToastAndroid.show(
                //     'Cannot determine Current Location',
                //     ToastAndroid.SHORT,
                // );
                dispatch(setPincodeRedux(''));
            }
        } catch (error) {
            Toast.showWithGravity(
                'Cannot determine Current Location',
                Toast.LONG,
                Toast.TOP,
            );

            dispatch(setPincodeRedux(''));
            setVisible(false);
            console.log('location error', error);
        }
    };
    const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
    };

    const submitData = async (values: any) => {
        try {
            setVisible(true);
            let payload = {
                personal_details: {
                    phone: {
                        country_code: '+91',
                        mobile_number: values.phoneNumber,
                    },
                    // email: values.email,
                    name: values.name,
                },
                address_details_permanent: {
                    // address_line: values.addressLine,
                    // city: values.city,
                    // state: values.state,
                    pincode: values.pincode,
                    // country: values.country,
                },
                referral_code: values.referral_code,
            };
            const resp = await axios({
                method: 'post',
                url: API.REGISTER_USER,
                data: payload,
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            });
            // const resp = await res.json()
            console.log("resp data", resp)
            if (resp) {
                setVisible(false);
                console.log('SIGNUP RESSS', resp.data);
                if (resp?.data?.status != 200) {
                    Toast.showWithGravity(
                        resp?.data?.message,
                        Toast.LONG,
                        Toast.TOP,
                    );
                    return false;
                }
                if (resp?.data?.data) {
                    dispatch(
                        setPincodeRedux(
                            resp.data?.data?.address_details_permanent?.pincode,
                        ),
                    );
                    dispatch(
                        setUserNumber(
                            resp?.data?.data?.personal_details?.phone?.mobile_number.toString(),
                        ),
                    );
                    console.log("Authorized", isAuthorized);
                    console.log('UserNumber', userNumber);
                    // dispatch(login(accessToken));
                    // dispatch(setIsAuthorized());
                    return resp?.data?.data;

                } else {
                    setVisible(false);
                    Toast.showWithGravity(
                        'Something went Wrongggg!',
                        Toast.LONG,
                        Toast.TOP,
                    );
                    console.log('userdata errr', userData);
                    return false;
                }
            } else {
                console.log('REG ERR');
                setVisible(false);
                return false;
            }
        } catch (error) {
            console.log('ERRR', error);
            setVisible(false);
            return false;
        }
    };

    // code show alert
    // const showAlert = () => {
    //   Alert.alert(
    //     'Confirm',
    //     'Are you sure you want to remove profile photo?',
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => setProfileModal(profileModal),
    //         style: 'cancel',
    //       },
    //       // {text: 'Confirm', onPress: () => confirmDeletion()},
    //     ],
    //     {cancelable: false},
    //   );
    // };
    // const ImageUI = () => {
    //   return (
    //     <BottomSheet
    //       visible={profileModal}
    //       onBackButtonPress={() => setProfileModal(profileModal)}
    //       onBackdropPress={() => setProfileModal(profileModal)}>
    //       <View
    //         style={{
    //           backgroundColor: 'white',
    //           width: '100%',
    //           height: 150,
    //           flexDirection: 'row',
    //         }}>
    //         <View
    //           style={{
    //             flex: 1,
    //             justifyContent: 'flex-start',
    //             marginLeft: 30,
    //           }}>
    //           <Text style={{fontSize: 18, fontWeight: '600', marginTop: 8}}>
    //             Profile photo
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               marginTop: 30,
    //             }}>
    //             {/* camera option to upload  */}
    //             <TouchableOpacity
    //               onPress={() => uploadProfilePicture('capture', options)}>
    //               <View
    //                 style={{
    //                   alignItems: 'center',
    //                 }}>
    //                 <Icon
    //                   family="Entypo"
    //                   name="camera"
    //                   size={30}
    //                   color={'#00796A'}
    //                 />
    //                 <Text style={{fontSize: 16}}>Camera</Text>
    //               </View>
    //             </TouchableOpacity>
    //             {/* open gallery option to upload  */}
    //             <TouchableOpacity
    //               onPress={() => uploadProfilePicture('', options)}>
    //               <View
    //                 style={{
    //                   alignItems: 'center',
    //                   marginLeft: 40,
    //                 }}>
    //                 <Icon
    //                   family="Entypo"
    //                   name="image"
    //                   size={30}
    //                   color={'#00796A'}
    //                 />
    //                 <Text style={{fontSize: 16}}>Gallery</Text>
    //               </View>
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //         {image && (
    //           <TouchableOpacity onPress={showAlert}>
    //             <Icon
    //               family="MaterialIcons"
    //               name="delete"
    //               size={30}
    //               color={'#00796A'}
    //               style={{
    //                 marginRight: 10,
    //                 marginTop: 10,
    //               }}
    //             />
    //           </TouchableOpacity>
    //         )}
    //       </View>
    //     </BottomSheet>
    //   );
    // };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1, backgroundColor: "white"
            }}>
            <StatusBar barStyle="dark-content" hidden={true} backgroundColor="white" />
            <ActivityLoader visible={visible} setVisible={setVisible} />
            <ImageBackground
                source={require('../../assets/image/signup.png')}
                style={{
                    // flex: 1,
                    backgroundColor: '#fff',
                    height: height * 0.4,
                    minHeight: height * 0.2,
                }}
                resizeMode="cover"
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.WHITE,
                }}>
                <Text
                    style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        paddingTop: 10,
                        color: COLORS.BLACK,
                    }}>
                    Register Profile!
                </Text>
            </View>


            <View style={{ backgroundColor: COLORS.WHITE, marginTop: 20 }}>
                <Formik
                    initialValues={{
                        name: '',
                        phoneNumber: '',
                        pincode: '',
                        referral_code: '',
                        // addressLine: '',
                        // pincode: '',
                        // city: '',
                        // state: '',
                        // country: '',
                        // city: cityRedux,
                        // state: region,
                        // country: countryRedux || 'India',
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values: any, action) => {
                        console.log('VALUES', values);
                        var res = await submitData(values);
                        if (res) {
                            Toast.showWithGravity(
                                'You are successfully registered',
                                Toast.LONG,
                                Toast.TOP,
                            );
                            navigation.navigate('Login', { mobileNumber: values.phoneNumber });
                        }
                    }}
                    validationSchema={ValidateSchema}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, isValid }) => {
                        return (
                            <>
                                <View>
                                    <OnitInput
                                        mVertical={10}
                                        placeholder={'Enter your Name'}
                                        placeholderTextColor={'#737373'}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        errors={errors.name}
                                    />
                                </View>
                                <View style={{ backgroundColor: "white" }}>
                                    <TextInput
                                        style={{
                                            color: "#000",
                                            borderWidth: 1, flexGrow: 1,
                                            marginHorizontal: 18, borderRadius: 5, borderColor: "#CACFD2", backgroundColor: "white", height: 53, paddingHorizontal: 10
                                        }}
                                        placeholder='Phone number'
                                        placeholderTextColor="#7B7D7D"
                                        keyboardType='number-pad'
                                        maxLength={10}
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                    // onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                    />
                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    <OnitInput
                                        // halfWidth={true}
                                        mVertical={10}
                                        placeholder={'Enter your Pincode'}
                                        placeholderTextColor={'#737373'}
                                        value={values.pincode}
                                        onChangeText={handleChange('pincode')}
                                        keyboardType="numeric"
                                        errors={errors.pincode}
                                        maxLength={6}
                                    />
                                </View>
                                {/*<OnitInput
                                    mVertical={10}
                                    placeholder={'Enter your Email'}
                                    placeholderTextColor={'#737373'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    keyboardType="email-address"
                                    errors={errors.email}
                        />*/}
                                {/*  <View
                                    style={{
                                        margin: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{ color: COLORS.BLACK, fontSize: 18 }}>
                                        Enter your Permanent Address
                                    </Text>
                                     <TouchableOpacity
                                        onPress={() => GetCurrentLocation()}
                                        style={{ flexDirection: 'row', alignItems: 'center' }}> 
                                    <Icon
                                        name="my-location"
                                        family="MaterialIcons"
                                        size={20}
                                        color={COLORS.DARK_GREEN}
                                    />
                                    <Text
                                        style={{
                                            color: COLORS.BLUE,
                                            fontFamily: 'Monserrat',
                                            fontSize: 12,
                                            paddingLeft: 5,
                                            textAlign: 'center',
                                        }}>
                                        Please fill{'\n'} details
                                    </Text>
                                </View>
                            */}
                                {/*  <OnitInput
                                    mVertical={10}
                                    placeholder={'Enter your Address'}
                                    placeholderTextColor={'#737373'}
                                    value={values.addressLine}
                                    onChangeText={handleChange('addressLine')}
                                    errors={errors.addressLine}
                        />*/}
                                {/* <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: width,
                                        paddingHorizontal: 15,
                                    }}>
                                    <View>
                                        <OnitInput
                                            halfWidth={true}
                                            mVertical={10}
                                            placeholder={'Enter your Pincode'}
                                            placeholderTextColor={'#737373'}
                                            value={values.pincode}
                                            onChangeText={handleChange('pincode')}
                                            keyboardType="numeric"
                                            errors={errors.pincode}
                                        />
                                    </View>
                                    <View>
                                        <OnitInput
                                            halfWidth={true}
                                            mVertical={10}
                                            placeholder={'Enter your City'}
                                            placeholderTextColor={'#737373'}
                                            value={values.city}
                                            onChangeText={handleChange('city')}
                                            errors={errors.city}
                                        />
                                    </View>
                                </View>*/}
                                {/*     <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: width,
                                        paddingHorizontal: 15,
                                    }}>
                                    <View>
                                        <OnitInput
                                            halfWidth={true}
                                            mVertical={10}
                                            placeholder={'Enter your State'}
                                            placeholderTextColor={'#737373'}
                                            value={values.state}
                                            onChangeText={handleChange('state')}
                                            errors={errors.state}
                                        />
                                    </View>
                                    <View>
                                        <OnitInput
                                            halfWidth={true}
                                            mVertical={10}
                                            placeholder={'Enter your Country'}
                                            placeholderTextColor={'#737373'}
                                            value={values.country}
                                            onChangeText={handleChange('country')}
                                            errors={errors.country}
                                        />
                                    </View>
                                </View>
 */}
                                <TextInput
                                    style={style.referStyles}
                                    placeholder='Referral code (Optional)'
                                    placeholderTextColor="#7B7D7D"
                                    maxLength={10}
                                    autoCapitalize='characters'
                                    value={values.referral_code}
                                    onChangeText={handleChange('referral_code')}
                                />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        width: '95%',
                                        // backgroundColor: !isValid
                                        //   ? COLORS.GREY
                                        //   : COLORS.DARK_GREEN,
                                        backgroundColor: COLORS.DARK_GREEN,
                                        height: 50,
                                        marginTop: 30,
                                        marginLeft: 10,
                                        borderRadius: 3,
                                    }}
                                    // disabled={!isValid}
                                    onPress={handleSubmit}>
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontSize: 18,
                                            letterSpacing: 1.5,
                                            textAlign: 'center',
                                            position: 'relative',
                                            color: '#fff',
                                        }}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </>
                        );
                    }}
                </Formik>
                <View
                    style={{
                        flexDirection: 'row',
                        width: width,
                        justifyContent: 'center',
                        bottom: 10,
                    }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: 'black',
                            alignSelf: 'center',
                            marginTop: 30,
                        }}>
                        Already have an account?
                    </Text>
                    <View>
                        <Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text
                                    style={{
                                        color: '#00796A',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginTop: 30,
                                        marginLeft: 5,
                                        textDecorationLine: 'underline',
                                    }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </View>
            <ActivityLoader visible={visible} setVisible={setVisible} />
        </ScrollView>
    );
};

export default Signup;

const style = StyleSheet.create({
    input: {
        position: 'relative',
        height: '100%',
        width: '100',
        paddingLeft: 20,
    },
    referStyles: {
        borderWidth: 1,
        flexGrow: 1,
        marginHorizontal: 18,
        borderRadius: 5,
        borderColor: "#CACFD2",
        backgroundColor: "white",
        height: 53,
        paddingHorizontal: 10
    }
});
