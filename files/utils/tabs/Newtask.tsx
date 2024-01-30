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
import "react-native";
import { useState } from "react";
import { BottomSheet } from "react-native-btr";

const { height, width } = Dimensions.get("window");

const Newtask = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={toggle}>
        <Text>hi</Text>
      </TouchableOpacity>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Place your custom view inside BottomSheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Newtask;

const styles = StyleSheet.create({});
