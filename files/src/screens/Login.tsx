import React, { useContext } from 'react';
import { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    Pressable,
    KeyboardAvoidingView,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';
// import { AuthContext } from "../../utils/components/AuthContext";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { API } from '../../utils/components/api';
import { COLORS } from '../../const/constants';
import ActivityLoader from '../../utils/components/ActivityLoader';
import Swiper from 'react-native-swiper';
import { setIsAuthorized, setUserNumber, setUserId } from '../../backend/slice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidateSchema = yup.object().shape({
    mobile: yup
        .string()
        .max(10, 'Phone Number cannot be greater than 10')
        .min(10, 'Phone Number cannot be less than 10')
        .matches(phoneRegex, 'Please Enter a valid Phone Number'),
});

const { width, height } = Dimensions.get('window');

const Login = ({ navigation, route }) => {
    const mobileNumber = route?.params?.mobileNumber;
    const [visible, setVisible] = useState(false);
    const phoneInput = useRef(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });
    const { isAuthorized, userData } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch()
    React.useEffect(() => {
        detectlogin();
    }, []);
    const detectlogin = () => {
        if (isAuthorized) {
            console.log("IS AUTHORISED", isAuthorized)
            navigation.navigate('Homem');
        }
        // else if (userData){
        //   console.log("USERDATA",userData)
        //   dispatch(setIsAuthorized())
        //   dispatch(setUserNumber(userData?.mobile_number))
        //   dispatch(setUserId(userData?._id))
        //   navigation.navigate('Homem');
        // }
        else {
            console.log(isAuthorized);
            ToastAndroid.show('Welcome', ToastAndroid.SHORT);
        }
    };
    const login = async (mobile: any) => {
        setVisible(true);
        let payload = {
            country_code: phoneInput.current?.getCallingCode(),
            mobile_number: mobile,
        };
        console.log(payload);
        try {
            const res = await axios({
                url: API.SENT_OTP,
                method: 'post',
                data: payload,
            });
            const { data, error } = res.data;
            if (data) {
                setVisible(false);
                navigation.navigate('Otp', { data: payload });
                ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
            } else console.log('ERROR', error);
        } catch (error) {
            setVisible(false);
            ToastAndroid.show(
                error?.response?.data?.message + '!',
                ToastAndroid.SHORT,
            );
        }
    };

    const Page1 = () => {
        return (
            <View style={{ flex: 1, marginTop: StatusBar?.currentHeight - 40 }}>
                <ImageBackground
                    source={require('../../assets/image/login.png')}
                    resizeMode="contain"
                    style={{
                        flex: 1,
                        height: height * 0.5,
                    }}
                />

                <View
                    style={{
                        marginBottom: 30,
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            textAlign: 'center',
                            color: 'black',
                        }}>
                        Services and More...
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#636363',
                            marginTop: 7,
                            textAlign: 'center',
                        }}>
                        Your personal assistant.
                    </Text>
                </View>
            </View>
        );
    };

    const Page2 = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.RED_DARK,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../assets/image/login2.png')}
                    resizeMode="cover"
                    // resizeMethod='scale'
                    style={{
                        flex: 1,
                        width: width,
                        marginBottom: -width / 2,
                    }}
                />
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            textAlign: 'center',
                            color: 'black',
                        }}>
                        Services in 2 Steps
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#636363',
                            marginTop: 7,
                            textAlign: 'center',
                        }}>
                        Select & Book
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#636363',
                            marginTop: 4,
                            textAlign: 'center',
                            marginBottom: 2
                        }}>
                        Pay & Rate Us
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Swiper
                loop={true}
                autoplay={true}
                autoplayTimeout={3}
                paginationStyle={{ position: "absolute", bottom: hp('-12%'), marginBottom: hp('1%') }}
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: 12,
                            height: 12,
                            // marginLeft: 3,
                            marginRight: 5,
                            marginTop: 50,
                            marginBottom: 80,
                            borderRadius: 12,
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                width: '80%',
                                height: '80%',
                                margin: '10.9%',
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: 'black',
                            }}></View>
                    </View>
                }
                dot={
                    <View
                        style={{
                            backgroundColor: COLORS.DARK_GREEN,
                            width: 12,
                            height: 12,
                            // marginLeft: 4,
                            marginRight: 5,
                            marginTop: 50,
                            marginBottom: 80,
                            borderRadius: 12,
                        }}
                    />
                }>
                <Page2 />
                <Page1 />
            </Swiper>

            <View
                style={{
                    //flex: 1,
                    paddingTop: 25,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    elevation: 10,
                    borderWidth: 0,
                    borderColor: COLORS.WHITE,
                    height: height * 0.39,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 25,
                    }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '900',
                            color: '#636363',
                            marginRight: 3,
                        }}>
                        Everything
                    </Text>
                    <Text
                        style={{
                            color: COLORS.DARK_GREEN,
                            marginLeft: 3,
                            fontSize: 24,
                            fontWeight: '900',
                        }}>
                        O
                        <Text
                            style={{
                                color: '#636363',
                                marginLeft: 3,
                                fontSize: 24,
                                fontWeight: '900',
                            }}>
                            n
                        </Text>
                        i
                        <Text
                            style={{
                                color: '#636363',
                                marginLeft: 3,
                                fontSize: 24,
                                fontWeight: '900',
                            }}>
                            T
                        </Text>
                    </Text>
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Formik
                        initialValues={{
                            mobile: '',
                        }}
                        enableReinitialize
                        onSubmit={(values: any, action) => {
                            // console.log('VALUES');
                            login(values.mobile);
                        }}
                        validationSchema={ValidateSchema}>
                        {({
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                        }) => {
                            return (
                                <>
                                    <PhoneInput
                                        ref={phoneInput}
                                        value={values.mobile}
                                        defaultCode="IN"
                                        onChangeText={handleChange('mobile')}
                                        withDarkTheme
                                        withShadow
                                        textInputStyle={{
                                            fontSize: 15,
                                            color: 'black',
                                            textAlignVertical: 'center',
                                        }}
                                        containerStyle={{
                                            borderWidth: 1,
                                            borderColor: COLORS.DARK_GREEN,
                                            borderRadius: 4,
                                            width: '90%',
                                            height: "34%",
                                        }}
                                    // textInputProps={onBlur}
                                    />
                                    {errors.mobile && touched.mobile && (
                                        <Text style={styles.errors}>{errors.mobile}</Text>
                                    )}
                                    <TouchableOpacity
                                        disabled={!isValid}
                                        onPress={() => handleSubmit()}
                                        style={{
                                            width: '90%',
                                            backgroundColor: !isValid
                                                ? COLORS.GREY
                                                : COLORS.DARK_GREEN,
                                            justifyContent: 'center',
                                            marginVertical: 8,
                                        }}>
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                alignSelf: 'center',
                                                paddingVertical: 14,
                                            }}>
                                            LogIn
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                alignSelf: 'center',
                                                paddingVertical: 14,
                                            }}>
                                            Don't Have Account ?
                                        </Text>
                                        <TouchableOpacity
                                            // disabled={!isValid}
                                            onPress={() => navigation.navigate('Signup')}
                                            style={{


                                                justifyContent: 'center',
                                                flexDirection: "row"
                                            }}>

                                            <View style={{ justifyContent: "center" }}>
                                                <Text
                                                    style={{
                                                        color: 'green',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center',
                                                        paddingVertical: 14, marginLeft: 4
                                                    }}>
                                                    Sign Up
                                                </Text>
                                            </View>

                                        </TouchableOpacity>
                                    </View>

                                </>
                            );
                        }}
                    </Formik>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Homem')}>
            <Text
              style={{
                color: COLORS.DARK_GREEN,
                fontFamily: 'poppins-regular',
                alignSelf: 'center',
                fontSize: 16,
                marginTop: 10,
                textDecorationLine: 'underline',
                textDecorationColor: COLORS.DARK_GREEN,
                textAlign: 'center',
              }}>
              Skip
            </Text>
          </TouchableOpacity> */}
                </View>
            </View>

            <ActivityLoader visible={visible} setVisible={setVisible} />
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    errors: {
        color: 'red',
        marginTop: 3,
        fontSize: 11,
        // fontFamily: FONT_FAMILY.WHITNEYMEDIUM,
        textAlign: 'center',
    },
});
