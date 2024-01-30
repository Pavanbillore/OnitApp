import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    Button,
    Text,
    StyleSheet,
    StatusBar,
    View,
    Image,
    TextInput,
    Modal,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    Alert,
    ScrollView,
    Pressable,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';
const { width, height } = Dimensions.get('window');
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import LocationDetail from '../../utils/components/LocationDetail';
import { useDispatch, useSelector } from 'react-redux';
import {
    setUserData,
    setCityRedux,
    setCountryRedux,
    setDistrictRedux,
    setHouseRedux,
    setPincodeRedux,
    setRegion,
    setUserNumber,
    setLocalityRedux,
    login,
    setCurrentAddress,
    setUserId,
} from '../../backend/slice';
import { COLORS } from '../../const/constants';
import Icon from '../../utils/components/Icon';
import ServiceTypeDropDown from '../../utils/components/ServiceTypeDropDown';
import DatePicker from 'react-native-date-picker';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import ActivityLoader from '../../utils/components/ActivityLoader';
import RazorpayCheckout from 'react-native-razorpay';
import { API, BASE_URL, RAZOR_PAY_KEY } from '../../utils/components/api';
import Header from '../../utils/components/Header';
import ServiceHeader from '../../utils/components/ServiceHeader';
import OnitInput from '../../utils/components/OnitInput';
import { Formik } from 'formik';
import * as yup from 'yup';

const ValidateSchema = yup.object().shape({
    name: yup.string().required('Enter your Name'),
    
    requirement: yup.string().required('Enter your Service Requirement'),
    // droplocation: yup.string().required('Enter your Drop Location'),
    email: yup.string().email().required('Enter your Email'),
    houseno: yup.string().required('Enter your House Number'),
    mobile: yup.string().required('Enter your Mobile Number'),
    locality: yup.string().required('Enter your nearby Landmark'),
    // alternate: yup.string().required('Enter your Alternate Mobile Number'),
    pincode: yup.string().required('Enter your Pincode'),
    // city: yup.string().required('Enter your City Name'),
    // state: yup.string().required('Enter your State'),
    // country: yup.string().required('Enter your Country'),
});

// {
//     service?.service_name==="DRIVER (CAR, E-RICKSHAW) - PICKUP AND DROP SERVICE"?
// }

