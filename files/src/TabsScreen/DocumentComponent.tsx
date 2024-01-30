import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import PlusIcon from '../../assets/image/plusIcon.png';
import FolderIcon from '../../assets/image/folder.png';
import Close from '../../assets/image/close.png';
import Icon from '../../utils/components/Icon';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {COLORS} from '../../const/constants';
import axios from 'axios';
import {API} from '../../utils/components/api';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../utils/components/ActivityLoader';
import {RefreshControl} from 'react-native-gesture-handler';
// import ImagePicker from "react-native-image-crop-picker";

const {height, width} = Dimensions.get('window');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DocumentComponent = ({navigation, route}) => {
  const {folderName, folderID} = route.params;
  const {userId, accessToken} = useSelector((state: any) => state.auth);
  // const [text, onChangeText] = useState("");

  // const extraction = samplePlumberList.filter((curElem) => {
  //   return curElem.name.toLowerCase().includes(text.toLowerCase());
  // });
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [contactName, setContactName] = useState('');
  const [phoneNumber, SetPhoneNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [document, setDocument] = useState('');

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      getContactsFolderList();
      setRefresh(false);
    });
  }, []);

  useEffect(() => {
    console.log(folderID, 'NAME+ID', folderName);
    getContactsFolderList();
    setNameError(false);
    setContactName('');
    SetPhoneNumber('');
  }, []);

  const getContactsFolderList = async () => {
    try {
      const payload = {
        id: folderID,
      };
      console.log(payload);
      const res = await axios({
        method: 'get',
        url: API.GET_ALL_CONTACTS,
        data: payload,
        // config: {
        //   headers: {
        //     'x-access-token': accessToken
        //   }
        // }
      });
      console.log('asd');
      if (res) {
        console.log('DATA Contact', res.data);
        setContactList(res.data?.data);
        setVisible(false);
      } else {
        console.log('API ERRORContact', res);
      }
    } catch (err) {
      console.log('ERROR', err?.response?.data);
    }
  };
  const CreateContactError = (title: any) => {
    Alert.alert(
      'ERROR!!!',
      `Cannot create ${title} contactList multiple times`,
    );
    setCreateFolderModal(false);
    setContactName('');
    SetPhoneNumber('');
    setNameError(true);
  };

  const createFolder = async (title: string) => {
    let clone = [...contactList];
    clone.filter((name: any) => {
      name.title === title
        ? CreateContactError(title)
        : setNameError(false);
    });
    if (nameError) return;
    else {
      let data: any = {
        title,
      };
      clone.push(data);
      try {
        let documents = {
          documents: {
            consumerId: userId,
            dirname: folderName,
          },
        };
        console.log(contacts);
        const res = await axios({
          method: 'post',
          url: API.CREATE_CONTACT,
          data: documents,
          // config: {
          //   headers: {
          //     'x-access-Token': accessToken,
          //   },
          // },
        });
        if (res.data) {
          console.log('DATA', res.data);
          getContactsFolderList();
          setCreateFolderModal(!createFolderModal);
        } else {
          console.log('ERROR_RESPONSE', res);
        }
      } catch (err) {
        console.log('ERROR Create', err);
      }
    }
  };

  const deleteFolder = function (key) {
    let cloneArray = [...contactList];
    cloneArray.splice(key, 1);
    setContactList(cloneArray);
  };

  const moveToContactDetail = function () {
    navigation.navigate('ServiceNeeds');
  };
  // const uploadContactImage = (uploadType, imageType) => {
  //   if (uploadType === "camera") {
  //     ImagePicker.openCamera({
  //       height: 720,
  //       width: 1280,
  //       cropping: true,
  //       compressImageQuality: 0.7,
  //     }).then((panCard) => {
  //       setPanCard(panCard);
  //       setVisible(false);
  //     });
  //   } else if (uploadType === "gallery") {
  //     ImagePicker.openPicker({
  //       height: 720,
  //       width: 1280,

  //       cropping: true,
  //       compressImageQuality: 0.7,
  //     }).then((panCard) => {
  //       setPanCard(panCard);
  //       setVisible(false);
  //     });
  //   }
  // };

  const Card = ({technicianListing}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 80,
          borderWidth: 0.55,
          borderBottomColor: '#F3F4F9',
          borderColor: '#fff',
        }}>
        //{' '}
        <Icon
          name="pdffile1"
          family="AntDesign"
          color={COLORS.RED_DARK}
          size={25}
        />
        <Text
          style={{
            flex: 0.9,
            fontWeight: '700',
            fontSize: 16,
            color: 'black',
            marginLeft: 15,
            //marginTop: -6,
          }}>
          {technicianListing.name}
          {'\n'}
          <Text
            style={{
              flex: 0.9,
              fontWeight: '700',
              fontSize: 13,
              color: '#1B2D1B',
              marginLeft: 15,
            }}>
            {technicianListing.contactNumber}
          </Text>
        </Text>
        {/* Edit button  */}
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: '#CCE4E1',
              height: 30,
              width: 30,
              borderRadius: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <TelephoneIcon name="telephone" size={20} color={"#00796A"} /> */}
            <Icon family="Entypo" name="edit" size={20} color={'#00796A'} />
          </View>
        </TouchableOpacity>
        {/* Delete button  */}
        <TouchableOpacity onPress={deleteFolder}>
          <View
            style={{
              backgroundColor: '#CCE4E1',
              height: 30,
              width: 30,
              borderRadius: 7,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="delete-forever"
              family="MaterialCommunityIcons"
              size={25}
              color={'#DD2C2B'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginVertical: 25,
          textAlign: 'center',
          color: COLORS.BLACK,
        }}>
        {folderName}
      </Text>
      <FlatList
        // data={samplePlumberList}
        data={contactList}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={[COLORS.DARK_GREEN]}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: height,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.BLACK}}>No Documents Added</Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return <Card technicianListing={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal and plus icon  */}

      <KeyboardAvoidingView behavior={'height'} style={styles.writeTaskWrapper}>
        <TouchableOpacity
          onPress={async () => {
            const res = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'documentDirectory',
            });
            console.log('res_DATA', res);
            setDocument(res.fileCopyUri)
            createFolder(res.name)
          }}>
          <View style={styles.addWrapper}>
            <Image style={styles.icon} source={PlusIcon} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* {!createFolderModal ? (
        <KeyboardAvoidingView
          behavior={'height'}
          style={styles.writeTaskWrapper}>
          <TouchableOpacity
            onPress={() =>
              setCreateFolderModal(createFolderModal ? false : true)
            }>
            <View style={styles.addWrapper}>
              <Image style={styles.icon} source={PlusIcon} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={createFolderModal}>
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
                  <Text style={styles.modalHeaderText}>Create New Contact</Text>
                </View>
                <TouchableOpacity onPress={() => setCreateFolderModal(false)}>
                  <Image style={styles.icon} source={Close} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.folderInput}>
              <TextInput
                style={styles.input}
                onChangeText={text => setContactName(text)}
                value={contactName}
                placeholder="Contact Name"
              />
            </View>
            <View style={styles.folderInput}>
              <TextInput
                style={{
                  width: '100%',
                  padding: 4,
                  marginTop: 5,
                  // backgroundColor: "#ebf4f3",
                }}
                onChangeText={text => SetPhoneNumber(text)}
                value={phoneNumber}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Phone Number"
              />
            </View>
            <Text style={{color: COLORS.LIGHT_BORDER, marginVertical: 5}}>
              Contact Image Upload Soon
            </Text>
            <TouchableOpacity
              onPress={() => createFolder(contactName, phoneNumber)}
              style={styles.button}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )} */}
      <ActivityLoader
        visible={visible}
        setVisible={() => setVisible(!visible)}
      />
    </View>
  );
};

