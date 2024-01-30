import React, { useState, useEffect } from "react";
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
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
const { height, width } = Dimensions.get("window");

import All from "../Message/All";
import Friends from "../Message/Friends";
import Technician from "../Message/Technician";

const TabNavigator = createMaterialTopTabNavigator(
    {
        All: {
            screen: All,
            navigationOptions: {
                tabBarLabel: "All",
                // showLabel: ({ focused }) => {
                //   console.log(focused);
                //   return focused ? true : false;
                // },
            },
        },
        Friends: {
            screen: Friends,
            navigationOptions: {
                tabBarLabel: "Friends",
                // showLabel: ({ focused }) => {
                //   console.log(focused);
                //   return focused ? true : false;
                // },
            },
        },
        Technician: {
            screen: Technician,
            navigationOptions: {
                tabBarLabel: "Technician",
                // showLabel: ({ focused }) => {
                //   console.log(focused);
                //   return focused ? true : false;
                // },
            },
        },
    },
    {
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: "#00796A",
            inactiveTintColor: "#161716",
            indicatorStyle: {
                backgroundColor: "#00796A",
            },
            labelStyle: {
                fontWeight: "600",
                fontSize: 14,
            },

            style: {
                backgroundColor: "#fff",
                borderColor: "#fff",
                shadowColor: "#ddd",
                marginTop: 0,
                height: 40,
            },
        },
    }
);

const Navigator = createAppContainer(TabNavigator);
const Message = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
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
                    padding: 10

                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require("../../assets/logo/back.png")}
                        style={{
                            height: 26,
                            width: 27,
                        }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        paddingLeft: 100,
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#000"
                    }}
                >
                    Messages
                </Text>
            </View>
            <View
                style={{ flexDirection: "row", backgroundColor: "#fff", height: 60 }}
            >
                <View
                    style={{

                        //justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        height: 50,
                        marginTop: 10,
                        marginLeft: 14,
                        width: "85%",
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 23,
                            fontWeight: "700",
                            marginLeft: 10,
                            color: "#000"
                        }}
                    >
                        Chat
                    </Text>
                    <View style={{ flexGrow: 1, alignItems: "center" }}>
                        <Text style={{ fontWeight: '600', color: "#00796A", fontSize: 25 }}>
                            coming soon
                        </Text>
                    </View>


                    {/* <Image
            source={require("../../assets/logo/notif.png")}
            style={{
              margin: 10,
              height: 25,
              width: 23,
              marginLeft: 270,
            }}
          /> */}
                </View>

            </View>
            {/* <Navigator>
        <Message />
      </Navigator> */}
        </View>
    );
};

export default Message;

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