const MainService = (props: any) => {
    const { navigation, route } = props;
    const { service } = route?.params;
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
        userNumber,
        userData,
        accessToken,
        isAuthorized
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
    const [naam, setName] = useState('');
    const [coupon, setCoupon] = useState('OniT 2023');
    const [specificDate, setSpecificDate] = useState(new Date());
    const [specificTime, setSpecificTime] = useState(new Date());
    const [specificInput, setSpecificInput] = useState(false);
    const [couponVisible, setCouponVisible] = useState(false);
    const [advanceModal, setAdvanceModal] = useState(false);
    const [amount, totalAmount] = useState(99);
    const [driveramount,setDriveramount]=useState(20)
    const [visible, setVisible] = useState(false);
    const [numberEdit, setNumberEdit] = useState(false);
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState('');
    

    useEffect(() => {
        console.log('NUMBER', userData);
       
        

        
        if (!userNumber) {
            dispatch(setUserNumber(userData?.mobile_number));
            console.log('NUMBER', userNumber);
        }
    }, []);

    const GET_CITY = async () => {
        console.log(pin);
        try {
            const res = await axios({
                url: `https://api.postalpincode.in/pincode/${pin}`,
            });
            setCity(res.data[0]?.PostOffice[0]?.District);
            setState(res.data[0]?.PostOffice[0]?.State);
            console.log('CITYs', res.data[0]?.PostOffice[0]);
        } catch (error) {
            console.log('GERROR', error);
        }
    };

    const registerUser = async (values: any) => {
        // console.log("LOCAL IMAGE",response.assets[0].uri);
        if (userData) {
            onsubmit(values)
        }
        try {
            setVisible(true);
            let payload = {
                personal_details: {
                    phone: {
                        country_code: '+91',
                        mobile_number: values.mobile,
                    },
                    email: values.email,
                    name: values.name,
                },
                address_details_permanent: {
                    address_line: values.addressLine,
                    city: values.city,
                    state: values.state,
                    pincode: values.pincode,
                    country: values.country,
                },
            };

            const resp = await axios({
                method: 'post',
                url: API.REGISTER_USER,
                data: payload,
            });
            // const resp = await res.json()
            if (resp) {
                setVisible(false);
                console.log('SIGNUP RES', resp.data);
                if (resp?.data?.data) {
                    dispatch(setUserData(resp?.data?.data));
                    dispatch(setUserId(resp?.data?.data?._id));
                    dispatch(
                        setCurrentAddress(
                            resp.data?.data?.address_details_permanent?.city +
                            ', ' +
                            resp.data?.data?.address_details_permanent?.state,
                        ),
                    );
                    dispatch(
                        setPincodeRedux(
                            resp.data?.data?.address_details_permanent?.pincode,
                        ),
                    );
                    dispatch(
                        setCityRedux(resp.data?.data?.address_details_permanent?.pincode),
                    );
                    dispatch(
                        setRegion(resp.data?.data?.address_details_permanent?.pincode),
                    );
                    dispatch(
                        setCountryRedux(
                            resp.data?.data?.address_details_permanent?.pincode,
                        ),
                    );
                    console.log('User Data---->', userData);
                    console.log('User ID---->', userId);
                    // dispatch(setAccessToken(resp?.data?.data));
                    dispatch(
                        setUserNumber(
                            resp?.data?.data?.personal_details?.phone?.mobile_number.toString(),
                        ),
                    );
                    console.log(isAuthorized);
                    console.log('UserNumber', userNumber);
                    onsubmit(values);
                    // dispatch(
                    //   setProfileImageUrl(resp?.data?.data?.consumerDetails?.avatar),
                    // );
                    dispatch(login(accessToken));
                    // dispatch(login());
                } else {
                    setVisible(false);
                    ToastAndroid.show('Something went Wrong!', ToastAndroid.SHORT);
                    console.log('err', userData);
                }
            } else {
                console.log('REG ERR', error);
                setVisible(false);
            }
        } catch (error) {
            console.log('ERR', error?.response?.data);
            setVisible(false);
        }
    };

    const makePayment = async (payload: any) => {
        console.log('SrvicePay', service);
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: RAZOR_PAY_KEY, // Your api key
            amount: 9900,
            name: payload?.personal_details?.name,
            order_id:payload?.data?.response?.id,
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
                paymentConformation(data);
                
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
    const paymentConformation = async (data) => {
        setVisible(true);
        var payload={
            "razorpay_payment_id": data.razorpay_payment_id, 
            "razorpay_order_id": data.razorpay_order_id, 
            "razorpay_signature": data.razorpay_signature
        }
        
        console.log('data',data)
        try {
            console.log('inside try',payload)
          await axios({
            method: "post",
            url: `${BASE_URL}center/accept-public-ticket-after-payment`,
           
            data: payload,
          }).then((res) => {
            
            setVisible(false);
                ToastAndroid.show('Success', ToastAndroid.SHORT);
                navigation.navigate('SuccessFull', {
                    data: payload,
                    razorPayData: data,
                    paymentSuccess: true,
                    amount: amount,
                    service: service,
                });
                console.log('alaakak=====----->>>',payload)
          });
        } catch (err) {
            console.log('inside catch',err)
          setVisible(false);
          ToastAndroid.show("Something wrong!", ToastAndroid.SHORT);
          navigation.goBack();
        }
      };

    const onsubmit = async (values) => {
        if(  isValid){
            setVisible(true);
            // dispatch(setPincodeRedux(pincode));
            // dispatch(setCityRedux(city));
            // dispatch(setHouseRedux(houseno));
            // dispatch(setCountryRedux(country));
            // dispatch(setRegion(state));
            // dispatch(setLocalityRedux(local));
            let payload = {
                personal_details: {
                    primary_phone: {
                        country_code: '+91',
                        mobile_number: values.mobile,
                    },
                    alternate_phone: {
                        country_code: '+91',
                        mobile_number: values.alternate,
                    },
                    name: values.name,
                },
                specific_requirement: values.requirement,
                service_provided_for: service?._id,
                address_details: {
                    house_number: values.houseno,
                    locality: values.locality,
                    city: values.city,
                    state: values.state,
                    pincode: values.pincode,
                    country: values.country,
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
                    url: API.CREATE_TICKET,
                    data: payload,
                    // config: {
                    //   headers: {
                    //     'Content-Type': 'application/json',
                    //   },
                    // },
                });
                const { data, error } = res.data;
                console.log('Request', res)
                if (res?.data?.success==true) {
                    console.log('Request Raised', res.data)
                    console.log('Request', res)
                    ;
                    makePayment(res.data);
                    ToastAndroid.show('Request Raised', ToastAndroid.SHORT);
                   
                } else  {
                    console.log('mess',res?.data?.message)
                    ToastAndroid.show(`${res?.data?.message   }`, ToastAndroid.SHORT);
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
        console.log('SERVICE', service);
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
        <View style={styles.container}>
            {/* <View style={{flexDirection: 'row', backgroundColor: COLORS.WHITE}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" family="AntDesign" color={COLORS.BLACK} size={25} />
        </TouchableOpacity>
        <View>
          <Text>Your Location</Text>
          <View style={{flexDirection: 'row'}}>
            <LocationDetail />
          </View>
        </View>
      </View> */}
            <View style={styles.sectionStyle}>
                {/* <TouchableOpacity
        // onPress={toggleBottomNavigationView}
        >
          <Image
            source={require('../../assets/logo/location.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity> */}
                {/* <LocationDetail color={'#fff'} /> */}
                <ServiceHeader />
                <Text
                // style={{
                //   flex: 0.5,
                //   marginLeft: 16,
                //   fontSize: 18,
                //   fontWeight: "700",
                //   // color: "#00796A",
                // }}
                ></Text>
                {/* <Image
          source={require("../../assets/logo/pen.png")}
          style={{ height: 25, width: 25 }}
        /> */}
            </View>

            {/* for choosed service section */}
            {/* <View style={styles.plumberStyle}>
        <Image
          source={
            //   service._id === '6373436f1307e26d44ac8cdb'
            //     ? require("../../assets/logo/ac.png")
            //  : service._id === '637b76f47c7cd9e139b39d02'
            //     ? require("../../assets/logo/elc.png")
            //  : service._id === '637b788c7c7cd9e139b39d09'
            //     ? require("../../assets/logo/elc.png")
            //  : service._id === '637b79997c7cd9e139b39d10'
            //     ? require("../../assets/logo/beauty.png")
            //  : service._id === '637b79cd7c7cd9e139b39d17'
            //     ? require("../../assets/logo/hc.png")
            //  : service._id === '637b7a0e7c7cd9e139b39d1e'
            //     ? require("../../assets/logo/plmber.png")
            //  : service._id === '637b7ab07c7cd9e139b39d2c'
            //     ? require("../../assets/logo/homecare.png")
            //  : service._id === '637b76f47c7cd9e139b39d02'
            //     ? require("../../assets/logo/elc.png")
            //  : service._id === '63b9162bfa46443c582e1940'
            //  ? require('../../assets/logo/homecare.png')
                // : require("../../assets/logo/elc.png")
                require("../../assets/logo/elc.png")
              }
          style={styles.imageStyle}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: '700',
            fontSize: 18,
            color: 'black',
            marginLeft: 15,
          }}>
          {service?.service_name.split('-')[0]}
        </Text>
        <Image
          source={require('../../assets/logo/down.png')}
          style={{height: 25, width: 25}}
        />
      </View> */}
            <ServiceTypeDropDown serviceName={service?.service_name} />
            <Text
                style={{
                    fontSize: 16,
                    marginLeft: 15,
                    fontWeight: '600',
                    color: COLORS.BLACK,
                }}>
                Please fill the details:
            </Text>

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
                }}
                enableReinitialize
                onSubmit={(values: any, action) => {
                    console.log('VALUES', values);
                    registerUser(values)
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
                            <View style={{ height: height / 3, marginTop: 10 }}>
                                {/* For name */}
                                <ScrollView>
                                    {/* <OnitInput
                                        // style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Specific Requirement "
                                        onChangeText={handleChange('requirement')}
                                        value={values.requirement}
                                        placeholderTextColor="gray"
                                        errors={errors.requirement}
                                    /> */}
                                    {
                                        service?.service_name==="DRIVER (CAR, E-RICKSHAW) - PICKUP AND DROP SERVICE"?
                                        <OnitInput
                                        // style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Drop Location "
                                        onChangeText={handleChange('requirement')}
                                        value={values.requirement}
                                        placeholderTextColor="gray"
                                        errors={errors.requirement}
                                    />:
                                    <OnitInput
                                        // style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Specific Requirement "
                                        onChangeText={handleChange('requirement')}
                                        value={values.requirement}
                                        placeholderTextColor="gray"
                                        errors={errors.requirement}
                                    />
                                    }
                                    {/* <View style={styles.msgStyle}>
          </View> */}

                                    <View style={styles.withinStyle}>
                                        <Image
                                            source={require('../../assets/logo/Clock.png')}
                                            style={{
                                                height: 30,
                                                width: 25,
                                                marginLeft: 10,
                                                justifyContent: 'flex-start',
                                            }}
                                        />
                                        <Picker
                                            selectedValue={selectedValue}
                                            style={{ height: 60, width: 250, fontWeight: '600' }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedValue(itemValue);
                                                // console.log('SV', selectedValue);
                                                // selectedValue === 'SPECIFIC_DATE_AND_TIME'
                                                //   ? setSpecificInput(true)
                                                //   : setSpecificInput(false);
                                            }}>
                                            {serviceType.map((type: any) => {
                                                return (
                                                    <Picker.Item label={type.label} value={type.name} style={{ color: "black" }} />
                                                );
                                            })}
                                        </Picker>
                                    </View>

                                    <SPECIFIC_INPUT />

                                    <OnitInput
                                        style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Name (contact person) "
                                        onChangeText={handleChange('name')}
                                        errors={errors.name}
                                        value={values.name}
                                        placeholderTextColor="gray"
                                    />
                                    <OnitInput
                                        style={styles.input1}
                                        underlineColorAndroid="transparent"
                                        placeholder="Email "
                                        onChangeText={handleChange('email')}
                                        errors={errors.email}
                                        value={values.email}
                                        placeholderTextColor="grau"
                                    />
                                    {/* <View style={styles.msgStyle}>
          </View> */}

                                    {/* <View style={[styles.msgStyle, { paddingRight: 32 }]}> */}
                                        {/* <OnitInput
                      style={[styles.input1, {fontWeight: 'normal',}]}
                      placeholder="Mobile no "
                      underlineColorAndroid="transparent"
                      placeholderTextColor="black"
                      returnKeyLabel={'next'}
                      onChangeText={handleChange('mobile')}
                      value={values.mobile}
                      errors={errors.mobile}
                      keyboardType="number-pad"
                      maxLength={10}
                      editable={numberEdit}
                    /> */}
                                        {/* <TouchableOpacity
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
                    </TouchableOpacity> */}


                                    {/* </View> */}
                                    {/* <TextInput
                     placeholder="Mobile no "
                     style={{borderWidth:1,marginHorizontal:18,borderRadius:5}}
                    
                    /> */}

                                    <OnitInput
                                        style={styles.input1}
                                        placeholder="Mobile no "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="gray"
                                        returnKeyLabel={'next'}
                                        onChangeText={handleChange('mobile')}
                                        value={values.mobile}
                                        keyboardType="number-pad"
                                        maxLength={10}
                                    />
                                    <OnitInput
                                        style={styles.input1}
                                        placeholder="Alternate Mobile no "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="gray"
                                        returnKeyLabel={'next'}
                                        onChangeText={handleChange('alternate')}
                                        value={values.alternate}
                                        keyboardType="number-pad"
                                        maxLength={10}
                                    />
                                    {/* <Icon
              family="MaterialCommunityIcons"
              name="pencil-outline"
              size={20}
              color={'black'}
            /> */}
                                    <OnitInput
                                        style={styles.input1}
                                        placeholder="House no "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="gray"
                                        returnKeyLabel={'next'}
                                        onChangeText={handleChange('houseno')}
                                        value={values.houseno}
                                        errors={errors.houseno}
                                    />

                                    {/* <View style={styles.msgStyle}>
                    </View> */}
                                    <OnitInput
                                        style={styles.input1}
                                        placeholder="Locality "
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="gray"
                                        returnKeyLabel={'next'}
                                        onChangeText={handleChange('locality')}
                                        value={values.locality}
                                        errors={errors.locality}
                                    />
                                    <View
                                        style={{
                                           
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginLeft: 22,
                                            marginRight: 22,
                                        }}>
                                        <OnitInput
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
                                            placeholderTextColor="gray"
                                            returnKeyLabel={'next'}
                                            onChangeText={handleChange('city')}
                                            //   value={values.city}
                                            errors={errors.city}
                                            
                                        />
                                        
                                       
                                       
                                        <OnitInput
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 15,
                                                color: 'black',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                                backgroundColor: '#fff',
                                                height: 56,
                                                width: '10%',
                                                padding: 20,
                                                marginTop: 0,
                                                marginHorizontal:100
                                            }}

                                            placeholder="Pincode "
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="gray"
                                            returnKeyLabel={'next'}
                                            onChangeText={handleChange('pincode')}
                                            value={values.pincode}
                                            errors={errors.pincode}
                                            keyboardType="number-pad"
                                            maxLength={6}
                                        />
                                    </View>

                                    <View
                                        style={{
                                           
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginLeft: 22,
                                            marginRight: 22,
                                            marginTop: 10,
                                        }}>
                                        <OnitInput
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
                                            placeholderTextColor="gray"
                                            //   returnKeyLabel={'next'}
                                            onChangeText={handleChange('state')}
                                            //   value={values.state}
                                            errors={errors.state}
                                        />
                                        <OnitInput
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
                                            placeholderTextColor="gray"
                                            onChangeText={handleChange('country')}
                                            errors={errors.country}
                                        //   returnKeyLabel={'next'}
                                        //   value={country}
                                        />
                                    </View>
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
                                    {
                                        service?.service_name==="DRIVER (CAR, E-RICKSHAW) - PICKUP AND DROP SERVICE"?
                                        <Text style={{ color: COLORS.BLACK }}>₹20</Text>:
                                        <Text style={{ color: COLORS.BLACK }}>₹99</Text>
                                    }
                                    
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
                                   
                                    {
                                         service?.service_name==="DRIVER (CAR, E-RICKSHAW) - PICKUP AND DROP SERVICE"?
                                         <Text
                                         style={{ fontSize: 16, fontWeight: '600', color: '#00796A' }}>
                                         {'₹'}
                                         {driveramount}
                                     </Text>:
                                      <Text
                                      style={{ fontSize: 16, fontWeight: '600', color: '#00796A' }}>
                                      {'₹'}
                                      {amount}
                                  </Text>
                                    }
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

                                onPress={() => handleSubmit(onsubmit)}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        height: height,
        width: width,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input1: {
        flex: 1,
        fontWeight: '700',
        fontSize: 15,
        color: 'black',
        marginLeft: 15,
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

export default MainService;
