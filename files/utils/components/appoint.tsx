import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          {/* <Text style={styles.itemText}>{props.text}</Text> */}
        </View>
        <View style={styles.circular}></View>
      </View>
      <View
        style={{
          height: 42,
          backgroundColor: "#fff",
          width: "100%",
          marginBottom: 20,
          borderTopColor: "#F8F8F8",
          borderTopWidth: 1,
        }}
      >
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginBottom: 20,
    marginLeft: 0,
    height: 42,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    height: 20,
    margin: 10,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: "600",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
