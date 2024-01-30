import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ImageRequireSource,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ToastAndroid,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../const/constants';
import {RAZOR_PAY_KEY} from '../../utils/components/api';
import Icon from '../../utils/components/Icon';
import {setActiveBookings} from '../../backend/slice';
import { SafeAreaView } from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');

const SuccessFull = ({navigation, route}) => {
  const {data, paymentSuccess, amount, serviceName} = route.params;
  const {allServices} = useSelector((state: any) => state.auth);
  const [isPayment, setIsPayment] = useState(false);
  const [paymentAttempted, setPaymentAttempted] = useState(false);
  const [serviceBooked, setServiceBoooked] = useState([]);
  let active: any = [];
  //razorpay
  const dispatch = useDispatch();
  useEffect(() => {
    // setIsPayment(data?.data?.is_paid_by_public)
    setIsPayment(true);
    console.log(
      'PAYMENT_CHECK',
      setServiceBoooked(
        allServices.filter((item: any) => {
          return item._id === data?.data?.resData?.service_provided_for;
        }),
      ),
    );
    console.log(
      'PAYMENT',
      data?.data?.resData?.time_preference?.specific_date_time,
    );
    active.push(data.data);
    // serviceBooked && active.push(serviceBooked);
    console.log('Ac', active);
  }, []);

  const makePayment = async () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: RAZOR_PAY_KEY, // Your api key
      amount: amount,
      name: data?.data?.resData?.personal_details?.name,
      prefill: {
        email: '',
        contact: data?.data?.resData?.personal_details?.mobile_number,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        console.log(`Success: ${data.razorpay_payment_id}`);
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        // navigation.navigate('SuccessFull', {data: payload, razorPayData: data, paymentSuccess: true});
      })
      .catch((error: any) => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
        // navigation.navigate('SuccessFull', {data: payload, razorPayData: '', paymentSuccess: false});
      });
  };
  // razor pay code end

  return (
    <SafeAreaView
      style={{
        // flex: 1,
        backgroundColor: '#F8F8F8',
        height: height,
        width: width,
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          height: 230,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#DBEAE8',
        }}>
        {(paymentAttempted || isPayment) && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {isPayment ? (
              <Image
                source={require('../../assets/image/paySuccess.gif')}
                style={{width: 100, height: 100}}
              />
            ) : (
              <Image
                source={require('../../assets/image/payFail.gif')}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
        )}

        <Text
          style={{
            marginLeft: 60,
            marginRight: 20,
            fontWeight: '600',
            fontSize: 17,
            marginTop: 30,
            textAlign: 'center',
            color: COLORS.BLACK,
          }}>
          Your booking request is in progress.{'\n'}A verfied technician will be
          assigned {'\n'}to you soon.
        </Text>
      </View>
      <Text
        style={{
          padding: 20,
          fontSize: 16,
          fontWeight: '600',
        }}>
        {isPayment ? 'Request Booked:' : 'Request Failed'}
      </Text>

      {/* For booked ticket */}
      <View
        style={{
          height: height * 0.25,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: 35,
            marginTop: 10,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Image
            source={require('../../assets/logo/ac.png')}
            style={{
              height: 25,
              width: 25,
              alignItems: 'center',
              marginLeft: 15,
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: '500',
              fontSize: 17,
              color: 'black',
              marginLeft: 20,
            }}>
            {serviceBooked[0]?.service_name.split('-')[0] || 'NULL'}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: 15,
            color: COLORS.BLACK,
            opacity: 0.7,
            fontWeight: 'bold',
          }}>
          Booking Id: {data?.data?.resData?.ticket_id}
        </Text>

        <View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
              borderRadius: 5,
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="date-range"
                family={'MaterialIcons'}
                color={COLORS.LIGHT_BORDER}
                size={16}
              />
              <Text
                style={{
                  color: COLORS.BLACK2,
                  // fontSize: 12,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {moment(
                  data?.data?.resData?.time_preference?.specific_date_time,
                ).format('LL')}
              </Text>
            </View>

            {isPayment ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookingDetails', {
                    ticketData: data,
                    service: serviceBooked,
                  })
                }>
                <View
                  style={{
                    height: 30,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0066FF',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    View Details
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              // marginLeft: 30,
              // marginRight: 20,
              // marginTop: 10,
              paddingHorizontal: 10,
            }}>
            {paymentAttempted ||
              (isPayment && (
                <View
                  style={{
                    height: 30,
                    backgroundColor: isPayment ? 'green' : 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    {isPayment ? 'Payment Accepted' : 'Payment Failed'}
                  </Text>
                </View>
              ))}
            {isPayment ? (
              <TouchableOpacity>
                <View
                  style={{
                    height: 30,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0066FF',
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    Re-Schedule
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={makePayment}>
                <View
                  style={{
                    height: 30,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    Payment Due
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* for Another service */}
      <TouchableOpacity onPress={() => navigation.navigate('ServiceNeeds')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 50,
            marginTop: 16,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Image
            source={require('../../assets/logo/plus.png')}
            style={{
              height: 25,
              width: 25,
              alignItems: 'center',
              marginLeft: 5,
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: '400',
              fontSize: 16,
              color: 'black',
              marginLeft: 20,
            }}>
            Add Another Service
          </Text>
          <Image
            source={require('../../assets/logo/nxt.png')}
            style={{
              height: 25,
              width: 25,
              alignItems: 'center',
              marginLeft: 5,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* for Need Help */}
      <TouchableOpacity
        onPress={() => Linking.openURL('mailto:support@example.com')}
        title="support@example.com">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 50,
            marginTop: 16,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Image
            source={require('../../assets/logo/qes.png')}
            style={{
              height: 35,
              width: 35,
              alignItems: 'center',
              marginLeft: 2,
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: '400',
              fontSize: 16,
              color: 'black',
              marginLeft: 16,
            }}>
            I Need Help
          </Text>
          <Image
            source={require('../../assets/logo/nxt.png')}
            style={{
              height: 25,
              width: 25,
              alignItems: 'center',
              marginLeft: 5,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* for Refer Earning */}
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 50,
            marginTop: 15,
            //marginLeft: 20,
            //marginRight: 20,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Image
            source={require('../../assets/logo/refer.png')}
            style={{
              height: 22,
              width: 22,
              alignItems: 'center',
              marginLeft: 5,
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: '400',
              fontSize: 16,
              color: 'black',
              marginLeft: 20,
            }}>
            Refer Earning
          </Text>
          <Image
            source={require('../../assets/logo/nxt.png')}
            style={{
              height: 25,
              width: 25,
              alignItems: 'center',
              marginLeft: 5,
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          width: '95%',
          backgroundColor: '#00796A',
          height: 50,
          marginTop: 10,
          marginLeft: 10,
          borderRadius: 3,
        }}
        onPress={() => navigation.navigate('ServiceNeeds')}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 18,
            letterSpacing: 1,
            textAlign: 'center',
            position: 'relative',
            color: '#fff',
          }}>
          Go to HomePage
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessFull;
