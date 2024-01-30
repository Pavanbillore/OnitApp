import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {API} from '../../utils/components/api';
import {COLORS} from '../../const/constants';
import ActivityLoader from '../../utils/components/ActivityLoader';
import Swiper from 'react-native-swiper';
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
} from '../../backend/slice';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidateSchema = yup.object().shape({
  mobile: yup
    .string()
    .max(10, 'Phone Number cannot be greater than 10')
    .min(10, 'Phone Number cannot be less than 10')
    .matches(phoneRegex, 'Please Enter a valid Phone Number'),
});

const {width, height} = Dimensions.get('screen');

const LateLogin = (props: any) => {
  //   const [loginModal, setLoginModal] = useState(false);
  const {loginModal, setLoginModal} = props;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [loginClicked, setLoginClicked] = useState(true);
  const [afterLogin, setAfterLogin] = useState(false);
  const [_otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const [counter, setCounter] = useState(99);

  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const {isAuthorized, userData, accessToken, userNumber, userId} = useSelector(
    (state: any) => state.auth,
  );
  // ?console.log("This", accessToken)
  //console.log("This", userData?.userDetails?.document_details?.aadhar_number)
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [device_id, setDeviceID] = useState();

  useEffect(() => {
    console.log('DATA', mobile);
    // phoneInput.current?.focus();
  }, []);

  const resendOTP = async () => {
    setVisible(true);
    setCountryCode('+' + phoneInput.current?.getCallingCode());
    let payload = {
      country_code: '+' + phoneInput.current?.getCallingCode(),
      mobile_number: mobile,
    };
    console.log(payload);
    try {
      await axios({
        method: 'post',
        url: API.SENT_OTP,
        data: payload,
        // config: {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }
        // }
      }).then(() => {
        setVisible(false);
        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
        setLoginClicked(false);
        setAfterLogin(true)
        setOtp({1: '', 2: '', 3: '', 4: ''});
        setCounter(99);
        setUserDetails()
      });
    } catch (error) {
      setVisible(false);
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
  };

  const setUserDetails = async () => {
    const otp: any = _otp[1] + _otp[2] + _otp[3] + _otp[4];
    let data = {
      country_code: '+' + phoneInput.current?.getCallingCode(),
      mobile_number: mobile,
    };
    const payload = {...data, otp: parseInt(otp)};
    try {
      // let payload = {
      //   country_code: data.country_code,
      //   mobile_number: data.mobile_number.toString(),
      //   otp: data.otp,
      // };
      console.log(payload);
      const res = await axios({
        method: 'post',
        url: API.LOGIN_WITH_OTP,
        // url: 'https://api.onit.serv/consumerAppAppRoute/login-with-otp',
        data: payload,
        // headers: {
        //   'Content-Type': 'application/json',
        //   'x-access-token': _accessToken
        // },
      });
      if (res) {
        console.log('UserDATAS', res.data?.data);
        // setTimeout(() => {
        if (res?.data?.data?.token) {
          dispatch(setUserData(res?.data?.data?.consumerDetails));
          dispatch(setUserId(res?.data?.data?.consumerDetails?._id));
          dispatch(
            setCurrentAddress(
              res.data?.data?.consumerDetails?.address_details_permanent?.city +
                ', ' +
                res.data?.data?.consumerDetails?.address_details_permanent
                  ?.state,
            ),
          );
          dispatch(
            setPincodeRedux(
              res.data?.data?.consumerDetails?.address_details_permanent
                ?.pincode,
            ),
          );
          dispatch(
            setCityRedux(
              res.data?.data?.consumerDetails?.address_details_permanent
                ?.pincode,
            ),
          );
          dispatch(
            setRegion(
              res.data?.data?.consumerDetails?.address_details_permanent
                ?.pincode,
            ),
          );
          dispatch(
            setCountryRedux(
              res.data?.data?.consumerDetails?.address_details_permanent
                ?.pincode,
            ),
          );
          console.log('User Data---->', userData);
          console.log('User ID---->', userId);
          dispatch(setAccessToken(res?.data?.data?.token));
          dispatch(
            setUserNumber(
              res?.data?.data?.consumerDetails?.personal_details?.phone?.mobile_number,
            ),
          );
          console.log(isAuthorized);
          console.log('UserNumber', userNumber);
          dispatch(
            setProfileImageUrl(res?.data?.data?.consumerDetails?.avatar),
          );
          dispatch(login(accessToken));
          dispatch(setIsAuthorized());
          setVisible(false);
          ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
          navigation.navigate('ServiceNeeds');
          // dispatch(login());
        } else {
          setVisible(false);
          // navigation.navigate("CompleteProfile")
          //console.log("err",userData)
        }
        // }, 1500);
      } else {
        console.log('RESS', res);
      }
    } catch (err) {
      setVisible(false);
      if (
        err?.response?.data?.message ==
        `Consumer doesn't exists with this phone number`
      ) {
        // const payload = {...data, otp};
        console.log(payload);
        try {
          await axios({
            method: 'post',
            url: API.VERIFY_OTP,
            data: payload,
          }).then(res => {
            setVisible(false);
            ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
            console.log('User Details--->', res.data?.data);
            if (res.data?.data?.verified) {
              console.log('Verified', res.data?.data?.verified);
              ToastAndroid.show(
                'User does not Exist Please Register',
                ToastAndroid.SHORT,
              );
              navigation.navigate('Signup', {mobile: data?.mobile_number});
            } else {
              console.log('Verified_ERRR', res.data?.data?.verified);
            }
          });
        } catch (error) {
          setVisible(false);
          console.log(error);
          ToastAndroid.show(
            error?.response?.data?.message + '!',
            ToastAndroid.SHORT,
          );
        }
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        console.log('ERR', err?.response?.data);
      }
    }
  };

  const confirmOtp = async () => {
    setVisible(true);
    const otp = _otp[1] + _otp[2] + _otp[3] + _otp[4];
    let data = {
      country_code: countryCode,
      mobile_number: mobile,
    };
    const payload = {...data, otp};
    console.log(payload);
    try {
      await axios({
        method: 'post',
        url: API.VERIFY_OTP,
        data: payload,
      }).then(res => {
        setVisible(false);
        ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
        dispatch(setAccessToken(res?.data?.data?.token));
        console.log('User Details--->', res?.data);
        dispatch(setUserData(res?.data?.data));
        dispatch(setUserId(res?.data?.data?._id));
        dispatch(setUserNumber(res?.data?.data?.mobile_number.toString()));
        dispatch(login(accessToken));
        dispatch(setIsAuthorized());
        console.log(isAuthorized);
        console.log('UserNumber', userNumber);
        setLoginModal(false);
        // navigation.navigate('Homem')
      });
    } catch (error) {
      setVisible(false);
      console.log(error);
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <Modal
      visible={loginModal}
      onRequestClose={() => setLoginModal(!loginModal)}
      animationType="slide"
      transparent>
      <View
        style={{
          flex: 1,
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.MODAL_BACKGROUND,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            height: height * 0.7,
            width: width * 0.9,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
          }}>
          <Text
            style={{
              color: COLORS.DARK_GREEN,
              fontFamily: 'poppins',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              paddingVertical: 15,
            }}>
            LOGIN
          </Text>
          <Formik
            initialValues={{
              mobile: '',
            }}
            enableReinitialize
            onSubmit={(values: any, action) => {
              setMobile(values.mobile);
              console.log('VALUES', mobile);
              resendOTP();
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
                      textAlignVertical: 'bottom',
                    }}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: COLORS.DARK_GREEN,
                      borderRadius: 4,
                      //   width: '90%',
                      height: 70,
                    }}
                    textInputProps={{
                      maxLength: 12,
                      focusable: true,
                      editable: loginClicked
                    }}
                  />
                  {errors.mobile && touched.mobile && (
                    <Text style={styles.errors}>{errors.mobile}</Text>
                  )}
                  <TouchableOpacity
                    disabled={!isValid && !loginClicked}
                    onPress={() => handleSubmit()}
                    style={{
                      width: '70%',
                      backgroundColor:
                        !isValid && !loginClicked
                          ? COLORS.GREY
                          : COLORS.DARK_GREEN,
                      justifyContent: 'center',
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        paddingVertical: 10,
                      }}>
                      LogIn
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
          <Text style={styles.title}>Enter verification code</Text>
          <Text style={styles.content}>
            We have sent you 4 digit verification code on {''}
            {/* <Text style={styles.phoneNumberText}>{number}</Text> */}
          </Text>
          <Text style={styles.fornumber}>
            {mobile ? countryCode + ' ' + mobile : ''}
          </Text>
          <View style={styles.otpContainer}>
            <View style={[styles.otpBox, {borderColor:  afterLogin ? COLORS.DARK_GREEN : COLORS.GREY}]}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={true}
                ref={firstInput}
                // onKeyPress={() => secondInput.current.focus()}
                secureTextEntry
                editable={afterLogin}
                onChangeText={text => {
                  setOtp({..._otp, 1: text});
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={[styles.otpBox, {borderColor:  afterLogin ? COLORS.DARK_GREEN : COLORS.GREY}]}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                // onKeyPress={({nativeEvent: {key: BackSpace}}) => firstInput.current.focus()}
                secureTextEntry
                editable={afterLogin}
                onChangeText={text => {
                  setOtp({..._otp, 2: text});
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={[styles.otpBox, {borderColor:  afterLogin ? COLORS.DARK_GREEN : COLORS.GREY}]}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                // onKeyPress={() => fourthInput.current.focus()}
                secureTextEntry
                editable={afterLogin}
                onChangeText={text => {
                  setOtp({..._otp, 3: text});
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={[styles.otpBox, {borderColor:  afterLogin ? COLORS.DARK_GREEN : COLORS.GREY}]}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                editable={afterLogin}
                // onKeyPress={({nativeEvent: {key: Enter} }) => {confirmOtp()}}
                secureTextEntry
                onChangeText={text => {
                  setOtp({..._otp, 4: text});
                  !text && thirdInput.current.focus();
                }}
              />
            </View>
          </View>
          <View style={{height: 10}}></View>
          <View style={styles.btnsize}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  _otp[1] === '' ||
                  _otp[2] === '' ||
                  _otp[3] === '' ||
                  _otp[4] === '' ||
                  !afterLogin
                    ? 'grey'
                    : '#00796A',
              }}
              disabled={
                _otp[1] === '' ||
                _otp[2] === '' ||
                _otp[3] === '' ||
                _otp[4] === '' ||
                !afterLogin
              }
              //onPress={() => dispatch(login())}
              onPress={() => setUserDetails()}>
              <Text style={styles.submit}>Continue</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 20}}></View>
          {afterLogin && (
            <View
              style={{
                width: '38%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => resendOTP()}
                //onPress={() => dispatch(login())}
                style={{flexDirection: 'row'}}
                disabled={counter !== 0}>
                <Text
                  style={[
                    styles.resend,
                    {color: counter !== 0 ? 'grey' : '#00796A'},
                  ]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  color: counter === 0 ? 'grey' : '#00796A',
                  fontSize: 14,
                }}>
                {' '}
                {counter ? counter + 's' : ''}
              </Text>
            </View>
          )}
        </View>
      </View>
      <ActivityLoader visible={visible} setVisible={setVisible} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  content: {
    fontSize: 15,
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    marginBottom: 5,
  },
  fornumber: {
    color: '#000',
    fontFamily: 'poppins-semibold',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20,
  },

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderBottomWidth: 1,
    borderColor: '#20C944',
    marginHorizontal: 5,
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontFamily: 'poppins-medium',
  },
  btnsize: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#00796A',
    justifyContent: 'center',
    borderRadius: 2,
    alignSelf: 'center',
  },
  submit: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 14,
    fontFamily: 'poppins-semibold',
  },
  resend: {
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    color: '#00796A',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#00796A',
  },
});
export default LateLogin;
