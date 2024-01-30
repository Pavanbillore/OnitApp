import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr';
import Icon from '../../utils/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/components/api';
import { Chip } from 'react-native-elements';

import UserAvatar from 'react-native-user-avatar';

const GroupDetail = ({ route }) => {
    const { accessToken, userId, allServices, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );
    // console.log("addd", route?.params?.name)
    console.log("adddss==>>", route?.params?.id)
    console.log('namee=>>',userData?.personal_details?.name.toLowerCase())
    const [data, setData] = useState('')
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState('')
    const [add, setAdd] = useState('')
    const [name, setName] = useState('')
    const [admin, setAdmin] = useState('')
    const [usersToGetMoneyFrom, setusersToGetMoneyFrom] = useState([])
    const [usersToSendMoneyTo, setusersToSendMoneyTo] = useState([])

    // console.log('result', result)
    useEffect(() => {
console.log('hiii')

        getDetails()

    }, [])



    const fetchData = async () => {
        try {


            await axios({
                method: "get",
                url: `${BASE_URL}moneyManage/users/${data}`,

            })
                .then((res) => {
                    setAdd(res?.data[0]?._id)
                    setResult(res?.data)
                    // setVisible(false)
                    // getDetails()
                    // console.log("asss", res?.data[0]?._id)
                    // ToastAndroid.show('Add member successfully', ToastAndroid.SHORT)

                })
                .catch((error) => {
                    console.log("Here-->", error?.response);

                });
        } catch (err) {

        }
    }

    const getDetails = async () => {
        try {
            console.log('responseeee===>>>',`${BASE_URL}moneyManage/group/Details/${route?.params?.id}/${userData?.personal_details?.name.toLowerCase()}`)
            const response = await axios.get(`${BASE_URL}moneyManage/group/Details/${route?.params?.id}/${userData?.personal_details?.name.toLowerCase()}`);
            setName(response?.data?.group?.groupMember)
            setAdmin(response?.data?.group)
            setusersToGetMoneyFrom(response?.data?.usersToGetMoneyFrom)
            setusersToSendMoneyTo(response?.data?.usersToSendMoneyTo)
            console.log('responseeee===>>>', response?.data?.usersToGetMoneyFrom)
                // console.log()
                ; // Do something with the response data
        } catch (error) {
            console.error('hh', error);
        }
    };
    console.log('getvalue', usersToGetMoneyFrom)
    console.log('getvalueto==', usersToSendMoneyTo)
    // console.log('nammm',name)
    // console.log('ddnndd',add)

    const AddUser = async () => {
        try {
            const payload = {
                groupMember: add
            }
            // console.log('paddd', payload)
            await axios({
                method: "post",
                url: `${BASE_URL}moneyManage/group/add-member/${route?.params?.name}`,

                data: payload,
            })
                .then((res) => {
                    setAdd(res?.data?.data)
                    setVisible(false)
                    getDetails()
                    // console.log("asss", res?.data?.username)
                    ToastAndroid.show('Member Add Successfully', ToastAndroid.SHORT)

                })
                .catch((error) => {
                    console.log("Hereeeerr-->", error?.response);

                });
        } catch (err) {



        }
        // console.log('namm',name) 
        console.log('name', name[1]?.avatar.url)
    }
    let isInUsersToGetMoneyFrom 
    let isInUsersToSendMoneyTo
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ justifyContent: "center", alignItems: "center", borderBottomWidth: 1, height: '6%', borderColor: "#A6ACAF" }}>
                <Text style={{ fontSize: 22, fontWeight: "600", color: "black" }}>Group Setting</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, padding: 10, borderColor: "#A6ACAF" }}>
                <Image source={require('../../assets/image/mo.jpeg')} style={{ height: 50, width: 50, marginLeft: 14 }} />
                <View style={{ marginLeft: 14 }}>
                    <Text style={{ color: "black" }}>{route?.params?.name?.toUpperCase()}</Text>
                </View>
            </View>


            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: "gray", fontSize: 17 }}>Group members</Text>
            </View>

            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={toggleBottomNavigationView}>
                    <AntDesign name="addusergroup" size={30} color="black" />

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: "gray", fontSize: 19 }}>Add people to group</Text>
                    </View>
                </TouchableOpacity>

            </View>




            <FlatList
                data={name}

                renderItem={({ item }) => {
                    console.log('item', item)
                    
                    // Check if the user exists in the "usersToGetMoneyFrom" array
                    {
                        usersToGetMoneyFrom?.length >=0 ? isInUsersToGetMoneyFrom = usersToGetMoneyFrom?.some(
                            user => user?._id === item?._id
                        ): usersToGetMoneyFrom=[]
                    }
                    

                    console.log("isInUsersToGetMoneyFrom", isInUsersToGetMoneyFrom);


                    // Check if the user exists in the "usersToSendMoneyTo" array
                    {
                        usersToSendMoneyTo?.length>=0 ? isInUsersToSendMoneyTo = usersToSendMoneyTo?.some(
                            user => user?._id === item?._id
                        ):usersToSendMoneyTo=[]
                    }
                    

                    console.log("isInUsersToSendMoneyTo", isInUsersToSendMoneyTo);


                    // Determine the color based on the user's presence in the arrays
                    const textColor = isInUsersToGetMoneyFrom || isInUsersToSendMoneyTo ? "green" : "red";

                    // Find the user object in the "usersToGetMoneyFrom" array
                    const userObjectFrom = usersToGetMoneyFrom.find(user => user?._id === item?._id);

                    console.log("userObjectFrom", userObjectFrom);


                    // Find the user object in the "usersToSendMoneyTo" array
                    const userObjectTo = usersToSendMoneyTo.find(user => user?._id === item?._id);

                    console.log("userObjectTo", userObjectTo);


                    // Get the netDebt value from the user object or assign a default value if it doesn't exist
                    const netDebt = userObjectFrom?.netDebt || userObjectTo?.netDebt || 0;

                    console.log("netDebt", netDebt);
                    return (

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, width: '100%' }}>
                            <View style={{ paddingVertical: 10, }}>
                                <UserAvatar size={100} name={item?.personal_details?.name} size={50} />
                            </View>
                            <View style={{ marginLeft: 20, }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "black", fontSize: 20 }}>{item?.personal_details?.name}</Text>


                                    {item?._id === admin?.groupAdmin?._id && <View style={{ width: 50, height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: 'red', marginLeft: 10, marginTop: 3 }}>
                                        <Text style={{ color: "red" }}>Admin</Text>
                                    </View>}
                                </View>


                                <View style={{ flexDirection: "row", flexGrow: 1, width: '100%', }}>
                                    <Text>{item?.personal_details?.email}</Text>
                                    {item?._id != admin?.groupAdmin?._id
                                        && <View style={{ alignItems: "flex-end", width: "30%" }}>
                                            <View style={{
                                                width: 50, height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center",
                                                borderWidth: 1, borderColor: 'red', marginLeft: 10, marginTop: 3
                                            }}>

                                                {/* <Text style={{ color: textColor }}>{isInUsersToGetMoneyFrom || isInUsersToSendMoneyTo ? netDebt : "0"}</Text> */}
                                            </View>

                                        </View>
                                    }

                                </View>


                            </View>
                        </View>
                    )
                }}
            />

            < View >
                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: 250,
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
                                    Add New Member
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
                                        placeholder="Write Member Name"
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={fetchData}
                                    style={styles.button}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: 'white',
                                        }}>
                                        Search Name
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
                            {
                                result ? <View style={{ width: '100%' }}>

                                    <TouchableOpacity style={{ height: 33, width: '90%', backgroundColor: "#00796A", justifyContent: "center", alignItems: "center", borderRadius: 5, marginLeft: 15, marginTop: 10 }}
                                        onPress={AddUser}
                                    >
                                        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Add Member</Text>
                                    </TouchableOpacity>


                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "#0E6655" }}>{result?.personal_details?.phone?.mobile_number}</Text>
                                    </View>
                                </View> : null
                            }
                        </View>
                    </View>
                </BottomSheet>
            </View >



        </View >
    )
}

export default GroupDetail

const styles = StyleSheet.create({
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
})