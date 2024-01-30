import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    ToastAndroid,
    KeyboardAvoidingView,
    Modal,
    Pressable,
} from 'react-native';
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
import MapView from 'react-native-maps';
import OnitInput from '../../utils/components/OnitInput';
import { COLORS } from '../../const/constants';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Formik } from 'formik';
import Icon from '../../utils/components/Icon';
import LateLogin from '../../utils/components/LateLogin';
import { RAZOR_PAY_KEY } from '../../utils/components/api';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceTypeDropDown from '../../utils/components/ServiceTypeDropDown';
import DatePicker from 'react-native-date-picker';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import ActivityLoader from '../../utils/components/ActivityLoader';
import { API, BASE_URL } from '../../utils/components/api';
import * as yup from 'yup';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';

const ValidateSchema = yup.object().shape({
    name: yup.string().required('Enter your Name'),
    requirement: yup.string().required('Enter your Service Requirement'),
    email: yup.string().email().required('Enter your Email'),
    houseno: yup.string().required('Enter your House Number'),
    mobile: yup.string().required('Enter your Mobile Number'),
    locality: yup.string().required('Enter your nearby Landmark'),
    alternate: yup.string().required('Enter your Alternate Mobile Number'),
    pincode: yup.string().required('Enter your Pincode'),
    city: yup.string().required('Enter your City Name'),
    state: yup.string().required('Enter your State'),
    country: yup.string().required('Enter your Country'),
    dropLocation: yup.string().required('Enter your Drop Location'),
});
const { height, width } = Dimensions.get('screen');

