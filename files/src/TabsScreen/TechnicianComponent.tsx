import React, { useCallback, useEffect, useState } from 'react';
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
import samplePlumberList from '../../const/samplePlumberList';
import { COLORS } from '../../const/constants';
import axios from 'axios';
import { API, BASE_URL } from '../../utils/components/api';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';
import ActivityLoader from '../../utils/components/ActivityLoader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BottomSheet } from 'react-native-btr';
// import ImagePicker from "react-native-image-crop-picker";

const { height, width } = Dimensions.get('window');

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const includeExtra = true;
const TechnicianComponent = ({ navigation, route }) => {
    const { directoryName, directoryID } = route.params;
    const { userId, accessToken } = useSelector((state: any) => state.auth);
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
    const [response, setResponse] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [profileModal, setProfileModal] = useState(false);

    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => {
            getDetails();
            setRefresh(false);
        });
    }, []);

    useEffect(() => {
        console.log(directoryID, 'NAME+ID', directoryName);
        // getContactsFolderList();
        setNameError(false);
        getDetails()
        setContactName('');
        SetPhoneNumber('');
    }, []);

    const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
    };
    const uploadProfilePicture = async (type: any, options: any) => {
        if (type === 'capture') {
            const res = await launchCamera(options);
            setResponse(res);
        } else {
            const res = await launchImageLibrary(options);
            setResponse(res);
        }
        console.log('LOCAL IMAGE', response);
        setProfileModal(!profileModal);
    };
    // const getContactsFolderList = async () => {
    //     console.log('asd', directoryID)
    //     try {
    //         const payload = {
    //             'id': directoryID,
    //         };
    //         console.log('payloddd', payload);
    //         const res = await axios({
    //             method: 'get',
    //             url: `${BASE_URL}consumerAppAppRoute/consumerGetAllcontacts/${directoryID}`,
    //             data: payload,

    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }

    //         });
    //         //   console.log('asd');
    //         if (res) {
    //             console.log('DATA Contact===>>>', res);
    //             setContactList(res);
    //             setVisible(false);
    //         } else {
    //             console.log('API ERRORContact', res);
    //         }
    //     } catch (err) {
    //         console.log('ERROR GET', err?.response?.data);
    //     }
    // };

    const getDetails = async () => {
        const payload = {
            'id': directoryID,
        };
        try {
            const response = await axios.get(`https://api.onit.fit/consumerAppAppRoute/consumerGetAllcontacts/${directoryID}`)
            // setName(response?.data?.group?.groupMember)
            setContactList(response?.data?.data)
            // setPersons(response?.data?.group?.groupMember)
            // setSelectedUsers(response?.data?.group)
            // setSelectedUsers(persons.forEach(obj => {
            //     console.log(obj.name, obj.age);
            //   }))

            console.log('responseeee===>>>', response?.data?.data); // Do something with the response data
        } catch (error) {
            console.error('hh', error);
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

    const createFolder = async (title: string, phoneNumber: string) => {
        let clone = [...contactList];
        clone.filter((name: any) => {
            name.title === title && name.contactNumber === phoneNumber
                ? CreateContactError(title)
                : setNameError(false);
        });
        if (nameError) return;
        else {
            let data: any = {
                title,
                numberOfContacts: '0',
            };
            clone.push(data);
            try {
                let contacts = {
                    contacts: {
                        consumerId: userId,
                        dirname: directoryName,
                        members: {
                            name: title,
                            phone: phoneNumber,
                        },
                    },
                };
                console.log(contacts);
                const res = await axios({
                    method: 'post',
                    url: API.CREATE_CONTACT,
                    data: contacts,
                    // config: {
                    //   headers: {
                    //     'x-access-Token': accessToken,
                    //   },
                    // },
                });
                if (res.data) {
                    console.log('DATA', res.data);
                    getDetails();
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

    const ImageUI = () => {
        return (
            <BottomSheet
                visible={profileModal}
                onBackButtonPress={() => setProfileModal(profileModal)}
                onBackdropPress={() => setProfileModal(profileModal)}>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 150,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            marginLeft: 30,
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 8 }}>
                            Profile photo
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 30,
                            }}>

                            <TouchableOpacity
                                onPress={() => uploadProfilePicture('capture', options)}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Icon
                                        family="Entypo"
                                        name="camera"
                                        size={30}
                                        color={'#00796A'}
                                    />
                                    <Text style={{ fontSize: 16 }}>Camera</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => uploadProfilePicture('', options)}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: 40,
                                    }}>
                                    <Icon
                                        family="Entypo"
                                        name="image"
                                        size={30}
                                        color={'#00796A'}
                                    />
                                    <Text style={{ fontSize: 16 }}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {image && (
                        <TouchableOpacity onPress={showAlert}>
                            <Icon
                                family="MaterialIcons"
                                name="delete"
                                size={30}
                                color={'#00796A'}
                                style={{
                                    marginRight: 10,
                                    marginTop: 10,
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </BottomSheet>
        );
    };

    const Card = ({ technicianListing }) => {
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
                    borderColor: '#fff',marginTop:2
                }}>
                <Icon name="user" size={25} color={COLORS.BLACK} />
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
                        {technicianListing.phone}
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
        <View style={{ flex: 1 }}>
            <ImageUI />
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginVertical: 25,
                    textAlign: 'center',
                    color: COLORS.BLACK,
                }}>
                {directoryName}
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
                                flex: 1,
                                backgroundColor: COLORS.GREY2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: COLORS.BLACK }}>No Contacts Added</Text>
                        </View>
                    );
                }}
                renderItem={({ item }) => {
                    return <Card technicianListing={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Modal and plus icon  */}

            {!createFolderModal ? (
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
                        {/* <View
              style={[
                // styles.folderInput,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  height: 40,
                  marginTop: 20,
                },
              ]}>
              <Text style={{color: COLORS.LIGHT_BORDER, marginVertical: 5}}>
                Upload Contact Picture
              </Text>
              <TouchableOpacity
              onPress={() => setProfileModal(!profileModal)}
                style={{
                  paddingHorizontal: 10,
                  borderColor: COLORS.GREY2,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: width * 0.3,
                    color: COLORS.DARK_GREEN,
                    fontSize: 15,
                    textAlign: 'center'
                  }}>
                  {image ? 'Contact Picture.jpg' : 'Upload'}
                </Text>
              </TouchableOpacity>
            </View> */}
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
            )}
            <ActivityLoader
                visible={visible}
                setVisible={() => setVisible(!visible)}
            />
        </View>
    );
};

export default TechnicianComponent;

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
