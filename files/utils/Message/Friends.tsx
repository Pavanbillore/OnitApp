import React, { useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ImageRequireSource,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';
import { color } from 'react-native-reanimated';
import MessageScreen from './MessageScreen';
import axios from 'axios';
import { BASE_URL } from '../components/api';
import { BottomSheet } from 'react-native-btr';
import Icon from '../../utils/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../const/constants';
import UserAvatar from 'react-native-user-avatar';


const { height, width } = Dimensions.get('window');

const Friends = ({ navigation }) => {
  const { accessToken, userId, allServices, userNumber, userData } = useSelector(
    (state: any) => state.auth,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [receiverId, setreceiverId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [ddata, setDdata] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  console.log('id', userData?._id);
  console.log('accesstoke', accessToken);

  useEffect(() => {
    userName();
    getDetails();
    //setRefresh(!refresh)
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
    setFilteredData([]);
    getDetails();
  };

  const getDetails = async () => {
    console.log("Inside getDetails");

    try {
      const response = await axios.get(
        `${BASE_URL}chat/allUsersCon?search=${searchQuery}`,
      );
      console.log('Resss', response?.data?.data?.ConsumerUsers);
      setDdata(response?.data?.data?.ConsumerUsers);

      setName(response?.data?.data?.ConsumerUsers[0]?.personal_details);
      // setPersons(response?.data?.group?.groupMember)
      // setSelectedUsers(response?.data?.group)
      setreceiverId(response?.data?.data?.ConsumerUsers[0]?._id);
      // console.log('ress', response?.data?.data?.ConsumerUsers[0]?._id)
      // setSelectedUsers(persons.forEach(obj => {
      //     console.log(obj.name, obj.age);
      //   }))

      // console.log('responseeee===>>>', response); // Do something with the response data
    } catch (error) {
      console.error('hh', error);
    }
    //finally {
    //   setFilteredData([]);
    // }
  };
  const userName = async () => {
    try {
      const response = await axios.get(`${BASE_URL}chat/${receiverId}`);
      // setName(response?.data?.data?.ConsumerUsers[0]?.personal_details)
      // setPersons(response?.data?.group?.groupMember)
      // setSelectedUsers(response?.data?.group)
      // setreceiverId()
      console.log('ress', response?.data?.data);
      // setSelectedUsers(persons.forEach(obj => {
      //     console.log(obj.name, obj.age);
      //   }))

      // console.log('responseeee===>>>', response); // Do something with the response data
    } catch (error) {
      console.error('hh', error);
    }
  };
  const AddUser = async () => {
    try {
      const payload = {
        senderId: userData?._id,
        receiverId: receiverId,
      };
      console.log('paddd', payload);
      await axios({
        method: 'post',
        url: `${BASE_URL}chat/`,

        data: payload,
      })
        .then(res => {
          // setAdd(res?.data?.data)
          // setVisible(false)
          // fetchData()
          console.log('asss', res?.data);
          // ToastAndroid.show('Group Add Successfully', ToastAndroid.SHORT)
        })
        .catch(error => {
          console.log('Here-->', error?.response);
        });
    } catch (err) { }
  };
  const data = [
    {
      id: 1,
      name: 'Naruto Uzumaki',
      image: require('../../assets/image/addss.png'),
      tagname: 'Lets eat Ichiraku Ramen 🍜',
      title: 'now',
      navigation: 'MessageScreen',
    },
    {
      id: 2,
      name: 'Sasuke Uchiha',
      image: require('../../assets/image/addss.png'),
      tagname: 'Lets eat Ichiraku Ramen 🍜',
      title: 'now',
      navigation: 'MessageScreen',
    },
    {
      id: 3,
      name: 'Kurama',
      image: require('../../assets/image/addss.png'),
      tagname: 'Lets eat Ichiraku Ramen 🍜',
      title: 'now',
      navigation: 'MessageScreen',
    },
  ];

  const handleSearch = () => {
    try {
      if (searchQuery === '') {
        setFilteredData([]);
      } else {
        const filterdResults = ddata.filter(
          item =>
            item?.personal_details?.phone?.mobile_number.includes(
              searchQuery,
            ) ||
            item?.personal_details?.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );

        setFilteredData(filterdResults);
      }
      setSearchQuery('');
      setIsSearchVisible(!isSearchVisible);
    } catch (err) {
      console.log('ERROR', err);
    }
  };
  console.log('filterdData', filteredData);

  return (
    <View>
      <View
        style={{
          backgroundColor: '#E5E7E9',
          marginHorizontal: 15,
          borderRadius: 10,
          marginTop: 7,
          height: 50,
        }}>
        {isSearchVisible ? (
          <TextInput
            style={{ flex: 1, marginLeft: 10 }}
            placeholder="search user"
            onChangeText={searchQuery => setSearchQuery(searchQuery)}
            onSubmitEditing={handleSearch}
            autoFocus={true}
            onBlur={handleSearch}
          />
        ) : (
          <View style={{ left: 6, top: 7, marginRight: 10 }}>
            <TouchableOpacity onPress={handleSearch}>
              <Icon
                family="FontAwesome"
                name="search"
                size={30}
                color={COLORS.BLACK2}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <TouchableOpacity onPress={getDetails} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00796A", marginHorizontal: 80, height: 35 }}>
                <Text style={{}}>Search</Text>
            </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={AddUser} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00796A", marginHorizontal: 80, height: 35, marginTop: 5 }}>
                <Text style={{}}>add User</Text>
            </TouchableOpacity> */}
      {filteredData.length > 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('MessageScreen')}
          onPressOut={handleRefresh}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 70,
              marginTop: 15,
              borderWidth: 0.55,
              borderBottomColor: '#F3F4F9',
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#fff',
            }}>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 80,
              marginTop: 15,
              borderWidth: 0.55,
              borderBottomColor: '#F3F4F9',
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#fff',
            }}>
            
            <Text
              style={{
                flex: 0.9,
                fontWeight: '700',
                fontSize: 20,
                color: 'black',
                marginLeft: 15,
                //marginTop: -6,
              }}>
              {filteredData[0]?.personal_details?.name}
              {'\n'}
             
            </Text>
            <Text
              style={{
                color: '#00000014',
                fontSize: 14,
                marginTop: -20,
                marginRight: 15,
                fontWeight: '700',
              }}>
              {filteredData[0]?.personal_details?.phone?.mobile_number}
            </Text>
          </View> */}
            <View style={{ flexDirection: 'row', marginLeft: 4 }} >
              <UserAvatar size={36} name={filteredData[0]?.personal_details?.name} />
              <Text style={{ fontSize: 20, color: 'black', marginLeft: 5 }}>
                {filteredData[0]?.personal_details?.name}
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', marginBottom: 4 }} >
              <Text style={{ fontSize: 18, color: COLORS.GREY, marginRight: 6 }}>
                (+91){filteredData[0]?.personal_details?.phone?.mobile_number}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: 200,
            // justifyContent: "center",
            // alignItems: "center",
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                marginHorizontal: 20,
              }}>
              <Text style={{ fontSize: 22, fontWeight: '600' }}>
                Create New Category
              </Text>
              <TouchableOpacity onPress={toggleBottomNavigationView}>
                <Icon
                  family="AntDesign"
                  name="close"
                  size={30}
                  color={'black'}
                // style={{ marginHorizontal: "45%" }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '90%',
                  height: 40,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: '#C0C0C0',
                }}>
                <TextInput
                  style={styles.input}
                  onChangeText={data => setData(data)}
                  // value={folderName}
                  placeholder="Group Name"
                />
              </View>

              {/* <TouchableOpacity
                                onPress={AddUser}
                                style={styles.button}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'white',
                                    }}>
                                    Create Group
                                </Text>
                            </TouchableOpacity> */}
            </View>
            {/* <FlatList
                                        data={result}

                                        renderItem={({ item }) => {
                                            // console.log('rr', result)
                                            return (
                                                <View style={{ alignItems: "center", height: 100, marginTop: 5, width: "90%", marginLeft: 17, }}>


                                                    {
                                                        result ?
                                                            <View style={{ width: '100%' }}>

                                                                <TouchableOpacity style={{ height: 33, width: '100%', backgroundColor: "#00796A", justifyContent: "center", alignItems: "center", borderRadius: 5 }}
                                                                    onPress={AddUser}
                                                                >
                                                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Add</Text>
                                                                </TouchableOpacity>


                                                                <View style={{ alignItems: "center" }}>
                                                                    <Text style={{ color: "#0E6655" }}>{item?.personal_details?.phone?.mobile_number}</Text>
                                                                </View>
                                                            </View> : <Text>hii</Text>}
                                                </View>
                                            )
                                        }}
                                    /> */}
          </View>
        </View>
      </BottomSheet>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 30,
          marginLeft: 20,
          alignContent: 'center',
        }}>
        Messages
      </Text>
      {/* <Text
        style={{
          fontSize: 15,
          color: '#777777',
          fontWeight: '600',
          marginTop: 7,
          marginLeft: 20,
          alignContent: 'center',
        }}>
        You have 2 new Messages{' '}
      </Text> */}
      <ScrollView>
        {/* <FlatList
                    data={name}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item?.name}</Text>
                            </View>
                        )
                    }}
                /> */}

        {data.map(item => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MessageScreen')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    height: 80,
                    marginTop: 15,
                    borderWidth: 0.55,
                    borderBottomColor: '#F3F4F9',
                    borderTopColor: '#fff',
                    borderLeftColor: '#fff',
                    borderRightColor: '#fff',
                  }}>
                  <Image
                    source={item?.image}
                    style={{
                      height: 50,
                      width: 50,
                      alignItems: 'center',
                      marginLeft: 5,
                      borderRadius: 50,
                      borderWidth: 1,
                      // borderColor: "green",
                    }}
                  />
                  <Text
                    style={{
                      flex: 0.9,
                      fontWeight: '700',
                      fontSize: 16,
                      color: 'black',
                      marginLeft: 15,
                      //marginTop: -6,
                    }}>
                    {item?.name}
                    {'\n'}
                    <Text
                      style={{
                        flex: 0.9,
                        fontWeight: '700',
                        fontSize: 13,
                        color: '#ddd',
                        marginLeft: 15,
                      }}>
                      {item?.tagname}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: '#00000014',
                      fontSize: 14,
                      marginTop: -20,
                      marginRight: 15,
                      fontWeight: '700',
                    }}>
                    {item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* For Second Chat */}
      </ScrollView>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  moneyManagerWrapper: {
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 70,
    marginHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#00796A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#fff',
    fontSize: 30,
  },
  itemBox: {
    backgroundColor: 'white',
    width: '32%',
    borderRadius: 10,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  modalHeaderSection: {
    padding: 2,
    marginTop: 20,
    flexDirection: 'row',
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  modalHeaderSectionTop: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 10,
    backgroundColor: 'green',
    // marginRight: 50,
    // alignItems: "center",
    justifyContent: 'space-between',
  },
  closeIcon: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  modalHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 4,
    // backgroundColor: "#ebf4f3",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: '90%',
    padding: 6,
    borderRadius: 4,
    // marginHorizontal: 20,
    backgroundColor: '#00796A',
  },
  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },
});