export default DocumentComponent;

const styles = StyleSheet.create({
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
    height: '40%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
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
    backgroundColor: '#00796A',
  },
  folderInput: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER,
  },
  writeTaskWrapper: {
    right: 25,
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   Alert,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Modal,
//   KeyboardAvoidingView,
// } from 'react-native';
// import PlusIcon from '../../assets/image/plusIcon.png';
// import FolderIcon from '../../assets/image/folder.png';
// import Close from '../../assets/image/close.png';
// import Icon from '../../utils/components/Icon';
// import samplePlumberList from '../../const/samplePlumberList';
// import {COLORS} from '../../const/constants';
// import axios from 'axios';
// import {API} from '../../utils/components/api';
// import {useSelector} from 'react-redux';
// import DocumentPicker, {
//   DirectoryPickerResponse,
//   DocumentPickerResponse,
//   isInProgress,
//   types,
// } from 'react-native-document-picker';
// import ActivityLoader from '../../utils/components/ActivityLoader';

// const {height, width} = Dimensions.get('window');

// const DocumentComponent = ({navigation, route}) => {
//   const {folderName, folderID} = route.params;
//   const {userId, accessToken} = useSelector((state: any) => state.auth);
//   // const [text, onChangeText] = useState("");

//   // const extraction = samplePlumberList.filter((curElem) => {
//   //   return curElem.name.toLowerCase().includes(text.toLowerCase());
//   // });
//   const [createFolderModal, setCreateFolderModal] = useState(false);
//   const [nameError, setNameError] = useState(false);
//   const [contactList, setContactList] = useState(samplePlumberList);
//   const [contactName, setContactName] = useState('');
//   const [phoneNumber, SetPhoneNumber] = useState('');
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     console.log(folderID, 'NAME+ID', folderName);
//     setNameError(false);
//     setContactName('');
//     SetPhoneNumber('');
//   }, []);

//   const CreateContactError = (title: any) => {
//     Alert.alert(
//       'ERROR!!!',
//       `Cannot create ${title} contactList multiple times`,
//     );
//     setCreateFolderModal(false);
//     setContactName('');
//     SetPhoneNumber('');
//     setNameError(true);
//   };

//   const createFolder = async (title: string, phoneNumber: string) => {
//     let clone = [...contactList];
//     clone.filter((name: any) => {
//       name.title === title && name.contactNumber === phoneNumber
//         ? CreateContactError(title)
//         : setNameError(false);
//     });
//     if (nameError) return;
//     else {
//       let data: any = {
//         title,
//         numberOfContacts: '0',
//       };
//       clone.push(data);
//       try {
//         let contacts = {
//           contacts: {
//             consumerId: userId,
//             dirname: folderName,
//             members: {
//               name: title,
//               phone: phoneNumber,
//             },
//           },
//         };
//         const res = await axios({
//           method: 'post',
//           url: API.CREATE_CONTACT,
//           data: contacts,
//           // config: {
//           //   headers: {
//           //     'x-access-Token': accessToken,
//           //   },
//           // },
//         });
//         if (res.data) {
//           console.log('DATA', res);
//           setContactName(data);
//           setContactList(clone);
//           setCreateFolderModal(!createFolderModal);
//         } else {
//           console.log('ERROR_RESPONSE', res);
//         }
//       } catch (err) {
//         console.log('ERROR', err);
//       }
//     }
//   };

//   const deleteFolder = function (key) {
//     let cloneArray = [...contactList];
//     cloneArray.splice(key, 1);
//     setContactList(cloneArray);
//   };

//   const moveToContactDetail = function () {
//     navigation.navigate('ServiceNeeds');
//   };
//   useEffect(() => {
//     getFolderList();
//   }, []);
//   const getFolderList = async () => {
//     let payload = {
//       id: '641d4ab0915e664548df383a',
//     };
//     try {
//       console.log('PAYLOAD', payload);
//       const res = await axios({
//         method: 'get',
//         url: API.GET_ALL_CONTACTS,
//         data: payload,
//         // config: {
//         //   headers: {
//         //     'x-access-token': accessToken
//         //   }
//         // }
//       });
//       console.log('asd');
//       if (res) {
//         console.log('DATA', res.data);
//       } else {
//         console.log('API ERROR', res);
//       }
//     } catch (err) {
//       console.log('ERROR', err);
//     }
//   };

//   // const uploadContactImage = (uploadType, imageType) => {
//   //   if (uploadType === "camera") {
//   //     ImagePicker.openCamera({
//   //       height: 720,
//   //       width: 1280,
//   //       cropping: true,
//   //       compressImageQuality: 0.7,
//   //     }).then((panCard) => {
//   //       setPanCard(panCard);
//   //       setVisible(false);
//   //     });
//   //   } else if (uploadType === "gallery") {
//   //     ImagePicker.openPicker({
//   //       height: 720,
//   //       width: 1280,

//   //       cropping: true,
//   //       compressImageQuality: 0.7,
//   //     }).then((panCard) => {
//   //       setPanCard(panCard);
//   //       setVisible(false);
//   //     });
//   //   }
//   // };

//   const Card = ({technicianListing}) => {
//     return (
//       <View style={styles.folderBox}>
//         <Icon
//           name="pdffile1"
//           family="AntDesign"
//           color={COLORS.RED_DARK}
//           size={25}
//         />
//         <Text style={styles.folderText}>Aadhaar</Text>
//         <Icon name="right" family="AntDesign" color={COLORS.BLACK} size={25} />
//       </View>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text
//         style={{
//           fontSize: 25,
//           fontWeight: 'bold',
//           marginVertical: 25,
//           textAlign: 'center',
//           color: COLORS.BLACK,
//         }}>
//         {folderName}
//       </Text>
//       <FlatList
//         // data={samplePlumberList}
//         data={contactList}
//         renderItem={({item}) => {
//           return <Card technicianListing={item} />;
//         }}
//         keyExtractor={(item, index) => index.toString()}
//       />

//       <KeyboardAvoidingView behavior={'height'} style={styles.writeTaskWrapper}>
//         <TouchableOpacity
//           onPress={async () => {
//             const res = await DocumentPicker.pickSingle({
//               presentationStyle: 'fullScreen',
//               copyTo: 'documentDirectory',
//             });
//             console.log('res_DATA', res);
//           }}>
//           <View style={styles.addWrapper}>
//             <Image style={styles.icon} source={PlusIcon} />
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//       <ActivityLoader visible={visible} setVisible={() => setVisible(!visible)} />
//     </View>
//   );
// };

// export default DocumentComponent;

// const styles = StyleSheet.create({
//   addWrapper: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#00796A',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//   },
//   folderText: {
//     color: COLORS.BLACK,
//     fontFamily: 'poppins-medium',
//     fontSize: 17,
//     fontWeight: 'bold',
//     padding: 4,
//     margin: 10,
//     width: width * 0.7,
//   },
//   folderBox: {
//     backgroundColor: 'white',
//     padding: 4,
//     paddingLeft: 14,
//     borderWidth: 1,
//     borderColor: '#f4f4f4',
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//     width: width,
//     alignItems: 'center',
//   },
//   modalContainer: {
//     height: '40%',
//     width: '100%',
//     position: 'absolute',
//     alignItems: 'center',
//     bottom: 0,
//     backgroundColor: COLORS.WHITE,
//   },
//   modalUpperSection: {
//     backgroundColor: 'green',
//   },

//   modalHeaderSection: {
//     padding: 2,
//     marginTop: 20,
//     flexDirection: 'row',
//     // justifyContent: "space-between",
//     // alignItems: "center",
//   },
//   modalHeaderSectionTop: {
//     flexDirection: 'row',
//     width: '95%',
//     // marginRight: 50,
//     // alignItems: "center",
//     justifyContent: 'space-between',
//   },
//   closeIcon: {
//     margin: 10,
//     fontWeight: 'bold',
//     fontSize: 25,
//   },
//   modalHeaderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.BLACK,
//   },
//   input: {
//     width: '100%',
//     padding: 4,
//     // backgroundColor: "#ebf4f3",
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 15,
//     width: width / 2,
//     padding: 10,
//     borderRadius: 4,
//     // marginHorizontal: 20,
//     backgroundColor: '#00796A',
//   },
//   folderInput: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//     height: 40,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: COLORS.LIGHT_BORDER,
//   },
//   writeTaskWrapper: {
//     right: 25,
//     position: 'absolute',
//     bottom: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginHorizontal: 10,
//     width: 25,
//     height: 25,
//   },
// });