const validationSchema = yup.object().shape({
    from: yup.string().required('Enter Source Location'),
    to: yup.string().required('Enter Destination Location'),
    passengers: yup
        .number()
        .required('Enter Number of Passengers')
        .min(1, 'Number of Passengers should be atleast 1'),
});
const PickDrop = (props: any) => {
    const { navigation } = props;
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [passengers, setPassengers] = useState('');
    const [selectVehicle, setSelectVehicle] = useState('');
    const [amount, setAmount] = useState('25');
    const [loginModal, setLoginModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const { currentAddress, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });
    const dispatch = useDispatch();

    const [openDate, setOpenDate] = useState(false);
    const {
        userInfo,
        cityRedux,
        countryRedux,
        pincodeRedux,
        region,
        houseRedux,
        localityRedux,
        streetNumber,
        userId,
        subRegion,
        isAuthorized,
        accessToken,
        allServices,
    } = useSelector((state: any) => state.auth);
    const [openTime, setOpenTime] = useState(false);
    const [text, setText] = useState('');
    const [alternate, setAlternate] = useState('');
    const [houseno, setHouseno] = useState('');
    const [local, setLocality] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('India');
    const [droplocation, setDropLocation] = useState('')
    const [naam, setName] = useState('');
    const [coupon, setCoupon] = useState('OniT 2023');
    const [specificDate, setSpecificDate] = useState(new Date());
    const [specificTime, setSpecificTime] = useState(new Date());
    const [specificInput, setSpecificInput] = useState(false);
    const [couponVisible, setCouponVisible] = useState(false);
    const [advanceModal, setAdvanceModal] = useState(false);
    const [numberEdit, setNumberEdit] = useState(false);
    const [pickService, setPickService] = useState([]);
    const [mobile, setMobile] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        console.log('CSDA', currentAddress);
        allServices.map((item: any) =>
            item.service_name == 'DRIVER (CAR, E-RICKSHAW) - PICKUP AND DROP SERVICE'
                ? setPickService(item)
                : console.log(item.service_name),
        );
    }, []);

    const Vehicles = [
        {
            id: 0,
            name: 'E- Rickshaw',
            image: require('../../assets/image/auto.png'),
            family: 'MaterialIcons',
        },
        {
            id: 1,
            name: 'Three Wheeler',
            image: require('../../assets/image/tuk-tuk.png'),
            family: 'MaterialIcons',
        },
        {
            id: 2,
            name: 'Four Wheeler',
            image: require('../../assets/image/car.png'),
            family: 'Fontisto',
        },
    ];

    useEffect(() => {
        console.log('NUMBER', userData);
        if (!userNumber) {
            dispatch(setUserNumber(userData?.mobile_number));
            setNumberEdit(true);
        }
        console.log('NUMBER', userNumber);
        // setCity(cityRedux);
        // setPincode(pincodeRedux);
        // setStat(region);
        // setHouseno(houseRedux);
        // setLocality(localityRedux);
        // setCountry(countryRedux ? countryRedux : 'India');
        // setMobile(userNumber);
        // setName(userData?.personal_details?.name);
        console.log(cityRedux);

    }, []);

    const makePayment = async (payload: any) => {
        // console.log('SrvicePay', service);
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: RAZOR_PAY_KEY, // Your api key
            amount: 9900,
            name: payload?.personal_details?.name,
            prefill: {
                email: '',
                contact: payload?.personal_details?.mobile_number,
                name: 'Razorpay Software',
            },
            theme: { color: '#F37254' },
        };
        RazorpayCheckout.open(options)
            .then((data: any) => {
                // handle success
                console.log(`Success:data`, data);
                setVisible(false);
                ToastAndroid.show('Success', ToastAndroid.SHORT);
                navigation.navigate('SuccessFull', {
                    data: payload,
                    razorPayData: data,
                    paymentSuccess: true,
                    amount: amount,
                    // service: service,
                });
            })
            .catch((error: any) => {
                // handle failure
                console.log(`Error: ${error.code} | ${error.description}`);
                setVisible(false);
                ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
                // navigation.navigate('SuccessFull', {
                //   data: payload,
                //   razorPayData: '',
                //   paymentSuccess: false,
                // });
                // navigation.goBack()
            });
    };
    // const registerUser = async (values: any) => {
    //     // console.log("LOCAL IMAGE",response.assets[0].uri);
    //     try {
    //         setVisible(true);
    //         let payload = {
    //             personal_details: {
    //                 phone: {
    //                     country_code: '+91',
    //                     mobile_number: values.mobile,
    //                 },
    //                 email: values.email,
    //                 name: values.name,
    //             },
    //             address_details_permanent: {
    //                 address_line: values.addressLine,
    //                 city: values.city,
    //                 state: values.state,
    //                 pincode: values.pincode,
    //                 country: values.country,
    //             },
    //         };

    //         const resp = await axios({
    //             method: 'post',
    //             url: API.REGISTER_USER,
    //             data: payload,
    //         });
    //         // const resp = await res.json()
    //         if (resp) {
    //             setVisible(false);
    //             console.log('SIGNUP RES', resp.data);
    //             if (resp?.data?.data) {
    //                 dispatch(setUserData(resp?.data?.data));
    //                 dispatch(setUserId(resp?.data?.data?._id));
    //                 dispatch(
    //                     setCurrentAddress(
    //                         resp.data?.data?.address_details_permanent?.city +
    //                         ', ' +
    //                         resp.data?.data?.address_details_permanent?.state,
    //                     ),
    //                 );
    //                 dispatch(
    //                     setPincodeRedux(
    //                         resp.data?.data?.address_details_permanent?.pincode,
    //                     ),
    //                 );
    //                 dispatch(
    //                     setCityRedux(resp.data?.data?.address_details_permanent?.pincode),
    //                 );
    //                 dispatch(
    //                     setRegion(resp.data?.data?.address_details_permanent?.pincode),
    //                 );
    //                 dispatch(
    //                     setCountryRedux(
    //                         resp.data?.data?.address_details_permanent?.pincode,
    //                     ),
    //                 );
    //                 console.log('User Data---->', userData);
    //                 console.log('User ID---->', userId);
    //                 // dispatch(setAccessToken(resp?.data?.data));
    //                 dispatch(
    //                     setUserNumber(
    //                         resp?.data?.data?.personal_details?.phone?.mobile_number.toString(),
    //                     ),
    //                 );
    //                 console.log(isAuthorized);
    //                 console.log('UserNumber', userNumber);
    //                 onsubmit(values);
    //                 // dispatch(
    //                 //   setProfileImageUrl(resp?.data?.data?.consumerDetails?.avatar),
    //                 // );
    //                 dispatch(login(accessToken));
    //                 // dispatch(login());
    //             } else {
    //                 setVisible(false);
    //                 ToastAndroid.show('Something went Wrong!', ToastAndroid.SHORT);
    //                 console.log('err', userData);
    //             }
    //         } else {
    //             console.log('REG ERR', error);
    //             setVisible(false);
    //         }
    //     } catch (error) {
    //         console.log('ERR', error?.response?.data);
    //         setVisible(false);
    //     }
    // };

    const onsubmit = async (values) => {


        if (alternate && pincode && state && city && houseno && local && country && droplocation) {

            setVisible(true);
            // dispatch(setPincodeRedux(pincode));
            // dispatch(setCityRedux(city));
            // dispatch(setHouseRedux(houseno));
            // dispatch(setCountryRedux(country));
            // dispatch(setRegion(state));
            // dispatch(setLocalityRedux(local));
            console.log('vv0', values)
            let payload = {
                personal_details: {
                    primary_phone: {
                        country_code: '+91',
                        mobile_number: userData?.personal_details?.phone?.mobile_number,
                    },
                    alternate_phone: {
                        country_code: '+91',
                        mobile_number: alternate,
                    },

                },
                specific_requirement: selectVehicle,
                service_provided_for: '643798aa8dae27264ca2a0dc',
                address_details: {
                    house_number: houseno,
                    locality: local,
                    city: city,
                    state: state,
                    pincode: pincode,
                    country: country,
                    drop_location: droplocation
                },
                time_preference: {
                    time_preference_type: selectedValue,
                    specific_date_time:
                        selectedValue == 'Immediately'
                            ? moment().format()
                            : moment().add(1, 'days').format('LLLL'),
                },
                offers_applied: {
                    offer_code: 'OniT 2023',
                },
            };

            console.log('PAYLOAD', payload);
            try {
                const res = await axios({
                    method: 'post',
                    url: API.PICK_AND_DROP,
                    data: payload,
                    // config: {
                    //   headers: {
                    //     'Content-Type': 'application/json',
                    //   },
                    // },
                });
                const { data, error } = res.data;
                if (res) {
                    console.log('Request Raised', res.data);
                    makePayment(res.data);
                    ToastAndroid.show('Request Raised', ToastAndroid.SHORT);
                    //   if (res.data?.data?.resData?._id) {
                    //     let payload = {
                    //       broadcast_obj_id: res.data?.data?.resData?._id,
                    //     };
                    //     try {
                    //       axios({
                    //         method: "post",
                    //         url: BASE_URL+'technicianapp/accepted-broadcast-request',
                    //         // headers: {
                    //         //   "x-access-token": accessToken,
                    //         // },
                    //         data: payload,
                    //       })
                    //         .then((res) => {
                    //           setVisible(false);
                    //           console.log('ACCEPT TICKET', res.data)
                    //         })
                    //         .catch((error) => {
                    //           console.log("Here-->", error?.response);
                    //           ToastAndroid.show(
                    //             error?.response?.data?.message.split(":")[1],
                    //             ToastAndroid.SHORT
                    //           );
                    //         });
                    //     } catch (err) {
                    //       setVisible(false);
                    //       ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
                    //       // navigation.goBack();
                    //     }
                    //   } else {
                    //     setVisible(false);
                    //     navigation.goBack();
                    //   }
                } else if (error) {
                    console.log('ERROR', error);
                }
            } catch (error) {
                setVisible(false);
                console.log('ERRORS', error);
                ToastAndroid.show(
                    error?.response?.data?.message + '!',
                    ToastAndroid.SHORT,
                );
            }
        }
    };
    const serviceType = [
        { name: 'IMMEDIATELY', label: 'IMMEDIATELY' },
        { name: 'WITHIN_24_HOURS', label: 'WITHIN_24_HOURS' },
        // {name: 'SPECIFIC_DATE_AND_TIME', label: 'SPECIFIC_DATE_AND_TIME'},
    ];
    const [selectedValue, setSelectedValue] = useState(serviceType[0].name);
    useEffect(() => {
        // console.log('SERVICE', service);
        console.log('Value', selectedValue);
    }, []);
    const Coupons = [
        {
            id: 1,
            name: 'ONIT 2023',
        },
        {
            id: 2,
            name: 'ONIT',
        },
        {
            id: 3,
            name: 'ONIT',
        },
        {
            id: 4,
            name: 'ONIT',
        },
        {
            id: 5,
            name: 'ONIT',
        },
    ];

    const AdvanceModal = () => {
        return (
            <Modal
                visible={advanceModal}
                onRequestClose={() => setAdvanceModal(!advanceModal)}
                transparent={true}
                animationType="fade">
                <View
                    style={{
                        // backgroundColor: '#707070',
                        height: height,
                        width: width,
                    }}>
                    <View
                        style={{
                            backgroundColor: COLORS.WHITE,
                            elevation: 10,
                            width: width * 0.8,
                            opacity: 2,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            alignSelf: 'center',
                            padding: 30,
                            borderRadius: 10,
                            height: height / 4,
                        }}>
                        <TouchableOpacity
                            onPress={() => setAdvanceModal(!advanceModal)}
                            style={{
                                alignSelf: 'flex-end',
                            }}>
                            <Icon
                                name="close"
                                family="FontAwesome"
                                color={COLORS.RED_DARK}
                                size={16}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: COLORS.BLACK,
                                fontSize: 16,
                                fontWeight: '300',
                                fontFamily: 'poppins-medium',
                                textAlignVertical: 'center',
                                textAlign: 'justify',
                                lineHeight: 20,
                            }}>
                            Advance to be adjusted against service. Information button - in
                            case of service not availed, you will get cash back in the wallet
                            in 7 days! (max)
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    };
    const ChangeCoupon = () => {
        return (
            <Modal
                visible={couponVisible}
                onRequestClose={() => setCouponVisible(!couponVisible)}
                transparent
                animationType="fade">
                <Pressable
                    onPress={() => setCouponVisible(false)}
                    style={{
                        backgroundColor: COLORS.MODAL_BACKGROUND,
                        height: height,
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: COLORS.WHITE,
                            width: width * 0.9,
                            height: height / 2,
                            padding: 20,
                            borderRadius: 15,
                            elevation: 5,
                        }}>
                        {Coupons.map((item: any, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setCoupon(item.name);
                                        setCouponVisible(!couponVisible);
                                    }}>
                                    <Text
                                        style={{
                                            color: COLORS.BLACK,
                                            borderBottomColor: COLORS.BLACK,
                                            borderBottomWidth: 0.5,
                                            paddingVertical: 10,
                                            fontSize: 18,
                                            paddingHorizontal: 15,
                                        }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Pressable>
            </Modal>
        );
    };
    const SPECIFIC_INPUT = () => {
        return selectedValue == 'SPECIFIC_DATE_AND_TIME' ? (
            <View style={{ flexDirection: 'row' }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TouchableOpacity
                            style={[styles.msgStyle, { width: '40%' }]}
                            onPress={() => setOpenDate(true)}
                            onBlur={onBlur}>
                            <Text
                                style={{
                                    fontFamily: 'poppins-medium',
                                    fontSize: 16,
                                    color: 'grey',
                                }}>
                                {value ? moment(value).format('LL') : 'Date'}
                            </Text>
                            <DatePicker
                                modal={true}
                                mode="date"
                                // format="YYYY-MM-DD"
                                open={openDate}
                                // maximumDate={moment().subtract(18, 'years')._d}
                                date={value}
                                onConfirm={date => {
                                    setOpenDate(false);
                                    setSpecificDate(date);
                                }}
                                onCancel={() => {
                                    setOpenDate(false);
                                }}
                                textColor="#00796A"
                            />
                        </TouchableOpacity>
                    )}
                    name="date"
                    defaultValue={undefined}
                />
                {/* <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TouchableOpacity
              style={[styles.msgStyle, {width: '40%'}]}
              onPress={() => setOpenTime(true)}
              onBlur={onBlur}>
              <Text
                style={{
                  fontFamily: 'poppins-medium',
                  fontSize: 16,
                  color: 'grey',
                }}>
                {value ? moment(value).format('LL') : 'Time'}
              </Text>
              <DatePicker
                modal
                mode="time"
                open={openTime}
                // maximumDate={moment().subtract(18, 'years')._d}
                date={value}
                onConfirm={date => {
                  setOpenTime(false);
                  setSpecificTime(date);
                }}
                onCancel={() => {
                  setOpenTime(false);
                }}
                textColor="#00796A"
              />
            </TouchableOpacity>
          )}
          name="time"
          defaultValue={undefined}
        /> */}
            </View>
        ) : (
            <></>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <LateLogin loginModal={loginModal} setLoginModal={setLoginModal} /> */}
            <View style={{ flexDirection: 'row', padding: 10, paddingBottom: 20 }}>
                {Vehicles.map((item: any, index) => (
                    <TouchableOpacity
                        style={[
                            styles.container,
                            {
                                backgroundColor:
                                    selectVehicle == item.name ? COLORS.WHITE : '#00796A',
                            },
                        ]}
                        onPress={() => {
                            item.id == index
                                ? setSelectVehicle(item.name)
                                : setSelectVehicle('');
                        }}>
                        {item.id >= 0 ? (
                            <Image source={item.image} resizeMode='contain' style={{ width: 30, height: 30, }} />
                        ) : (
                            <Icon
                                name={item.image}
                                family={item.family}
                                size={30}
                                color={
                                    selectVehicle == item.name ? COLORS.DARK_GREEN : COLORS.BLACK
                                }
                            />
                        )}
                        <Text
                            style={[
                                styles.text,
                                {
                                    color:
                                        selectVehicle == item.name
                                            ? COLORS.DARK_GREEN
                                            : COLORS.WHITE,
                                },
                            ]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>


            {/* for Details section */}
            <Formik
                initialValues={{
                    name: userData?.personal_details?.name,
                    email: userData?.personal_details?.email,
                    mobile: userNumber,
                    alternate: '',
                    requirement: '',
                    houseno: '',
                    locality: '',
                    pincode: pincodeRedux,
                    city: cityRedux,
                    state: region,
                    country: countryRedux || 'India',
                    dropLocation: '',
                }}
                enableReinitialize
                onSubmit={(values: any, action) => {
                    console.log('VALUES', values);
                    // registerUser(values);
                }}
                validationSchema={ValidateSchema}>
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    setFieldValue,
                }) => {
                    return (
                        <>
                            <View style={{ height: height / 5, marginTop: 10 }}>
                                {/* For name */}
                                <ScrollView>
                                    {/* <OnitInput
                                        // style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Specific Requirement "
                                        onChangeText={text => setText(text)}
                                        value={text}
                                        placeholderTextColor="#737373"
                                        errors={errors.text}
                                    /> */}

                                    <TextInput
                                        style={{ borderWidth: 1, marginHorizontal: 22, backgroundColor: "white", borderColor: "#E5E7E9" }}
                                        underlineColorAndroid="transparent"
                                        placeholder="Specific Requirement "
                                        onChangeText={selectVehicle => setSelectVehicle(selectVehicle)}
                                        value={selectVehicle}
                                        placeholderTextColor="#737373"
                                    />
                                    <Text style={{ color: "red", marginLeft: 18 }}>{selectVehicle ? null : 'select drive'}</Text>
                                    {/* <View style={styles.msgStyle}>
                                </View> */}
                                    <View style={[styles.msgStyle, { paddingRight: 32 }]}>
                                        <OnitInput
                                            style={[styles.input1, { fontWeight: 'normal' }]}
                                            placeholder="Mobile no "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={handleChange('mobile')}
                                            value={values.mobile}
                                            errors={errors.mobile}
                                            keyboardType="number-pad"
                                            maxLength={10}
                                            editable={numberEdit}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFieldValue(mobile, '');
                                                setNumberEdit(true);
                                            }}>
                                            <Icon
                                                family="MaterialCommunityIcons"
                                                name="pencil-outline"
                                                size={20}
                                                color={'black'}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        setAlternate.length > 0 &&
                                        <TextInput
                                            style={styles.input1}
                                            placeholder="Alternate Mobile no "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={alternate => setAlternate(alternate)}
                                            value={alternate}
                                            keyboardType="number-pad"
                                            maxLength={10}

                                        />}

                                    <Text style={{ color: "red", marginLeft: 18 }}>{alternate ? null : 'enter alternate mobile number'}</Text>
                                    {/* <OnitInput
                                        style={styles.input1}
                                        placeholder="Alternate Mobile no "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#737373"
                                        returnKeyLabel={'next'}
                                        onChangeText={alternate => setAlternate(alternate)}
                                        value={alternate}
                                        keyboardType="number-pad"
                                        maxLength={10}
                                    /> */}
                                    {/* <Icon
              family="MaterialCommunityIcons"
              name="pencil-outline"
              size={20}
              color={'black'}
            /> */}
                                    {/* <OnitInput
                                        style={styles.input1}
                                        placeholder="House no "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#737373"
                                        returnKeyLabel={'next'}
                                        onChangeText={houseno => setHouseno(houseno)}
                                        value={houseno}
                                        errors={houseno}
                                    /> */}

                                    {
                                        setHouseno.length > 0 &&
                                        <TextInput
                                            style={styles.input1}
                                            placeholder="House no "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={houseno => setHouseno(houseno)}
                                            value={houseno}

                                        />}

                                    <Text style={{ color: "red", marginLeft: 18 }}>{houseno ? null : 'Enter House number'}</Text>

                                    {/* <View style={styles.msgStyle}>
                    </View> */}
                                    {/* <OnitInput
                                        style={styles.input1}
                                        placeholder="Locality "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#737373"
                                        returnKeyLabel={'next'}
                                        onChangeText={local => setLocality(local)}
                                        value={local}
                                        errors={local}
                                    /> */}

                                    {setLocality.length > 0 && <TextInput
                                        style={styles.input1}
                                        placeholder="Locality "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#737373"
                                        returnKeyLabel={'next'}
                                        onChangeText={local => setLocality(local)}
                                        value={local}
                                    />}

                                    <Text style={{ color: "red", marginLeft: 18 }}>{local ? null : 'locality required'}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginLeft: 22,
                                            marginRight: 22,
                                        }}>
                                        {/* <OnitInput
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 15,
                                                color: 'black',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                                backgroundColor: '#fff',
                                                height: 56,
                                                width: '48%',
                                                padding: 20,
                                                marginTop: 0,
                                            }}
                                            placeholder="City "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={city => setCity(city)}
                                            value={city}
                                            errors={city}
                                        /> */}

                                        {
                                            setCity.length > 0 &&
                                            <TextInput
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: 15,
                                                    color: 'black',
                                                    borderRadius: 2,
                                                    borderWidth: 1,
                                                    borderColor: '#ddd',
                                                    backgroundColor: '#fff',
                                                    height: 56,
                                                    width: '48%',
                                                    padding: 20,
                                                    marginTop: 0,
                                                }}
                                                placeholder="City "
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor="#737373"
                                                returnKeyLabel={'next'}
                                                onChangeText={city => setCity(city)}
                                                value={city}
                                            />}


                                        {/* <OnitInput
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 15,
                                                color: 'black',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                                backgroundColor: '#fff',
                                                height: 56,
                                                width: '48%',
                                                padding: 20,
                                                marginTop: 0,
                                            }}
                                            placeholder="Pincode "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={pincode => setPincode(pincode)}
                                            value={pincode}
                                            errors={pincode}
                                            keyboardType="number-pad"
                                            maxLength={6}
                                        /> */}

                                        {
                                            setPincode.length > 0 &&
                                            <TextInput
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: 15,
                                                    color: 'black',
                                                    borderRadius: 2,
                                                    borderWidth: 1,
                                                    borderColor: '#ddd',
                                                    backgroundColor: '#fff',
                                                    height: 56,
                                                    width: '48%',
                                                    padding: 20,
                                                    marginTop: 0,
                                                }}
                                                placeholder="Pincode "
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor="#737373"
                                                returnKeyLabel={'next'}
                                                onChangeText={pincode => setPincode(pincode)}
                                                value={pincode}

                                                keyboardType="number-pad"
                                                maxLength={6}
                                            />}


                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ width: '50%', alignItems: 'center' }}>
                                            <Text style={{ color: "red" }}>{city ? null : 'city required'}</Text>
                                        </View>

                                        <View style={{ width: '50%', alignItems: "center" }}>
                                            <Text style={{ color: "red" }}>{pincode ? null : 'pincode required'}</Text>
                                        </View>


                                    </View>


                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginLeft: 22,
                                            marginRight: 22,
                                            marginTop: 10,
                                        }}>
                                        {/* <OnitInput
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 15,
                                                color: 'black',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                                backgroundColor: '#fff',
                                                height: 56,
                                                width: '48%',
                                                padding: 20,
                                            }}
                                            placeholder="State "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            returnKeyLabel={'next'}
                                            onChangeText={state => setState(state)}
                                            value={state}
                                            errors={errors.state}
                                        /> */}

                                        {
                                            setState.length > 0 &&
                                            <TextInput
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: 15,
                                                    color: 'black',
                                                    borderRadius: 2,
                                                    borderWidth: 1,
                                                    borderColor: '#ddd',
                                                    backgroundColor: '#fff',
                                                    height: 56,
                                                    width: '48%',
                                                    padding: 20,
                                                }}
                                                placeholder="State "
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor="#737373"
                                                returnKeyLabel={'next'}
                                                onChangeText={state => setState(state)}
                                                value={state}

                                            />}


                                        {/* <OnitInput
                                            style={{
                                                marginTop: 10,
                                                fontWeight: '600',
                                                fontSize: 15,
                                                color: 'black',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                                backgroundColor: '#fff',
                                                height: 56,
                                                width: '48%',
                                                padding: 20,
                                            }}
                                            placeholder="Country "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            onChangeText={country => setCountry(country)}
                                            errors={country}
                                            returnKeyLabel={'next'}
                                            value={country}
                                        /> */}

                                        {
                                            setCountry.length > 0 &&
                                            <TextInput
                                                style={{

                                                    fontWeight: '600',
                                                    fontSize: 15,
                                                    color: 'black',
                                                    borderRadius: 2,
                                                    borderWidth: 1,
                                                    borderColor: '#ddd',
                                                    backgroundColor: '#fff',
                                                    height: 56,
                                                    width: '48%',
                                                    padding: 20,
                                                }}
                                                placeholder="Country "
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor="#737373"
                                                onChangeText={country => setCountry(country)}

                                                returnKeyLabel={'next'}
                                                value={country}
                                            />}


                                    </View>
                                    <Text style={{ color: "red", marginLeft: 18 }}>{state ? null : 'state required'}</Text>

                                    {/* <OnitInput
                                        mVertical={20}
                                        placeholder="Drop Location "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#737373"
                                        onChangeText={droplocation => setDropLocation(droplocation)}
                                        errors={droplocation}
                                        returnKeyLabel={'next'}
                                        value={droplocation}
                                    /> */}
                                    {
                                        setDropLocation.length > 0 &&
                                        <TextInput
                                            style={{ marginVertical: 20, borderWidth: 1, backgroundColor: 'white', marginHorizontal: 18, borderColor: "#E5E7E9" }}
                                            placeholder="Drop Location "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#737373"
                                            onChangeText={droplocation => setDropLocation(droplocation)}

                                            returnKeyLabel={'next'}
                                            value={droplocation}
                                        />}
                                    <Text style={{ color: "red", marginLeft: 18 }}>{droplocation ? null : 'Please enter a valid input'}</Text>
                                </ScrollView>
                            </View>

                            {/* for coupon */}
                            <View style={styles.couponStyle}>
                                <Image
                                    source={require('../../assets/logo/tag.png')}
                                    style={{ height: 30, width: 25, marginLeft: 10 }}
                                />
                                <Text
                                    style={{
                                        flex: 0.87,
                                        fontWeight: '700',
                                        fontSize: 18,
                                        color: 'black',
                                        marginLeft: 35,
                                    }}>
                                    {coupon}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setCouponVisible(!couponVisible);
                                    }}>
                                    <Text style={{ color: '#0066FF' }}>Change</Text>
                                </TouchableOpacity>
                            </View>

                            {/* for amount */}
                            <View style={styles.cStyle}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'stretch',
                                        margin: 10,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <Text style={{ color: COLORS.BLACK }}>ADVANCE</Text>
                                        <TouchableOpacity
                                            onPress={() => setAdvanceModal(!advanceModal)}>
                                            <Text
                                                style={{
                                                    marginLeft: 5,
                                                    paddingHorizontal: 6,
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    color: COLORS.BLACK,
                                                    borderRadius: 50,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.GREEN_LIGHT,
                                                }}>
                                                i
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: COLORS.BLACK }}>₹25</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'stretch',
                                        margin: 10,
                                    }}>
                                    <Text style={{ color: COLORS.BLACK }}>Service Total</Text>
                                    <Text style={{ color: COLORS.BLACK }}>₹0</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'stretch',
                                        margin: 10,
                                    }}>
                                    <Text style={{ color: COLORS.BLACK }}>Total</Text>
                                    <Text
                                        style={{ fontSize: 16, fontWeight: '600', color: '#00796A' }}>
                                        {'₹'}
                                        {amount}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                disabled={!isValid}
                                style={{
                                    justifyContent: 'center',
                                    width: '95%',
                                    backgroundColor: isValid ? '#00796A' : COLORS.LIGHT_BORDER,
                                    height: 50,
                                    marginTop: 10,
                                    marginLeft: 10,
                                    borderRadius: 3,
                                }}
                                //</View>onPress={() => { console.log("coming soon") }}>
                                // onPress={() => {
                                //   navigation.navigate("SuccessFull");
                                // }}

                                onPress={() => handleSubmit(onsubmit())}>
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        fontSize: 18,
                                        letterSpacing: 1,
                                        textAlign: 'center',
                                        position: 'relative',
                                        color: '#fff',
                                    }}>
                                    Confirm Booking
                                </Text>
                            </TouchableOpacity>
                        </>
                    );
                }}
            </Formik>
            <ActivityLoader
                visible={visible}
                setVisible={() => setVisible(!visible)}
            />
            <ChangeCoupon />
            <AdvanceModal />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '30%',
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.15,
        marginHorizontal: 5,
        padding: 10,
        elevation: 5,
    },
    input1: {
        flex: 1,
        fontWeight: '700',
        fontSize: 15,
        color: 'black',
        marginHorizontal: 18, borderWidth: 1, borderRadius: 5, borderColor: "#E5E7E9", backgroundColor: "white", marginVertical: 8
    },
    sectionStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        marginLeft: 0,
        // paddingTop: StatusBar.currentHeight,
    },
    imageStyle: {
        //padding: 10,
        //margin: 5,
        height: 25,
        width: 25,
        //resizeMode: 'stretch',
        alignItems: 'center',
        marginLeft: 20,
    },
    plumberStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        marginTop: 15,
    },
    msgStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        marginLeft: 22,
        marginVertical: 9,
        marginRight: 22,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    withinStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 56,
        margin: 20,
        marginVertical: 9,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    couponStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#00796A',
        borderStyle: 'dashed',
    },
    cStyle: {
        //flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: '#fff',
        height: 130,
        marginTop: 14,
        paddingHorizontal: 10,
    },
    inStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00796A',
        height: 56,
        margin: 16,
        marginBottom: 16,
        marginTop: 105,
        borderRadius: 2,
    },
    textStyle: {
        color: '#fff',
    },
});

