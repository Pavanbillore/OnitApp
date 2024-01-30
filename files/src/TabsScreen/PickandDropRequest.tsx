import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ToastAndroid,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { API } from '../../utils/components/api';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
const { height, width } = Dimensions.get('screen');
const PickandDropRequest = (props: any) => {
    const route = useRoute();
    // const data = route.params?.data
    const id = props.route.params?.id;
    const { userData, allServices } = useSelector((state: any) => state.auth);
    const userid = userData._id;
    console.log('id', id);
    const { navigation } = props;
    const [loading, setloading] = useState(false);

    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [price, setPrice] = useState('');
    const [pincode, setpincode] = useState('');
    const getData = async (v: any) => {
        setloading(true);
        try {
            const res = await axios({
                method: 'get',
                url:
                    'http://13.233.255.20/consumerAppAppRoute/get-only-ticket/' + id
            });
            if (res) {
                setPickup(res.data.data.pickupAddress.city);
                setDrop(res.data.data.dropAddress.city);
                setPrice(res.data.data.ticket_price)
                setpincode(res.data.data.pickupAddress.pincode)
                console.log('ticket data', res.data?.data);
                if (res.data.data.vehicleStatus == 'Accepted') {
                    console.log('close');
                    clearInterval(v);
                    const _data = {
                        "ticket_id": id,
                        "userId": userid,
                        "userType": "Consumer",
                        "category": "Ticket",
                        "amount": 30
                    };
                    console.log(_data);
                    const res = await axios.post(
                        `https://api.onit.services/payment/pay-from-wallet`,
                        _data
                    );
                    const { code, data } = res?.data;
                    // console.log(code, data);
                    navigation.navigate('PickDropDriver', { id: res.data.data._id });
                    Toast.showWithGravity('Ticket details updated successfully...', Toast.LONG, Toast.TOP);
                    setloading(false);
                }
            } else {
                console.log('API ERROR', res);
                Toast.showWithGravity(
                    'Something went wrong...',
                    Toast.LONG,
                    Toast.TOP,
                );
                setloading(false);
            }
        } catch (err) {
            console.log('ERROR REQUESTS', err);
            Toast.showWithGravity('Some error is getting...', Toast.LONG, Toast.TOP);
        }
    };
    useEffect(() => {
        getData(0);
        checkStatusCron();
    }, [])



    const checkStatusCron = () => {
        const interval = setInterval(timeout, 5000);
        let time = 0;
        function timeout() {
            setTimeout(() => {
                console.log(++time);
                getData(interval);
                //  setProgress(progress + 0.1);
                // if (time <= 10) {
                //     if (time === 10)
                //         //    setProgress(progress + 0.1);
                //         clearInterval(interval);
                //     return;
                // }
                if (time <= 100) {
                    if (time === 100) {
                        clearInterval(interval);
                        navigation.navigate('Homem');
                        Toast.showWithGravity('Request failed, Please try again', Toast.LONG, Toast.TOP);
                        setloading(false);
                    }

                    return;
                }
                //     let _time = time - 25;
                //     if (_time <= 30) {
                //         if (_time % 3 === 0) checkStatusApi(merchantTransactionId);
                //         return;
                //     }
                //     _time = time - 55;
                //     if (_time <= 60) {
                //         if (_time % 6 === 0) checkStatusApi(merchantTransactionId);
                //         return;
                //     }
                //     _time = time - 115;
                //     if (_time <= 60) {
                //         if (_time % 10 === 0) checkStatusApi(merchantTransactionId);
                //         return;
                //     }
                //     _time = time - 175;
                //     if (_time <= 60) {
                //         if (_time % 30 === 0) checkStatusApi(merchantTransactionId);
                //         return;
                //     }
                //     _time = time - 235;
                //     if (time <= 900) {
                //         if (_time % 60 === 0) checkStatusApi(merchantTransactionId);
                //         return;
                //     } else {
                //         clearInterval(interval);
                //         // stop the loader and time out toast
                //     }
            });
        }
    };

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
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00796A" translucent={true} />
            <View >
                <MapView
                    style={styles.map}
                    showsUserLocation={false}
                    followsUserLocation={false}
                    zoomEnabled={true}
                />
            </View>
            <View style={styles.locStyle}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                    <View style={styles.roundStyle}></View>
                    <View>
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Pickup Location</Text>
                        <Text style={styles.inputContainer} numberOfLines={2}>{pickup}
                        </Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, width: '85%', left: 25, alignSelf: "center", padding: 10, bottom: 30 }}></View>
                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly", bottom: 30 }}>
                    <View style={styles.roundStyle2}></View>
                    <View>
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Drop Location</Text>
                        <Text style={styles.inputContainer} numberOfLines={1}>{drop}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly", bottom: 30 }}>
                    <View style={styles.roundStyle3}></View>
                    <View>
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Fare Price</Text>
                        <Text style={styles.inputContainer} numberOfLines={1}>₹ {price}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly", bottom: 30 }}>
                    <View style={styles.roundStyle4}></View>
                    <View>
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Pin Code</Text>
                        <Text style={styles.inputContainer} numberOfLines={1}>{pincode}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.vehicleContainer}>
                        <Image source={require('../../assets/image/information.png')} resizeMode='contain' style={{ width: 20, height: 20, top: 10 }} />
                        <Text style={[styles.modalText, { fontSize: 14, paddingLeft: 10 }]}>You can change drop location & payment method {'\n'} while on ride as well</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, width: '90%', alignSelf: "center", }}></View>
                    {/* <View style={{
                        paddingTop: 20, paddingVertical: 20
                    }}>
                        <Image source={require('../../assets/image/recordRed.png')} resizeMode='contain' style={{ width: 60, height: 60, marginTop: 20 }} />
                    </View> */}
                    {loading ? (
                        <View style={{ paddingTop: 50, justifyContent: "center", alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={'#E73321'} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
                            <Text style={{ color: "#9A9CA9", fontSize: 16, marginTop: 30, marginLeft: 10 }}>Wait for accepted...</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[styles.buttonClose]}
                        onPress={CancelRidePress}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 2,
        width: width,
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 140,
        alignSelf: "center",
        elevation: 5,
        bottom: 20
    },
    containerTxt: {
        width: width,
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        elevation: 5,
        alignSelf: "center",
        bottom: 20
    },
    input1: {
        flex: 1,
        fontWeight: '700',
        fontSize: 15,
        color: 'black',
        marginHorizontal: 18,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#E5E7E9",
        backgroundColor: "white",
        marginVertical: 8
    },
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        marginLeft: 0,
    },
    texTxt: {
        fontWeight: "bold",
        alignSelf: "flex-end",
        paddingRight: 50
    },
    textTxt: {
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
        bottom: 10,
        fontSize: 18
    },
    inputContainer: {
        width: width - 80,
        borderColor: "#D5D7D8",
        color: "#000",
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: "500",
        backgroundColor: "#E1E1E1",
        borderRadius: 20,
        paddingHorizontal: 5
    },
    imageStyle: {
        height: 25,
        width: 25,
        alignItems: 'center',
        marginLeft: 20,
    },
    plumberStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        marginTop: 15,
    },
    msgStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        marginLeft: 22,
        marginVertical: 9,
        marginRight: 22,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    withinStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 56,
        margin: 20,
        marginVertical: 9,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    couponStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#00796A',
        borderStyle: 'dashed',
    },
    cStyle: {
        backgroundColor: '#fff',
        height: 130,
        marginTop: 14,
        paddingHorizontal: 10,
    },
    inStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00796A',
        height: 56,
        margin: 16,
        marginBottom: 16,
        marginTop: 105,
        borderRadius: 2,
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "500"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center",
        zIndex: 3,
        bottom: 140
    },
    modalView: {
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: width,
        height: 350,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    vehicleContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        borderColor: "#E63544",
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#E63544',
        padding: 5,
        width: 150,
        marginTop: 70,
        alignItems: "center"
    },

    modalText: {
        color: "#434242",
        fontWeight: "bold",
        fontSize: 16,
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
    locStyle: {
        zIndex: 3,
        bottom: 350,
        width: width - 20,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    map: {
        height: 400,
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
    roundStyle3: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: "#E6774F",
        marginHorizontal: 10,
        top: 10
    },
    roundStyle4: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: "#E6774F",
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

export default PickandDropRequest;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

