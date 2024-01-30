import React, {useEffect, useState, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Modal,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Button,
  Linking,
} from 'react-native';
import {COLORS} from '../../const/constants';
import PlusIcon from '../../assets/image/plusIcon.png';
import {
  login,
  setAccessToken,
  setCityRedux,
  setCountryRedux,
  setCurrentAddress,
  setIsAuthorized,
  setPincodeRedux,
  setProfileImageUrl,
  setRegion,
  setUserData,
  setUserId,
  setUserNumber,
  updateLatitude,
  updateLongitude,
} from '../../backend/slice';
import FolderIcon from '../../assets/image/folder.png';
import DeleteFolder from '../../assets/image/delete.png';
import Close from '../../assets/image/close.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {RefreshControl} from 'react-native-gesture-handler';
import LateLogin from '../../utils/components/LateLogin';
import {useNavigation} from '@react-navigation/native';
import ProfilePopup from '../../utils/components/ProfilePopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, BASE_URL } from '../../utils/components/api';
import WebView from 'react-native-webview';
import Navigation from '../../Navigation';
import { color } from 'react-native-elements/dist/helpers';

const {height, width} = Dimensions.get('screen');
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
// import Task from "../../utils/components/appoint";

const Task = () => {
  const [todoItem, setTodoItem] = useState('');
  const navigation = useNavigation();

  const [todoList, setTodoList] = useState([]);
  // const [folder, setFolder] = useState(folderArray);
  const [folderName, setFolderName] = useState('');
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const {userNumber, userId} = useSelector((state: any) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const [discription, setDiscription] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      fetchData();
      setRefresh(false);
    });
  }, []);
