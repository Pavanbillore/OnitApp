import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList,ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { BASE_URL } from '../../utils/components/api'
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from 'react-native-check-box'
import UserAvatar from 'react-native-user-avatar';


const AddExpenseScreen = ({ route,navigation }) => {
    console.log('iddd', route)
    const { accessToken, userId, allServices, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );

    const [amount, setAmount] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [persons, setPersons] = useState('')
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState()
    const [title,setTitle]=useState('')
    const [user,setUsers]=useState('')
    useEffect(() => {
        console.log('datttaa', userData?.personal_details?.name)

        getDetails()
        // nam()

    }, [])

    
    const getDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}moneyManage/group/Details/${route?.params?.id}/${userData?.personal_details?.name}`);
            setName(response?.data?.group?.groupMember)
            setPersons(response?.data?.group?.groupMember)
            setSelectedUsers(response?.data?.group)
            // setSelectedUsers(persons.forEach(obj => {
            //     console.log(obj.name, obj.age);
            //   }))

            console.log('responseeee===>>>', response?.data?.group); // Do something with the response data
        } catch (error) {
            console.error('hh', error);
        }
    };
    
    console.log('adsss',selectedUsers?._id)

    const AddDetails = async () => {
        try {
           
            const payload = {
                title: title,
                author: userData?.personal_details?.name?.toLowerCase(),
                lender: userData?.personal_details?.name?.toLowerCase(),
                borrowers:[]as [string, number][],
                amount:+amount
            };
            for (let i = 0; i < persons.length; i++) {
                payload.borrowers.push([
                  persons[i]?.personal_details?.name?.toLowerCase(),
                  amount / persons.length
                ]);
              }
            console.log('paddd', payload)
            await axios({
                method: "post",
                url: `${BASE_URL}moneyManage/expenses/${selectedUsers?._id}`,

                data: payload,
            })
                .then((res) => {
                    setUsers(res?.data)
                    navigation.navigate('SplitScreen',{id:route?.params?.id})
                    // setVisible(false)
                    // fetchData()
                    console.log("asss", res?.data)
                    ToastAndroid.show('Money Add Successfully', ToastAndroid.SHORT)

                })
                .catch((error) => {
                    console.log("Here-->", error?.response);

                });
        } catch (err) {

        }
    }

   
    console.log('member', amount / name?.length)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 5, borderBottomWidth: 1, borderColor: "#B3B6B7" }}>
                <View style={{ alignItems: "flex-start" }}>
                    <Ionicons name="arrow-back" size={30} color="black" onPress={()=>navigation.navigate('SplitScreen')}/>
                </View>

                <View style={{ flexGrow: 1, alignItems: "center" }}>
                    <Text style={{ color: "black", fontSize: 20 }}>Add expense</Text>
                </View>

                <View>
                    <AntDesign name="check" size={30} color="black" onPress={AddDetails}/>
                </View>

            </View>

            <View style={{ padding: 20, marginHorizontal: 20, marginTop: 30 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 50, width: 50, borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: "#B3B6B7", borderBottomWidth: 2 }}>
                        <Entypo name="text-document-inverted" size={30} color="#2C3E50" />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <TextInput placeholder='Enter a description' style={{ borderBottomWidth: 3, width: "115%", fontSize: 20, borderColor: "#239B56" }} 
                        onChangeText={(title)=>setTitle(title)}
                        />
                    </View>


                </View>

                <View style={{ flexDirection: "row", marginTop: 20, alignItems: "flex-end" }}>
                    <View style={{ height: 50, width: 50, borderWidth: 1, justifyContent: "flex-end", alignItems: "center", borderColor: "#B3B6B7", borderBottomWidth: 2 }}>
                        <Text style={{ fontSize: 30, color: "#2C3E50" }}>₹</Text>
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: "center" }}>
                        <TextInput
                            placeholder='0.00'
                            style={{ borderBottomWidth: 1, width: "300%", fontSize: 30, borderColor: "#B3B6B7" }}
                            onChangeText={(amount) => setAmount(amount)}
                            keyboardType='number-pad'
                        />
                    </View>


                </View>

                <View style={{ flexDirection: "row", marginTop: 45 }}>
                    <Text style={{ fontSize: 18, color: "#34495E" }}>Paid by</Text>

                    <TouchableOpacity style={{ borderColor: "#B3B6B7", marginLeft: 10, width: '30%', justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: "#1D8348" }}>{userData?.personal_details?.name}</Text>
                    </TouchableOpacity>


                    <Text style={{ fontSize: 18, color: "#34495E", marginLeft: 10 }} >
                        and split
                    </Text>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: "#B3B6B7", marginLeft: 10, width: '24%', justifyContent: "center", alignItems: "center" }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 18, color: "gray" }}>equally</Text>
                    </TouchableOpacity>

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
                            <FlatList
                                data={persons}
                                keyExtractor={(item) => item?.id} // Assuming each user has a unique 'id' property
                                renderItem={({ item }) => {
                                    console.log('item', item)
                                    return (

                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                            {/* <View style={{ paddingVertical: 5 }}>
                                                <UserAvatar size={100} name={item?.personal_details?.name} size={50} />
                                            </View> */}
                                            <View style={{ marginLeft: 10 }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ color: "black", fontSize: 17 }}>{item?.personal_details?.name}</Text>


                                                    {/* {item?._id === admin?.groupAdmin?._id && <View style={{ width: 50, height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: 'red', marginLeft: 10, marginTop: 3 }}>
                                                        <Text style={{ color: "red" }}>Admin</Text>
                                                    </View>} */}
                                                </View>



                                                <Text>{item?.personal_details?.email}</Text>
                                            </View>

                                            <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                                                {/* <CheckBox
                                                    value={isSelected}
                                                    onValueChange={() => handleCheckBoxToggle(item?.id)}
                                                /> */}
                                                <Text>{amount/persons?.length}</Text>

                                            </View>
                                        </View>

                                    )
                                }}
                            />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View >
        </View >
    )
}

export default AddExpenseScreen

const styles = StyleSheet.create({
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