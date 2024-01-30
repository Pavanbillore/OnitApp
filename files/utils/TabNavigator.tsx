import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homemain from '../src/screens/Homemain';
import Wallet from './tabs/Wallet';
import Newtask from './tabs/Newtask';
import Message from './tabs/Message';
import MyAccount from './tabs/MyAccount';
import Icon from './components/Icon';
import { COLORS } from '../const/constants';
import BookingList from '../src/TabsScreen/BookingList';
import All from './Message/All';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          borderColor: 'rgba(52, 52, 52, 0.1)',
          borderWidth: 2,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 4,
          position: 'absolute',
          paddingVertical: 3,
          height: 60,
          bottom: -2

        },
        tabBarIcon: ({ focused }) => {
          let iconName, familyName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              familyName = 'Ionicons';
              break;
            case 'Wallet':
              iconName = 'wallet-outline';
              familyName = 'Ionicons';
              break;
            case 'Bookings':
              iconName = 'plus-circle';
              familyName = 'Feather';
              break;
            case 'Message':
              iconName = 'message-circle';
              familyName = 'Feather';
              break;
            case 'MyAccount':
              iconName = 'user';
              familyName = 'Feather';
              break;
          }
          return (
            <Icon
              family={familyName}
              name={iconName}
              color={focused ? COLORS.DARK_GREEN : COLORS.BLACK}
              size={18}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        // tabBarLabelStyle: styles.nav_text,
        tabBarLabel: route.name,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          bottom: 5,
        },

        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Homemain} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Bookings" component={BookingList} />
      <Tab.Screen name="Message" component={All} />
      {/* <Tab.Screen name='Chat' component={Chat} /> */}
      <Tab.Screen name="MyAccount" component={MyAccount} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  nav_image: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginVertical: 5,
  },
  nav_text: {
    fontSize: 10,
    fontFamily: 'poppins-medium',
    // color: '#00796a',
    alignSelf: 'center',
  },
});

export default TabNavigator;
