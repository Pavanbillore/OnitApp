import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {COLORS} from '../../const/constants';
import Icon from '../../utils/components/Icon';
import { API, BASE_URL } from '../../utils/components/api';

const {width, height} = Dimensions.get('screen');

const completedBookingDetails = (props: any) => {
  
  const {navigation, route} = props;
  const {ticketData, serviceType, prevScreen} = route?.params;
  const {allServices,userData} = useSelector((state: any) => state.auth);
  const [address, setAddress] = useState([]);
  const [ticketDetails, setTicketDetails] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const [completedData,setCompletedData]=useState([]);

  useEffect(() => {
    if (completedData) {
        completedDataStore();
    }
}, []);
console.log("completedData",completedData);

  useEffect(() => {
    console.log('DATA', ticketData);
    if (prevScreen != 'Request') {
      setAddress(ticketData?.data?.resData?.address_details);
      setTicketDetails(ticketData?.data);
    } else {
      setAddress(ticketData?.address_details);
      setTicketDetails(ticketData);
      setService(serviceType)
    }
    // allServices.map((item: any) => {
    //   ticketDetails?.service_provided_for == item?._id
    //     ? setService(item)
    //     : console.log('Ervice', item);

    //   prevScreen != 'Request' &&
    //   ticketDetails?.resData?.service_provided_for == item?._id
    //     ? setService(item)
    //     : console.log('Ervice', item);
    // });
    console.log('SERvI', serviceType?.service_name);
    // console.log('SERvI', allServices);
  }, []);

const completedDataStore=async()=>{
  const res = await axios({
    method: 'get',
    url: `${BASE_URL}consumerAppAppRoute/consumerCompletedTicket/${userData?.personal_details?.phone?.mobile_number}`
});
if(res){
  const jsonData=await res?.data?.data;
  console.log("JSON_data",jsonData);
  setCompletedData(jsonData);
  
  
}
else{
  console.log('API ERROR', res);
}

}


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F2F3F4',
      }}>
      <View
        style={{flexDirection: 'row', padding: 10, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ServiceNeeds')}
          style={{
            alignItems: 'flex-start',
          }}>
          <Icon
            family="MaterialIcons"
            name="arrow-back-ios"
            size={25}
            color="black"
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'poppins',
              fontWeight: '500',
              fontSize: 20,
              color: 'black',
            }}>
            Booking Details
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show('Coming Soon', ToastAndroid.SHORT)
            }>
            <Text
              style={{
                fontSize: 15,
                color: '#0E6251',
                fontWeight: '600',
              }}>
              Help
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Icon family="FontAwesome5" name="user-alt" size={20} color="black" />
        </View>

        <View style={{justifyContent: 'center', marginLeft: 15}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}>
            {ticketDetails?.resData?.is_technician_assigned ||
            ticketDetails?.is_technician_assigned
              ? 'RAM PARSAD'
              : 'Currently, No Technician Assigned'}
          </Text>
          <Text
            style={{
              color: '#0E6251',
            }}>
            {serviceType?.service_name ? serviceType?.service_name.split('-')[0] : ''}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Message')}
          style={{
            alignItems: 'flex-end',
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <Icon
            family="MaterialCommunityIcons"
            name="facebook-messenger"
            size={20}
            color="#0E6251"
          />
        </TouchableOpacity>
      </View>
     {completedData?.map(item=>(
      <View
        style={{
          marginTop: 10,
          backgroundColor: 'white',
          padding: 20,
        }}>
        <View>
          <Text style={styles.text1}>JOB TASK</Text>
          {/* {ticketDetails && (
            <Text style={styles.text}>
              {ticketDetails?.resData?.specific_requirement ||
              ticketDetails?.remarks?.additional_remarks.length
                ? ticketDetails?.remarks?.additional_remarks
                : 'Not Available'}
            </Text>
          )} */}
          <Text style={styles.text}>{item?.specific_requirement}</Text>
        </View>

        <View style={styles.margin}>
          <Text style={styles.text1}>BOOKING FOR</Text>
          <Text style={styles.text}>
            {item?.service_provided_for?.service_name}
          </Text>
        </View>

        <View style={styles.margin}>
          <Text style={styles.text1}>ADDRESS</Text>
          {/* {address && (
            <Text style={styles.text}>
              {address.house_number +
                ' ' +
                address.locality +
                ', ' +
                address.city +
                ' - ' +
                address.pincode}
            </Text>
          )} */}
          <Text style={styles.text}>
              {item?.address_details?.house_number +
                ' ' +
                item?.address_details?.locality +
                ', ' +
                item?.address_details?.city +
                ' - ' +
                item?.address_details?.pincode}
            </Text>
        </View>

        <View style={styles.margin}>
          <Text style={styles.text1}>PAYMENT</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>
              {item?.is_paid_by_public
                ? 'Paid'
                : 'Not Paid'}{' '}
              | ₹
              {item?.ticket_price}{' '}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 10,
                borderBottomWidth: 1,
                borderColor: '#5DADE2',
              }}>
              {/* <TouchableOpacity>
                <Text
                  style={{
                    color: '#5DADE2',
                  }}>
                  View Payment Details
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>))}
      

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `https://app.onit.services/#/serviceStatus/${ticketDetails?.resData?._id}`,
          )
        }
        style={{
          backgroundColor: COLORS.DARK_GREEN,
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          marginLeft: 10,
          width: width * 0.3,
        }}>
        <Text
          style={{
            color: COLORS.WHITE,
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Track
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default completedBookingDetails;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
  },
  text1: {
    color: '#909497',
  },
  margin: {
    marginTop: 20,
  },
});
