import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../backend/slice';
import { API } from '../utils/components/api';
import ActivityLoader from '../utils/components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Otp = ({ navigation, route }) => {
  const {
    accessToken,
    isAuthorized,
    userData,
    profileImageUrl,
    userId,
    userNumber,
  } = useSelector(state => state.auth);
  //console.log(accessToken)
  const data = route?.params?.data;
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [visible, setVisible] = useState(false);
  const [_otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(99);
  // ?console.log("This", accessToken)
  //console.log("This", userData?.userDetails?.document_details?.aadhar_number)
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [device_id, setDeviceID] = useState();

  const resendOTP = async () => {
    setVisible(true);
    console.log(data);
    try {
      await axios({
        method: 'post',
        url: API.SENT_OTP,
        data: data,
        // config: {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }
        // }
      }).then(() => {
        setVisible(false);
        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
        //navigation.navigate('SignInOtp', { data: payload })
        setOtp({ 1: '', 2: '', 3: '', 4: '' });
        setCounter(99);
      });
    } catch (error) {
      setVisible(false);
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    console.log('DATA', data);
    // setUserDetails()
  }, []);
  // const setUserDetails = async (data: any) => {
  const setUserDetails = async () => {
    const otp: any = _otp[1] + _otp[2] + _otp[3] + _otp[4];
    const payload = { ...data, otp: parseInt(otp) };
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
              res?.data?.data?.consumerDetails?.personal_details?.phone
                ?.mobile_number,
            ),
          );
          console.log(isAuthorized);
          AsyncStorage.setItem(
            'userNumber',
            res?.data?.data?.consumerDetails?.personal_details?.phone
              ?.mobile_number,
          );
          console.log('UserNumber', userNumber);
          dispatch(
            setProfileImageUrl(res?.data?.data?.consumerDetails?.avatar),
          );
          dispatch(login(accessToken));
          dispatch(setIsAuthorized());
          setVisible(false);
          ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
          navigation.navigate('Homem');
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
        dispatch(setUserNumber(payload.mobile_number));
        dispatch(setIsAuthorized());
        AsyncStorage.setItem('userNumber', payload.mobile);
        setVisible(false);
        ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
        navigation.navigate('ServiceNeeds');
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.log('ERR', err?.response?.data);
      // if (
      //   err?.response?.data?.message ==
      //   `Consumer doesn't exists with this phone number`
      // ) {
      //   // const payload = {...data, otp};
      //   console.log(payload);
      //   try {
      //     await axios({
      //       method: 'post',
      //       url: API.VERIFY_OTP,
      //       data: payload,
      //     }).then(res => {
      //       setVisible(false);
      //       ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
      //       console.log('User Details--->', res.data?.data);
      //       if (res.data?.data?.verified) {
      //         console.log('Verified', res.data?.data?.verified);
      //         ToastAndroid.show(
      //           'User does not Exist Please Register',
      //           ToastAndroid.SHORT,
      //         );
      //         navigation.navigate('Signup', {mobile: data?.mobile_number});
      //       } else {
      //         console.log('Verified_ERRR', res.data?.data?.verified);
      //       }
      //     });
      //   } catch (error) {
      //     setVisible(false);
      //     console.log(error);
      //     ToastAndroid.show(
      //       error?.response?.data?.message + '!',
      //       ToastAndroid.SHORT,
      //     );
      //   }
      // } else {
      // }
    }
  };

  const confirmOtp = async () => {
    setVisible(true);
    const otp = _otp[1] + _otp[2] + _otp[3] + _otp[4];
    const payload = { ...data, otp };
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
          setUserDetails();
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.content}>
        We have sent you 4 digit verification code on {''}
        {/* <Text style={styles.phoneNumberText}>{number}</Text> */}
      </Text>
      <Text style={styles.fornumber}>
        {'+' + data?.country_code + ' ' + data?.mobile_number}
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={true}
            ref={firstInput}
            // onKeyPress={() => secondInput.current.focus()}
            secureTextEntry
            onChangeText={text => {
              setOtp({ ..._otp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            // onKeyPress={({nativeEvent: {key: BackSpace}}) => firstInput.current.focus()}
            secureTextEntry
            onChangeText={text => {
              setOtp({ ..._otp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            // onKeyPress={() => fourthInput.current.focus()}
            secureTextEntry
            onChangeText={text => {
              setOtp({ ..._otp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            // onKeyPress={({nativeEvent: {key: Enter} }) => {confirmOtp()}}
            secureTextEntry
            onChangeText={text => {
              setOtp({ ..._otp, 4: text });
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <View style={{ height: 10 }}></View>
      <View style={styles.btnsize}>
        <TouchableOpacity
          style={{
            backgroundColor:
              _otp[1] === '' ||
                _otp[2] === '' ||
                _otp[3] === '' ||
                _otp[4] === ''
                ? 'grey'
                : '#00796A',
          }}
          disabled={
            _otp[1] === '' || _otp[2] === '' || _otp[3] === '' || _otp[4] === ''
          }
          //onPress={() => dispatch(login())}
          onPress={() => setUserDetails()}>
          <Text style={styles.submit}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}></View>
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
          style={{ flexDirection: 'row' }}
          disabled={counter !== 0}>
          <Text
            style={[
              styles.resend,
              { color: counter !== 0 ? 'grey' : '#00796A' },
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
      <ActivityLoader visible={visible} setVisible={setVisible} />
    </SafeAreaView>
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
    marginTop: 100,
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
    borderBottomWidth: 2,
    borderColor: '#20C944',
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

export default Otp;
