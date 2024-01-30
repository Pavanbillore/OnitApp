import React, { useEffect } from "react";
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
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import { color } from "react-native-reanimated";
const { height, width } = Dimensions.get("window");

const Technician = ({ navigation }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 30,
          marginLeft: 20,
          alignContent: "center",
        }}
      >
        Messages
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#777777",
          fontWeight: "600",
          marginTop: 7,
          marginLeft: 20,
          alignContent: "center",
        }}
      >
        You have 2 new Messages{" "}
      </Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 80,
            marginTop: 15,
            borderWidth: 0.55,
            borderBottomColor: "#F3F4F9",
            borderTopColor: "#fff",
            borderLeftColor: "#fff",
            borderRightColor: "#fff",
          }}
        >
          <Image
            source={require("../../assets/image/addss.png")}
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              marginLeft: 5,
              borderRadius: 50,
              borderWidth: 1,
              // borderColor: "green",
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: "700",
              fontSize: 16,
              color: "black",
              marginLeft: 15,
              //marginTop: -6,
            }}
          >
            Naruto Uzumaki{"\n"}
            <Text
              style={{
                flex: 0.9,
                fontWeight: "700",
                fontSize: 13,
                color: "#ddd",
                marginLeft: 15,
              }}
            >
              Let's eat Ichiraku Ramen 🍜
            </Text>
          </Text>
          <Text
            style={{
              color: "#00000014",
              fontSize: 14,
              marginTop: -20,
              marginRight: 15,
              fontWeight: "700",
            }}
          >
            Now
          </Text>
        </View>

        {/* For Second Chat */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 80,
            // marginTop: 15,
            borderWidth: 0.55,
            borderBottomColor: "#F3F4F9",
            borderTopColor: "#F3F4F9",
            borderLeftColor: "#fff",
            borderRightColor: "#fff",
          }}
        >
          <Image
            source={require("../../assets/image/addss.png")}
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              marginLeft: 5,
              borderRadius: 50,
              borderWidth: 1,
              // borderColor: "green",
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: "700",
              fontSize: 16,
              color: "black",
              marginLeft: 15,
              //marginTop: -6,
            }}
          >
            Sasuke Uchiha{"\n"}
            <Text
              style={{
                flex: 0.9,
                fontWeight: "700",
                fontSize: 13,
                color: "#ddd",
                marginLeft: 15,
              }}
            >
              Let's eat Ichiraku Ramen 🍜
            </Text>
          </Text>
          <Text
            style={{
              color: "#00000014",
              fontSize: 14,
              marginTop: -20,
              marginRight: 15,
              fontWeight: "700",
            }}
          >
            Now
          </Text>
        </View>

        {/* for 3 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 80,
            // marginTop: 15,
            borderWidth: 0.55,
            borderBottomColor: "#F3F4F9",
            borderTopColor: "#F3F4F9",
            borderLeftColor: "#fff",
            borderRightColor: "#fff",
          }}
        >
          <Image
            source={require("../../assets/image/addss.png")}
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              marginLeft: 5,
              borderRadius: 50,
              borderWidth: 1,
              // borderColor: "green",
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: "700",
              fontSize: 16,
              color: "black",
              marginLeft: 15,
              //marginTop: -6,
            }}
          >
            Kurama{"\n"}
            <Text
              style={{
                flex: 0.9,
                fontWeight: "700",
                fontSize: 13,
                color: "#ddd",
                marginLeft: 15,
              }}
            >
              Let's eat Ichiraku Ramen 🍜
            </Text>
          </Text>
          <Text
            style={{
              color: "#00000014",
              fontSize: 14,
              marginTop: -20,
              marginRight: 15,
              fontWeight: "700",
            }}
          >
            Now
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 80,
            // marginTop: 15,
            borderWidth: 0.55,
            borderBottomColor: "#F3F4F9",
            borderTopColor: "#F3F4F9",
            borderLeftColor: "#fff",
            borderRightColor: "#fff",
          }}
        >
          <Image
            source={require("../../assets/image/addss.png")}
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              marginLeft: 5,
              borderRadius: 50,
              borderWidth: 1,
              // borderColor: "green",
            }}
          />
          <Text
            style={{
              flex: 0.9,
              fontWeight: "700",
              fontSize: 16,
              color: "black",
              marginLeft: 15,
              //marginTop: -6,
            }}
          >
            Kakashi{"\n"}
            <Text
              style={{
                flex: 0.9,
                fontWeight: "700",
                fontSize: 13,
                color: "#ddd",
                marginLeft: 15,
              }}
            >
              Let's eat Ichiraku Ramen 🍜
            </Text>
          </Text>
          <Text
            style={{
              color: "#00000014",
              fontSize: 14,
              marginTop: -20,
              marginRight: 15,
              fontWeight: "700",
            }}
          >
            Now
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Technician;

const style = StyleSheet.create({});
