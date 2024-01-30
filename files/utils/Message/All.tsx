import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Friends from './Friends';
import Technician from './Technician';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../const/constants';
import Icon from '../components/Icon';
const { height, width } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const TopTabs = (props: any) => {
  const { mainTab, secondaryTab } = props;
  useEffect(() => {
    console.log(mainTab + ' HOME ' + secondaryTab);
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={'Requests'}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#00796A', height: 2 },
        tabBarActiveTintColor: '#00796A',
        tabBarInactiveTintColor: '#000000',
        tabBarPressColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: 'capitalize',
          fontFamily: 'poppins-bold',
        },
        swipeEnabled: true,
      }}>
      <Tab.Screen name={'Friends'} component={Friends} />
      {/* <Tab.Screen name={'Technician'} component={Technician} /> */}
    </Tab.Navigator>
  );
};

const All = (props: any) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.GREY2 }}>
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

      <TopTabs />
    </SafeAreaView>
  );
};

export default All;

const style = StyleSheet.create({});
