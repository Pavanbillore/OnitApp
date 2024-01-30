import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class Note extends React.Component {
  render() {
    return (
      <View style={styles.note}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 22, width: 25, marginLeft: 17, marginTop: 5 }}
            source={require("../../assets/logo/cld.png")}
          />
          <Text style={styles.noteText}>{this.props.val.n}</Text>
        </View>
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
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#fff",
            // height: 30,
            borderTopWidth: 1,
            borderColor: "#ddd",
            flexDirection: "row",
          }}
        >
          <Text style={styles.noteText2}>{this.props.val.note}</Text>
          <Text style={styles.noteText3}>₹{this.props.val.a}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: "#fff",
    position: "relative",
    //padding: 20,
    paddingRight: 70,
    borderBottomWidth: 2,
    borderBottomColor: "#ededed",
    // height: 90,
    marginBottom: 10,
  },
  noteText: {
    // paddingLeft: 20,
    // borderLeftWidth: 10,
    borderLeftColor: "#fff",
    marginTop: 7,
    // marginBottom: 5,
    marginLeft: 10,
    color: "#00796A",
    fontWeight: "700",
  },
  noteText2: {
    // paddingLeft: 20,
    // borderLeftWidth: 10,
    borderLeftColor: "#fff",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    color: "black",
    fontWeight: "bold",
    width: "70%",
  },
  noteText3: {
    // paddingLeft: 20,
    // borderLeftWidth: 10,
    borderLeftColor: "#fff",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    color: "black",
    fontWeight: "400",
    width: "50%",
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
