import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        {/* <Text style={styles.noteText}>{this.props.val.date}</Text> */}
        <Text style={styles.noteText}>{this.props.val.note}</Text>
        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.noteDelete}
        >
          {/* <Text style={styles.noteDeleteText}>Del</Text> */}
          <Image
            style={styles.noteDeleteText}
            source={require("../../assets/logo/rdlt.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: "#fff",
    position: "relative",
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 3,
    borderBottomColor: "#ededed",
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: "#e91e63",
  },
  noteDelete: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  noteDeleteText: {
    color: "white",
    height: 24,
    width: 22,
  },
});
