import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  Image,
  TextInput,
  ImageRequireSource,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from "react-native";
const { height, width } = Dimensions.get("window");
import RazorpayCheckout from "react-native-razorpay";

const Payment = ({ navigation }) => {
  const makePayment = async() => {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "n8ke6EPUy1Jf7ZAHRuusDZEm", // Your api key
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
      .then((data: any) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8F8F8",
        height: height,
        width: width,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ServiceNeeds");
          }}
        >
          <Image
            source={require("../../assets/logo/back.png")}
            style={{
              height: 26,
              width: 27,
              alignItems: "center",
              marginLeft: 10,
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 120,
            fontSize: 19,
            fontWeight: "600",
          }}
        >
          Payment
        </Text>
      </View>

      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 0,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        Pay Using:
      </Text>

      {/* for upi ssection */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 60,
          marginTop: 15,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Image
          source={require("../../assets/logo/upi.png")}
          style={{
            height: 30,
            width: 32,
            alignItems: "center",
            marginLeft: 5,
          }}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: "400",
            fontSize: 16,
            color: "black",
            marginLeft: 20,
          }}
        >
          UPI
        </Text>
        {/* <Text>hi</Text> */}
      </View>

      {/* for wallet section */}
      <TouchableOpacity onPress={() => ToastAndroid.show("COMING SOON", ToastAndroid.SHORT)}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 60,
          marginTop: 15,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Image
          source={require("../../assets/logo/pwallet.png")}
          style={{
            height: 20,
            width: 25,
            alignItems: "center",
            marginLeft: 5,
          }}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: "400",
            fontSize: 16,
            color: "black",
            marginLeft: 20,
          }}
        >
          Wallet
        </Text>
        <Text style={{ color: "green", fontSize: 16 }}>₹500</Text>
      </TouchableOpacity>

      {/*for card section  */}
      <View
        style={StyleSheet.paymentBlock}
      >
        <Image
          source={require("../../assets/logo/card.png")}
          style={{
            height: 25,
            width: 27,
            alignItems: "center",
            marginLeft: 4,
          }}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: "400",
            fontSize: 16,
            color: "black",
            marginLeft: 20,
          }}
        >
          Credit/Debit card
        </Text>
        {/* <Text>hi</Text> */}
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 0,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        Details:
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 56,
          margin: 16,
          marginBottom: 0,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontWeight: "600",
            fontSize: 15,
            color: "black",
            marginLeft: 15,
          }}
          label="Email"
          placeholder="Card Holder Name "
          underlineColorAndroid="transparent"
          placeholderTextColor="#737373"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 56,
          margin: 16,
          marginBottom: 5,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontWeight: "600",
            fontSize: 15,
            color: "black",
            marginLeft: 15,
          }}
          placeholder="Card Number "
          underlineColorAndroid="transparent"
          placeholderTextColor="#737373"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "96%",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontWeight: "600",
            fontSize: 15,
            color: "black",
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "#fff",
            marginLeft: 16,
            height: 56,
            padding: 20,
            marginTop: 12,
          }}
          placeholder="CVV "
          underlineColorAndroid="transparent"
          placeholderTextColor="#737373"
        />
        <TextInput
          style={{
            flex: 1,
            fontWeight: "600",
            fontSize: 15,
            color: "black",
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "#fff",
            marginLeft: 16,
            height: 56,
            padding: 20,
            marginTop: 12,
          }}
          placeholder="Valid Thru "
          underlineColorAndroid="transparent"
          placeholderTextColor="#737373"
        />
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 0,
          fontSize: 13,
          fontWeight: "400",
        }}
      >
        Save for later,Your Card is Secure{" "}
      </Text>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          width: "95%",
          backgroundColor: "#00796A",
          height: 50,
          marginTop: 60,
          marginLeft: 10,
          borderRadius: 3,
        }}
        //</View>onPress={() => { console.log("coming soon") }}>
        onPress={() => {
          alert("coming");
        }}
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
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  paymentBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
