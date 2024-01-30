import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {enableLatestRenderer} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCityRedux,
  setRegion,
  updateLatitude,
  updateLongitude,
} from '../../backend/slice';
import {COLORS} from '../../const/constants';
// import Icon from './Icon';
import LocationDetail from './LocationDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const ServiceHeader = (color?: any) => {
    const navigation = useNavigation()
  const [text, onChangeText] = useState('');
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState('');
  // const [state, setState] = useState('');
  const {cityRedux, region, latitude, longitude, currentAddress} = useSelector(
    (region: any) => region.auth,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    enableLatestRenderer();
    if (!latitude) {
      CheckIfLocationEnabled();
    }
    if(!currentAddress){
      GetCurrentLocation();
    }
    console.log(longitude + ' and ' + latitude);
  }, []);
  useEffect(() => {
    if (!cityRedux) {
      Geocode();
    }
  });
  const CheckIfLocationEnabled = async () => {
    let enabled = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      // setLocationServiceEnabled(false);
      console.log(enabled);
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
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      setVisible(false);
    } catch (error) {
      setVisible(false);
      console.log('CERROR', error);
    }
  };

  const Geocode = async () => {
    console.log('CITY', cityRedux + 'RED' + region);
    if (!cityRedux && !region) {
      setVisible(true);
      try {
        Geocoder.init('AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw');
        Geocoder.from(latitude, longitude)
          // Geocoder.from(28.64, 77.07)
          // Geocoder.from(28.535517, 28.535517)
          .then((json: any) => {
            // var addressComponent = json.results[0].address_components[2].long_name;
            console.log(
              'GEOCODER',
              json.results[0].address_components[2].long_name,
            );
            console.log(
              'GEOCODER',
              json.results[0].address_components[3].long_name,
            );
            if (json.results[0]) {
              dispatch(
                setCityRedux(json.results[0].address_components[2].long_name),
              );
              dispatch(
                setRegion(json.results[0].address_components[3].long_name),
              );
              // setCity(cityRedux)
              // setState(region)
            }
            // setDisplayCurrentAddress()
            // setLatitude(addressComponent)
          })
          .catch(error => console.log(error));
        setVisible(false);
      } catch (error) {
        console.log('GeoCOder Error', error);
        setVisible(false);
      }
    } else {
      console.log(cityRedux);
      // setCity(cityRedux)
      // setState(region)
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // height: height * 0.05,
        width: width,
        // backgroundColor: '#00796A',
        // marginBottom: 15,
      }}>
      {/* for location box   */}
      {visible && (
        <LocationDetail
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'white',
          //   height: 45,
          // marginTop: -20,
          //   marginLeft: 14,
          width: '100%',
          //   borderRadius: 4,
        }}>
        {/* <TouchableOpacity
                    style={{}}
                    onPress={() => {
                        setVisible(true);
                    }}> */}
        {/* {color === COLORS.DARK_GREEN ? (
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
          )} */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
          <MaterialIcons name="arrow-back-ios" size={26} color="black" />
        </TouchableOpacity>

        {/* </TouchableOpacity> */}
        <View style={{marginLeft: 10}}>
          <View>
            <Text style={{color: COLORS.BLACK, fontWeight: '500',}}>Your Location</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flexGrow: 1,
                fontWeight: '700',
                fontSize: 16,
                // color: !cityRedux || !region ? COLORS.RED_DARK : '#00796A',
                color: COLORS.DARK_GREEN
                // marginLeft: 5,
                // margin: 6,
              }}>
              {/* {cityRedux && region && country
          ? cityRedux + ', ' + region + ', ' + country
          : 'Add Your Location'} */}
              {cityRedux || region
                ? currentAddress
                : 'Add your location'}
            </Text>
            <View style={{marginLeft: 5}}>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={18}
                  color="#00796A"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ServiceHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
