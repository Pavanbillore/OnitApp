import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ToastAndroid,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

const ReferScreen = ({ navigation }) => {
  const [mainData, setMainData] = useState([]);
  const { isAuthorized, userData, userNumber } = useSelector(
    (state: any) => state.auth,
  );
  console.log('Mobile-Number', userNumber);
  console.log(userData?.referral_code);

  const dataStore = async () => {
    const res = await fetch(
      `https://api.onit.fit/consumerAppAppRoute/referralDetails/${userNumber}/${userData?.referral_code}`
    );
    const jsonData = await res.json();
    console.log('JSON_DATA', jsonData);
    setMainData(jsonData);
  };
  console.log(
    'mainData',
    mainData?.data?.referralData[0]?.referral_to,
  );

  const sendMessage = () => {
    const phoneNumber = userNumber; // replace with the recipient's phone number
    const msgCode = userData?.referral_code;
    const message = `Earn 49 bonus using my code ${msgCode} ONIT. Manage your helpers, records and transaction on single tap and get many more exiting offers. Download ONIT from Playstore free :  https://play.google.com/store/apps/details?id=com.onit.consumer`;
    // replace with your message

    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

    Linking.openURL(url)
      .then(() => console.log('Message sent'))
      .catch((err) => console.error('An error occurred: ', err));
  };

  const copyToClipboard = () => {
    Clipboard.setString(userData?.referral_code);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  useEffect(() => {
    dataStore();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#00796A' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyAccount')}>
                <Ionicons name="chevron-back-circle" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/image/bank.png')}
                style={{ height: 100, width: '30%' }}
              />
            </View>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              <Text style={styles.text}>Invite your freind's to</Text>
              <Text style={styles.text}>Onit & earn ₹ 49 for</Text>
              <Text style={styles.text}>every referral</Text>
            </View>

            <View
              style={{
                marginTop: 50,
                height: 200,
                backgroundColor: 'white',
                margin: 20,
                borderRadius: 20,
                padding: 15,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black' }}>How it work</Text>
                {/* <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                        <Ionicons name="chevron-back-circle" size={30} color="white" />
                        </View> */}
              </View>

              <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <View style={{ flexGrow: 1 }}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      backgroundColor: '#D7DBDD',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}>
                    <Image
                      source={require('../../assets/image/user.png')}
                      style={{ height: 30, width: 30 }}
                    />
                  </View>

                  <Text style={styles.text1}>Share the</Text>
                  <Text style={styles.text1}>referral code</Text>
                  <Text style={styles.text1}>with friends</Text>
                </View>
                <View style={{ alignItems: 'center', flexGrow: 1 }}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      backgroundColor: '#D7DBDD',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}>
                    <Image
                      source={require('../../assets/image/rupee.png')}
                      style={{ height: 30, width: 30 }}
                    />
                  </View>
                  <Text style={styles.text1}>Your freind joins</Text>
                  <Text style={styles.text1}>Onit & add ₹49</Text>
                  <Text style={styles.text1}>to their account</Text>
                </View>

                <View style={{ alignItems: 'flex-end', flexGrow: 1 }}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      backgroundColor: '#D7DBDD',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}>
                    <Image
                      source={require('../../assets/image/gift.png')}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text style={styles.text1}>Share the</Text>
                  <Text style={styles.text1}>referral code</Text>
                  <Text style={styles.text1}>with friends</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: 50,
                marginHorizontal: 20,
                borderRadius: 20,
                padding: 15,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {/* <Image source={require('../images/mail.png')} style={{ height: 20, width: 20 }} /> */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 6,
                }}>
                Your Referral
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: 50,
                marginHorizontal: 20,
                borderRadius: 20,
                padding: 15,
                marginTop: 10,
              }}>
              <Text style={{ color: 'black' }}>
                Your Total Wallet balance Earned is{'  '}
                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 15 }}>
                  ₹{
                    mainData?.data?.totalWalletBalance[0]
                      ?.total_wallet_balance_earned
                  }
                </Text>
              </Text>
            </View>

            {/* <View style={{ backgroundColor: "white", marginHorizontal: 20, marginTop: 17, borderRadius: 10, }}>
                           
                            <View style={{}}>
                                {
                                    orderDetailsList?.referralData[0]?.referral_to.map((item, index) => {

                                        return (
                                            <>
                                                <View style={{ flexDirection: "row",padding:10 }}>
                                                    <Text key={index} style={{ color: "black", fontSize: 17 }}>{item}</Text>
                                                    <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                                                        <Text style={{ color: "green" }}>₹49</Text>
                                                        <Text style={{ fontSize: 12, color: "#B2BABB" }}>Earned</Text>
                                                    </View>
                                                </View>
                                            </>

                                        )
                                    })
                                }
                            </View>

                        </View> */}


            {mainData?.data?.referralData[0]?.referral_to.map((item) => (
              <View
                style={{
                  backgroundColor: 'white',
                  height: 50,

                  marginHorizontal: 20,
                  borderRadius: 12,
                  padding: 10,
                  marginTop: 10,
                }}>
                <Text style={{ fontWeight: "bold", color: 'black' }}>{item}{'                                                                   '}<Text style={{ color: 'green' }}>₹49</Text></Text>
                <Text>{'                                                                                       '}Earned</Text>
              </View>
            ))}

          </ScrollView>
        </View>

        <View
          style={{
            height: 100,
            backgroundColor: '#212F3D',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 4,
            marginBottom: 0
          }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 17 }}> Referral Code:</Text>
            <Text style={{ color: '#229954', fontSize: 17 }}>
              {userData?.referral_code}
            </Text>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Image source={require('../../assets/image/copy.png')} style={{ height: 20, width: 25, tintColor: '#229954' }} />
          </TouchableOpacity>
          <View
            style={{
              flexGrow: 1,
              alignItems: 'flex-end',
              paddingHorizontal: 14,
            }}>
            <TouchableOpacity onPress={() => sendMessage()}>
              <Image source={require('../../assets/image/whatsapp.png')} style={{ height: 35, width: 35, }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{height:50,justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
                    <Image source={require('../images/whatsapp.png')} style={{height:25,width:30,}}/>
                </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ReferScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  text1: {
    fontSize: 12,
    color: 'black',
  },
});
