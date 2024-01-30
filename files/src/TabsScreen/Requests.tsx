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
  } from "react-native";
  import React, { useState, useCallback, useEffect, useDebugValue } from "react";
  import Icon from "../../utils/components/Icon";
  import StarRating from "react-native-star-rating-widget";
  import { COLORS } from "../../const/constants";
  import { useDispatch, useSelector } from "react-redux";
  import { API, BASE_URL } from "../../utils/components/api";
  import { setActiveBookings } from "../../backend/slice";
  import axios from "axios";
  import moment from "moment";
  import LateLogin from "../../utils/components/LateLogin";
  import ProfilePopup from "../../utils/components/ProfilePopup";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Header from "../../utils/components/Header";
  
  const { height, width } = Dimensions.get("screen");
  
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  const Requests = (props: any) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const { activeBookings, userNumber, userData, allServices } = useSelector(
      (state: any) => state.auth
    );
    const [rating, setRating] = useState(4);
    const [refresh, setRefresh] = useState(false);
    const [activeData, setActiveData] = useState();
    const [service, setService] = useState([]);
    const [loginModal, setLoginModal] = useState(false);
  
    useEffect(() => {
      console.log("useEffect me hai");
  
      getActiveTickets();
    }, []);
  
    const getActiveTickets = async () => {
      const mobile = AsyncStorage.getItem("userNumber");
      console.log(mobile);
      try {
        console.log(
          "API ACTIVE TICKET DATA",
          API.GET_ACTIVE_TICKETS +
            userData?.personal_details?.phone?.mobile_number
        );
        const res = await axios({
          method: "get",
          url: `${BASE_URL}consumerAppAppRoute/consumerActiveTicket/${userData?.personal_details?.phone?.mobile_number}`,
        });
        if (res) {
          console.log("GET ACTIVE TICKET DATA", res.data?.data);
          setActiveData(res.data?.data);
          setTimeout(() => {
            dispatch(setActiveBookings(activeData));
          }, 1000);
        } else {
          console.log("API ERROR", res);
        }
      } catch (error) {
        console.log("ERROR Acti", error);
        console.log("ERROR Acti", error?.response?.data);
        console.log("ERROR Acti", mobile);
        console.log("ERROR Acti", userNumber);
      }
    };
  
    console.log("activeData", activeData);
  
    const Card = ({ item }: any) => {
      console.log("LIST", item);
  
      return (
        <ScrollView alwaysBounceVertical={true}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.WHITE,
            }}
            onPress={() =>
              navigation.navigate("BookingDetails", {
                id: item?._id,
                ticketData: item,
                serviceType: service,
                prevScreen: "Request",
              })
            }
            key={item._id}
          >
            <View
              style={{
                height: 184,
                borderColor: "#F1F1F1",
                borderWidth: 2,
                paddingTop: 8,
                marginBottom:8,
              }}
              key={item._id}
            >
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                  
                      <Image
                        style={{ width: 30, height: 40 }}
                        source={{
                          uri: item?.service_provided_for?.image,
                        }}
                      />
                    
                    
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          paddingLeft: 5,
                          color: COLORS.BLACK,
                          fontFamily: "poppins",
                        }}
                      >
                        {item?.service_provided_for?.service_name.split("-")[0] || "N"}
                      </Text>
                    
                  </View>
                
                {item?.time_preference && (
                  <View style={{
                    height:40,
                    bottom:8,
                    left:8
                  }}>
                    <Text style={{ color: "#161716" }}>
                    <Icon
                    name="calendar"
                    color={COLORS.BLACK}
                    family="Ionicons"
                    size={10}
                  />{" "}
                      {moment(
                        item?.time_preference?.specific_date_time
                      ).format("Do MMMM YYYY")}
                    </Text>
                    <Text style={{ color: "#161716" }}>
                    <Icon
                    name="time"
                    color={COLORS.BLACK}
                    family="Ionicons"
                    size={12}
                  />{" "}
                      {moment(
                        item?.time_preference?.specific_date_time
                      ).format("LT")}
                    </Text>
                  </View>
                )}
              </View>
  
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bottom:2
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: "#161716" }}
                >
                  Booking ID: {item?.ticket_id}
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.BLUE_LIGHT,
                    borderRadius: 4,
                    height: 28,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    justifyContent: "center",
                    marginBottom:7,
                    
                    
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>Accepted</Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#F1F1F1",
                  marginHorizontal: 10,
                }}
              ></View>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 5,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                  justifyContent: "space-between",
                  marginBottom:8,
                  bottom:4
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    family="FontAwesome"
                    name="exclamation-triangle"
                    size={20}
                    color={"#F7DD00"}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1D4831",
                      paddingLeft: 5,
                    }}
                  >
                    Problem:
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: COLORS.DARK_GREEN,
                  }}
                >
                  {item?.specific_requirement}
                </Text>
              </View>
  
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#F1F1F1",
                  marginHorizontal: 10,
                  marginTop:10,
                }}
              ></View>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                   top:1,
      
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: COLORS.GREY,
                  }}
                >
                  <Icon
                    name="bell"
                    color={COLORS.RED_DARK}
                    family="FontAwesome"
                    size={12}
                  />{" "}
                  Please call me ASAP
                </Text>
                <View
                  style={{
                    backgroundColor: "#00796A",
                    borderRadius: 4,
                    height: 30,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>
                    Re-Schedule
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    };
  
    return (
      <View style={{ flex: 1 }}>
        {activeData ? (
          <View style={{ height: "100%" }}>
            <FlatList
              data={activeData}
              renderItem={({ item }) => <Card item={item} />}
            />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: COLORS.GREY2,
              alignItems: "center",
              justifyContent: "center",
              height: height,
            }}
          >
            <Text style={{ color: COLORS.BLACK }}>No Request Available</Text>
            <TouchableOpacity
              onPress={() => {
                if (!userNumber) {
                  setLoginModal(loginModal);
                }
                getActiveTickets();
              }}
            >
              <Text
                style={{
                  marginVertical: 10,
                  color: COLORS.DARK_GREEN,
                  fontSize: 15,
                }}
              >
                Reload
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ProfilePopup loginModal={loginModal} setLoginModal={setLoginModal} />
      </View>
    );
  };
  
  export default Requests;
