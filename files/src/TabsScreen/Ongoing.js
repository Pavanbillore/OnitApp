import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
// import ExclamationIcon from "react-native-vector-icons/FontAwesome";
// import BellIcon from "react-native-vector-icons/FontAwesome";
// import CalenderIcon from "react-native-vector-icons/Feather";
// import ClockIcon from "react-native-vector-icons/AntDesign";
import Icon from "../../utils/components/Icon";

const Ongoing = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <View
        style={{
          height: 200,
          borderColor: "#F1F1F1",
          borderWidth: 2,
          marginTop: 8,
        }}
      >
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 40 }}
              source={require("../../assets/logo/ac.png")}
            />
            <Text style={{ fontSize: 19, fontWeight: "600", paddingLeft: 5 }}>
              AC Service
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Icon family="Feather" name="calendar" size={20} color={"black"} />
              <Text style={{ color: "#161716", paddingLeft: 5 }}>
                10th March 2023
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Icon family="AntDesign" name="clockcircleo" size={20} color={"black"} />
              <Text style={{ color: "#161716", paddingLeft: 5 }}>
                09:00 - 11:00
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "#161716" }}>
            Booking ID: AA1585
          </Text>
          <View
            style={{
              backgroundColor: "#0066FF",
              borderRadius: 4,
              height: 30,
              paddingVertical: 2,
              paddingHorizontal: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Accepted</Text>
          </View>
        </View>
        {/* separator  */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#F1F1F1",
            marginHorizontal: 10,
          }}
        ></View>
        <View
          style={{
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 20,
            justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon family="FontAwesome"
              name="exclamation-triangle"
              size={20}
              color={"#F7DD00"}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1D4831",
                paddingLeft: 5,
              }}
            >
              Problem:
            </Text>
          </View>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "#1D4831" }}>
            Basic Yearly Service
          </Text>
        </View>

        {/* separator  */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#F1F1F1",
            marginHorizontal: 10,
          }}
        ></View>
        <View
          style={{
            flex: 1,
            paddingTop: 5,
            paddingHorizontal: 20,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Image
            source={require("../../assets/image/bellIcon.svg")}
            style={{ width: 15, height: 15, resizeMode: "contain" }}
          /> */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon family="FontAwesome" name="bell" size={20} color={"#E62E2D"} />
            <Text style={{ fontSize: 16, fontWeight: "600", paddingLeft: 5 }}>
              Please Call me ASAP
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#00796A",
              borderRadius: 4,
              height: 32,
              paddingVertical: 2,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Re-Schedule</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Ongoing;
