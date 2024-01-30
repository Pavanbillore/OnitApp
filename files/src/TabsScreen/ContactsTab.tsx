import React, { useState, useEffect, useCallback } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    Image, PermissionsAndroid
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
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import ActivityLoader from '../../utils/components/ActivityLoader';
import { setUserContacts } from '../../backend/slice';
import Contacts from 'react-native-contacts';


const { height, width } = Dimensions.get('screen');

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

let ContactsTab = (props: any) => {
    const { userId, userContacts } = useSelector((state: any) => state.auth);
    const [folder, setFolder] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const [folderError, setFolderError] = useState(false);
    const [visible, setVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => {
            getContactsFolderList();
            setRefresh(false);
        });
    }, []);

    const navigation = useNavigation();
    useEffect(() => {
        // allContacts()
        console.log('consumerId', userId);
        setFolderError(false);
        setFolderName('');
        console.log('ID', userContacts);
        if (!userContacts) getContactsFolderList();
        else setFolder(userContacts);
    }, []);

    //   Contacts.getAll().then(contacts => {
    //     console.log('data',contacts)
    //   })


    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.',
            'buttonPositive': 'Please accept bare mortal'
        }
    )

    // Contacts.getContactsByEmailAddress().then(contacts=>{
    //     console.log('data',contacts)
    // })

    // Contacts.getContactsByPhoneNumber((err,contacts)=>{
    //     if(err){
    //         throw err
    //     }
    //     console.log('contact',JSON.stringify(contacts) )
    // })

    //   const getAllContacts = () => {
    //     Contacts.getAll((err, contacts) => {
    //       if (err) { 
    //         throw err; 
    //       }
    //       // Use the contacts array
    //       console.log(contacts);
    //     });
    //   }
    // Contacts.getAll()
    // .then((contacts) => {

    //       console.log(contacts)
    //     })
    //       .catch((e) => {
    //           console.log(e)
    //       }) 

    const allContacts = () => {
        Contacts.getAll().then((contact) => {
            console.log('data', contact)
        })
    }



    const getContactsFolderList = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: API.GET_ALL_CONTACTS_DIRECTORY + userId,
                // config: {
                //   headers: {
                //     'x-access-token': accessToken
                //   }
                // }
            });
            console.log('asd');
            if (res) {
                console.log('DATA DOC', res.data);
                setFolder(res.data?.data);
                dispatch(setUserContacts(res.data?.data));
                setVisible(false);
            } else {
                console.log('API ERROR', res);
            }
        } catch (err) {
            console.log('ERROR', err);
        }
    };

    const CreateFolderError = (title: any) => {
        ToastAndroid.show(
            `Cannot create ${title} folder multiple times`,
            ToastAndroid.TOP,
        );
        setCreateFolderModal(false);
        setFolderName('');
        setFolderError(true);
        console.log(folderError, 'ERROR');
    };

    const createFolder = async (title: string) => {
        // setVisible(true)
        let clone = [...folder];
        clone.filter((name: any) => {
            console.log(title);
            name.title === title ? CreateFolderError(title) : setFolderError(false);
        });
        console.log('FERROR', folderError);
        if (!folderError) {
            let data: any = {
                title,
                numberOfContacts: '0',
            };
            console.log('contacts');
            try {
                console.log('contacts');
                let contacts = {
                    consumerId: userId,
                    dirname: title,
                };
                console.log(title, 'titlename');

                const res = await axios({
                    method: 'post',
                    url: API.CREATE_CONTACTS_FOLDER,
                    data: { contacts },
                    // config: {
                    //   headers: {
                    //     'x-access-Token': accessToken,
                    //   },
                    // },
                });
                if (res.data) {
                    console.log('DATA', res.data);
                    if (res.data?.message === `${title} already exists in user space`) {
                        ToastAndroid.show(`${title} already exists!!!`, ToastAndroid.SHORT);
                        setCreateFolderModal(!createFolderModal);
                        setVisible(false);
                    } else {
                        console.log('dirname', title);
                        setFolderName(data);
                        // clone.push(data);
                        // setFolder(clone);
                        setCreateFolderModal(!createFolderModal);
                        getContactsFolderList();
                        setVisible(false);
                    }
                } else {
                    console.log('ERROR_RESPONSE', res);
                }
            } catch (err) {
                console.log('ERROR CONTACTs', err);
                setVisible(false);
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
                <TouchableOpacity>
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
                <TouchableOpacity onPress={() => navigation.navigate('Documents')}>
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
            <View style={{ borderBottomWidth: 2, width: '50%', borderBottomColor: "#2386D4", }}></View>
            <Text style={styles.screenHeader}>All Contacts</Text>
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
                {folder.map((val: any, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() =>
                                navigation.navigate('TechnicianComponent', {
                                    directoryName: val?.Dirname,
                                    directoryID: val?.id,
                                })
                            }>
                            <View style={styles.folderBox}>
                                <Text style={styles.folderText}>{val?.Dirname}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.box}>
                                        <Text style={{ color: 'white' }}>{val?.Count || '0'}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.box,
                                            {
                                                padding: 6,
                                            },
                                        ]}
                                        onPress={() => deleteFolder(key)}>
                                        <Image
                                            style={{ width: 15, height: 20 }}
                                            source={DeleteFolder}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
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
                                    <Text style={styles.modalHeaderText}>
                                        Create New Phonebook
                                    </Text>
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

export default ContactsTab;
