import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../utils/components/Icon';
import {COLORS} from '../../const/constants';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} = Dimensions.get('screen');

const PickupDetails = (props: any) => {
  const {navigation, route} = props;
  const {data, razorPayData, paymentSuccess, amount} = route?.params;
  const dispatch = useDispatch();
  const {latitude, longitude} = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log('DATA', data);
    // console.log('DATA', amount + razorPayData);
  }, []);
  const oLat = Math.abs(28.507681);
  const oLng = Math.abs(77.409081);
  const dLat = Math.abs(28.51949);
  const dLng = Math.abs(77.25765);
  const markers = [
    {latitude: oLat, longitude: oLng},
    {latitude: oLng, longitude: dLng},
  ];
  //   latitude: (origin.latitude + destination.latitude) / 2,
  //   longitude: (origin.longitude + destination.longitude) / 2,
  //   latitudeDelta: Math.abs(oLat - dLat) + zoom,
  //   longitudeDelta: Math.abs(oLng - dLng) + zoom,

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          alignItems: 'center',
          backgroundColor: 'white',
          height: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <Icon
            family="MaterialIcons"
            name="arrow-back-ios"
            size={26}
            color="black"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'poppins',
            alignSelf: 'center',
            width: width * 0.8,
            textTransform: 'capitalize',
          }}>
          Pickup Details
        </Text>
      </View>
      <View style={{width: width, height: height * 0.5}}>
        <MapView
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: 28.507681,
            longitude: 77.409081,
            // latitude: latitude,
            // longitude: longitude,
            latitudeDelta: Math.abs(oLat - dLat),
            longitudeDelta: Math.abs(oLng - dLng),
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          style={styles.map}
          onMapReady={map => {
            map?.fitToCoordinates(markers, {
              edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
              animated: true,
            });
          }}
          minZoomLevel={5}
          provider={PROVIDER_GOOGLE}>
          <Marker
            coordinate={{
              latitude: 28.507681,
              longitude: 77.409081,
              // latitude: latitude,
              // longitude: longitude,
            }}
            title={'Your Location'}
            identifier="origin"
            pinColor="#C92A2A"
          />
          <Marker
            coordinate={{
              latitude: 28.51949,
              longitude: 77.25765,
              // latitude: latitude,
              // longitude: longitude,
            }}
            title={'Your Destination'}
            identifier="destination"
            pinColor="#0066FF"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default PickupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
});
