import React, {useState, useRef, Component} from 'react';
import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Image,
  TextInput,
  ImageRequireSource,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  ScrollView,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
const {width, height} = Dimensions.get('window');
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
// import LocationDetail from '../../utils/components/LocationDetail';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../backend/slice';
import {COLORS} from '../../const/constants';
import Icon from '../../utils/components/Icon';

const AcService = ({navigation}) => {
  const styleTypes = ['dark-content'];
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);
  const [width, setWidth] = useState();

  const [text, setText] = useState();
  const [alternate, setAlternate] = useState();
  const [houseno, setHouseno] = useState();
  const [local, setLocality] = useState();
  const [cit, setCity] = useState();
  const [pincod, setPincode] = useState();
  const [stat, setStat] = useState();
  // const [contry, setCountry] = useState();
  const [naam, setName] = useState();

  const [selectedValue, setSelectedValue] = useState('');

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const {
    userInfo,
    city,
    country,
    district,
    name,
    region,
    street,
    streetNumber,
    phoneNumber,
    subRegion,
  } = useSelector((state: any) => state.auth);

  const onsubmit = async () => {
    setVisible(true);
    let specific_requirement = text;
    let mobile_number = phoneNumber;
    let house_number = houseno;
    let locality = local;
    let city = cit;
    let state = stat;
    let pincode = pincod;
    // let country = contry;
    let name = naam;
    let time_preference_type = selectedValue;

    let payload = {
      personal_details: {
        primary_phone: {
          country_code: '+91',
          mobile_number: phoneNumber,
        },
        alternate_phone: {
          country_code: '+91',
          mobile_number: phoneNumber,
        },
        name: naam,
      },
      specific_requirement: specific_requirement,
      service_provided_for: '637b7a0e7c7cd9e139b39d1e',
      address_details: {
        house_number: houseno,
        locality: district,
        city: city,
        state: region,
        pincode: pincode,
        country: country,
      },
      time_preference: {
        time_preference_type: 'WITHIN_24_HOURS',
        specific_date_time: '2022-11-18T09:42:47.361Z',
      },
      offers_applied: {
        offer_code: 'OniT 2022',
      },
    };

    console.log(payload);
    try {
      const res = await axios({
        method: 'post',
        url: 'https://api.onit.services/center/public-ticket-booking',
        data: payload,
        // config: {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
      });
      const {data, error} = res.data;
      if (data) {
        setVisible(false);
        ToastAndroid.show('Request Raised', ToastAndroid.SHORT);
        navigation.navigate('SuccessFull', {data: payload});
      } else if (error) {
        console.log('ERROR', error);
      }
    } catch (error) {
      setVisible(false);
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
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

      <View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            marginTop: 15,
            fontWeight: '600',
          }}>
          Please fill the details:
        </Text>
      </View>

      {/* for Details section */}

      <View style={{height: 220, marginTop: 10}}>
        {/* For name */}
        <ScrollView>
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: '700',
                fontSize: 15,
                color: 'black',
                marginLeft: 15,
              }}
              underlineColorAndroid="transparent"
              placeholder="Specific Requirementddd "
              onChangeText={newText => setText(newText)}
              defaultValue={text}
              placeholderTextColor="red"
            />
          </View>

          {/* for visit schedule */}
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
              style={{height: 60, width: 250, fontWeight: '600'}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Immediately" value="Immediately" />
              <Picker.Item label="Within 24 Hours" value="Within 24 Hours" />
              <Picker.Item
                label="Specific Date & time"
                value="Specific Date & time"
              />
            </Picker>
          </View>
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: '700',
                fontSize: 15,
                color: 'black',
                marginLeft: 15,
              }}
              underlineColorAndroid="transparent"
              placeholder="Name (contact person) "
              onChangeText={newText => setName(newText)}
              defaultValue={naam}
              placeholderTextColor="#737373"
            />
          </View>

          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: '700',
                fontSize: 15,
                color: 'black',
                marginLeft: 15,
              }}
              placeholder="Alternate Mobile no "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={'next'}
              onChangeText={newText => setAlternate(newText)}
              defaultValue={phoneNumber}
              keyboardType="number-pad"
              maxLength={10}
            />
            <Icon
              family="MaterialCommunityIcons"
              name="pencil-outline"
              size={20}
              color={'black'}
            />
          </View>
          {/* House no */}
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: '700',
                fontSize: 15,
                color: 'black',
                marginLeft: 15,
              }}
              placeholder="House no "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={'next'}
              onChangeText={newText => setHouseno(newText)}
              defaultValue={houseno}
            />
          </View>
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              placeholder="Enter your Drop Location "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setLocality(newText)}
              defaultValue={local}
            />
          </View>
          {/* City & pin code */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 0,
              }}
              placeholder="City "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setCity(newText)}
              defaultValue={cit}
            />
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 0,
              }}
              placeholder="Pincode "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setPincode(newText)}
              defaultValue={pincod}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View> */}

          {/* State & Country */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 10,
              }}
              placeholder="State "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setStat(newText)}
              defaultValue={stat}
            />
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 10,
              }}
              placeholder="Country "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              defaultValue="India"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setCountry(newText)}
              defaultValue={contry}
            />
          </View> */}
        </ScrollView>
      </View>

      {/* for coupon */}
      <View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            marginTop: 15,
            fontWeight: '600',
          }}>
          Offer Code
        </Text>
        <View style={styles.couponStyle}>
          <Image
            source={require('../../assets/logo/tag.png')}
            style={{height: 30, width: 25, marginLeft: 10}}
          />
          <TextInput
            style={{
              flex: 0.87,
              fontWeight: '700',
              fontSize: 18,
              color: 'black',
              marginLeft: 35,
            }}
            placeholder="Offer Code"
            underlineColorAndroid="transparent"
            //placeholderTextColor=""
          />
          {/* <Text style={{ color: "#0066FF" }}>change</Text> */}
        </View>
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
          <Text>ADVANCE</Text>
          <Text>₹25</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            margin: 10,
          }}>
          <Text>Service Total</Text>
          <Text>₹0</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            margin: 10,
          }}>
          <Text>Total</Text>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#00796A'}}>
            ₹25
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          width: '95%',
          backgroundColor: '#00796A',
          height: 50,
          marginTop: 30,
          marginLeft: 10,
          borderRadius: 3,
        }}
        //</View>onPress={() => { console.log("coming soon") }}>
        // onPress={() => {
        //   navigation.navigate("SuccessFull");
        // }}

        onPress={onsubmit}>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 18,
            letterSpacing: 1,
            textAlign: 'center',
            position: 'relative',
            color: '#fff',
          }}>
          Confirm ikoj
        </Text>
      </TouchableOpacity>

      <StatusBar backgroundColor="#fff" barStyle={styleStatusBar} />
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
  sectionStyle: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 65,
    marginLeft: 0,
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
    marginBottom: 10,
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
    margin: 22,
    marginTop: 9,
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
    marginTop: 24,
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

export default AcService;
