import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Note from "./note";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteArray: [],
      noteText: "",
    };
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteNote(key)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>To Do</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => this.setState({ noteText })}
            value={this.state.noteText}
            placeholder="Write a Task"
            placeholderTextColor="black"
            underlineColorAndroid="transparent"
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={this.addTask.bind(this)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
  addTask() {
    if (this.state.noteText) {
      var date = new Date();

      this.state.noteArray.push({
        date:
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate(),
        note: this.state.noteText,
      });

      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: this.state.noteText });
    }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#F8F8F8",
    // alignItems: "start",
    justifyContent: "center",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: "stretch",
    color: "black",
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    height: 50,
    width: "70%",
    marginLeft: 15,
    marginBottom: 40,
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 35,
    backgroundColor: "#00796A",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 35,
  },
});
