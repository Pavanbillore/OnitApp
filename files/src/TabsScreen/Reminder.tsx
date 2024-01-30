import {
    StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Button, Alert, Dimensions,
    Image, Modal, Pressable, ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CalendarEvents from 'react-native-calendar-events';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import PlusIcon from '../../assets/image/plusIcon.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FolderIcon from '../../assets/image/folder.png';
import { useNavigation } from '@react-navigation/native';
import DeleteFolder from '../../assets/image/delete.png';
import Close from '../../assets/image/close.png';

import paymentService from '../../utils/components/PaymentService';

const Reminder = () => {
    const { height, width } = Dimensions.get('screen');
    const { accessToken, userId, allServices, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [permissionStatus, setPermissionStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [Event, setEvent] = useState('')
    const [refresh, setRefresh] = useState(false);

    console.log('datttee==>', date)
    useFocusEffect(
        React.useCallback(() => {
            console.log('dd', date)

            let initialDate = new Date();
            // Set the initialDate as the start date
            let startDate = initialDate.toISOString();
            let startYear = initialDate.getFullYear(); // Get the current year
            let startMonth = initialDate.getMonth();
            let startDay = initialDate.getDate();

            initialDate.setFullYear(startYear + 1); // Increment the year by one

            let endYear = initialDate.getFullYear(); // Get the updated year
            let endMonth = initialDate.getMonth();
            let endDay = initialDate.getDate();

            // Create the endDate with the updated year
            let endDate = new Date(endYear, endMonth, endDay).toISOString();

            console.log('start', startDate);
            console.log('end', endDate);
            // let endDate = date.toISOString() + 1
            CalendarEvents.fetchAllEvents(startDate, endDate, [])
                .then(Event => {
                    setEvent(Event)
                    console.log('events', Event)
                })
                .catch(error => console.log('all events error', error))
            // console.log('events', Event)
        }, [])
    );

    useEffect(() => {

        let initialDate = new Date();
        // Set the initialDate as the start date
        let startDate = initialDate.toISOString();
        let startYear = initialDate.getFullYear(); // Get the current year
        let startMonth = initialDate.getMonth();
        let startDay = initialDate.getDate();

        initialDate.setFullYear(startYear + 1); // Increment the year by one

        let endYear = initialDate.getFullYear(); // Get the updated year
        let endMonth = initialDate.getMonth();
        let endDay = initialDate.getDate();

        // Create the endDate with the updated year
        let endDate = new Date(endYear, endMonth, endDay).toISOString();

        console.log('start', startDate);
        console.log('end', endDate);
        // let endDate = date.toISOString() + 1
        CalendarEvents.fetchAllEvents(startDate, endDate, [])
            .then(Event => {
                setEvent(Event)
                console.log('events', Event)
            })
            .catch(error => console.log('all events error', error))

    }, [refresh])
    useEffect(() => {
        checkCalendarPermissions()
        console.log('userdata->', userData?.personal_details?.email)


    }, []);

    const checkCalendarPermissions = async () => {
        try {
            const status = await CalendarEvents.checkPermissions();
            setPermissionStatus(status);
        } catch (error) {
            console.error('Error checking calendar permissions:', error);
        }
    };

    const requestCalendarPermissions = async () => {

        try {

            const status = await CalendarEvents.requestPermissions();

            setPermissionStatus(status);
            console.log('sat', status)
        } catch (error) {
            console.error('Error requesting calendar permissions:', error);
        }
    };
    const handlePermissionRequest = () => {
        if (permissionStatus === 'authorized') {
            console.log('status', permissionStatus)
            Alert.alert('Permission Granted', 'You have already granted calendar permissions.');
        } else if (permissionStatus === 'denied') {
            console.log('console', permissionStatus)
            Alert.alert(
                'Permission Denied',
                'Please enable calendar access in your device settings to use this feature.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: requestCalendarPermissions },
                ]
            );
        } else {
            console.log('console', permissionStatus)
            requestCalendarPermissions();
        }
    };

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleDateChange = (text) => {
        setDate(text);
    };
    let originalDate = date
    let convertedDate = new Date(originalDate.getTime() - (24 * 60 * 60 * 1000));
    let convertedDateString = convertedDate.toISOString().slice(0, 10);
    let originaltime = date;
    let time = originaltime.toISOString().substring(11, 19);
    console.log(time)
    const dateString = "2023-06-30T03:26:00.000Z";



    const getdate = date;
    const formattedDate = getdate.toISOString().split('T')[0];
    const formattedTime = getdate.toISOString().split('T')[1].split('.')[0];
    console.log("Date: " + formattedDate);
    console.log("Time: " + formattedTime);

    const handleSetAlarm = async () => {
        const day = date;
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        console.log('nerxtday', nextDay)

        try {


            let existingCalendars = await CalendarEvents.findCalendars()
            console.log('existing->>', existingCalendars)
            const calendar = {
                title: 'My Calendar',
                color: '#424242',
                entityType: 'Reminder',
                source: {
                    name: userData?.personal_details?.email,
                    type: "com.google"
                },
                name: userData?.personal_details?.name,
                accessLevel: 'owner',
                ownerAccount: userData?.personal_details?.email,


            };

            let myCal = await CalendarEvents.saveCalendar(calendar)
            console.log('mycal->', myCal)
            const option = {
                calendarId: myCal,
                startDate: date.toISOString(),
                endDate: nextDay.toISOString(),
                alarms: [{
                    date: date.toISOString()
                }]

            }
            console.log('opppt', option)

            const saveCal = await CalendarEvents.saveEvent(title, option)
            setModalVisible(false)
            setRefresh(!refresh);



            console.log('Event created successfully!', saveCal);
        } catch (error) {
            console.error('Error creating event:', error);
        }

    };
    const deletedata = (id) => {
        CalendarEvents.removeEvent(id, {

        })
        console.log('delete', id)
        setRefresh(!refresh);
    }
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, }}>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "#fff",
                    padding: 20,

                }}
            >
                <TouchableOpacity onPress={() => { navigation.navigate('Task') }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: "gray",
                            left: -20
                        }}
                    >
                        TASKS
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
                        REMINDERS
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 2, width: '50%', borderBottomColor: "#2386D4", alignSelf: "flex-end" }}></View>
            {permissionStatus === 'authorized' ?
                <View style={{ padding: 10 }}>
                    <ScrollView>

                        <View>
                            <Calendar />
                        </View>

                        <View
                            style={{
                                justifyContent: 'flex-end',
                                flexGrow: 1,
                                //bottom: width / 25,
                                top: 17,
                                right: 20,
                                height: 50,
                                alignItems: "flex-end",

                            }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}>
                                <View style={styles.addWrapper}>
                                    <Image style={styles.icon} source={PlusIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* 
                        <View>
                <TouchableOpacity onPress={navigate(paymentService)}>
                   <Text style={{fontSize:10,color:'black'}}>Pressss meee</Text>
                </TouchableOpacity>
            </View> */}

                        <View style={{ padding: 10, marginBottom: 20, bottom: 10 }}>
                            <Text style={{ fontSize: 17 }}>Upcoming</Text>
                        </View>

                        <View style={{ minHeight: '100%', bottom: 38 }}>

                            <FlatList
                                data={Event}
                                renderItem={({ item }) => {
                                    const getdate = new Date(item?.startDate);
                                    const formattedDate = getdate.toISOString().split('T')[0];
                                    const formattedTime = getdate.toISOString().split('T')[1].split('.')[0];
                                    console.log("Date: " + formattedDate);
                                    console.log("Time: " + formattedTime);
                                    return (
                                        // <View style={{ marginTop: 4, borderBottomWidth: 1 }}>
                                        //     <Text style={{ color: 'black', fontSize: 19 }}>{item?.title}</Text>
                                        //     <View style={{ flexDirection: "row", }}>
                                        //         <Text style={{ color: "gray", fontSize: 15 }}> {formattedDate}</Text>
                                        //         <TouchableOpacity style={{ flexGrow: 1, alignItems: "flex-end",marginTop:-20 }} onPress={deletedata(item?.id,item?.startDate)}>
                                        //             <MaterialIcons name="cancel" size={40} color="black" />
                                        //         </TouchableOpacity>

                                        //         <View style={{ flexGrow: 1, alignItems: "flex-end", height: 50, width: 60, marginTop: -30, justifyContent: "center" }}>
                                        //             <View style={{ height: 50, backgroundColor: '#00796A', justifyContent: "center", alignItems: "center" }}>
                                        //                 <Text style={{ color: "white", fontSize: 16 }}>{formattedTime}</Text>

                                        //             </View>


                                        //         </View>
                                        //     </View>
                                        // </View>
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
                                                    style={{ marginTop: -10 }}
                                                />
                                            </View>
                                            {/* <View style={{ marginLeft: 13 }}>
                                                <Ionicons name="document-text" size={25} color="#F5B041" />
                                            </View> */}



                                            <View style={styles.todoText}>
                                                <TextInput
                                                    value={item.title}
                                                    editable={false}
                                                    style={{ color: 'black', fontSize: 17, fontWeight: '400' }}
                                                />
                                                <Text style={{ color: "#7B7D7D", bottom: 12 }}>{formattedDate}</Text>
                                            </View>

                                            <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                                                <View style={{ height: 40, backgroundColor: "#00796A", justifyContent: "center", alignItems: "center", borderRadius: 10, padding: 5 }}>
                                                    <Text style={{ color: "white", fontSize: 16 }}>{formattedTime}</Text>
                                                </View>

                                            </View>
                                            <TouchableOpacity
                                                style={[
                                                    styles.box,
                                                    {
                                                        padding: 6,
                                                    },
                                                ]}
                                                onPress={() => deletedata(item?.id,)}>
                                                <Image
                                                    style={{ width: 15, height: 20, tintColor: "#00796A" }}
                                                    source={require('../../assets/image/delete.png')}
                                                />
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity
                                            // onPress={handleDeleteData}
                                            >
                                                <MaterialIcons
                                                    name="keyboard-arrow-right"
                                                    size={30}
                                                    color="black"
                                                />
                                            </TouchableOpacity> */}
                                        </View>
                                    )
                                }}
                            />

                            {/* <Text style={{ color: 'black', fontSize: 19 }}>meeting at joe</Text>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ color: "gray", fontSize: 15 }}> july 10,2023</Text>
                            <View style={{ flexGrow: 1, alignItems: "flex-end", height: 50, width: 60, marginTop: -30, justifyContent: "center" }}>
                                <View style={{ height: 50, width: 50, backgroundColor: '#00796A', justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 16 }}>18.00</Text>
                                </View>

                            </View>
                        </View> */}




                        </View>
                        {/* <View
                            style={{
                                justifyContent: 'flex-start',
                                flexGrow: 1,
                                bottom: width / 3,
                                right: 20,
                                height: 150,
                                alignItems: "flex-end",

                            }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}>
                                <View style={styles.addWrapper}>
                                    <Image style={styles.icon} source={PlusIcon} />
                                </View>
                            </TouchableOpacity>
                        </View> */}



                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ borderWidth: 1, marginHorizontal: 10, borderRadius: 5, borderColor: "gray", width: '100%' }}>
                                        <TextInput
                                            placeholder='title'
                                            onChangeText={(title) => setTitle(title)}
                                            placeholderTextColor='gray'
                                            style={{ width: '100%' }}
                                        />
                                    </View>
                                    <View style={{ backgroundColor: "white", marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>


                                            <TouchableOpacity onPress={() => setOpen(true)}

                                                style={{
                                                    backgroundColor: "#1D8348",
                                                    height: 40, justifyContent: "center",
                                                    alignItems: "center", marginTop: 10, borderRadius: 5,
                                                    marginHorizontal: 10, width: '94%'
                                                }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>
                                                    Select Date & Time
                                                </Text>
                                            </TouchableOpacity>


                                        </View>


                                        <TouchableOpacity onPress={handleSetAlarm}

                                            style={{ backgroundColor: "#1D8348", height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 5, marginHorizontal: 10 }}>
                                            <Text style={{ fontSize: 20, color: "white" }}>
                                                Set Reminder

                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <Pressable
                                        // style={[styles.button, styles.buttonClose]}
                                        style={{ marginTop: 10 }}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <MaterialIcons name="cancel" size={40} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>



                        <View>
                            <DateTimePicker
                                isVisible={open}
                                mode="datetime"
                                onConfirm={date => {
                                    setOpen(false);
                                    setDate(date);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}

                            // date={value || moment().subtract(18, 'years')._d}
                            />
                        </View>


                    </ScrollView>
                </ View >

                :
                <Button title="Request Calendar Permissions" onPress={handlePermissionRequest} />

            }



        </View>
    )
}

export default Reminder

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
        //position:'relative'
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
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
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
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 10,
        height: 75,
        borderBottomWidth: 3,
        borderColor: '#E5E7E9',
        backgroundColor: 'white',
        paddingTop: 5,
        marginBottom: 8,

    },
    todoText: {
        flex: 1,
        marginLeft: 10,

    },
})