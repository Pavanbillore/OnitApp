import React,{useState} from "react";
import {  KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    Image, } from "react-native";
    import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Daily from "../TabsScreen/Daily";
import Weekly from "../TabsScreen/Weekly";
import Monthly from "../TabsScreen/Monthly";
import Icon from "../../utils/components/Icon";

const PersonalCare = ({ navigation }) => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.personalExpenseWrapper}>
        <Text style={styles.sectionTitle}>Personal Expense</Text>
        <View style={styles.items}>
          <View style={styles.itemBox}>
            <Text
              style={{
                paddingLeft: 10,
                paddingTop: 10,
              }}
            >
              You Owe
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                color: "#00796A",
                fontWeight: "600",
              }}
            >
              ₹680
            </Text>
          </View>
          <View style={styles.itemBox}>
            <Text
              style={{
                paddingLeft: 10,
                paddingTop: 10,
              }}
            >
              You are Owed
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                color: "#DD3131",
                fontWeight: "600",
              }}
            >
              ₹200
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F2BB13",
              width: "32%",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                color: "white",
              }}
            >
              Balance
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                color: "white",
                fontWeight: "600",
              }}
            >
              ₹480
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
            marginHorizontal: 20,
          }}
        >
          {/* Top tab navigation  */}
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#e91e63",
              tabBarLabelStyle: { fontSize: 12 },
            }}
          >
            <Tab.Screen name="Daily" component={Daily} />
            <Tab.Screen name="Weekly" component={Weekly} />
            <Tab.Screen name="Monthly" component={Monthly} />
          </Tab.Navigator>
          {/* <Text>Daily, Weekly, Monthly Report Here</Text> */}
        </View>
        {/* Expense Date  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 1,
            backgroundColor: "white",
            height: 70,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon family="AntDesign" name="clockcircleo" size={20} color={"black"} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
              }}
            >
              18 April, Monday
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#579AFF", marginRight: 25 }}>₹5000</Text>
            <Text style={{ color: "#D92B2A" }}>₹1,730</Text>
          </View>
        </View>

        {/* Expense Report  */}
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 1,
              backgroundColor: "white",
              height: 70,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <BuildingIcon name="building" size={25} color={"#00796A"} /> */}
              <Image
                source={require("../../assets/image/money.png")}
                style={{
                  resizeMode: "contain",
                  width: 30,
                  height: 30,
                }}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                  }}
                >
                  Cash
                </Text>
                <Text style={{ marginLeft: 10 }}>Online food order</Text>
              </View>
            </View>
            <Text style={{ color: "#D92B2A" }}>₹178-</Text>
          </View>
        </TouchableOpacity>

        {/* Paytm Sample Expense  */}
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 1,
              backgroundColor: "white",
              height: 70,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/image/paytm.png")}
                style={{
                  resizeMode: "contain",
                  width: 30,
                  height: 30,
                }}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                  }}
                >
                  Paytm
                </Text>
                <Text style={{ marginLeft: 10 }}>Cab to home</Text>
              </View>
            </View>
            <Text style={{ color: "#D92B2A" }}>₹180-</Text>
          </View>
        </TouchableOpacity>

        {/* Add New button  */}
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: "#00796A",
              marginHorizontal: 110,
              height: 50,
              // width: 120,
              borderRadius: 30,
            }}
          >
            <Icon name="pluscircleo" family="AntDesign" size={20} color={"white"} />
            <Text style={{ marginLeft: 5, color: "white" }}>Add New</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  );
};

export default PersonalCare;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
      },
      personalExpenseWrapper: {
        paddingTop: 20,
        paddingHorizontal: 0,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 15,
      },
      items: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        height: 70,
        marginHorizontal: 20,
      },
      writeTaskWrapper: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: 250,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#00796A",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
      },
      addText: {
        color: "#fff",
        fontSize: 30,
      },
      itemBox: {
        backgroundColor: "white",
        width: "32%",
        borderRadius: 10,
      },
});
