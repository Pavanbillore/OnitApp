import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  ToastAndroid,

} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { enableLatestRenderer } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCityRedux,
  setCountryRedux,
  setCurrentAddress,
  setPincodeRedux,
  setRegion,
  updateLatitude,
  updateLongitude,
} from '../../backend/slice';
import { COLORS } from '../../const/constants';
import Icon from './Icon';
import LocationDetail from './LocationDetail';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');

const Header = (color?: any) => {

  const [text, onChangeText] = useState('');
  const [visible, setVisible] = useState(false);
  const [pincode, setPincode] = useState('');
  const [refresh, setRefresh] = useState(false);
  // const [state, setState] = useState('');
  const { cityRedux, region, latitude, currentAddress, longitude, city, district, userData } = useSelector(
    (region: any) => region.auth,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    enableLatestRenderer();
    if (!latitude) {
      CheckIfLocationEnabled();
    }
    if (!currentAddress) {
      GetCurrentLocation();
    }
    // console.log(longitude + ' and ' + latitude);
    //console.log('currentAddress', currentAddress);
  }, [refresh]);
  useEffect(() => {
    if (!cityRedux) {
      Geocode();
    }
  }, [refresh]);
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
          // console.log(position);
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
      // console.log('CERROR', error);
    }
  };
  const Geocode = async () => {
    // console.log("cityRedux->", cityRedux);

    // console.log('CITY', cityRedux + 'RED' + region);
    if (!cityRedux && !region) {
      setVisible(true);
      try {
        Geocoder.init('AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw');
        // Geocoder.init('AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o');
        Geocoder.from(latitude, longitude)
          // Geocoder.from(28.64, 77.07)
          // Geocoder.from(28.535517, 28.535517)
          .then((json: any) => {
            // var addressComponent = json.results[0].address_components[2].long_name;
            // console.log(
            //   'GEOCODER',
            //   json.results[0].address_components[2].long_name,
            // );
            // console.log('GEOCODER', json.results[0].formatted_address);
            let pinArray = json.results[0].address_components.find(
              (item: any, index: any, final: any) => {
                if (final.length - 1 == index) {
                  return item.long_name;
                }
              },
            );
            setPincode(pinArray.long_name);
            // console.log('GEOCODER', pincode);
            getAddress();
            // if (json.results[0]) {
            //   dispatch(
            //     setCityRedux(json.results[0].address_components[2].long_name),
            //   );
            //   dispatch(
            //     setRegion(json.results[0].address_components[3].long_name),
            //   );
            //   dispatch(
            //     setCurrentAddress(json.results[0].formatted_address),
            //   );
            //   // setCity(cityRedux)
            //   // setState(region)
            // }
            // setDisplayCurrentAddress()
            // setLatitude(addressComponent)
          })
          .catch(error => console.log(error));
        setVisible(false);
      } catch (error) {
        // console.log('GeoCOder Error', error);
        setVisible(false);
      }
    } else {
      // console.log(cityRedux);
      // setCity(cityRedux)
      // setState(region)
    }
  };
  const getAddress = async () => {
    console.log(pincode);
    try {
      const res = await axios({
        url: `https://api.postalpincode.in/pincode/${pincode}`,
      });
      if (res?.data[0]?.PostOffice[0]) {
        console.log(res?.data[0]?.PostOffice[0]);
        dispatch(setCityRedux(res.data[0]?.PostOffice[0]?.District));
        dispatch(setRegion(res.data[0]?.PostOffice[0]?.State));
        dispatch(setCountryRedux(res.data[0]?.PostOffice[0]?.Country));
        dispatch(setPincodeRedux(res.data[0]?.PostOffice[0]?.Pincode));
        dispatch(setCurrentAddress(cityRedux + ', ' + region));
        setVisible(false);
      } else {
        setVisible(false);
        ToastAndroid.show(
          'Cannot determine Current Location',
          ToastAndroid.SHORT,
        );
        // dispatch(setPincodeRedux(''));
      }
    } catch (error) {
      ToastAndroid.show(
        'Cannot determine Current Location',
        ToastAndroid.SHORT,
      );
      // dispatch(setPincodeRedux(''));
      setVisible(false);
      console.log('GERROR', error);
    }
  };
  // console.log('currentAddress->', currentAddress);
  // console.log("CITY->", city);
  // console.log("District", district);
  // console.log("USErdata in header", userData);
  const navigation = useNavigation();
  const submitNext = () => {
    navigation.navigate('notifications')
    console.log('notifications enter')
  }
  return (
    <SafeAreaView
      style={{
        // flex: 1,
        height: height * 0.12,
        width: width,
        backgroundColor: '#00796A',
        marginBottom: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#00796A',
          height: 45,
          marginTop: 2,
          marginLeft: 14,
          width: '93%',
          borderRadius: 4,
        }}>
        <TouchableOpacity
          style={{ marginTop: 5 }}
          onPress={() => {
            setVisible(true);
          }}>
          {color === COLORS.DARK_GREEN ? (
            <Image
              source={require('../../assets/image/place-marker-green.gif')}
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/image/place-marker.gif')}
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
              }}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            fontWeight: '700',
            fontSize: 16,
            color: cityRedux || region ? COLORS.WHITE : COLORS.RED_DARK,
            marginLeft: 5,
            margin: 6,
          }}>
          {/* console.log("cityRedux",cityRedux); */}

          {/* {cityRedux && region && country
          ? cityRedux + ', ' + region + ', ' + country
          : 'Add Your Location'} */}
          {/* {cityRedux || region ? currentAddress : 'Add your location'} */}
          {userData?.address_details_permanent?.pincode ? userData?.address_details_permanent?.pincode : null}
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('location-details') }}
          style={{
            marginTop: 6,
            marginRight: 30,
          }}>
          <Icon
            name="pencil-outline"
            family="MaterialCommunityIcons"
            size={20}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={submitNext}>
          <Image
            source={require('../../assets/logo/alert.png')}
            style={{
              padding: 10,
              margin: 5,
              height: 25,
              width: 25,
              resizeMode: 'stretch',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>

      {/* for search box        */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 45,
          marginVertical: 10,
          marginLeft: 14,
          width: '93%',
          borderRadius: 4,
        }}>
        <Image
          source={require('../../assets/logo/search.png')}
          style={{
            margin: 10,
            height: 20,
            width: 20,
            resizeMode: 'stretch',
            alignItems: 'center',
          }}
        />
        <TextInput
          // onChangeText={onChangeText}
          style={{
            flex: 1,
            fontWeight: '500',
            fontSize: 15,
            color: COLORS.BLACK,
            marginLeft: 5,
            letterSpacing: 0,
          }}
          placeholder="Search ..."
          underlineColorAndroid="transparent"

        />
        <Image
          source={require('../../assets/logo/mic.png')}
          style={{
            padding: 10,
            height: 16,
            width: 16,
            marginRight: 10,
            alignItems: 'center',
            borderLeftWidth: 1,
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
