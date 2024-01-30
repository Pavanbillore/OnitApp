import React, { useState, useEffect, useId, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';
import PlusIcon from '../../assets/image/plusIcon.png';
import FolderIcon from '../../assets/image/folder.png';
import DeleteFolder from '../../assets/image/delete.png';
import Close from '../../assets/image/close.png';
import { useNavigation } from '@react-navigation/native';
import TechnicianCategoryList from '../../const/TechnicianCategoryList';
import { COLORS } from '../../const/constants';
import axios from 'axios';
import { API } from '../../utils/components/api';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../../utils/components/Icon';
import ActivityLoader from '../../utils/components/ActivityLoader';
import LateLogin from '../../utils/components/LateLogin';
import { setUserDocuments } from '../../backend/slice';
import ProfilePopup from '../../utils/components/ProfilePopup';

const { height, width } = Dimensions.get('screen');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let Documents = (props: any) => {
  const { userNumber, userId, userDocuments } = useSelector(
    (state: any) => state.auth,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [folder, setFolder] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [folderID, setFolderID] = useState('');
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [folderError, setFolderError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log('Document Number', userId);
    if (!userId) {
      setLoginModal(!loginModal);
    }
    getDocumentsFolderList();
  }, []);

  useEffect(() => {
    setFolderError(false);
    setFolderName('');
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      getDocumentsFolderList();
      setRefresh(false);
    });
  }, []);

  const getDocumentsFolderList = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: API.GET_ALL_DOCUMENTS_DIRECTORY + userId,
      });
      if (res) {
        console.log('DATA Document', res.data);
        dispatch(setUserDocuments(res.data?.data));
        setFolder(res.data?.data);
      } else {
        console.log('API ERROR', res);
      }
    } catch (err) {
      console.log('ERROR DOCUMENTS', err);
    }
  };

  const CreateFolderError = (title: any) => {
    Alert.alert('ERROR!!!', `Cannot create ${title} folder multiple times`);
    setCreateFolderModal(false);
    setFolderName('');
    setFolderError(true);
  };

  const createFolder = async (title: string) => {
    // setVisible(true)
    let clone = [...folder];
    clone.filter((name: any) => {
      name.title === title ? CreateFolderError(title) : setFolderError(false);
    });
    if (folderError) return;
    else {
      let data: any = {
        title,
        numberOfContacts: '0',
      };
      clone.push(data);
      try {
        let documents = {
          consumerId: userId,
          dirname: title,
        };
        const res = await axios({
          method: 'post',
          url: API.CREATE_NEW_DOCUMENT_DIRECTORY,
          data: { documents },
          // config: {
          //   headers: {
          //     'x-access-Token': accessToken,
          //   },
          // },
        });
        if (res.data) {
          console.log('DATA', res.data);
          setFolderName(res.data);
          setCreateFolderModal(!createFolderModal);
          getDocumentsFolderList();
          setVisible(false);
        } else {
          console.log('ERROR_RESPONSE', res);
        }
      } catch (err) {
        console.log('ERROR DOCUM', err);
      }
    }
  };
  const deleteFolder = key => {
    let cloneArray = [...folder];
    cloneArray.splice(key, 1);
    setFolder(cloneArray);
  };

  const moveToContactDetail = function () {
    props.navigation.navigate('ServiceNeeds');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          padding: 20,

        }}
      >
        <TouchableOpacity onPress={() => { navigation.navigate('ContactsTab') }}>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              left: -20
            }}
          >
            CONTACTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              left: 20
            }}
          >
            DOCUMENTS
          </Text>
        </TouchableOpacity>

      </View>
      <View style={{ borderBottomWidth: 2, width: '50%', borderBottomColor: "#2386D4", alignSelf: "flex-end" }}></View>
      <ProfilePopup loginModal={loginModal} setLoginModal={setLoginModal} />
      <Text style={styles.screenHeader}>All Documents</Text>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={[COLORS.DARK_GREEN]}
          />
        }
        showsVerticalScrollIndicator={false}>
        {folder.length ? (
          folder.map((val, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigation.navigate('DocumentComponent', {
                    folderName: val?.Dirname,
                    folderID: val?.id,
                  })
                }>
                <View style={styles.folderBox}>
                  <Image style={styles.icon} source={FolderIcon} />
                  <Text style={styles.folderText}>{val?.Dirname}</Text>
                  <Icon
                    name="right"
                    family="AntDesign"
                    color={COLORS.BLACK}
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: COLORS.BLACK, fontSize: 16 }}>
              No Documents Added
            </Text>
          </View>
        )}
      </ScrollView>

      {!createFolderModal ? (
        <KeyboardAvoidingView
          behavior={'height'}
          style={styles.writeTaskWrapper}>
          <TouchableOpacity
            onPress={() => setCreateFolderModal(!createFolderModal)}>
            <View style={styles.addWrapper}>
              <Image style={styles.icon} source={PlusIcon} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
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
                  <Text style={styles.modalHeaderText}>Add New Document</Text>
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
                style={styles.input}
                onChangeText={text => setFolderName(text)}
                value={folderName}
                placeholder="Folder Name"
              />
            </View>

            <TouchableOpacity
              onPress={() => createFolder(folderName)}
              disabled={folderName.length <= 0 ? true : false}
              style={[
                styles.button,
                {
                  backgroundColor:
                    folderName.length <= 0 ? COLORS.LIGHT_BORDER : '#00796A',
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  color: folderName.length <= 0 ? COLORS.GREY : COLORS.WHITE,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <ActivityLoader
        visible={visible}
        setVisible={() => setVisible(!visible)}
      />
    </View>
  );
};

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
    width: width * 0.7,
  },
  folderBox: {
    backgroundColor: 'white',
    padding: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: width,
    alignItems: 'center',
  },
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
    height: '30%',
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
});

export default Documents;
