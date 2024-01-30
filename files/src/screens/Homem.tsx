import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import TabNavigator from '../../utils/TabNavigator';
import {COLORS} from '../../const/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveBookings,
  setAllServices,
  setCompletedBookings,
  setUserContacts,
  setUserDocuments,
} from '../../backend/slice';
import axios from 'axios';
import {API} from '../../utils/components/api';
const {height, width} = Dimensions.get('window');

const Homem = ({navigation}) => {
  const {allServices, userData, userId, userNumber} = useSelector(
    (state: any) => state.auth,
  );
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchServices();
    console.log('ID', userId);
    console.log('Number', userNumber);
    if (userId) {
      getContactsFolderList();
      getDocumentsFolderList();
    }
    getActiveTickets();
    getCompletedTickets();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(API.GET_ALL_SERVICES);
      dispatch(setAllServices(res.data.data));
      // console.log('HOMEM', res.data.data)
    } catch (error) {
      console.log('EROOR', error?.response?.data);
      // ToastAndroid.show('Try Again Later', ToastAndroid.SHORT);
    }
  };

  const getActiveTickets = async () => {
    try {
      const res = await axios({
        method: 'get',
        url:
          API.GET_ACTIVE_TICKETS +
          userData?.personal_details?.phone?.mobile_number,
      });
      if (res) {
        console.log('GET ACTIVE TICKET DATA', res.data?.data);
        setActiveData(res.data?.data);
        dispatch(setActiveBookings(activeData));
      } else {
        console.log('API ERROR', res);
      }
    } catch (err) {
      console.log('ERROR REQUESTS', err);
    }
  };
  const getCompletedTickets = async () => {
    try {
      const res = await axios({
        method: 'get',
        url:
          API.GET_ACTIVE_TICKETS +
          userData?.personal_details?.phone?.mobile_number,
      });
      if (res) {
        console.log('GET ACTIVE TICKET DATA', res.data?.data);
        setCompletedData(res.data?.data);
        dispatch(setCompletedBookings(completedData));
      } else {
        console.log('API ERROR', res);
      }
    } catch (err) {
      console.log('ERROR REQUESTS', err);
    }
  };

  const getDocumentsFolderList = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: API.GET_ALL_DOCUMENTS_DIRECTORY + userId,
      });
      if (res) {
        console.log('DATA', res.data);
        dispatch(setUserDocuments(res.data?.data));
      } else {
        console.log('API ERROR', res);
      }
    } catch (err) {
      console.log('ERROR DOCUMENTS', err);
    }
  };

  const getContactsFolderList = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: API.GET_ALL_CONTACTS_DIRECTORY + userId,
        // config: {
        //   headers: {
        //     'x-access-token': accessToken
        //   }
        // }
      });
      console.log('asd');
      if (res) {
        console.log('DATA DOC', res.data);
        dispatch(setUserContacts(res.data?.data));
      } else {
        console.log('API ERROR', res);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00796A',
        height: height,
        width: width,
        // marginTop: 10,
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={COLORS.DARK_GREEN}
      />
      <TabNavigator></TabNavigator>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Homem;