export default PickDrop;
{
    /* <ScrollView>
                 <View style={{ height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#00796A" }}>
                     <Text style={{ color: "white", fontSize: 25 }}>Book Taxi</Text>
                 </View>
  
                 <View style={{ flexDirection: "row" }}>
                     <TouchableOpacity style={{ width: "33%" }} onPress={() => setRadioButtons(1)}>
                         <View style={styles.radioWraper}>
                             <View style={styles.radio}>
                                 {
                                     radioButtons === 1 ? <View style={styles.radioBg}>
                                         <Text>hiiii</Text>
                                     </View> : null
                                 }
                             </View>
                             <Text style={{ fontSize: 18, color: "black" }}>Bike</Text>
  
                         </View>
  
                     </TouchableOpacity>
                     <TouchableOpacity style={{ width: "33%" }} onPress={() => setRadioButtons(2)}>
                         <View style={styles.radioWraper}>
                             <View style={styles.radio}>
                                 {
                                     radioButtons === 2 ? <View style={styles.radioBg}>
                                     </View> : null
                                 }
                             </View>
                             <Text style={{ fontSize: 18, color: "black" }}>Auto</Text>
                         </View>
  
                     </TouchableOpacity>
                     <TouchableOpacity style={{ width: "33%" }} onPress={() => setRadioButtons(3)}>
                         <View style={styles.radioWraper}>
                             <View style={styles.radio}>
                                 {
                                     radioButtons === 3 ? <View style={styles.radioBg}>
                                     </View> : null
                                 }
                             </View>
                             <Text style={{ fontSize: 18, color: "black" }}>Cab</Text>
                         </View>
  
                     </TouchableOpacity>
                 </View>
                 <View>
                     {
                         radioButtons ?
                             <View style={{ padding: 15, backgroundColor: "#E5E7E9", }}>
  
                                 <View style={{ backgroundColor: "white", padding: 5, borderRadius: 10 }}>
                                     <Text style={{ fontSize: 20, fontWeight: '400', color: "black" }}>From :</Text>
                                     <View style={{
                                         flexDirection: "row", backgroundColor: "#ECF0F1", padding: 3, borderRadius: 20,
                                         marginTop: 10, marginHorizontal: 10
                                     }}>
                                         <View style={{ justifyContent: "center" }}>
                                             <EvilIcons name="search" size={30} color="black" />
                                         </View>
                                         <TextInput
                                             style={{
                                                 backgroundColor: "#ECF0F1", borderRadius: 20,
                                                 padding: 8, fontSize: 16, flexGrow: 1
                                             }}
                                             placeholder='search'
                                         />
                                     </View>
                                     <View style={{ marginTop: 20 }}>
                                         <Text style={{ fontSize: 20, fontWeight: '400', color: "black" }}>TO :</Text>
                                         <View style={{
                                             flexDirection: "row", backgroundColor: "#ECF0F1", padding: 3, borderRadius: 20, marginTop: 10
                                             , marginHorizontal: 10
                                         }}>
                                             <View style={{ justifyContent: "center" }}>
                                                 <EvilIcons name="search" size={30} color="black" />
                                             </View>
                                             <TextInput
                                                 style={{
                                                     backgroundColor: "#ECF0F1", borderRadius: 20,
                                                     padding: 8, fontSize: 16, flexGrow: 1
                                                 }}
                                                 placeholder='search'
  
                                             />
                                         </View>
                                     </View>
  
                                     <View style={{ marginTop: 20 }}>
                                         <Text style={{ fontSize: 20, fontWeight: '400', color: "black" }}>No. of Passanger :</Text>
                                         <TextInput
                                             style={{
                                                 backgroundColor: "white",
                                                 marginTop: 10, width: 45, marginLeft: 10, padding: 10, fontSize: 20, borderWidth: 1
                                             }}
                                             keyboardType='numeric'
                                             placeholder='00'
                                         />
                                     </View>
  
                                     <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                                         <TouchableOpacity style={{
                                             backgroundColor: "black", width: 100, height: 45, alignItems: "center",
                                             justifyContent: "center", borderRadius: 10
                                         }}>
                                             <Text style={{ color: "white", fontSize: 16, }}>Submit</Text>
                                         </TouchableOpacity>
                                     </View>
  
                                 </View>
  
                             </View> : null
                     }
                 </View>
  
  
                 <View>
                     {
                         radioButtons === 2 ? <View>
                             <Text>HHHH</Text>
                         </View> : null
                     }
                 </View>
             </ScrollView> */
}

