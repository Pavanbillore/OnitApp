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
  FlatList,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { color } from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
import TelephoneIcon from "react-native-vector-icons/Foundation";
import samplePlumberList from "../../const/samplePlumberList";
import PlusIcon from "../../assets/image/plusIcon.png";
import EditIcon from "react-native-vector-icons/Entypo";
import FolderIcon from "../../assets/image/folder.png";
import Close from "../../assets/image/close.png";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";

const TechnicianTab = () => {
  // const [text, onChangeText] = useState("");

  // const extraction = samplePlumberList.filter((curElem) => {
  //   return curElem.name.toLowerCase().includes(text.toLowerCase());
  // });
  // let folderArray = [
  //   {
  //     id: 1,
  //     name: "Naruto Uzumaki",
  //     contactNumber: "+91-8656564543",
  //     img: require("../../assets/image/naruto.png"),
  //   },
  // ];
  const [modal, setModal] = useState(false);
  // const [folder, setFolder] = useState(folderArray);
  const [folder, setFolder] = useState(samplePlumberList);
  const [folderName, setFolderName] = useState("");
  const [phoneNumber, SetPhoneNumber] = useState("");

  const createFolder = function (name, contactNumber) {
    let clone = [...folder];
    let data = {
      name,
      contactNumber,
      img: require("../../assets/image/profile.png"),
    };
    clone.push(data);
    setFolderName(data);
    SetPhoneNumber(data);
    setFolder(clone);
    setModal(modal ? false : true);
  };
  const deleteFolder = function (key) {
    let cloneArray = [...folder];
    cloneArray.splice(key, 1);
    setFolder(cloneArray);
  };

  const openModal = function () {
    setModal(modal ? false : true);
  };
  const moveToContactDetail = function () {
    props.navigation.navigate("ServiceNeeds");
  };

  const Card = ({ technicianListing }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: 80,
          marginTop: 1,
          borderWidth: 0.55,
          borderBottomColor: "#F3F4F9",
          borderTopColor: "#fff",
          borderLeftColor: "#fff",
          borderRightColor: "#fff",
        }}
      >
        <Image
          source={technicianListing.img}
          style={{
            height: 50,
            width: 50,
            alignItems: "center",
            marginLeft: 5,
            borderRadius: 50,
            borderWidth: 1,
            // borderColor: "green",
          }}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: "700",
            fontSize: 16,
            color: "black",
            marginLeft: 15,
            //marginTop: -6,
          }}
        >
          {technicianListing.name}
          {"\n"}
          <Text
            style={{
              flex: 0.9,
              fontWeight: "700",
              fontSize: 13,
              color: "#1B2D1B",
              marginLeft: 15,
            }}
          >
            {technicianListing.contactNumber}
          </Text>
        </Text>
        {/* Edit button  */}
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#CCE4E1",
              height: 30,
              width: 30,
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <TelephoneIcon name="telephone" size={20} color={"#00796A"} /> */}
            <EditIcon name="edit" size={20} color={"#00796A"} />
          </View>
        </TouchableOpacity>
        {/* Delete button  */}
        <TouchableOpacity onPress={deleteFolder}>
          <View
            style={{
              backgroundColor: "#CCE4E1",
              height: 30,
              width: 30,
              borderRadius: 7,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteIcon name="delete-forever" size={25} color={"#DD2C2B"} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 30,
          marginLeft: 20,
          marginBottom: 15,
          alignContent: "center",
        }}
      >
        Plumber
      </Text>

      {/* <ScrollView>
        
      </ScrollView> */}
      <FlatList
        // data={samplePlumberList}
        data={folder}
        renderItem={({ item }) => {
          return <Card technicianListing={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal and plus icon  */}

      {!modal ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TouchableOpacity onPress={() => setModal(modal ? false : true)}>
            <View style={styles.addWrapper}>
              <Image style={styles.icon} source={PlusIcon} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderSection}>
              <View style={styles.modalHeaderSectionTop}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image style={styles.icon} source={FolderIcon} />
                  <Text style={styles.modalHeaderText}>Create New Contact</Text>
                </View>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <Image style={styles.icon} source={Close} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                height: 50,
                marginTop: 20,
              }}
            >
              <TextInput
                style={styles.input}
                onChangeText={(text) => setFolderName(text)}
                value={folderName}
                placeholder="Contact Name"
              />

              <TextInput
                style={{
                  width: "100%",
                  padding: 4,
                  marginTop: 5,
                  // backgroundColor: "#ebf4f3",
                }}
                onChangeText={(text) => SetPhoneNumber(text)}
                value={phoneNumber}
                placeholder="Phone Number"
              />
            </View>

            <TouchableOpacity
              onPress={() => createFolder(folderName, phoneNumber)}
              style={styles.button}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* <TouchableOpacity>
        <View style={styles.addWrapper}>
          <Image style={styles.icon} source={PlusIcon} />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default TechnicianTab;

const styles = StyleSheet.create({
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
  modalContainer: {
    height: "30%",
    width: "100%",
    // backgroundColor: "white",
    alignItems: "center",
    position: "absolute",
    // marginHorizontal: 20,
    bottom: 0,
  },
  modalUpperSection: {
    display: "flex",
    backgroundColor: "green",
  },

  modalHeaderSection: {
    padding: 2,
    marginTop: 20,
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  modalHeaderSectionTop: {
    flexDirection: "row",
    width: "95%",
    // marginRight: 50,
    // alignItems: "center",
    justifyContent: "space-between",
  },
  closeIcon: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 25,
  },
  modalHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  writeTaskWrapper: {
    right: 25,
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },
  input: {
    width: "100%",
    padding: 4,
    // backgroundColor: "#ebf4f3",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: "90%",
    padding: 6,
    borderRadius: 4,
    // marginHorizontal: 20,
    backgroundColor: "#00796A",
  },
});
