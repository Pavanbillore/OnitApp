// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {COLORS} from '../../const/constants';
// import Icon from '../../utils/components/Icon';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Requests from './Requests';
// import Completed from './Completed';
// import Ongoing from './Ongoing';

// const {width, height} = Dimensions.get('screen');

// const Tab = createMaterialTopTabNavigator();

// const BookingList = (props: any) => {
//   const {navigation} = props;
//   const TopTabs = ({mainTab, secondaryTab}: any) => {
//     return (
//     //   <Tab.Navigator
//     //     initialRouteName={'Requests'}
//     //     screenOptions={{
//     //       tabBarIndicatorStyle: {backgroundColor: '#00796A', height: 2},
//     //       tabBarActiveTintColor: '#00796A',
//     //       tabBarInactiveTintColor: '#000000',
//     //       tabBarPressColor: 'transparent',
//     //       tabBarLabelStyle: {
//     //         fontSize: 16,
//     //         textTransform: 'capitalize',
//     //         fontFamily: 'poppins-bold',
//     //       },
//     //       swipeEnabled: true,
//     //     }}>
//     //     <Tab.Screen name={'Requests'} component={Requests} />
//     //     {/* <Tab.Screen name={'Completed'} component={Completed} /> */}
//     //   </Tab.Navigator>
//       <Tab.Navigator
//         initialRouteName={'Requests'}
//         screenOptions={{
//           tabBarIndicatorStyle: {backgroundColor: '#00796A', height: 2},
//           tabBarActiveTintColor: '#00796A',
//           tabBarInactiveTintColor: '#000000',
//           tabBarPressColor: 'transparent',
//           tabBarLabelStyle: {
//             fontSize: 16,
//             textTransform: 'capitalize',
//             fontFamily: 'poppins-bold',
//           },

//           swipeEnabled: true,
//         }}>
//         {/* <Tab.Screen name={'Requests'} component={Requests} /> */}
//         <Tab.Screen name={'Ongoing'} component={Requests}/>
//         <Tab.Screen name={'Completed'} component={Completed} />
//       </Tab.Navigator>
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.GREY2}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           width: width,
//           alignItems: 'center',
//           backgroundColor: 'white',
//           height: 50,
//           elevation: 5,
//         }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{marginLeft: 10}}>
//           <Icon
//             family="MaterialIcons"
//             name="arrow-back-ios"
//             size={26}
//             color="black"
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: COLORS.BLACK,
//             fontSize: 18,
//             fontWeight: 'bold',
//             fontFamily: 'poppins',
//             alignSelf: 'center',
//             width: width * 0.75,
//             textTransform: 'capitalize',
//           }}>
//           {' '}Requests
//         </Text>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{borderRadius: 3, padding: 10}}>
//           <Icon
//             family="FontAwesome"
//             name="search"
//             size={26}
//             color={COLORS.DARK_GREEN}
//             style={{borderRadius:4}}
//           />
//         </TouchableOpacity>
//       </View>
//       <TopTabs />
//     </SafeAreaView>
//   );
// };

// export default BookingList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

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
import Friends from '../../utils/Message/Friends';
import Technician from '../../utils/Message/Technician';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../const/constants';
import Icon from '../../utils/components/Icon';
import Completed from './Completed';
import Requests from './Requests';
const { height, width } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const TopTabs = (props: any) => {
    const { mainTab, secondaryTab } = props;
    useEffect(() => {
        console.log(mainTab + ' HOME ' + secondaryTab);
    }, []);
    return (
        <Tab.Navigator
            initialRouteName={'OnGoing'}
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
            <Tab.Screen name={'OnGoing'} component={Requests} />
            <Tab.Screen name={'Completed'} component={Completed} />

        </Tab.Navigator>
    );
};

const All = (props: any) => {
    const { navigation } = props;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.GREY2 }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: 50,
                    elevation: 5,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginLeft: 10 }}>
                    <Icon
                        family="MaterialIcons"
                        name="arrow-back-ios"
                        size={26}
                        color="black"
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: COLORS.BLACK,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'poppins',
                        alignSelf: 'center',
                        width: width * 0.75,
                        textTransform: 'capitalize',
                    }}>
                    Requests
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ borderRadius: 3, padding: 10 }}>
                    <Icon
                        family="FontAwesome"
                        name="search"
                        size={26}
                        color={COLORS.DARK_GREEN}
                    />
                </TouchableOpacity>
            </View>
            <TopTabs />
        </SafeAreaView>
    );
};

export default All;

const style = StyleSheet.create({});
