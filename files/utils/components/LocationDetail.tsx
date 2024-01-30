import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Modal,
  FlatList,

} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ListItem } from 'react-native-elements';
// import * as Location from "expo-location";
import Icon from './Icon';
// import Icon1 from "react-native-vector-icons/EvilIcons";
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid';
import { Alert } from 'react-native/Libraries/Alert/Alert';
import { COLORS } from '../../const/constants';
import { enableLatestRenderer } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {
  setUserData,
  setCityRedux,
  setCountryRedux,
  // setDistrictRedux,
  setHouseRedux,
  setPincodeRedux,
  setRegion,
  updateLatitude,
  updateLongitude,
} from '../../backend/slice';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const LocationDetail = (props: any) => {
  const navigation = useNavigation();
  const { visible, setVisible } = props;
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [lat, setlat] = useState('');
  const [long, setLong] = useState('');
  // const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setStat] = useState('');
  const [country, setCountry] = useState('India');
  const [regions, setregions] = useState<any[]>();
  const [dvalue, setDvalue] = useState('');
  const [searchValue, setsearchValue] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [mapdata, setmapdata] = useState<any>([]);
  // const [latitude, setLatitude] = useState<number>(0)
  // const [longitude, setLongitude] = useState<number>(0)
  const { cityRedux, region, latitude, currentAddress, longitude, city, district, userData } = useSelector(
    (region: any) => region.auth,
  );
  const [coordinate, setcoordinate] = useState<any>({ latitude: 0.00, longitude: 0.00 });
  useEffect(() => {
    setcoordinate({
      latitude: latitude,
      longitude: longitude
    })
  }, [latitude]);
  // console.log("cr", region);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
  const HeaderScreen = (color?: any) => {
    return (
      <View
        style={{
          height: 120,
          width: width,
          backgroundColor: '#00796A',
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
          >
            {color = COLORS.DARK_GREEN ? (
              <Image
                source={require('../../assets/image/place-marker.gif')}
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/image/place-marker-green.gif')}
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
            style={{
              marginTop: 6,
              marginRight: 80,
            }}>
            <Text
              style={{
                flex: 1,
                fontWeight: '700',
                fontSize: 16,
                color: cityRedux || region ? COLORS.WHITE : COLORS.RED_DARK,
                margin: 6,
              }}>Update Address</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
          <TouchableOpacity onPress={() => {
            getData();

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
          </TouchableOpacity>
          <TextInput
            style={styles.textinputStyle}
            value={searchValue ? searchValue : ''}
            maxLength={6}
            placeholder="Search ..."
            underlineColorAndroid="transparent"
            keyboardType='number-pad'
            onChangeText={(value) => {
              var values = value.toString();
              setsearchValue(values)
            }}

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
        {/*<View
          style={{
            padding: 20,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text style={{ padding: 10, color: "#000" }}>{item.name}</Text>
            )}
            keyExtractor={item => item.name}
          />
        </View>*/}
      </View>
    );
  };
  const API_KEY = 'AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw';
  const MAP_KEY = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchValue + "&key=" + API_KEY;
  // const MAP_KEY = "https://maps.googleapis.com/maps/api/geocode/json?address=&key=" + API_KEY;

  const getData = async () => {
    console.log(
      MAP_KEY
    )
    fetch(MAP_KEY)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          console.log('map data', data.results);
          setData(data);
          setcoordinate({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
          })
          if (mapRef && mapRef?.current) {
            mapRef.current.animateToRegion({
              latitude: data.results[0].geometry.location.lat,
              longitude: data.results[0].geometry.location.lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            })
          }
          // setDvalue(data.results);
          console.log('serach data', JSON.stringify(data.results[0].geometry.location));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getData();
  }, []);


  // const searchItems = (text: any) => {
  //   const formattedQuery = text.toLowerCase();
  //   const ndata = data.filter((item: any) => {
  //     return item.results.toLowerCase().match(formattedQuery)
  //   })
  //   setmapdata(ndata);
  //   // setsearchValue(text);
  //   console.log("Working", ndata)
  // }

  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.mainContainer}>
      <HeaderScreen />
      <View
        style={{
          backgroundColor: '#00796A',
          width: '100%',
          flex: 1,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}
          // onRegionChange={onRegionChange}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsCompass={true}
        >
          <Marker
            draggable
            onDragEnd={(e) => (
              console.log(e.nativeEvent.coordinate))}
            coordinate={coordinate}
            title={currentAddress ? currentAddress : ''}
            identifier="origin"
            pinColor="#C92A2A"
          />
        </MapView>
      </View>
    </View>
  );
};
export default LocationDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff'
  },
  textinputStyle: {
    flex: 1,
    fontWeight: '500',
    fontSize: 15,
    color: COLORS.BLACK,
    marginLeft: 5,
    letterSpacing: 0,
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
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
    height: 75,
    marginLeft: 0,
    paddingTop: StatusBar.currentHeight,
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
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
