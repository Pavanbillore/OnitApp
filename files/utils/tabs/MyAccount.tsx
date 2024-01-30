import React, { useState, useEffect } from 'react';
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
    ImageBackground,
    ToastAndroid,
    Alert, Linking,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Icon from '../components/Icon';
import { setUserData, setAllServices } from '../../backend/slice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../backend/slice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { BASE_URL, NEW_BASE_URL } from '../components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sessionStorage from 'redux-persist/es/storage/session';
import localStorage from 'redux-persist/es/storage';

// import * as ImagePicker from "expo-image-picker";

const MyAccount = ({ navigation }) => {
    const [avatarSource, setAvatarSource] = useState(null);
    const [loader, setLoader] = useState(false);
    const [imageUri, setImageUri] = useState('../../assets/image/profile.png');
    const [galleryPhoto, setGalleryPhoto] = useState();
    const [visible, setVisible] = useState(false);
    const { userData, allServices } = useSelector((state: any) => state.auth);
    const [visible1, setVisible1] = useState(false);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [profilePicture, setprofilePicture] = useState()
    const [img, setImg] = useState(null);
    const [logout, setLogout] = useState('')
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    const { userNumber } = useSelector((state: any) => state.auth)
    const toggleProfileImage = () => {
        setVisible1(!visible1);
    };

    useEffect(() => {
        console.log('aiudyasidj', userData?._id);
    }, []);


    const fetchGroupDetail = async () => {
        const payload = {
            user_id: userData?._id
        }
        try {
            const response = await axios({
                method: "delete",
                url: `${NEW_BASE_URL}consumerAppAppRoute/logout`,

                data: payload,
            })

            setLogout(response?.data)
            await AsyncStorage.clear()
            ToastAndroid.show('Logout in successfully!', ToastAndroid.SHORT);
            navigation.navigate('Login')
            // setId(route?.params?.id)
            console.log('response', response?.data); // Do something with the response data
        } catch (error) {
            console.error('hh', error);
        }
    };


    const handleChoosePhoto = () => {
        const options = {
            noData: true,
            multiple: true,
            quality: 0.2,
        };
        launchImageLibrary(options, response => {
            console.log("response", response)
            if (response?.assets?.[0]?.uri) {
                setImg(response?.assets?.[0]?.uri)
                // console.log('imageeeee', Image.getSize(image))
            }
        })
    }

    console.log('image', img)

    useEffect(() => {
        // handleImageUpload()
        console.log('userData', userData)
    }, [])


    const handleImageUpload = async () => {

        if (img) {
            setLoader(true);
            var data = new FormData();
            data.append('file', {
                uri: img.uri,
                name: img.name,
                type: img.type,
                height: img.height,
                width: img.width,
            });
            const payload = {
                _id: userData?._id,
                personal_details: {
                    phone: {
                        country_code: "+91",
                        mobile_number: userData?.personal_details?.phone?.mobile_number
                    }
                }
            }
            data.append('data', JSON.stringify(payload));
            console.log('ddaa', data)
            try {
                const response = await fetch(
                    `${BASE_URL}consumerAppAppRoute/update-consumer-withImage`,
                    {
                        method: 'post',

                        headers: {
                            'Content-Type': 'multipart/form-data',

                        },

                        body: data

                    },
                );
                let _data = await response.json();
                console.log('aa', _data)
                //   setImageResponse(_data);
                //   dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
                setImage(_data?.data?.fileSavedUrl.toString());
                if (_data.status === 200) {
                    setLoader(false);
                    ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
            }
        } else {
            Alert.alert('Error!', 'Upload Training/Experience/RPL Certificate!');
        }
        // const options = {
        //     noData: true,
        //     multiple: true,
        //     quality: 0.2,
        // };

        // ImagePicker.openCamera (options, profilePicture => {

        //     if (profilePicture.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else {
        //         const data = new FormData();
        //         data.append('file', {

        //             uri: profilePicture.uri,
        //             type: profilePicture.mimetype
        //         });
        //         const payload={
        //             _id: userData?._id,
        //             personal_details: {
        //                 phone: {
        //                     country_code: "+91",
        //                     mobile_number: userData?.personal_details?.phone?.mobile_number
        //                 }
        //             }
        //         }
        //         data.append('data',JSON.stringify(payload) );
        //         axios({
        //             method: 'post',
        //             url:`${BASE_URL}consumerAppAppRoute/update-consumer-withImage`,
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //             data:data
        //         })


        //             .then((response) => {
        //                 console.log('Image uploaded successfully');
        //                 setprofilePicture(response?.data)
        //             })
        //             .catch((error) => {
        //                 console.log('Error uploading image: ', error);
        //             });
        //     }
        // });
    };

    // const uploadCertificate = async () => {
    //   if (certificate) {
    //     setLoader(true);
    //     var data = new FormData();
    //     data.append('aadhar', {
    //       uri: certificate.path,
    //       name: certificate.path.split('/').pop(),
    //       type: certificate.mime,
    //       height: certificate.height,
    //       width: certificate.width,
    //     });
    //     try {
    //       const response = await fetch(
    //         TECHNICIAN_COMPANY_WORKED_WITH_CERTIFICATE,
    //         {
    //           method: 'post',
    //           config: {
    //             headers: {
    //               'Content-Type': 'multipart/form-data',
    //               Accept: 'application/json',
    //             },
    //           },
    //           body: data,
    //           mode: 'cors',
    //         },
    //       );
    //       let _data = await response.json();
    //       setImageResponse(_data);
    //       dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
    //       sets3Certificate(_data?.data?.fileSavedUrl.toString());
    //       if (_data.status === 200) {
    //         setLoader(false);
    //         ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
    //       }
    //     } catch (error) {
    //       setLoader(false);
    //       console.log(error);
    //     }
    //   } else {
    //     Alert.alert('Error!', 'Upload Training/Experience/RPL Certificate!');
    //   }
    // };

    // code show alert

    const openFb = () => {
        Linking.openURL("https://www.linkedin.com/company/onitservices/");
    }
    const openLinkedIn = () => {
        Linking.openURL('https://www.facebook.com/profile.php?id=100083150591316');
    }
    const InstaGram = () => {
        Linking.openURL('https://instagram.com/onitservices?igshid=YmMyMTA2M2Y=')
    }
    const showAlert = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to remove profile photo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => toggleProfileImage(),
                    style: 'cancel',
                },
                { text: 'Confirm', onPress: () => confirmDeletion() },
            ],
            { cancelable: false },
        );
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#00796A',
            }}>
            <ScrollView>
                <StatusBar backgroundColor="#00796A" />
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        padding: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image
                            source={require("../../assets/logo/back.png")}
                            style={{
                                height: 26,
                                width: 27,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            paddingLeft: 100,
                            fontSize: 20,
                            fontWeight: "600",
                            color: "#000"
                        }}
                    >
                        My Account
                    </Text>
                </View>
                {/* <View
                    style={{
                        flexDirection: 'column',

                        height: "50%",
                        alignItems: 'center',
                        backgroundColor: '#00796A',

                        marginBottom: 20,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',

                            alignItems: 'center',

                        }}>
                        <Text
                            style={{
                                fontSize: 21,
                                fontWeight: '700',
                                marginTop: 20,
                                color: '#fff',
                            }}>
                            {userData?.personal_details?.name}
                        </Text>


                    </View>

                    <TouchableOpacity onPress={toggleProfileImage}>
                        {image === null ? (
                            <View style={{}}>
                                <Image
                                    source={require('../../assets/image/profile.png')}

                                    style={{
                                        height: 90,
                                        width: 90,
                                        marginTop: 10,
                                        marginLeft: 2,
                                        borderRadius: 60,
                                    }}
                                />
                            </View>
                        ) : (
                            <Image
                                source={{ uri: image }}
                                style={{
                                    height: 90,
                                    width: 90,
                                    marginTop: 10,
                                    marginLeft: 2,
                                    borderRadius: 60,
                                }}
                            />
                        )}

                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: 60,
                                marginTop: -30,
                            }}
                            source={require('../../assets/image/camera1.png')}
                        />
                    </TouchableOpacity>
                    <View style={{ height: '50%', backgroundColor: "white" }}>
                        <Text>hii</Text>
                    </View>
                </View> */}

                <View style={{ height: 150, justifyContent: "center", padding: 20 }}>

                    <View style={{ flexDirection: "row" }}>

                        {/* <TouchableOpacity onPress={handleChoosePhoto}>
                            {img === null ? (
                                <View style={{}}>
                                    <Image
                                        source={require('../../assets/image/profile.png')}

                                        style={{
                                            height: 90,
                                            width: 90,
                                            marginTop: 10,
                                            marginLeft: 2,
                                            borderRadius: 60,
                                        }}
                                    />
                                    <Image
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginLeft: 60,
                                            marginTop: -30,
                                        }}
                                        source={require('../../assets/image/camera1.png')}
                                    />
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: img }}
                                    style={{
                                        height: 90,
                                        width: 90,
                                        marginTop: 10,
                                        marginLeft: 2,
                                        borderRadius: 60,
                                    }}
                                />
                            )}


                        </TouchableOpacity> */}

                        <View style={{ justifyContent: "center", flexDirection: "column", marginLeft: 10, flexGrow: 1 }}>
                            {
                                !userData?.personal_details?.phone?.mobile_number ?
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontSize: 25, }}>Complete Your Profile</Text>
                                    </View>
                                    :

                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 25, fontWeight: "600", flexGrow: 1 }}>{userData?.personal_details?.name}</Text>
                                        <Text style={{ color: "white", fontSize: 15 }}>+91 {userData?.personal_details?.phone?.mobile_number}</Text>
                                    </View>

                            }


                        </View>
                    </View>

                </View>

                <View style={{ backgroundColor: "white", flex: 1, height: 450, marginHorizontal: 20, borderRadius: 20 }}>

                    <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 30,
                        marginLeft: 20
                    }} onPress={() => navigation.navigate("BookingList")}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,


                            }}
                            source={require('../../assets/image/calendar.png')}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>My Bookings</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("BookingList")}>
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>


                    {/* <View style={{

                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row', marginTop: 30,
                            marginLeft: 20
                        }} >
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,


                                }}
                                source={require('../../assets/image/map.png')}
                            />
                            <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>Manage Address</Text>

                            </View>
                            <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />

                            </View>
                        </TouchableOpacity>
                    </View> */}


                    {/* <View style={{
                       
                    }}> */}
                    <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 30,
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('ReferScreen')}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,


                            }}
                            source={require('../../assets/image/money.png')}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>Refer & Earn</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ReferScreen')}>
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />

                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                    {/* </View> */}




                    <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 30,
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('AboutUs')}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,


                            }}
                            source={require('../../assets/image/info.png')}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>About Us</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>


                    {/* <View style={{
                        
                    }}> */}
                    <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 30,
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('privacy')}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,


                            }}
                            source={require('../../assets/image/insurance.png')}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>Privacy Policy</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('privacy')}>

                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 30,
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('CheckScreen')}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,


                            }}
                            source={require('../../assets/image/insurance.png')}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}>Privacy Policy</Text>
                        </View>
                        <View style={{ justifyContent: "center", flexGrow: 1, alignItems: 'flex-end', marginRight: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('privacy')}>

                                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity> */}
                    {/* </View> */}

                    <TouchableOpacity style={{ alignItems: "center", marginTop: 20 }} onPress={fetchGroupDetail}>
                        <Text style={{ color: "#00796A", fontSize: 17, fontWeight: '500' }}>Sign Out</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 30,
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <View style={style.circularProfileBox}>
                            <TouchableOpacity onPress={openFb}>
                                <Icon
                                    family="Foundation"
                                    name="social-linkedin"
                                    size={25}
                                    color={'#00796A'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={style.circularProfileBox}>
                            <TouchableOpacity onPress={InstaGram}>
                                <Entypo

                                    name="instagram"
                                    size={25}
                                    color={'#00796A'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={style.circularProfileBox}>
                            <TouchableOpacity onPress={openLinkedIn}>
                                <Icon
                                    family="AntDesign"
                                    name="facebook-square"
                                    size={25}
                                    color={'#00796A'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>











            </ScrollView>
        </View>
    );
};

export default MyAccount;

const style = StyleSheet.create({
    circularProfileBox: {
        backgroundColor: '#CCE4E1',
        width: 50,
        height: 50,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
