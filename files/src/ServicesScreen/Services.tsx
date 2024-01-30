//services
import React, { useState, useRef, Component, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Color,
  Image,
  TextInput,
  ImageRequireSource,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { BottomSheet } from "react-native-btr";
const { width, height } = Dimensions.get("window");
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import LocationDetail from "../../utils/components/LocationDetail";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../backend/slice";
import Icon from "../../utils/components/Icon";
import RazorpayCheckout from "react-native-razorpay";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Services = ({ navigation, route }) => {
  const services = route.params;
  const styleTypes = ["dark-content"];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [choosenDate, setChoosenDate] = useState();
  const [choosenTime, setChoosenTime] = useState();
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);
  const [width, setWidth] = useState();

  const [text, setText] = useState();
  const [alternate, setAlternate] = useState();
  const [houseno, setHouseno] = useState();
  const [local, setLocality] = useState();
  const [cit, setCity] = useState();
  const [pincod, setPincode] = useState();
  const [stat, setStat] = useState();
  // const [contry, setCountry] = useState();
  const [naam, setName] = useState();
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  //console.log(pincode);
  //console.log(houseno);
  //8 console.log(selectedValue);
  //console.log(mobile_number);
  const buttonWidth = Dimensions.get("window").width - 20;

  const phoneNumber = useSelector((state) => state.auth.userInfo);
  const city = useSelector((state) => state.auth.city);
  const country = useSelector((state) => state.auth.country);
  const district = useSelector((state) => state.auth.district);
  const name = useSelector((state) => state.auth.name);
  const region = useSelector((state) => state.auth.region);
  const street = useSelector((state) => state.auth.street);
  const streetNumber = useSelector((state) => state.auth.streetNumber);
  const subRegion = useSelector((state) => state.auth.subRegion);

  const inputRef = useRef();
  const handleButtonPress = () => {
    inputRef.current.focus();
  };

  // date handlers
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date.toLocaleTimeString());

    setChoosenDate(date.toLocaleDateString());
    // timeFormatter(date.toLocaleTimeString());
    setChoosenTime(date.toLocaleTimeString());
    hideDatePicker();
  };

  const timeFormatter = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setChoosenTime(formattedTime);
  };
  // date handler end

  const onsubmit = async () => {
    setVisible(true);
    let specific_requirement = text;
    let mobile_number = alternate ? alternate : phoneNumber;
    let house_number = houseno;
    let locality = district;
    let city = city;
    let state = region;
    let pincode = pincod;
    let country = country;
    let name = naam;
    let time_preference_type = selectedValue;

    let payload = {
      personal_details: {
        primary_phone: {
          country_code: "+91",
          mobile_number: alternate ? alternate : phoneNumber,
        },
        alternate_phone: {
          country_code: "+91",
          mobile_number: alternate ? alternate : phoneNumber,
        },
        name: naam,
      },
      specific_requirement: specific_requirement,
      service_provided_for: "637b7a0e7c7cd9e139b39d1e",
      address_details: {
        house_number: houseno,
        locality: local,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
      },
      time_preference: {
        time_preference_type: "WITHIN_24_HOURS",
        specific_date_time: "2022-11-18T09:42:47.361Z",
      },
      offers_applied: {
        offer_code: "OniT 2022",
      },
    };

    console.log(payload);
    try {
      await axios({
        method: "post",
        url: "https://api.onit.services/center/public-ticket-booking",
        data: payload,
        // config: {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // },
      }).then(() => {
        setVisible(false);
        ToastAndroid.show("Request Raised", ToastAndroid.SHORT);
        // navigation.navigate("SuccessFull", { data: payload },);
        navigation.navigate("SuccessFull", services);
      });
    } catch (error) {
      setVisible(false);
      ToastAndroid.show(
        error?.response?.data?.message + "!",
        ToastAndroid.SHORT
      );
    }
  };
  // razorpay code
  <TouchableHighlight
    onPress={() => {
      var options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: "", // Your api key
        amount: "5000",
        name: "foo",
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Razorpay Software",
        },
        theme: { color: "#F37254" },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    }}
  ></TouchableHighlight>;
  // Razorpay code end
  const [pickerValue, setPickerValue] = useState("");
  const [showDatPicker, setShowDatPicker] = useState(false);
  const handleValueChange = (value) => {
    setPickerValue(value);
    if (value === "date") {
      setShowDatPicker(true);
    } else {
      setShowDatPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        {/* <TouchableOpacity
        // onPress={toggleBottomNavigationView}
        >
          <Image
            source={require("../../assets/logo/location.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity> */}

        {/* for bottomsheet */}
        {/* <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: "60%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          > */}
        {/* <Text
              style={{
                margin: 15,
                marginLeft: 15,
              }}
            >
              Fill the details:
            </Text> */}
        {/* alternate no */}
        {/* <View style={styles.msgStyle}>
              <TextInput
                style={{
                  flex: 1,
                  fontWeight: "700",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 15,
                }}
                placeholder="Alternate Mobile no "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                //  ref={mobileNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View> */}
        {/* House no */}
        {/* <View style={styles.msgStyle}>
              <TextInput
                style={{
                  flex: 1,
                  fontWeight: "700",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 15,
                }}
                placeholder="House no "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                // onChangeText={(text) => this.setState({ houseno: text })}
              />
            </View> */}

        {/* Locality  */}
        {/* <View style={styles.msgStyle}>
              <TextInput
                style={{
                  flex: 1,
                  fontWeight: "700",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 15,
                }}
                placeholder="Locality "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                //  onChangeText={(text) => this.setState({ locality: text })}
              />
            </View> */}
        {/* City & pin code */}
        {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginLeft: 22,
                marginRight: 22,
              }}
            >
              <TextInput
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: "black",
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                  height: 56,
                  width: "48%",
                  padding: 20,
                  marginTop: 0,
                }}
                placeholder="City "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                //     onChangeText={(text) => this.setState({ city: text })}
              />
              <TextInput
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: "black",
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                  height: 56,
                  width: "48%",
                  padding: 20,
                  marginTop: 0,
                }}
                placeholder="Pincode "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                onChangeText={(text) => this.setState({ pincode: text })}
              />
            </View> */}

        {/* State & Country */}
        {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginLeft: 22,
                marginRight: 22,
              }}
            >
              <TextInput
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: "black",
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                  height: 56,
                  width: "48%",
                  padding: 20,
                  marginTop: 10,
                }}
                placeholder="State "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                returnKeyLabel={"next"}
                ///  onChangeText={(text) => this.setState({ state: text })}
              />
              <TextInput
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: "black",
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                  height: 56,
                  width: "48%",
                  padding: 20,
                  marginTop: 10,
                }}
                placeholder="Country "
                underlineColorAndroid="transparent"
                placeholderTextColor="#737373"
                defaultValue="India"
                returnKeyLabel={"next"}
                onChangeText={(text) => this.setState({ country: text })}
              />
            </View> */}
        {/* button  */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Plumber")}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: "80%",
                  borderRadius: 50,
                  backgroundColor: "#00796A",
                  marginLeft: 125,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontsize: 14,
                    color: "#fff",
                    marginLeft: 50,
                    marginRight: 50,
                  }}
                >
                  Next
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet> */}

        <LocationDetail color={"#00796A"} />
      </View>

      {/* for choosed service section */}
      <View style={styles.serviceTitle}>
        <Image
          source={require("../../assets/logo/ac.png")}
          style={styles.imageStyle}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: "700",
            fontSize: 18,
            color: "black",
            marginLeft: 15,
          }}
        >
          {services.name}
        </Text>
        <Image
          source={require("../../assets/logo/down.png")}
          style={{ height: 25, width: 25 }}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            // marginTop: 15,
            fontWeight: "600",
          }}
        >
          Please fill the details:
        </Text>
      </View>

      {/* for Details section */}

      <View style={{ height: 250 }}>
        {/* For name */}
        <ScrollView>
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              underlineColorAndroid="transparent"
              placeholder="Specific Requirement "
              onChangeText={(newText) => setText(newText)}
              defaultValue={text}
              placeholderTextColor="#737373"
            />
          </View>
          {/* for visit schedule */}
          <View style={styles.withinStyle}>
            <Image
              source={require("../../assets/logo/Clock.png")}
              style={{
                height: 30,
                width: 25,
                marginLeft: 10,
                justifyContent: "flex-start",
              }}
            />
            <Picker
              selectedValue={selectedValue}
              style={{
                // height: 50,
                width: 250,
                fontWeight: "600",
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Within 24 Hours" value="Within 24 Hours" />
              <Picker.Item label="Immediately" value="Immediately" />

              <Picker.Item
                label="Specific Date & time"
                value="Specific Date & time"
              />
            </Picker>
          </View>
          {/* Calender Picker  */}
          {selectedValue === "Specific Date & time" && (
            <View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              {/* Selected date  */}
              <TouchableOpacity onPress={showDatePicker}>
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    height: 50,
                    marginLeft: 22,
                    marginBottom: 20,
                    marginRight: 22,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#ddd",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 15,
                      // color: "#737373",
                      marginLeft: 15,
                    }}
                  >
                    {choosenDate + " | " + choosenTime}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              height: 50,
              marginTop: -15,
              marginLeft: 22,
              marginBottom: 10,
              marginRight: 22,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              underlineColorAndroid="transparent"
              placeholder="Name (contact person) "
              onChangeText={(newText) => setName(newText)}
              defaultValue={naam}
              placeholderTextColor="#737373"
            />
          </View>
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              ref={inputRef}
              placeholder="Alternate Mobile no "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setAlternate(newText)}
              defaultValue={phoneNumber || alternate}
              keyboardType="number-pad"
              maxLength={10}
            />

            {/* <TouchableOpacity > */}
            <Icon
              name="pencil-outline"
              family="MaterialCommunityIcons"  
              size={20}
              color={"black"}
              onPress={handleButtonPress}
            />
            {/* </TouchableOpacity> */}
          </View>
          {/* House no */}
          <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              placeholder="House no "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setHouseno(newText)}
              defaultValue={houseno}
            />
          </View>
          {/* Locality  */}
          {/* <View style={styles.msgStyle}>
            <TextInput
              style={{
                flex: 1,
                fontWeight: "700",
                fontSize: 15,
                color: "black",
                marginLeft: 15,
              }}
              placeholder="Locality "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setLocality(newText)}
              defaultValue={local}
            />
          </View> */}
          {/* City & pin code */}
          <View style={{ marginLeft: 22 }}>
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "94%",
                padding: 20,
                marginTop: 0,
              }}
              placeholder="Pincode "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setPincode(newText)}
              defaultValue={pincod}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
          {/* State & Country */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 10,
              }}
              placeholder="State "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setStat(newText)}
              defaultValue={stat}
            />
            <TextInput
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "black",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
                height: 56,
                width: "48%",
                padding: 20,
                marginTop: 10,
              }}
              placeholder="Country "
              underlineColorAndroid="transparent"
              placeholderTextColor="#737373"
              defaultValue="India"
              returnKeyLabel={"next"}
              onChangeText={(newText) => setCountry(newText)}
              defaultValue={contry}
            />
          </View> */}
        </ScrollView>
      </View>

      {/* for coupon */}
      <View
        style={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            marginTop: 5,
            fontWeight: "600",
          }}
        >
          Offer Code
        </Text>
        <View style={styles.couponStyle}>
          <Image
            source={require("../../assets/logo/tag.png")}
            style={{ height: 30, width: 25, marginLeft: 10 }}
          />
          <TextInput
            style={{
              flex: 0.87,
              fontWeight: "700",
              fontSize: 18,
              color: "black",
              marginLeft: 35,
            }}
            placeholder="onit2023"
            underlineColorAndroid="transparent"
            //placeholderTextColor=""
          />
          {/* <Text style={{ color: "#0066FF" }}>change</Text> */}
        </View>
      </View>

      {/* for amount */}
      <View style={styles.cStyle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            margin: 10,
          }}
        >
          <Text>ADVANCE</Text>
          <Text>₹99</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            margin: 10,
          }}
        >
          <Text>Service Total</Text>
          <Text>₹200</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            margin: 10,
          }}
        >
          <Text>Total</Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#00796A" }}>
            ₹200
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          width: buttonWidth,
          backgroundColor: "#00796A",
          height: 50,
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 3,
        }}
        //</View>onPress={() => { console.log("coming soon") }}>
        // onPress={() => {
        //   navigation.navigate("SuccessFull");
        // }}

        onPress={onsubmit}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: 18,
            letterSpacing: 1,
            textAlign: "center",
            position: "relative",
            color: "#fff",
          }}
        >
          Confirm Booking
        </Text>
      </TouchableOpacity>

      <StatusBar backgroundColor="#fff" barStyle={styleStatusBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    height: height,
    width: width,
    // alignItems: "center",
    justifyContent: "space-between",
  },
  sectionStyle: {
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
    height: 65,
    marginLeft: 0,
  },
  imageStyle: {
    //padding: 10,
    //margin: 5,
    height: 25,
    width: 25,
    //resizeMode: 'stretch',
    alignItems: "center",
    marginLeft: 20,
  },
  serviceTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    // marginTop: 15,
  },
  msgStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    marginTop: 0,
    marginLeft: 22,
    marginBottom: 10,
    marginRight: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  withinStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    margin: 22,
    marginTop: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  couponStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#00796A",
    borderStyle: "dashed",
  },
  cStyle: {
    //flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    height: 130,
    marginTop: 20,
  },
  inStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00796A",
    height: 56,
    margin: 16,
    marginBottom: 16,
    marginTop: 105,
    borderRadius: 2,
  },
  textStyle: {
    color: "#fff",
  },
});

export default Services;
