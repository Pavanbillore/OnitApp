import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ActivityIndicator,
    Text,
    StyleSheet,
    StatusBar,
    View,

    Image,
    TextInput,
    Modal,
    TouchableOpacity,
    Alert,
    Dimensions,
    Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { BASE_URL } from "../components/api";
import DownArrow from 'react-native-vector-icons/AntDesign';
import UpArrow from 'react-native-vector-icons/AntDesign';
import Currency from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('screen');
import Toast from 'react-native-simple-toast';
const Wallet = ({ navigation }) => {
    const { userData, allServices } = useSelector((state: any) => state.auth);
    const [loading, setloading] = useState(false);
    const [balance, setBalance] = useState('')
    const [customeradvance, setCustomeradvance] = useState(true);
    const [bonusamount, setBonusamount] = useState(true);
    const [refer, setRefer] = useState(true);
    const [transactions, setTransactions] = useState(true);
    const [addBalance, setaddBalance] = useState(false);
    const phone = userData?.personal_details?.phone?.mobile_number;
    useEffect(() => {
        console.log('user id', userData?._id);
    }, []);

    const paymentApi = async () => {
        setloading(true);
        try {
            console.log('called');
            const _data = { amount: balance, phone: "+91" + phone, type: "Android" };
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
                setloading(false);
                setaddBalance(false);
            }
        } catch (error) {
            // Something went wrong. Please try Again with the Payment!
            console.log('error', error);
        }
    };
    var interval: any;
    const checkStatusCronForPayment = (merchantTransactionId: any) => {
        checkStatusApi(merchantTransactionId);
        interval = setInterval(timeout, 1000);
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
                Toast.showWithGravity('Wallet balance successfully updated', Toast.LONG, Toast.TOP);
                setloading(false);
                setaddBalance(false);
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
    return (
        <View >
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#fff"
            />
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    padding: 10

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
                        paddingLeft: 120,
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#000"
                    }}
                >
                    Wallet
                </Text>
            </View>

            {/* for refer your friend */}
            <View
                style={{
                    flexDirection: "row",
                    height: 105,
                    backgroundColor: "#00796A",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "#fff",
                        marginTop: 14,
                        marginLeft: 14,
                    }}
                >
                    Refer Your Friends{"\n"}
                    and Earn{"\n"}
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#fff",
                            fontWeight: "400",
                            marginTop: 10,
                        }}
                    >
                        They get ₹ 123, You get ₹ 123
                    </Text>
                </Text>
                <Image
                    source={require("../../assets/logo/wallet.png")}
                    style={{
                        height: 55,
                        width: 57,
                        alignItems: "center",
                        marginTop: 25,
                        marginLeft: 100,
                        marginRight: 20,
                    }}
                />
            </View>

            {/* for wallet dashboard */}
            <View
                style={{
                    flexDirection: "row",
                    height: 140,
                    backgroundColor: "#F8F8F8",
                    bottom: 10
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 20,
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={require("../../assets/logo/twallet.png")}
                        style={{
                            height: 55,
                            width: 57,
                            //alignItems: "center",
                            marginTop: 30,
                            marginLeft: 10,
                            marginRight: 20,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "black",
                            marginLeft: -5,
                            marginTop: 40,
                        }}
                    >
                        Wallet Balance{"\n"}
                        ₹ {balance ? balance.toString() : '00'}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        marginLeft: 30,
                        marginTop: 27,
                        marginRight: 10,
                    }}
                >
                    <TouchableOpacity onPress={() => { setaddBalance(true) }}>
                        <View
                            style={{
                                height: 40,
                                width: 110,
                                backgroundColor: "#00796A",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 20,
                                    fontWeight: "600",
                                }}
                            >
                                Recharge
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={{
                                height: 40,
                                width: 110,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#0066FF",
                                marginTop: 10,
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 20,
                                    fontWeight: "600",
                                }}
                            >
                                Transfer
                            </Text>

                        </View>
                    </TouchableOpacity>
                    <Text style={{
                        color: "#000",
                        fontSize: 12,
                        right: 5
                    }}>Wallet to Bank(Amount)</Text>
                </View>
            </View>

            {/* for Bonus Section */}
            <ScrollView scrollEnabled style={{ marginVertical: 10, bottom: 10 }}>

                <View style={styles.dropContainer}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            source={require("../../assets/logo/bonus.png")}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        />
                        <Text style={[styles.modalText, { paddingLeft: 20 }]} >Bonus Amount</Text>

                    </View>
                    <View >
                        {balance?.bonus_total >= 1 ? <Text
                            style={{
                                color: "black",
                                fontSize: 16,
                                paddingLeft: 50
                            }}
                        >
                            {balance?.bonus_total}
                        </Text> :

                            <Text
                                style={{
                                    color: "black",
                                    fontSize: 16,
                                    paddingLeft: 50
                                }}
                            >
                                0
                            </Text>}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            {bonusamount ? (
                                <TouchableOpacity style={{}} onPress={() => setBonusamount(false)}>
                                    <DownArrow name='down' size={25} color={'#000'} />
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity style={{}} onPress={() => setBonusamount(true)}>
                                    <UpArrow name='up' size={25} color={'#000'} />
                                </TouchableOpacity>)

                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {!bonusamount ?
                    <View style={{ padding: 10 }}>
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    : null}

                <View style={styles.dropContainer}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            source={require("../../assets/logo/refund.png")}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        />
                        <Text style={[styles.modalText, { paddingLeft: 20 }]} >Customer Advance</Text>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            {customeradvance ? (
                                <TouchableOpacity style={{}} onPress={() => setCustomeradvance(false)}>
                                    <DownArrow name='down' size={25} color={'#000'} />
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity style={{}} onPress={() => setCustomeradvance(true)}>
                                    <UpArrow name='up' size={25} color={'#000'} />
                                </TouchableOpacity>)

                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {!customeradvance ?

                    <View style={{ padding: 10 }}>
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    : null}
                <View style={styles.dropContainer}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            source={require("../../assets/logo/refer.png")}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        />
                        <Text style={[styles.modalText, { paddingLeft: 20 }]} >Refer Earning</Text>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            {refer ? (
                                <TouchableOpacity style={{}} onPress={() => setRefer(false)}>
                                    <DownArrow name='down' size={25} color={'#000'} />
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity style={{}} onPress={() => setRefer(true)}>
                                    <UpArrow name='up' size={25} color={'#000'} />
                                </TouchableOpacity>)

                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {!refer ?
                    <View style={{ padding: 10 }}>
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    : null}


                <View style={styles.dropContainer}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            source={require("../../assets/logo/transactions.png")}
                            style={{
                                height: 30,
                                width: 30,
                            }}
                        />
                        <Text style={[styles.modalText, { paddingLeft: 20 }]} >Transactions</Text>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            {transactions ? (
                                <TouchableOpacity style={{}} onPress={() => setTransactions(false)}>
                                    <DownArrow name='down' size={25} color={'#000'} />
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity style={{}} onPress={() => setTransactions(true)}>
                                    <UpArrow name='up' size={25} color={'#000'} />
                                </TouchableOpacity>)

                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {!transactions ?
                    <View style={{ padding: 10 }}>
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    height: 35,
                                    marginTop: 0,
                                    //marginLeft: 20,
                                    //marginRight: 20,
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}
                            >
                                <Image
                                    source={require("../../assets/logo/upi.png")}
                                    style={{
                                        height: 24,
                                        width: 30,
                                        alignItems: "center",
                                        marginLeft: 18,
                                        marginTop: 3,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 0.9,
                                        fontWeight: "500",
                                        fontSize: 16,
                                        color: "black",
                                        marginLeft: 19,
                                        marginTop: 3,
                                    }}
                                >
                                    recieved from roushan
                                </Text>
                                <Text
                                    style={{
                                        color: "green",
                                        fontSize: 16,
                                        marginRight: 5,
                                    }}
                                >
                                    + ₹5000
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    : null}

            </ScrollView>
            <View style={styles.centeredView}>
                <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addBalance}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTexta}>Add Amount</Text>
                            <View style={styles.btnContainers}>
                                <Currency name="rupee" color={'#4E4D4F'} size={20} style={styles.rupeeStyles} />
                                <TextInput
                                    placeholder="Enter Amount"
                                    placeholderTextColor={'#8F8F8F'}
                                    value={balance}
                                    onChangeText={(value) => {
                                        setBalance(value)
                                        console.log(value);
                                    }}
                                    maxLength={5}
                                    keyboardType='number-pad'
                                    style={styles.InputContainers}
                                    cursorColor={"#00796A"}
                                />
                            </View>
                            {loading ? (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size={'large'} color={'#00796A'} />
                                </View>
                            ) : (
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity style={styles.submitBtnContainer} onPress={paymentApi}>
                                        <Text
                                            style={styles.subTxtStyle}
                                        >
                                            Proceed
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </View>
                    </View>
                </Modal>
            </View>
        </View >
    );
};

export default Wallet;

const styles = StyleSheet.create({
    dropContainer: {
        width: width,
        height: 45,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingHorizontal: 30,
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
        height: 60,
        backgroundColor: 'white',
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
        borderRadius: 17,
        marginTop: 10
    },
    vehicleContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        padding: 10,
    },
    modalText: {
        color: "#000",
        fontSize: 16,
    },
    addAmountContainer: {
        backgroundColor: 'gray',
    },
    mainContainers: {
        height: 800,
        width: width - 20,
        borderRadius: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        height: 220,
        width: width - 30,
        borderRadius: 12,
        backgroundColor: 'white',
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
        borderRadius: 11,
        padding: 10
    },

    buttonClose: {
        backgroundColor: '#00796A',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTexta: {
        color: "#000",
        fontSize: 18,
        paddingVertical: 10,
        textAlign: 'center',
    },
    btnContainer: {
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    btnContainers: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    InputContainers: {
        width: 160,
        borderColor: "#D3DFED",
        borderBottomWidth: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 7,
        color: "#000",
        fontSize: 16,
        paddingHorizontal: 30
    },
    submitBtnContainer: {
        padding: 5,
        width: width - 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00796A",
        marginTop: 10,
        borderRadius: 20,
    },
    subTxtStyle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    rupeeStyles: {
        zIndex: 3,
        left: 20
    },
    loaderContainer: {
        justifyContent: "center",
        alignItems: "center"
    }

});