useEffect(() => {
  console.log(userId);
  
},[])
  const addTodo = async () => {
    const payload = {
      title: todoItem,
      description: discription,
      userId: userId,
    };
    try {
      await axios({
        method: 'post',
        url: API.CREATE_TASK,
        data: payload,
        //   confif: {
        headers: {
          'Content-Type': 'application/json',
        },
        //   },
      }).then(res => {
        setVisible(false);
        console.log('ahay', res?.data);
        setTodoItem(res?.data?.data?.title);
        setDiscription(res?.data?.data?.description);
        setCreateFolderModal(false);
        fetchData();

        console.log('title', res?.data?.data?.title);
        console.log('description', res?.data?.data?.description);
        ToastAndroid.show('Request Raised', ToastAndroid.SHORT);
        // navigation.navigate("SuccessFull", { data: payload });
      });
    } catch (error) {
      setVisible(false);
      console.log('ss', error?.response?.data?.message + '!');
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoader(true);
    try {
      await axios({
        method: 'get',
        url: `${BASE_URL}consumerAppAppRoute/tasks/getAllTask/${userId}`,
      }).then(res => {
        setTodoList(res?.data?.data);
        console.log('ahah', res?.data?.data);
      });
    } catch (err) {
      console.log('TECH', err);
    }
    setLoader(false);
  };

  const deleteuser = async (_id: any) => {
    const url = `${BASE_URL}consumerAppAppRoute/tasks/deleteTask/${_id}`

    let result = await fetch(url, {
      method: 'delete',
    });
    result = await result.json();
    if (result) {
      console.log('aap');
      fetchData();
    }
  };

  // Create a todo object with the input item
  //     const todo = { item: todoItem };

  //     // Make a POST API request
  //     axios.post('https://api.onit.fit/consumerAppAppRoute/tasks/createTask', todo)
  //     headers: {
  //         "Content-Type": "application/json",
  //       },
  //         .then(response => {
  //             // Handle successful response
  //             console.log('Todo added:', response.data);
  //             // Clear the input
  //             setTodoItem('');
  //         })
  // .catch(error => {
  //     // Handle error
  //     console.error('Error adding todo:', error);
  // });
  // };

  useEffect(() => {
    const mobile = AsyncStorage.getItem('userNumber')
    console.log(mobile);
    
    if (!userNumber || !mobile) {
      setLoginModal(!loginModal);
    }
  }, []);

  // const handleAddTodo = () => {
  //     setTodoList([...todoList, { key: todoList.length.toString(), todoItem }]);
  //     setTodoItem('');
  // };

  const handleDeleteTodo = (key:any) => {
    setTodoList(todoList.filter(item => item.key !== key));
  };
  // const createFolder = async (title: string) => {
  //     setVisible(true)
  //     let clone = [...folder];
  //     clone.filter((name: any) => {
  //         console.log(name + title)
  //         name.title === title ? CreateFolderError(title) : setFolderError(false);
  //     });
  //     console.log(folderError)
  //     if (folderError) return;
  //     else {
  //         let data: any = {
  //             title,
  //             numberOfContacts: '0',
  //         };
  //         clone.push(data);
  //         try {
  //             let contacts = {
  //                 consumerId: userId,
  //                 dirname: title,
  //             };
  //             const res = await axios({
  //                 method: 'post',
  //                 url: API.CREATE_FOLDER,
  //                 data: { contacts },
  //                 // config: {
  //                 //   headers: {
  //                 //     'x-access-Token': accessToken,
  //                 //   },
  //                 // },
  //             });
  //             if (res.data) {
  //                 console.log('DATA', res.data);
  //                 setFolderName(data);
  //                 setFolder(clone);
  //                 setCreateFolderModal(!createFolderModal);
  //                 setFolderID(res.data?.data?._id);
  //                 setVisible(false)
  //             } else {
  //                 console.log('ERROR_RESPONSE', res);
  //             }
  //         } catch (err) {
  //             console.log('ERROR', err);
  //         }
  //     }
  // };
  const deleteFolder = (key:any) => {
    let cloneArray = [...folder];
    cloneArray.splice(key, 1);
    setFolder(cloneArray);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#E5E7E9'}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-evenly",
          backgroundColor: "#fff",
          padding: 20,
        

        }}
      >
       
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
             left:-20
            }}
          >
            TASKS
          </Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Reminder')}}>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              left: 20
            }}
          >
            REMINDERS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 2, width: '50%', borderBottomColor:"#2386D4"}}></View>
      <View
        style={{
          flexGrow: 1,
        }}>
        <View style={{flexGrow: 1}}>
          {/* <FlatList
                        data={todoList}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text>{item.title}</Text>
                                </View>
                            )
                        }}
                    /> */}

          {/* <ScrollView> */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                colors={[COLORS.DARK_GREEN]}
              />
            }
            data={todoList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskDetail', {
                    description: item.description,
                    title: item.title,
                  })
                }>
                <View style={styles.todo}>
                  <View style={{}}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color="#979A9A"
                    />
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color="#979A9A"
                      style={{marginTop: -10}}
                    />
                  </View>
                  <View style={{marginLeft: 13}}>
                    <Ionicons name="document-text" size={25} color="#F5B041" />
                  </View>

                  {/* <TouchableOpacity onPress={() => deleteuser(item._id)}>
                    <Text>delete</Text>
                  </TouchableOpacity> */}

                  <View style={styles.todoText}>
                    <TextInput
                      value={item.title}
                      editable={false}
                      style={{color: 'black', fontSize: 17, fontWeight: '400'}}
                    />
                    <Text style={{color:"#7B7D7D"}}>{item.description}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.box,
                      {
                        padding: 6,
                      },
                    ]}
                    onPress={() => deleteuser(item._id)}>
                    <Image
                      style={{width: 15, height: 20}}
                      source={DeleteFolder}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={handleDeleteData}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* </ScrollView> */}
        </View>
      </View>

      <View
        style={{
          flexGrow: 1,
          alignItems: 'flex-end',
        }}>
        {!createFolderModal ? (
          // <KeyboardAvoidingView
          //     behavior={'height'}
          //     style={styles.writeTaskWrapper}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexGrow: 1,
              bottom: width / 2,
              right: 25,
            }}>
            <TouchableOpacity
              onPress={() => setCreateFolderModal(!createFolderModal)}>
              <View style={styles.addWrapper}>
                <Image style={styles.icon} source={PlusIcon} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          // </KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={createFolderModal}
            onRequestClose={() => setCreateFolderModal(!createFolderModal)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeaderSection}>
                <View style={styles.modalHeaderSectionTop}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image style={styles.icon} source={FolderIcon} />
                    <Text style={styles.modalHeaderText}>Create New Task</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setCreateFolderModal(!createFolderModal)}>
                    <Image style={styles.icon} source={Close} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  height: 40,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: COLORS.LIGHT_BORDER,
                }}>
                <TextInput
                  value={todoItem}
                  onChangeText={setTodoItem}
                  placeholder="Title"
                  style={{width: '100%',color:"#000"}}
                  placeholderTextColor={'gray'}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',

                  width: '80%',
                  height: 100,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: COLORS.LIGHT_BORDER,
                }}>
                <TextInput
                  value={discription}
                  onChangeText={setDiscription}
                  placeholder="Description"
                  multiline
                  placeholderTextColor={'gray'}
                  // maxLength={10}

                  style={{width: '100%',color:"#000"}}
                />
              </View>

              <TouchableOpacity
                onPress={addTodo}
                // disabled={todoItem.length <= 0 ? true : false}
                style={[
                  styles.button,
                  {
                    backgroundColor: '#00796A',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.WHITE,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>

      <ProfilePopup loginModal={loginModal} setLoginModal={setLoginModal} />
      {/* </ScrollView> */}
      {/* </ScrollView> */}
    </View>
  );
};
export default Task;

const styles = StyleSheet.create({
  screenHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    padding: 4,
    margin: 10,
    color: COLORS.BLACK,
    fontFamily: 'poppins-medium',
  },
  box: {
    width: 30,
    height: 30,
    padding: 4,
    margin: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#00796A',
  },
  folderText: {
    color: COLORS.BLACK,
    fontFamily: 'poppins-medium',
    fontSize: 17,
    fontWeight: 'bold',
    padding: 4,
    margin: 10,
  },
  folderBox: {
    backgroundColor: 'white',
    padding: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showConnectBox: {},

  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },

  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  writeTaskWrapper: {
    right: 25,
    position: 'absolute',
    bottom: width / 3,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
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
  modalContainer: {
    height: '50%',
    width: '100%',
    // backgroundColor: "white",
    alignItems: 'center',
    position: 'absolute',
    // marginHorizontal: 20,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
  },
  modalUpperSection: {
    backgroundColor: 'green',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  input: {
    width: '100%',
    padding: 4,
    // backgroundColor: "#ebf4f3",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: width / 2,
    padding: 10,
    borderRadius: 4,
    // marginHorizontal: 20,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 10,
    height:80,
    borderBottomWidth: 3,
    borderColor: '#E5E7E9',
    backgroundColor: 'white',
  },
  todoText: {
    flex: 1,
    marginLeft: 10,
  },
});

// import React from "react";
// import Main from "../../utils/components/main";

// export default class App extends React.Component {
//   render() {
//     return <Main />;
//   }
// }

// const PaymentService=()=>{
// const [Url,setUrl]=useState('')

//   const  test = async () => {
//        try {
//            const _data = { amount: 100, phone: "9163277940", type: "web" };
//            const res = await axios.post(
//                `https://api.onit.fit/payment/phonepe`,
//                _data
//            );
//            const { code, data } = res?.data;

//            if (code !== "PAYMENT_INITIATED") return;
//            const url = data?.instrumentResponse?.redirectInfo?.url;
//            setUrl(url);
           
//            const merchantTransactionId = data?.merchantTransactionId;
//            //Linking.openURL(url)
//            //window.open(url, "_blank", "noreferrer");
//            checkStatusCron(merchantTransactionId);
//        } catch (error) {
//            console.log(error);
//        }
//    };

//    const checkStatusApi = async (merchantTransactionId) => {
//        try {
//            const payload = {
//                merchantTransactionId,
//            };
//            console.log("done");
//            const res = await axios.post(
//                `https://api.onit.fit/payment/check-status`,
//                payload
//            );
//            const { data } = res;
//            const { code } = data;
//           //  if(code==='')
//            console.log("code", code);
//        } catch (e) {
//            console.log(e);
//        }
//    };

//    function checkStatusCron(merchantTransactionId){
       
//        // const checkStatusApi = async (merchantTransactionId) => {
//        //     try {
//        //         const payload = {
//        //             merchantTransactionId,
//        //         };
//        //         console.log("done");
//        //         const res = await axios.post(
//        //             `https://api.onit.fit/payment/check-status`,
//        //             payload
//        //         );
//        //         const { data } = res;
//        //         const { code } = data;
//        //         console.log("code", code);
//        //     } catch (e) {
//        //         console.log(e);
//        //     }
//        // };

//        const interval = setInterval(timeout, 1000);
//        let time = 0;
//        function timeout() {
//            setTimeout(() => {
//                console.log(++time);
//                if (time <= 25) {
//                    if (time === 25) checkStatusApi(merchantTransactionId);
//                    return;
//                }
//                let _time = time - 25;
//                if (_time <= 30) {
//                    if (_time % 3 === 0) checkStatusApi(merchantTransactionId);
//                    return;
//                }
//                _time = time - 55;
//                if (_time <= 60) {
//                    if (_time % 6 === 0) checkStatusApi(merchantTransactionId);
//                    return;
//                }
//                _time = time - 115;
//                if (_time <= 60) {
//                    if (_time % 10 === 0) checkStatusApi(merchantTransactionId);
//                    return;
//                }
//                _time = time - 175;
//                if (_time <= 60) {
//                    if (_time % 30 === 0) checkStatusApi(merchantTransactionId);
//                    return;
//                }
//                _time = time - 235;
//                if (time <= 900) {
//                    if (_time % 60 === 0) checkStatusApi(merchantTransactionId);
//                    return;
//                } else {
//                    clearInterval(interval);
//                }
//            });
//        }
//    };
   
//    return(
//        <>
//        <View style={{margin:20}}>
//            <TouchableOpacity onPress={test}>
//             <Text style={{fontSize:10,color:'black'}}>Press me</Text>
//            </TouchableOpacity>
          

//        </View>
//        <WebView source={{Url}} />
//        </>
//    )
// }

//  export default PaymentService;