// import React from 'react';
// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import {COLORS} from '../../const/constants';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// const {width, height} = Dimensions.get('screen')

// const PickDrop = props => (
//   <View style={styles.container}>
//     <Text>PickDrop</Text>
//     <GooglePlacesAutocomplete
//       query={{
//         // key: 'AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o',
//         key: 'AIzaSyADh2kmvltu9kR5MsiqdwHDpX9kSvoeVig',
//         // key: 'AIzaSyAAFz7wsoEsvZOY24eqBigX57ZdcUT-RbA',
//         // key: 'AIzaSyA-p0vrefHwsBnK1CLVEGyj0rNcrU-0PAAA',
//         language: 'en', // language of the results
//         components: 'country:in',
//       }}
//       enablePoweredByContainer={true}
//       styles={{
//         // textInput: styles.passenger,
//         container: {
//           backgroundColor: COLORS.WHITE,
//           width: width * 0.9,
//           marginTop: 5,
//           height: 50,
//           alignSelf: 'center',
//         },
//       }}
//       //   currentLocation={true}
//       //   currentLocationLabel="Current location"
//       placeholder="Search Destination Point"
//       onPress={(data, details) => console.log(data, details)}
//       // textInputProps={{
//       //   InputComp: OnitInput,
//       //   leftIcon: {type: 'font-awesome', name: 'chevron-left'},
//       //   errorStyle: {color: 'red'},
//       // }}
//     />
//   </View>
// );
// export default PickDrop;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
