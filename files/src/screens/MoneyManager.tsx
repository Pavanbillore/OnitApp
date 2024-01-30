import React, { useState, useEffect } from "react";
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
  ScrollView, FlatList, ToastAndroid
} from "react-native";
import groupList from '../../const/groupList';
import Icon from '../../utils/components/Icon';
import { BottomSheet } from 'react-native-btr';
import axios from "axios";
import { BASE_URL } from "../../utils/components/api";
import { useDispatch, useSelector } from 'react-redux';

const { height, width } = Dimensions.get("window");

const MoneyManager = ({ navigation }) => {
  const { accessToken, userId, allServices, userNumber, userData } = useSelector(
    (state: any) => state.auth,
  );
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [folderName, setFolderName] = useState('');
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = useState(false);
  const [folder, setFolder] = React.useState(groupList);
  const [data, setData] = useState('')
  const [result, setResult] = useState('')
  const [add, setAdd] = useState('')

  const createFolder = function (name) {
    let clone = [...folder];
    let data = {
      name,
      icon: (
        <Icon
          family="AntDesign"
          name="infocirlce"
          size={20}
          color={'#00796A'}
        />
      ),
    };
    clone.push(data);
    setFolderName(data);
    setFolder(clone);
    toggleBottomNavigationView();
  };

  useEffect(() => {

    fetchData()

  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}moneyManage/group/userGroupDetails/${userData?._id}`);
      setResult(response?.data?.groups)
      console.log('response', response?.data?.groups[0]?.groupMember); // Do something with the response data
    } catch (error) {
      console.error('hh', error);
    }
  };
  const AddUser = async () => {
    try {
      const payload = {
        groupName: data,
        groupAdmin: userData?._id,
        groupMember: ''
      }
      console.log('paddd', payload)
      await axios({
        method: "post",
        url: `${BASE_URL}moneyManage/group`,

        data: payload,
      })
        .then((res) => {
          setAdd(res?.data?.data)
          setVisible(false)
          fetchData()
          console.log("asss", res?.data?.username)
          ToastAndroid.show('Group Add Successfully', ToastAndroid.SHORT)

        })
        .catch((error) => {
          console.log("Here-->", error?.response);

        });
    } catch (err) {

    }
  }
  console.log('noumber', result)
  const deleteFolder = function (key) {
    let cloneArray = [...folder];
    cloneArray.splice(key, 1);
    setFolder(cloneArray);
  };

  // ===

  const Card = ({ groupListing }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 1,
            backgroundColor: 'white',
            height: 60,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {groupListing.icon}

            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
              }}>
              {groupListing.name}
            </Text>
          </View>
          <Icon
            family="MaterialIcons"
            name="keyboard-arrow-right"
            size={25}
            color={'black'}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#fff",
            padding: 20,

          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#000",
            }}
          >
            MANAGE MONEY
          </Text>
        </View>
        <View style={{ borderBottomWidth: 2, borderBottomColor: "#2386D4", }}></View>
        <View style={styles.moneyManagerWrapper}>
          {/* <Text style={styles.sectionTitle}>Manage Money</Text>
                    <View style={styles.items}>

                        <View
                            style={{
                                backgroundColor: '#F2BB13',
                                width: '100%',
                                borderRadius: 10,
                                flexDirection: "row"
                            }}>
                            <View style={{ justifyContent: "center" }}>
                                <Text
                                    style={{
                                        paddingLeft: 10,

                                        color: 'white',
                                        fontSize: 19,
                                    }}>
                                    Balance
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", flexGrow: 1, alignItems: "flex-end", marginRight: 20 }}>
                                <Text
                                    style={{
                                        paddingLeft: 10,
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: 19

                                    }}>
                                    ₹0
                                </Text>
                            </View>

                        </View>
                    </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#71797E'
              }}>
              Groups
            </Text>
            {/* BottomSheet  */}
            <BottomSheet
              visible={visible}
              onBackButtonPress={toggleBottomNavigationView}
              onBackdropPress={toggleBottomNavigationView}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: 200,
                  // justifyContent: "center",
                  // alignItems: "center",
                }}>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      marginHorizontal: 20,
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>
                      Create New Category
                    </Text>
                    <TouchableOpacity onPress={toggleBottomNavigationView}>
                      <Icon
                        family="AntDesign"
                        name="close"
                        size={30}
                        color={'black'}
                      // style={{ marginHorizontal: "45%" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContainer}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '90%',
                        height: 40,
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: "#C0C0C0"
                      }}>
                      <TextInput
                        style={styles.input}
                        onChangeText={data => setData(data)}
                        // value={folderName}
                        placeholder="Group Name"
                      />
                    </View>

                    <TouchableOpacity
                      onPress={AddUser}
                      style={styles.button}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Create Group
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <FlatList
                                        data={result}

                                        renderItem={({ item }) => {
                                            // console.log('rr', result)
                                            return (
                                                <View style={{ alignItems: "center", height: 100, marginTop: 5, width: "90%", marginLeft: 17, }}>


                                                    {
                                                        result ?
                                                            <View style={{ width: '100%' }}>

                                                                <TouchableOpacity style={{ height: 33, width: '100%', backgroundColor: "#00796A", justifyContent: "center", alignItems: "center", borderRadius: 5 }}
                                                                    onPress={AddUser}
                                                                >
                                                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Add</Text>
                                                                </TouchableOpacity>


                                                                <View style={{ alignItems: "center" }}>
                                                                    <Text style={{ color: "#0E6655" }}>{item?.personal_details?.phone?.mobile_number}</Text>
                                                                </View>
                                                            </View> : <Text>hii</Text>}
                                                </View>
                                            )
                                        }}
                                    /> */}
                </View>
              </View>
            </BottomSheet>
            {/* Modal  */}
            {/* {!modal ? (
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TouchableOpacity
                    onPress={() => setModal(modal ? false : true)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#DFEBEA",
                        borderRadius: 5,
                        height: 30,
                        width: 110,
                        paddingHorizontal: 5,
                      }}
                    >
                      <PlusIcon name="pluscircleo" size={20} color={"#00796A"} />
                      <Text style={{ marginLeft: 5, color: "#00796A" }}>
                        Create New
                      </Text>
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
                          <Text style={styles.modalHeaderText}>
                            Create New Phonebook
                          </Text>
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
                        height: 40,
                        marginTop: 20,
                      }}
                    >
                      <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFolderName(text)}
                        value={folderName}
                        placeholder="Folder Name"
                      />
                    </View>
  
                    <TouchableOpacity
                      onPress={() => createFolder(folderName)}
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
              )} */}
            {/* Modal end  */}
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#DFEBEA',
                  borderRadius: 5,
                  height: 30,
                  width: 110,
                  paddingHorizontal: 5,
                }}>
                <Icon
                  family="AntDesign"
                  name="pluscircleo"
                  size={20}
                  color={'#00796A'}
                />
                <Text style={{ marginLeft: 5, color: '#00796A' }}>
                  Create New
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Group Items  */}

          {/* <FlatList
              style={{ marginTop: 20 }}
              data={groupList}
              renderItem={({ item }) => {
                return <Card groupListing={item} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            /> */}
          {/* <View style={{marginTop: 20}}>
              
              {folder.map((item, key) => {
                return <Card key={key} groupListing={item} />;
              })}
            </View> */}

          {/* <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 1,
                  backgroundColor: "white",
                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <WorkIcon name="work" size={25} color={"#00796A"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                    }}
                  >
                    Colleagues
                  </Text>
                </View>
                <RightIcon
                  name="keyboard-arrow-right"
                  size={25}
                  color={"black"}
                />
              </View>
            </TouchableOpacity> */}
          {/* Room mates  */}
          {/* <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginBottom: 1,
                  backgroundColor: "white",
                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BuildingIcon name="building" size={25} color={"#00796A"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                    }}
                  >
                    Roommates
                  </Text>
                </View>
                <RightIcon
                  name="keyboard-arrow-right"
                  size={25}
                  color={"black"}
                />
              </View>
            </TouchableOpacity> */}
          {/* Friends  */}
          {/* <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  backgroundColor: "white",
                  height: 60,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FriendsIcon name="user-friends" size={25} color={"#00796A"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                    }}
                  >
                    Friends
                  </Text>
                </View>
                <RightIcon
                  name="keyboard-arrow-right"
                  size={25}
                  color={"black"}
                />
              </View>
            </TouchableOpacity> */}

          {/* Friends  */}
          {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                Friends
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#DFEBEA',
                    borderRadius: 5,
                    height: 30,
                    width: 125,
                    paddingHorizontal: 5,
                  }}>
                  <Icon
                    family="AntDesign"
                    name="adduser"
                    size={20}
                    color={'#00796A'}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: '#00796A',
                    }}>
                    Invite a Friend
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}

          {/* Friend list  */}
          {/* <View style={{marginTop: 10}}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 1,
                    backgroundColor: 'white',
                    height: 60,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                  
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                      }}>
                      Nitin Maurya
                    </Text>
                  </View>
                  <Icon
                    family="MaterialIcons"
                    name="keyboard-arrow-right"
                    size={25}
                    color={'black'}
                  />
                </View>
              </TouchableOpacity>
            </View> */}
        </View>
        <View style={{ padding: 10 }}>
          <FlatList

            data={result}
            renderItem={({ item, }) => {
              return (
                <ScrollView>
                  <TouchableOpacity onPress={() => navigation.navigate('SplitScreen', { id: item?._id })}>
                    <View style={{
                      height: 50, backgroundColor: "#F2BB13", marginTop: 5, justifyContent: "center",
                      padding: 10, borderRadius: 5
                    }}

                    >
                      <Text style={{ color: "white", fontSize: 20 }}>{item?.groupName?.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>

              )
            }}
          />
        </View>

      </ScrollView>
    </View>
  );

};

export default MoneyManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  moneyManagerWrapper: {
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 70,
    marginHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#00796A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#fff',
    fontSize: 30,
  },
  itemBox: {
    backgroundColor: 'white',
    width: '32%',
    borderRadius: 10,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  modalHeaderSection: {
    padding: 2,
    marginTop: 20,
    flexDirection: 'row',
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  modalHeaderSectionTop: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 10,
    backgroundColor: 'green',
    // marginRight: 50,
    // alignItems: "center",
    justifyContent: 'space-between',
  },
  closeIcon: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  modalHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 4,
    // backgroundColor: "#ebf4f3",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: '90%',
    padding: 6,
    borderRadius: 4,
    // marginHorizontal: 20,
    backgroundColor: '#00796A',
  },
  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },
});
