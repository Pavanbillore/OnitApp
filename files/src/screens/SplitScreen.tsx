import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import { BASE_URL } from '../../utils/components/api'
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Navigation from '../../Navigation';
import PlusIcon from '../../assets/image/plusIcon.png';
import Entypo from 'react-native-vector-icons/Entypo';


const { height, width } = Dimensions.get('screen');
const SplitScreen = ({ route, navigation }) => {

    useFocusEffect(
        React.useCallback(() => {
            fetchTransactionDetails();
        }, [])
    );
    useEffect(() => {
        fetchGroupDetail()
    }, [])
    console.log('params', route?.params)
    const { accessToken, userId, allServices, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );
    const [result, setResult] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [createFolderModal, setCreateFolderModal] = useState(false);
    const [result1, setResult1] = useState('')
    const [id, setId] = useState(route?.params?.id)
    const [name, setName] = useState('')
    const [balance,setBalance]=useState('')
    console.log('idddd', id)

    const fetchGroupDetail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}moneyManage/group/Details/${route?.params?.id}/${userData?.personal_details?.name}`);
            setResult(response?.data?.group)
            setId(route?.params?.id)
            setBalance(response?.data?.user)
            console.log('response===>>', response?.data?.user?.netDebt); // Do something with the response data
        } catch (error) {
            console.error('hh', error);
        }
    };
    const fetchTransactionDetails = async () => {
        try {
            console.log('getid', id)
            const response = await axios.get(`${BASE_URL}moneyManage/expenses/${id}`);
            setResult1(response?.data)
            setName(response?.data[0])
            // console.log('responseeee======>>>>>', response?.data[0]); // Do something with the response data
        } catch (error) {
            console.error('hh', error);
        }
    };
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}moneyManage/users/${data}`);
    //         setResult(response?.data?.personal_details?.name)
    //         console.log('response', response?.data?.personal_details?.name.toString()); // Do something with the response data
    //     } catch (error) {
    //         console.error('hh', error);
    //     }
    // };

    // const AddUser = async () => {
    //     try {
    //         const payload = {
    //             username: data
    //         }
    //         console.log('paddd',payload)
    //         await axios({
    //             method: "post",
    //             url: `${BASE_URL}moneyManage/users`,

    //             data: payload,
    //         })
    //             .then((res) => {
    //                 setAdd(res?.data?.data)
    //                 console.log("asss", res?.data?.username)

    //             })
    //             .catch((error) => {
    //                 console.log("Here-->", error?.response);

    //             });
    //     } catch (err) {

    //     }
    // }
    let i = 0;
    return (
        <View style={{ flex: 1, height: '100%' }}>
            {/* <ScrollView style={{height:"100%"}}> */}
            <View style={{ height: '100%' }}>
                <View style={{ height: "20%" }}>
                    <View>
                        <Image source={require('../../assets/image/mo.jpeg')} style={{ height: 160,width:'100%' }} />
                    </View>

                    <View style={{ flexGrow: 1, alignItems: "flex-end", justifyContent: "center", position: "absolute", width: "100%", padding: 10 }}>
                        <AntDesign name="setting" size={30} color="black" onPress={() => navigation.navigate('GroupDetail', { id: route?.params?.id, name: result?.groupName })} />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20, height: '15%', marginTop: 30 }}>
                    <View style={{ marginLeft: 20, }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: "black" }}> {result?.groupName?.toUpperCase()}</Text>
                        {
                          balance?.netDebt>0?  
                             <Text style={{ color: "red", fontSize: 18, marginTop: 5 }}>You Owe ₹ {balance?.netDebt} overall</Text>:
                             <Text style={{ color: "green", fontSize: 18, marginTop: 5 }}>You Owed ₹ {Math.abs(balance?.netDebt)} overall</Text>
                        }
                       
                    </View>

                    <TouchableOpacity style={{ backgroundColor: "#EF5500", width: "40%", justifyContent: "center", alignItems: "center", height: "30%", borderRadius: 5, marginTop: 15 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Settle up</Text>
                    </TouchableOpacity>

                </View>


                <View style={{ padding: 10, }}>



                    <View>
                        <Text style={{ color: "#424949", fontSize: 17, fontWeight: '500' }}>June 2023</Text>
                    </View>


                    <View style={{ height: "74%" }}>
                        <ScrollView>

                            <FlatList

                                data={result1}
                                renderItem={({ item, index }) => {
                                    console.log('date', item?.creationDatetime)
                                    const dateString = item?.creationDatetime;
                                    const date = new Date(dateString);
                                    const months = [
                                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                    ];
                                    const month = months[date.getMonth()];
                                    const day = date.getDate();
                                    const formattedDate = `${month} ${day}`;
                                    console.log(formattedDate);
                                    return (

                                        <View style={{ flexDirection: "row", marginTop: 20 }} key={index}>

                                            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "gray" }}>{formattedDate}</Text>
                                            </View>
                                            <View style={{ backgroundColor: "#E5E7E9", justifyContent: "center", alignItems: "center", width: "13%" }}>
                                                <Feather name="shopping-cart" size={30} color="gray" />
                                            </View>

                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={{ color: "black", fontSize: 17 }}>{item?.title}</Text>
                                                {/* <Text style={{ color: "gray" }}>You are not involved</Text> */}
                                            </View>

                                            <View style={{ alignItems: "flex-end", flexGrow: 1, justifyContent: "center" }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ color: "gray", marginRight: 10 }}>₹{item?.amount}</Text>
                                                    <Entypo name="info-with-circle" size={18} color="skyblue" onPress={() => {
                                                        setSelectedIndex(index); // Assuming you have access to the 'index' variable here
                                                        setModalVisible(true);
                                                    }} />
                                                </View>

                                                <View style={{ width: "50%", height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: 'green', marginLeft: 10, marginTop: 3 }}>
                                                    <Text style={{ color: "green" }}>{item?.lender?.toUpperCase()}->{item?.borrowers?.length - 1}</Text>
                                                </View>
                                            </View>

                                        </View>


                                    )
                                }}
                            />
                        </ScrollView>

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {

                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: "black" }}>Amount Splited</Text>
                                    <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                                        <Entypo name="cross" size={40} color="black" onPress={() => setModalVisible(!modalVisible)} />

                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <FlatList
                                        data={result1}
                                        keyExtractor={(item) => item?.id} // Assuming each user has a unique 'id' property
                                        renderItem={({ item, index }) => {
                                            if (index !== selectedIndex) return null;
                                            console.log('selectedIndex', selectedIndex)

                                            console.log('item', index)
                                            console.log('item1', item?.borrowers[selectedIndex])

                                            const value = result1[index]
                                            console.log("asd", value)

                                            return (

                                                <View style={{ marginTop: 10, }} >


                                                    <FlatList
                                                        data={item?.borrowers}
                                                        keyExtractor={(item) => item?.id}
                                                        renderItem={({ item, index }) => {
                                                            console.log("Second Flat list",item)
                                                            console.log('profileid',userData)
                                                            return (
                                                                <View style={{ borderWidth: 1, borderRadius: 10, height: 40, marginTop: 7, padding: 10, width: "100%", 
                                                                borderColor: "green" ,flexDirection:'row'}}>

                                                                    <Text style={{ color: "green", }}>{item?.name.toUpperCase()}</Text>
                                                                    <View style={{flexGrow:1,alignItems:'flex-end'}}>
                                                                        <Text style={{ color: "green", }}>-></Text>
                                                                    </View>

                                                                    <View style={{flexGrow:1,alignItems:'flex-end'}}>
                                                                        <Text style={{ color: "green", }}>₹{item?.amount}</Text>
                                                                    </View>

                                                                </View>
                                                            )
                                                        }}
                                                    />


                                                </View>

                                            )
                                        }}
                                    />
                                </View>


                                {/* <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </Modal>





                </View>


            </View>
            <View
                style={{
                    justifyContent: 'flex-end',
                    flexGrow: 1,
                    bottom: width / 3,

                    right: 10,
                    alignItems: "flex-end"
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddExpenseScreen', { id: route?.params?.id, name: result?.groupName })}>
                    <View style={styles.addWrapper}>
                        <Entypo name="text-document-inverted" size={25} color="white" />
                        <Text style={{ color: "white", fontSize: 20, marginLeft: 5 }}>Add expense</Text>
                    </View>
                </TouchableOpacity>
            </View>



            {/* </ScrollView> */}

        </View >
    )
}

export default SplitScreen

const styles = StyleSheet.create({
    addWrapper: {
        width: 180,
        height: 60,
        backgroundColor: '#00796A',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        flexDirection: "row"
    },

    icon: {
        marginHorizontal: 10,
        width: 25,
        height: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalView: {
        margin: 10,
        height: '50%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})