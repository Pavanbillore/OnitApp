import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../const/constants';
import {Picker} from '@react-native-picker/picker';
import {technicians} from '../../const/technicians';
import Icon from '../../utils/components/Icon';

const {height, width} = Dimensions.get('screen');

const BookTechnician = props => {
  const services = [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'AC Service',
    },
    {
      id: 3,
      name: 'Beauty',
    },
    {
      id: 4,
      name: 'Homecare',
    },
    {
      id: 5,
      name: 'Plumber',
    },
    {
      id: 6,
      name: 'Appliance',
    },
    {
      id: 7,
      name: 'Electronics',
    },
    {
      id: 8,
      name: 'Computer',
    },
    {
      id: 9,
      name: 'Health care',
    },
    {
      id: 10,
      name: 'Vehicles',
    },
  ];
  const [selectedValue, setSelectedValue] = useState(services[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [techniciansList, setTechniciansList] = useState(technicians || []);

  const ServiceFilter = (props: any) => {
    const {serviceName} = props;
    useEffect(() => {
      setModalVisible(true);
      console.log('S', selectedValue);
      console.log('S', serviceName);
    }, []);
    return (
      <>
        <TouchableOpacity
          style={styles.plumberStyle}
          onPress={() => setModalVisible(!modalVisible)}>
          {modalVisible && (
            <Picker
              selectedValue={selectedValue}
              itemStyle={{
                fontWeight: 'bold',
                fontFamily: 'poppins-medium',
                // fontSize: 18,
                textAlign: 'center',
                color: COLORS.DARK_GREEN,
              }}
              style={{
                height: 20,
                width: width * 0.4,
                backgroundColor: '#D9EBE9',
                alignSelf: 'center',
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              {services.map((service: any) => {
                return (
                  <Picker.Item value={service.name} label={service.name} />
                );
              })}
            </Picker>
          )}
        </TouchableOpacity>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 10, alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Monserrat-bold',
            width: width / 2,
          }}>
          Book from previously visited service people
        </Text>
        <ServiceFilter serviceName={'All'} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'center'}}
        data={technicians}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}) => {
          console.log(item);
          return (
            <TouchableOpacity
              style={{
                width: width * 0.42,
                backgroundColor: COLORS.WHITE,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
                borderRadius: 5,
                elevation: 5,
              }}>
              <View>
                <Image
                  source={item.img}
                  style={{
                    height: 70,
                    width: 70,
                    marginVertical: 10,
                    borderRadius: 50,
                    borderWidth: 0,
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.DARK_GREEN,
                    fontSize: 16,
                  }}>
                  {item.service}
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: COLORS.LIGHT_BORDER,
                  borderTopWidth: 1,
                  padding: 10,
                  marginTop: 10,
                  paddingLeft: 10,
                  flexDirection: 'row',
                  width: width * 0.4,
                  overflow: 'hidden',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontWeight: '500',
                    width: width * 0.2,
                  }}>
                  {item.price}
                  {'/hour'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.2,
                    marginRight: -50
                  }}>
                  <Icon
                    name="star"
                    family="AntDesign"
                    size={16}
                    color={'yellow'}
                  />
                  <Text
                    style={{
                      color: COLORS.LIGHT_BORDER,
                      marginLeft: 5,
                      fontWeight: '500',
                    }}>
                    {item.rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default BookTechnician;

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
