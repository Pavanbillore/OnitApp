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
import React, { useEffect } from "react";
import { useState } from "react";
import { color } from "react-native-reanimated";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");

import ContactsTab from "../TabsScreen/ContactsTab";
import Documents from "../TabsScreen/Documents";

// const TabNavigator = createMaterialTopTabNavigator(
//   {
//     ContactsTab: {
//       screen: ContactsTab,
//       navigationOptions: {
//         tabBarLabel: "Contacts",
//         showLabel: ({ focused }) => {
//           console.log(focused);
//           return focused ? true : false;
//         },
//       },
//     },
//     Documents: {
//       screen: Documents,
//       navigationOptions: {
//         tabBarLabel: "Documents",
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       upperCaseLabel: false,
//       activeTintColor: "#00796A",
//       inactiveTintColor: "#161716",
//       indicatorStyle: {
//         backgroundColor: "#00796A",
//       },
//       labelStyle: {
//         fontWeight: "600",
//         fontSize: 14,
//       },

//       style: {
//         backgroundColor: "#fff",
//         borderColor: "#fff",
//         shadowColor: "#fff",
//         marginTop: 0,
//         height: 40,
//       },
//     },
//   }
// );

// const Navigator = createAppContainer(TabNavigator);
const Contacts = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8F8F8",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
      <View
        style={{ flexDirection: "row", backgroundColor: "#fff", height: 60 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Homem")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              height: 41,
              marginTop: 10,
              marginLeft: 14,
              width: 20,
              borderRadius: 4,
            }}
          >
            <Image
              source={require("../../assets/logo/left.png")}
              style={{
                margin: 10,
                height: 24,
                width: 24,
                resizeMode: "stretch",
                alignItems: "center",
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00796A1A",
            height: 45,
            marginTop: 10,
            marginLeft: 14,
            width: "85%",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../assets/logo/search.png")}
            style={{
              margin: 10,
              height: 20,
              width: 20,
              resizeMode: "stretch",
              alignItems: "center",
            }}
          />
          <TextInput
            style={{
              flex: 1,
              fontWeight: "500",
              fontSize: 15,
              color: "black",
              marginLeft: 5,
              letterSpacing: 0,
            }}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },

  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 5,
  },
  btnTab: {
    width: "55%",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#fff",
    padding: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textTab: {
    fontSize: 18,
    color: "#161716",
  },
});
