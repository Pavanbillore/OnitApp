// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   ImageRequireSource,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { color } from "react-native-reanimated";
// import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// // import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
// const { height, width } = Dimensions.get("window");
// import Ongoing from "../TabsScreen/Ongoing";
// import Completed from "../TabsScreen/Completed";
// // import Icon from "../../utils/components/Icon";

// const TabNavigator = createMaterialTopTabNavigator(
//   {
//     Ongoing: {
//       screen: Ongoing,
//       navigationOptions: {
//         tabBarLabel: "Ongoing",
//         showLabel: ({ focused }) => {
//           console.log(focused);
//           return focused ? true : false;
//         },
//       },
//     },
//     Completed: {
//       screen: Completed,
//       navigationOptions: {
//         tabBarLabel: "Completed",
//         showLabel: ({ focused }) => {
//           console.log(focused);
//           return focused ? true : false;
//         },
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
// const MyBookings = ({ navigation }) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         // backgroundColor: "#F8F8F8",
//         backgroundColor: "white",
//       }}
//     >
//       <StatusBar
//         barStyle="dark-content"
//         hidden={false}
//         backgroundColor="#fff"
//       />
//       <View
//         style={{
//           flexDirection: "row",
//           backgroundColor: "#fff",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginHorizontal: 8,
//           height: 60,
//         }}
//       >
//         <TouchableOpacity onPress={() => navigation.navigate("Homem")}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "#fff",
//               height: 40,
//               marginTop: 10,
//               marginLeft: 14,
//               width: 20,
//               borderRadius: 4,
//             }}
//           >
//             <Image
//               source={require("../../assets/logo/left.png")}
//               style={{
//                 // margin: 10,
//                 height: 24,
//                 width: 24,
//                 resizeMode: "stretch",
//                 alignItems: "center",
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "600",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: 10,
//             }}
//           >
//             Requests
//           </Text>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "flex-end",
//               alignItems: "center",
//               backgroundColor: "#CCE4E1",
//               height: 45,
//               marginTop: 10,
//               // marginLeft: 14,
//               marginLeft: 200,
//               width: 45,
//               borderRadius: 10,
//             }}
//           >
//             {/* <Icon
//               name="search1"
//               family="AntDesign"
//               size={20}
//               color={"#00796A"}
//               style={{
//                 marginLeft: 5,
//               }}
//             /> */}
//             <TextInput
//               style={{
//                 flex: 1,
//                 fontWeight: "500",
//                 fontSize: 15,
//                 color: "black",
//                 marginLeft: 20,
//                 letterSpacing: 0,
//               }}
//               // placeholder="Search"
//               underlineColorAndroid="transparent"
//             />
//           </View>
//         </View>
//       </View>
//       <Navigator>
//         <MyBookings />
//       </Navigator>

//       {/* <SafeAreaView style={styles.container}> */}
//       {/* <View style={styles.listTab}> */}
//       {/* {listTab.map((e) => ( */}
//       {/* <TouchableOpacity */}
//       {/* style={styles.btnTab}> */}
//       {/* onPress={() => navigation.navigate("Task")}> */}
//       {/* <Text style={styles.textTab}>{e.status}</Text> */}
//       {/* </TouchableOpacity> */}
//       {/* // ))} */}
//       {/* // </View> */}
//       {/* </SafeAreaView> */}
//     </View>
//   );
// };

// export default MyBookings;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     justifyContent: "flex-start",
//   },

//   listTab: {
//     flexDirection: "row",
//     alignSelf: "center",
//     marginBottom: 5,
//   },
//   btnTab: {
//     width: "55%",
//     flexDirection: "row",
//     borderWidth: 0.5,
//     borderColor: "#fff",
//     padding: 8,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   textTab: {
//     fontSize: 18,
//     color: "#161716",
//   },
// });

import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

const MyBookings = (props) => (
  <View style={styles.container}>
    <Text>MyBookings Coming Soon</Text>
  </View>
  )
export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});