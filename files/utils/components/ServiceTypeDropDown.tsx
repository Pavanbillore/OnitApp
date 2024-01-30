import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import serviceList from '../../const/serviceList';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('screen');

const ServiceTypeDropDown = (props: any) => {
  const {allServices} = useSelector((state: any) => state.auth);
  const {serviceName} = props;
  const [selectedValue, setSelectedValue] = useState(serviceName);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(true);
    console.log('S', selectedValue);
    console.log('SN', serviceName);
  }, []);
  return (
    <>
      <TouchableOpacity
        style={styles.plumberStyle}
        onPress={() => setModalVisible(!modalVisible)}>
        {/* {allServices.map((service: any) => {
        })} */}
        {allServices.map((service: any) => {
          return service?.service_name == serviceName ? (
            <Image
              key={service?._id}
              source={{uri: service?.image}}
              style={styles.imageStyle}
            />
          ) : (
            null
          );
        })}
        {modalVisible && (
          <Picker
            selectedValue={
              serviceName == selectedValue
                ? serviceName.split('-')[0]
                : selectedValue
            }
            itemStyle={{
              fontWeight: 'bold',
              fontFamily: 'poppins-medium',
              fontSize: 18,
              textAlign: 'center',
            }}
            style={{height: 60, width: width * 0.8}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {allServices.map((service: any) => {
              return (
                <Picker.Item
                  key={service?._id}
                  value={service.service_name.split('-')[0]}
                  label={service.service_name.split('-')[0]}
                  style={{color:"black"}}
                />
              );
            })}
          </Picker>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plumberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    width: width,
    marginVertical: 20,
    elevation: 1,
  },
  imageStyle: {
    //padding: 10,
    //margin: 5,
    height: 35,
    width: 35,
    //resizeMode: 'stretch',
    alignItems: 'center',
    marginLeft: 20,
  },
});
export default ServiceTypeDropDown;
