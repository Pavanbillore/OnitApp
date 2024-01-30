import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    ToastAndroid,
    KeyboardAvoidingView,
    Modal,
    Linking,
    Alert,
    StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import DownArrow from 'react-native-vector-icons/AntDesign';
import Calls from 'react-native-vector-icons/Feather';
import { Rating, AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { API } from '../../utils/components/api';
import { useRoute } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen');
const PickDropDriver = (props: any) => {
    const route = useRoute()
    const id = route.params?.id;
    const { navigation } = props;
    const [confirmation, setConfirmation] = useState(false);
    const [amount, setAmount] = useState('25');
    const [ondata, setOndata] = useState(true);
    // const { currentAddress, userNumber, userData } = useSelector(
    //     (state: any) => state.auth,
    // );
    const dispatch = useDispatch();
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [vehicleNo, setvehicleNo] = useState('');
    const [otp, setOtp] = useState('');
    const [driverImage, setdriverImage] = useState('');
    const [rating, setRating] = useState('');
    const [Allrating, setAllrating] = useState('');
    const [totalrides, setTotalrides] = useState('');
    const [phone, setphone] = useState('');
    const [fareprice, setFareprice] = useState('');
    const [duration, setDuration] = useState('');
    const [paymentstatus, setPaymentstatus] = useState('');
    const [pincode, setpincode] = useState('');
    const [profile, setProfile] = useState('');
    const [ids, setids] = useState('');
    const [loading, setloading] = useState(false);
    const getData = async (v: any) => {
        // setloading(true);
        try {
            const res = await axios({
                method: 'get',
                url:
                    'http://13.233.255.20/consumerAppAppRoute/get-only-ticket/' + id
            });
            if (res) {
                setOtp(res.data.data.code.happy_code)
                setPickup(res.data.data.pickupAddress.city);
                setDrop(res.data.data.dropAddress.city);
                setPrice(res.data.data.ticket_price);
                setpincode(res.data.data.pickupAddress.pincode);
                setRating(res.data.data.assigned_ids.assigned_technician_id.count_details.technician_rating);
                setTotalrides(res.data.data.remarks.over_all_rating);
                setphone(res.data.data.assigned_ids.assigned_technician_id.personal_details.phone.mobile_number);
                setName(res.data.data.assigned_ids.assigned_technician_id.personal_details.name);
                setProfile(res.data.data.assigned_ids.assigned_technician_id.personal_details.profile_picture);
                setvehicleNo(res.data.data.assigned_ids.assigned_technician_id.document_details.aadhar_number);
                setFareprice(res.data.data.mode_of_payment);
                setids(res.data.data._id);
                console.log('ticket data', res.data.data);
                console.log('technician status is true', res.data.data.is_technician_assigned);
                if (res.data.data.is_technician_assigned == true) {
                    setloading(true);
                    clearInterval(v);
                }
            } else {
                console.log('API ERROR', res);
                Toast.showWithGravity(
                    'Something went wrong...',
                    Toast.LONG,
                    Toast.TOP,
                );
                // setloading(false);
            }
        } catch (err) {
            console.log('ERROR REQUESTS', err);
            Toast.showWithGravity('Some error is getting...', Toast.LONG, Toast.TOP);
        }
    };
    const checkStatusCron = () => {
        const interval = setInterval(timeout, 3000);
        let time = 0;
        function timeout() {
            setTimeout(() => {
                console.log(++time);
                getData(interval);
                if (time <= 100) {
                    if (time === 100) {
                        clearInterval(interval);
                        setloading(true);
                        Toast.showWithGravity('timer work', Toast.LONG, Toast.TOP);
                    }
                    return;
                }
            });
        }
    };

    useEffect(() => {
        getData(0);
        checkStatusCron();
    }, [])
    const paymentApi = async () => {
        try {
            console.log('called');
            const _data = { amount: price, phone: "+91" + phone, type: "Android" };
            console.log(_data);
            const res = await axios.post(
                `https://api.onit.services/payment/phonepe`,
                _data
            );
            const { code, data } = res?.data;

            if (code !== "PAYMENT_INITIATED") {
                // toast msg with same code and stop loader
                console.log('note_initiated', code);
                return;
            }
            const url = data?.instrumentResponse?.intentUrl;
            console.log('url', url);
            if (url) {
                const merchantTransactionId = data?.merchantTransactionId;
                Linking.openURL(url);
                checkStatusCronForPayment(merchantTransactionId);
            }
        } catch (error) {
            // Something went wrong. Please try Again with the Payment!
            console.log('error', error);
        }
    };
    var interval: any;
    const checkStatusCronForPayment = (merchantTransactionId: any) => {
        checkStatusApi(merchantTransactionId);
        interval = setInterval(timeout, 3000);
        let time = 0;
        function timeout() {
            setTimeout(() => {
                console.log(++time);
                checkStatusApi(merchantTransactionId);
                // if (time <= 100) {
                //     if (time === 100) {
                //         clearInterval(interval);
                //         // setloading(true);
                //         // Toast.showWithGravity('timer work', Toast.LONG, Toast.TOP);
                //     }
                //     return;
                // }
            });
        }
    };

    const checkStatusApi = async (merchantTransactionId: any) => {
        try {
            const payload = {
                merchantTransactionId,
            };
            const res = await axios.post(
                `https://api.onit.services/payment/check-status`,
                payload
            );
            const { data } = res;
            const { code } = data;
            if (code === "PAYMENT_PENDING") {
                return;
            } else if (code === "PAYMENT_SUCCESS") {
                clearInterval(interval);
                navigation.replace('RideComplete', { id: ids })
            } else if (code === "PAYMENT_DECLINED") {
            } else if (code === "TIMED_OUT") {
            } else {
                // toast msg with same code and stop loader
                console.log(code);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const ratingCompleted = () => {
        setRating(rating.toString())
        console.log("Rating is: " + rating.toString())
    }
    const onPress = () => {
        setConfirmation(false);
    }
    const stopRidePress = () =>
        Alert.alert('Stop Ride', 'Are you sure want to stop ride !', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    navigation.navigate('Homem')
                    console.log('stop ride')
                }
            },
        ]);

    const CancelRidePress = () =>
        Alert.alert('Cancel Ride', 'Are you sure want to cancel ride !', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    navigation.navigate('Homem')
                    console.log('cancel ride')
                }
            },
        ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#00796A" translucent={true} />
            <View style={styles.centeredView}>
                <Text style={[styles.happyTxt, { fontFamily: "serif" }]}>Ride Details</Text>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <Text style={[styles.happyTxt, { padding: 10 }]}>Vehicle No : <Text style={[styles.happyTxt, { color: "black" }]}>{vehicleNo ? vehicleNo.toString() : ''}</Text></Text>
                        <Text style={[styles.happyTxt, { padding: 10 }]}>OTP : <Text style={[styles.happyTxt, { color: "black" }]}>{otp ? otp.toString() : ''}</Text></Text>
                    </View>
                    <View style={styles.vehicleContainer}>
                        <View style={styles.imgCont}>
                            <Image source={profile ? { uri: profile } : require('../../assets/image/smilelogo.png')} resizeMode='contain' style={{ width: 80, height: 80, }} />
                        </View>
                        <View>
                            <Text style={[styles.modalText, { padding: 5, textTransform: 'capitalize' }]}>{name ? name : ''}</Text>
                            <Rating
                                showRating={false}
                                onFinishRating={ratingCompleted}
                                imageSize={14}
                                readonly={true}
                                style={{ right: 2, bottom: 5, padding: 5 }}
                            />
                            <Text style={[styles.modalText, { fontSize: 12, bottom: 3, left: 5 }]}>{totalrides ? totalrides.toString() : '0'}</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={[styles.callBtn]} onPress={() => Linking.openURL(`tel:${phone}`)}>
                                <Text style={[styles.CallText]}>Call Driver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pickContainer}>
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.modalText, {}]} >Pickup Location</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.modalText, { fontSize: 15, }]} >{pickup ? pickup : ''}</Text>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/image/penicon.png')} resizeMode='contain' style={{ width: 20, height: 20, }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dropContainer}>
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.modalText, {}]} >Drop Location</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.modalText, { fontSize: 15, }]} >{drop ? drop : ''}</Text>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/image/penicon.png')} resizeMode='contain' style={{ width: 20, height: 20, }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.chargeContaines}>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                <Text style={[styles.modalText, {}]} >Pincode</Text>
                                <Text style={[styles.modalText, {}]} >{pincode ? pincode.toString() : ''}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.chargeContainer}>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                <Text style={[styles.modalText, {}]} >Ride Fare</Text>
                                <Text style={[styles.modalText, {}]} >₹{price ? price.toString() : ''}</Text>
                            </View>
                        </View>
                    </View> */}
                    <View style={styles.distContainer}>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 10 }}>
                                <Text style={[styles.modalText, {}]} >ETA</Text>
                                <Text style={[styles.modalText, { right: 20 }]} >Payment</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, bottom: 10 }}>
                                <Text style={[styles.distTxt, { color: '#434242' }]} >09:43</Text>

                                <View style={{ flexDirection: "row", left: -10 }}>

                                    <Text style={[styles.distTxt, {
                                        color:
                                            ondata
                                                ? "#00796A"
                                                : '#EF3400'
                                    }]} >{ondata ? fareprice : 'none'}</Text>
                                    {ondata ? (
                                        <TouchableOpacity style={{ left: 5, top: 2 }} onPress={() => setOndata(false)}>
                                            <DownArrow name='caretdown' size={18} color={'#00796A'} />
                                        </TouchableOpacity>)
                                        :
                                        (<TouchableOpacity style={{ left: 5, top: 2 }} onPress={() => setOndata(true)}>
                                            <DownArrow name='caretdown' size={18} color={'#EF3400'} />
                                        </TouchableOpacity>)

                                    }
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, width: '90%', alignSelf: "center", backgroundColor: "#BBBBBB" }}></View>
                    {loading ? (
                        <TouchableOpacity style={[styles.ctnBtns]} onPress={() => {
                            paymentApi();
                        }}>
                            <Text style={[styles.ctnText]}>Complete & Pay</Text>
                            <DownArrow name='arrowright' size={25} color={'#fff'} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", bottom: 20 }}>
                            <TouchableOpacity style={[styles.ctnBtn]} onPress={CancelRidePress}>
                                <Text style={[styles.ctnText]}>Cancel Ride</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.ctnBtn]} onPress={() => navigation.navigate('Homem')}>
                                <Text style={[styles.ctnText]}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.ctnBtn, { backgroundColor: "#EF3400" }]} onPress={stopRidePress}>
                                <Text style={[styles.ctnText]}>Stop Ride</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', zIndex: 1, bottom: 10 }}>
                <TouchableOpacity onPress={CancelRidePress} style={[styles.ctnBtnE, { backgroundColor: "#fff" }]} >
                    <Text style={[styles.ctnText, { color: "#E75C60" }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ctnBtnE, { backgroundColor: "#E75C60" }]} onPress={() => { Linking.openURL(`tel:${phone}`) }}>
                    <Calls name='phone-call' size={20} color={'#fff'} />
                    <Text style={[styles.ctnText,]}>Emergency Help</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    CallText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold"
    },
    ctnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
    },
    modalView: {
        top: 20,
        width: width - 10,
        height: 540,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pickContainer: {
        width: width - 20,
        height: 60,
        backgroundColor: 'white',
        alignSelf: "center",
        borderRadius: 17,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropContainer: {
        width: width - 20,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 17,
        alignSelf: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10
    },
    chargeContainer: {
        width: width - 20,
        height: 40,
        backgroundColor: 'white',
        alignSelf: "center",
        borderRadius: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10
    },
    chargeContaines: {

        width: width - 20,
        height: 40,
        backgroundColor: 'white',
        alignSelf: "center",
        borderRadius: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10
    },
    distContainer: {
        width: width - 20,
        height: 60,
        backgroundColor: 'white',
        alignSelf: "center",
        borderRadius: 17,
        marginTop: 10
    },
    vehicleContainer: {
        flexDirection: 'row',
        alignSelf: "center",
        paddingTop: 10,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        borderColor: "#00796A",
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 5,
        width: 150,
        marginTop: 20,
        alignItems: "center"
    },
    callBtn: {
        borderRadius: 12,
        backgroundColor: '#00796A',
        padding: 8,
        width: 110,
        marginTop: 20,
        alignItems: "center",
        marginLeft: 15
    },
    ctnBtn: {
        borderRadius: 12,
        backgroundColor: '#00796A',
        padding: 10,
        width: 105,
        marginTop: 50,
        marginHorizontal: 10,
        alignItems: "center",
        alignSelf: "center"

    },
    ctnBtns: {
        borderRadius: 12,
        backgroundColor: '#00796A',
        padding: 10,
        width: width - 20,
        marginTop: 25,
        marginHorizontal: 10,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 80,

    },
    ctnBtnE: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 9,
        backgroundColor: '#00796A',
        width: width - 205,
        padding: 10,
    },
    modalText: {
        color: "#434242",
        fontWeight: "bold",
        fontSize: 16,
    },
    distTxt: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    happyTxt: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17,
    },
    chTxt: {
        color: "#434242",
        fontWeight: "bold",
        fontSize: 14,
    },
    modalTxxt: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20,
    },
    cpnTxt: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
        bottom: 10
    },
    imgCont: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: "center",
        marginRight: 20
    },
    map: {
        height: 550,
        bottom: 50
    },
    txtCont: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        margin: 5
    },
    txtContainer: {
        height: 70,
        width: 200,
        borderRadius: 30,
        backgroundColor: "#FFE601",
        justifyContent: "center",
        alignItems: "center"
    },
    roundStyle: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: "#F59900",
        marginHorizontal: 10,
        top: 10
    },
    roundStyle2: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: "#52B70D",
        marginHorizontal: 10,
        top: 10
    },
    bar: {
        height: 10,
        width: 200,
        backgroundColor: '#00796A',
        borderRadius: 10,
    },
});

export default PickDropDriver;
