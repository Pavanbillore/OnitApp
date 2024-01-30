import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {COLORS} from './const/constants';
import {useDispatch, useSelector} from 'react-redux';
// import {Modal} from 'react-native-btr';
import MapView, {Marker} from 'react-native-maps';
import {updateLatitude, updateLongitude} from './backend/slice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from './utils/components/Icon';

const Locations = (color: any) => {
  const [visible, setVisible] = useState(false);
  const {latitude, longitude} = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  // const [latitude, setLatitude] = useState<number>(0)
  // const [longitude, setLongitude] = useState<number>(0)
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...',
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
    console.log(longitude + latitude);
  }, []);

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
      setLocationServiceEnabled(false);
      console.log(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          dispatch(updateLatitude(position.coords.latitude));
          dispatch(updateLongitude(position.coords.longitude));
        },
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {
      console.log('CERROR', error);
    }

    // for (let item of response) {
    //   // console.log(item)
    //   let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

    //   setDisplayCurrentAddress(address);

    //   // if (address.length > 0) {
    //   //   setTimeout(() => {
    //   //     navigation.navigate("Home", { item: address });
    //   //   }, 2000);
    //   // }
  };
  const LocationMarker = () => {
    console.log('MARKER');
    return (
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(!visible)}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00796A',
            width: '100%',
            height: 450,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
              style={{
                textAlign: "center",
                padding: 20,
                fontSize: 20,
              }}
            >
              Share Using
            </Text> */}
          {/* Map View  */}
          {/* <View>
          <Text style={{fontSize: 16, color: '#fff'}}>
            {displayCurrentAddress}
          </Text>
        </View> */}
          {latitude && longitude ? (
            <MapView
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              style={{flex: 1, width: '100%'}}
              mapType="mutedStandard">
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                title={displayCurrentAddress}
                identifier="origin"
                pinColor="#C92A2A"
              />
            </MapView>
          ) : (
            <Text style={{fontSize: 16, color: '#fff'}}>Loading...</Text>
          )}
        </View>
      </Modal>
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
      }}>
      <TouchableOpacity
        // style={{backgroundColor: COLORS.RED_DARK,}}
        onPress={() => {
          setVisible(!visible);
          console.log(visible);
        }}>
        {color === COLORS.DARK_GREEN ? (
          <Image
            source={require('../files/assets/image/place-marker-green.gif')}
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="contain"
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require('../files/assets/image/place-marker.gif')}
            style={{
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
          color: COLORS.WHITE,
        }}>
        {displayCurrentAddress}
      </Text>
      {/* <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={{
          // marginTop: 6,
          // marginRight: 12,
        }}>
        <Icon
          name="pencil-outline"
          family="MaterialCommunityIcons"
          size={20}
          color={color}
        />
      </TouchableOpacity> */}
      <LocationMarker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.WHITE,
  },
});

export default Locations;
