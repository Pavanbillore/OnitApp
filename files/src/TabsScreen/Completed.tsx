import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from '../../utils/components/Icon';
import StarRating from 'react-native-star-rating';
import {COLORS} from '../../const/constants';
import {BASE_URL, API} from '../../utils/components/api';
import axios from 'axios';
import {setCompletedBookings} from '../../backend/slice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import ProfilePopup from '../../utils/components/ProfilePopup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Completed = ({navigation}) => {
  const [loginModal, setLoginModal] = useState(false);
  //const [feedback, setFeedback] = useState('');

  const [refresh, setRefresh] = useState(false);
  const [completedData, setCompletedData] = useState<any>([]);
  const [service, setService] = useState([]);
  const {userData, completedBookings, allServices, userNumber} = useSelector(
    (state: any) => state.auth,
  );
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      // getForm();
      getActiveTickets();
      setRefresh(false);
    });
  }, []);

  // console.log("completedBookings",completedBookings);

  // useEffect(() => {
  //     setCompletedData(completedBookings);
  //     console.log('Completed ', completedData);
  // }, []);
  useEffect(() => {
    if (completedData) {
      getActiveTickets();
    }
  }, []);

  const getActiveTickets = async () => {
    // const mobile = AsyncStorage.getItem('userNumber');
    try {
      // console.log('API Completed TICKET DATA');
      const res = await axios({
        method: 'get',
        url:
          // API.GET_COMPLETED_TICKETS +
          // userData?.personal_details?.phone?.mobile_number,
          `${BASE_URL}consumerAppAppRoute/consumerCompletedTicket/${userData?.personal_details?.phone?.mobile_number}`,
      });
      // console.log('API Completed TICKET DATAs');
      if (res) {
        console.log('GET Completed TICKET DATA', res?.data?.data);
        setCompletedData(res.data?.data);
        setTimeout(() => {
          dispatch(setCompletedBookings(completedData));
        }, 1000);
      } else {
        console.log('API ERROR', res);
      }
    } catch (error) {
      console.log('ERROR Acti', error);
      // console.log('ERROR Acti', error?.response?.data);
      // console.log('ERROR Acti', mobile);
      // console.log('ERROR Acti', userNumber);
    }
  };
  const data: any = [
    {
      id: 1,
      name: 'AC',
      image: '',
    },
    // {
    //   id: 2,
    //   name: 'AC',
    //   image: '',
    // },
    // {
    //   id: 3,
    //   name: 'AC',
    //   image: '',
    // },
    // {
    //   id: 4,
    //   name: 'AC',
    //   image: '',
    // },
    // {
    //   id: 5,
    //   name: 'AC',
    //   image: '',
    // },
    // {
    //   id: 6,
    //   name: 'AC',
    //   image: '',
    // },
  ];

  const Card = ({item}: any) => {
    const [feedbackModalVisible, setfeedbackModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    // useEffect(() => {

    //     allServices.map((item: any) =>
    //         list?.item?.service_provided_for == item._id ? setService(item) : '',
    //     );
    //     console.log('list', list?.item?.remarks);
    // }, []);
    //console.log('LIST-Completed', item);

    const handleSubmit = async ID => {
      console.log('Handle wali ID', ID);

      try {
        await axios
          .put(`${BASE_URL}technicianApp/setStatusRating/${ID}`, {
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },

            rating,
          })
          .then(response => {
            if (response.status === 200) {
              // Alert(`You have updated:${JSON.stringify(Response?.data)}`)
              console.log('YOu have updated');
            }
          });
        //const data=response.json();

        // if (response) {

        //   console.log('Rating submitted successfully');
        //   console.log("rating",rating);

        //   //setRating(rating)
        // } else {

        //   console.log('Rating submission failed');

        // }
      } catch (error) {
        console.error('Error submitting rating:', error);
      } finally {
        setRating(0);
        //onClose();
        setfeedbackModalVisible(false);
      }
    };

    return (
      <ScrollView>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: COLORS.WHITE, marginVertical: 5}}
          onPress={() =>
            navigation.navigate('BookingDetails', {
              id: item?._id,
              ticketData: item,
              serviceType: service,
              prevScreen: 'Request',
            })
          }
          key={item?._id}>
          <View
            style={{
              height: 184,
              borderColor: '#F1F1F1',
              borderWidth: 2,
              paddingTop: 8,
              marginBottom: 8,
            }}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 30, height: 40}}
                  source={{
                    uri: item?.service_provided_for?.image,
                  }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                    color: COLORS.BLACK,
                    fontFamily: 'poppins',
                  }}>
                  {item?.service_provided_for?.service_name.split('-')[0] ||
                    'N'}
                </Text>
              </View>

              <View style={{height: 40, bottom: 8, left: 8}}>
                <Text style={{color: '#161716'}}>
                  <Icon
                    name="calendar"
                    color={COLORS.BLACK}
                    family="Ionicons"
                    size={10}
                  />{' '}
                  {moment(item?.time_preference?.specific_date_time).format(
                    'Do MMMM YYYY',
                  )}
                </Text>
                <Text style={{color: '#161716'}}>
                  <Icon
                    name="time"
                    color={COLORS.BLACK}
                    family="Ionicons"
                    size={12}
                  />{' '}
                  {moment(item?.time_preference?.specific_date_time).format(
                    'LT',
                  )}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 13, fontWeight: '600', color: '#161716'}}>
                Booking ID: {item?.ticket_id}
              </Text>
              <View
                style={{
                  backgroundColor: '#20C944',
                  borderRadius: 4,
                  height: 28,
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>Completed</Text>
              </View>
            </View>
            {/* separator  */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#F1F1F1',
                marginHorizontal: 10,
              }}></View>
            <View
              style={{
                flex: 1,
                paddingVertical: 5,
                paddingBottom: 10,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                marginBottom: 8,
                bottom: 4,
                // alignItems: "center",
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon
                  family="FontAwesome"
                  name="exclamation-triangle"
                  size={20}
                  color={'#F7DD00'}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1D4831',
                    paddingLeft: 5,
                  }}>
                  Problem:
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: COLORS.DARK_GREEN,
                }}>
                {item?.specific_requirement}
              </Text>
            </View>

            {/* separator  */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#F1F1F1',
                marginHorizontal: 10,
              }}></View>
            <View
              style={{
                flex: 1,
                paddingVertical: 5,
                paddingHorizontal: 10,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* <Text style={{ fontSize: 16, fontWeight: "600" }}>Star Ratings</Text> */}
              {/* <StarRating rating={rating} onChange={setRating} /> */}
              {/* <StarRating
                            rating={rating}
                            onChange={stars => setRating(stars)}
                            starSize={25}
                        /> */}
              <View
                style={{
                  backgroundColor: '#00796A',
                  borderRadius: 4,
                  height: 32,
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setfeedbackModalVisible(true)}>
                  <Text style={{fontSize: 16, color: 'white'}}>Feedback</Text>
                </TouchableOpacity>
                <Modal
                  visible={feedbackModalVisible}
                  animationType="fade"
                  transparent={true}
                  onRequestClose={() => setfeedbackModalVisible(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.MODAL_BACKGROUND,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 16,
                        width: '80%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginBottom: 16,
                        }}>
                        Provide Feedback
                      </Text>
                      {/* <TextInput
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 4,
                          padding: 8,
                          marginBottom: 16,
                          minHeight: 100,
                        }}
                        multiline
                        placeholder="Enter your feedback here..."
                        value={feedback}
                        onChangeText={setFeedback}
                      /> */}
                      <StarRating
                        maxStars={5}
                        rating={rating}
                        starSize={30}
                        fullStarColor="#ffc107"
                        selectedStar={rating => setRating(rating)}
                        starStyle={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: 16,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{marginLeft: 8}}
                          onPress={() => setfeedbackModalVisible(false)}>
                          <Text style={{fontSize: 16, color: COLORS.RED_DARK}}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{marginLeft: 8}}
                          onPress={() => handleSubmit(item?._id)}>
                          <Text
                            style={{fontSize: 16, color: COLORS.DARK_GREEN}}>
                            Submit
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* <FlatList
                data={completedData}
                keyExtractor={(item: any) => item.id}
                ListEmptyComponent={() => {
                    return (
                        <View
                            style={{
                                backgroundColor: COLORS.GREY2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: height,
                            }}>
                            <Text style={{ color: COLORS.BLACK }}>No Completed Available</Text>
                            <Pressable onPress={() => getActiveTickets()}>
                                <Text
                                    style={{
                                        marginVertical: 10,
                                        color: COLORS.DARK_GREEN,
                                        fontSize: 15,
                                    }}>
                                    Reload
                                </Text>
                            </Pressable>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        // refreshing={refresh}
                        // onRefresh={onRefresh}
                        colors={[COLORS.DARK_GREEN]}
                    />
                }
                renderItem={item => {
                    return <Card list={item} />;
                }}
            /> */}
      {completedData ? (
        <View style={{height: '100%'}}>
          <FlatList
            data={completedData}
            renderItem={({item}) => {
              return <Card item={item} />;
            }}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: COLORS.GREY2,
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
          }}>
          <Text style={{color: COLORS.BLACK}}>No Request Available</Text>
          <TouchableOpacity
            onPress={() => {
              if (!userNumber) {
                setLoginModal(loginModal);
              }
              getActiveTickets();
            }}>
            <Text
              style={{
                marginVertical: 10,
                color: COLORS.DARK_GREEN,
                fontSize: 15,
              }}>
              Reload
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ProfilePopup loginModal={loginModal} setLoginModal={setLoginModal} />
    </View>
  );
};

export default Completed;
