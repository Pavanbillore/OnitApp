import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    StatusBar,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Alert,
    Keyboard,
    ToastAndroid
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import Plus from 'react-native-vector-icons/Entypo';
import Minus from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { API, NEW_BASE_URL } from '../../utils/components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCityRedux, setCountryRedux, setCurrentAddress, setPincodeRedux, setRegion } from '../../backend/slice';

const PickDropMap = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [amountError, setamountError] = useState('');
    const [btnSeen, setbtnSeen] = useState(false);
    const [priceloading, setpriceloading] = useState('');
    const [coupens, setCoupens] = useState(false);
    const [pickup, setPickup] = useState('');
    const [pincode, setPincode] = useState('');
    const [drop, setDrop] = useState('');
    const [qty, setQty] = useState(0);
    const [pickupmodal, setPickupmodal] = useState(false);
    const [dropupmodal, setDropupmodal] = useState(false);
    const [pickuphousenum, setPickuphousenum] = useState('');
    const [picklocality, setPicklocality] = useState('');
    const [pickupcity, setPickupcity] = useState('');
    const [pickstate, setPickstate] = useState('');
    const [pickuppincode, setPickuppincode] = useState('');
    const [pickupnearplace, setPickupnearplace] = useState('');
    const [dropuphousenum, setDropuphousenum] = useState('');
    const [dropuplocality, setDropuplocality] = useState('');
    const [dropupcity, setDropupcity] = useState('');
    const [dropstate, setDropstate] = useState('');
    const [dropuppinocde, setDropuppincode] = useState('');
    const [dropupnearplace, setDropupnearplace] = useState('');
    const [visible, setVisible] = useState(false);
    const [walletBalance, setwalletBalance] = useState<any>('');
    const { userNumber } = useSelector((state: any) => state.auth);
    const { userData, allServices } = useSelector((state: any) => state.auth);
    const id = userData._id;
    const dispatch = useDispatch();
    const { cityRedux, region, latitude, currentAddress, longitude, city, district, } = useSelector(
        (region: any) => region.auth,
    );
    useEffect(() => {
        console.log('wallet balance', walletBalance);
        walletBalancefun();
    }, []);

    const walletBalancefun = async () => {
        var datas = {
            userId: id,
        };
        // console.log(datas);
        try {
            const res = await fetch(API.WALLET_BALANCE, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            });
            const balanceData = await res.json();
            setwalletBalance(balanceData.balance);
            console.log('balanceData', balanceData.balance);
            await AsyncStorage.setItem('wallet balance', JSON.stringify(balanceData));
            // Toast.showWithGravity('something went wrong', Toast.LONG, Toast.TOP);
        } catch (error) {
            console.log('error', error);
            // Toast.showWithGravity('something went wrong' + error, Toast.LONG, Toast.TOP);
        }
    };



    const confirmBtn = () => {
        setCoupens(true);
    };
    const applyBtn = () => {
        setCoupens(false);
    };
    const [coupons, setCoupons] = useState('');
    const couponData = [
        {
            id: 0,
            title: 'H&M',
            coupons: '20%',
            expirtdate: 'August 5 to September 25'
        },
        {
            id: 1,
            title: 'Starbucks',
            coupons: '10%',
            expirtdate: 'August 1 to September 20'
        },
        {
            id: 2,
            title: 'Walmart',
            coupons: '20%',
            expirtdate: 'August 11 to September 7'
        },
        {
            id: 3,
            title: 'Lenscart',
            coupons: '10%',
            expirtdate: 'August 3 to September 27'
        },
        {
            id: 4,
            title: 'Treasure Cinema (movie show tickets)',
            coupons: '25%',
            expirtdate: 'August 1 to September 30'
        },
        {
            id: 5,
            title: 'Ride Passanger (dream ride)',
            coupons: '30%',
            expirtdate: 'August 4 to September 22'
        },
    ];
    const submitData = async () => {
        setLoading(true);
        var data = {
            pickupAddress: {
                // house_number: pickuphousenum,
                // locality: picklocality,
                city: pickup,
                // state: pickstate,
                pincode: pincode,
                // short_code_for_place: pickupnearplace
            },
            dropAddress: {
                // house_number: pickuphousenum,
                // locality: picklocality,
                city: drop,
                // state: pickstate,
                pincode: pincode,
                // short_code_for_place: pickupnearplace
            },
            ticket_price: qty
        };

        try {
            const res = await fetch(API.CREATE_TICKET_PICK_DROP, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const vehicleDatas = await res.json();
            console.log('data', vehicleDatas.data._id);
            if (vehicleDatas.message == 'Ticket Created Successfully') {
                await AsyncStorage.setItem('vehicleDatas', JSON.stringify(vehicleDatas));
                Toast.showWithGravity('Ticket Created Successfully', Toast.LONG, Toast.TOP);
                navigation.navigate('PickandDropRequest', { data, id: vehicleDatas?.data._id });
                setLoading(false);
            } else {
                Toast.showWithGravity('something went wrong', Toast.LONG, Toast.TOP);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            Toast.showWithGravity('something went wrong' + error, Toast.LONG, Toast.TOP);
            setLoading(false);
        }
    };
    const checkStatusApi = async (merchantTransactionId: any) => {
        try {
            const payload = {
                merchantTransactionId,
            };
            const res = await axios.post(
                `https://api.onit.services/payment/check-status`,
                payload,
            );
            const { data } = res;
            const { code } = data;
            console.log(code);
            if (code === 'PAYMENT_PENDING') {
                return;
            } else if (code === 'PAYMENT_SUCCESS') {
            } else if (code === 'PAYMENT_DECLINED') {
            } else if (code === 'TIMED_OUT') {
            } else {
                // toast msg with same code and stop loader
                navigation.navigate('PickandDropRequest')
                console.log(code);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const checkStatusCron = (merchantTransactionId: any) => {
        const interval = setInterval(timeout, 1000);
        let time = 0;
        function timeout() {
            setTimeout(() => {
                console.log(++time);
                if (time <= 25) {
                    if (time === 25) checkStatusApi(merchantTransactionId);
                    return;
                }
                let _time = time - 25;
                if (_time <= 30) {
                    if (_time % 3 === 0) checkStatusApi(merchantTransactionId);
                    return;
                }
                _time = time - 55;
                if (_time <= 60) {
                    if (_time % 6 === 0) checkStatusApi(merchantTransactionId);
                    return;
                }
                _time = time - 115;
                if (_time <= 60) {
                    if (_time % 10 === 0) checkStatusApi(merchantTransactionId);
                    return;
                }
                _time = time - 175;
                if (_time <= 60) {
                    if (_time % 30 === 0) checkStatusApi(merchantTransactionId);
                    return;
                }
                _time = time - 235;
                if (time <= 900) {
                    if (_time % 60 === 0) checkStatusApi(merchantTransactionId);
                    return;
                } else {
                    clearInterval(interval);
                    // stop the loader and time out toast
                }
            });
        }
    };


    // walletBalance

    const increaseQty = () => {
        if (qty >= 0) {
            setQty(qty + 10)
        }
    }
    const decreaseQty = () => {
        if (0 < qty) {
            setQty(qty - 10)
        }
    }

    const submitForm = () => {
        var done = true;
        if (!walletBalance || walletBalance < 30) {
            setamountError('Your wallet balance is low kindly recharge.');
            setbtnSeen(true);
            done = false;
        }
        if (done) {
            submitData()
        } else {
        }
        Keyboard.dismiss();
    };

    const getAddress = async () => {
        console.log(pincode);
        try {
            const res = await axios({
                url: `https://api.postalpincode.in/pincode/${pincode}`,
            });
            if (res?.data[0]?.PostOffice[0]) {
                console.log(res?.data[0]?.PostOffice[0]);
                dispatch(setCityRedux(res.data[0]?.PostOffice[0]?.District));
                dispatch(setRegion(res.data[0]?.PostOffice[0]?.State));
                dispatch(setCountryRedux(res.data[0]?.PostOffice[0]?.Country));
                dispatch(setPincodeRedux(res.data[0]?.PostOffice[0]?.Pincode));
                dispatch(setCurrentAddress(cityRedux + ', ' + region));
                setVisible(false);
            } else {
                setVisible(false);
                ToastAndroid.show(
                    'Cannot determine Current Location',
                    ToastAndroid.SHORT,
                );
                // dispatch(setPincodeRedux(''));
            }
        } catch (error) {
            ToastAndroid.show(
                'Cannot determine Current Location',
                ToastAndroid.SHORT,
            );
            // dispatch(setPincodeRedux(''));
            setVisible(false);
            console.log('GERROR', error);
        }
    };

    return (
        <ScrollView>
            <StatusBar barStyle="dark-content" backgroundColor="#00796A" translucent={true} />
            <View style={styles.vehicleContainer}>
                <Image source={require('../../assets/image/Bikeblack.png')} resizeMode='contain' style={{ width: 120, height: 120, }} />
            </View>
            <View style={styles.locStyle}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                    <View style={styles.roundStyle}></View>
                    <View >
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Pickup Location</Text>
                        <TextInput
                            placeholder={'Search pickup location'}
                            placeholderTextColor={'#6C707B'}
                            style={styles.inputContainer}
                            maxLength={50}
                            value={pickup}
                            onChangeText={value => {
                                setPickup(value)
                            }
                            }
                        />
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, width: '85%', left: 25, alignSelf: "center", padding: 10, bottom: 30 }}></View>
                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly", bottom: 30 }}>
                    <View style={styles.roundStyle2}></View>
                    <View >
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Drop Location</Text>
                        <TextInput
                            placeholder={'Search drop location'}
                            placeholderTextColor={'#6C707B'}
                            style={styles.inputContainer}
                            maxLength={50}
                            value={drop}
                            onChangeText={value => {
                                setDrop(value)

                            }
                            }
                        />
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, width: '85%', left: 25, alignSelf: "center", padding: 10, bottom: 50 }}></View>

                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly", bottom: 50 }}>
                    <View >
                        <Image source={require('../../assets/image/zipcode.png')} resizeMode="contain" style={{ height: 25, width: 25 }} />
                    </View>
                    <View style={{ left: 5 }}>
                        <Text style={[styles.modalText, { fontSize: 14 }]}>Pincode</Text>
                        <TextInput
                            placeholder={'Enter Pincode'}
                            placeholderTextColor={'#6C707B'}
                            style={styles.inputContainer}
                            maxLength={6}
                            keyboardType='number-pad'
                            value={pincode ? pincode.toString() : userData?.address_details_permanent?.pincode}
                            onChangeText={value => {
                                setPincode(value);
                                console.log(pincode);
                            }
                            }
                        />
                    </View>
                </View>
            </View>
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                <Text style={[styles.modalText, { top: 10 }]}>Fare Price</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 10 }}>
                    <View style={{ flexDirection: "row", left: -10 }}>
                        <TouchableOpacity onPress={decreaseQty} style={{ alignItems: "center", justifyContent: "center", }}>
                            <Minus name='squared-minus' size={28} color={'#3A979D'} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={'₹'}
                            placeholderTextColor={'#6C707B'}
                            style={styles.inputContainerrr}
                            keyboardType='number-pad'
                            value={qty ? qty.toLocaleString() : ''}
                            onChangeText={(qty) => {
                                setQty(parseInt(qty));
                            }}

                        />
                        <TouchableOpacity onPress={increaseQty} style={{ alignItems: "center", justifyContent: "center", }}>
                            <Plus name='squared-plus' size={28} color={'#3A979D'} />
                        </TouchableOpacity>
                    </View>

                    <View >
                        <TouchableOpacity style={styles.txtContainer} onPress={() => confirmBtn()}>
                            <Image source={require('../../assets/image/cpnlogo.png')} resizeMode='contain' style={{ width: 60, height: 60, }} />
                            <Text style={styles.cpnTxt}>2 Coupons Available</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.walletBtn}>
                <Text style={styles.errTxt}>{amountError}</Text>
                {!btnSeen
                    ? btnSeen : <TouchableOpacity style={styles.txtContainerrr} onPress={() => { navigation.navigate('Wallet') }}>
                        <Text style={styles.cpnTxtt}>Recharge Now</Text>
                    </TouchableOpacity>}
            </View>
            <View style={{ paddingLeft: 20 }}>
                <Text style={styles.chTxt}>Minimun Charges ₹30 </Text>
                <Text style={styles.chTxt}>Will be deducted from your wallet</Text>
            </View>
            {loading ?
                (<ActivityIndicator size={'large'} color={'#000'} />)
                : (
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}

                        onPress={submitForm}
                    >
                        <Text style={styles.textStyle}>Confirm Request</Text>
                    </TouchableOpacity>)}


            <View style={styles.couponContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={coupens}
                >
                    <View style={styles.couponContainer}>

                        <View style={styles.coupenChildContainer}>
                            <View style={styles.cpnheadingContainer}>
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: "bold" }}>Coupons</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.cpnContainer}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                        <Text style={styles.cpnbrande}>H&M</Text>
                                        <Text style={styles.cpntext}>30%</Text>
                                    </View>
                                    <View style={styles.distText}>
                                        <Text style={styles.cpnStyle1}>Any purchase of 50 or more</Text>
                                        <Text style={styles.cpnStyle}>Discount</Text>
                                    </View>

                                    <View style={styles.v2}>
                                        <Text style={styles.cpnvalidity}>Validity period : 2023-10-20</Text>
                                        <TouchableOpacity style={styles.applyBtn} onPress={() => applyBtn()}>
                                            <Text style={{ color: '#45A15E', fontWeight: "bold" }}>Apply Coupon</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.cpnContainer2}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                        <Text style={styles.cpnbrande}>Starbucks</Text>
                                        <Text style={styles.cpntext}>10%</Text>
                                    </View>
                                    <View style={styles.distText}>
                                        <Text style={styles.cpnStyle1}>Any purchase of 50 or more</Text>
                                        <Text style={styles.cpnStyle}>Discount</Text>
                                    </View>
                                    <View style={styles.v2}>
                                        <Text style={styles.cpnvalidity}>Validity period : 2023-10-20</Text>
                                        <TouchableOpacity style={styles.applyBtn} onPress={() => applyBtn()}>
                                            <Text style={{ color: '#268EDD', fontWeight: "bold" }}>Apply Coupon</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.cpnContainer3}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                        <Text style={styles.cpnbrande}>Walmart</Text>
                                        <Text style={styles.cpntext}>25%</Text>
                                    </View>
                                    <View style={styles.distText}>
                                        <Text style={styles.cpnStyle1}>Any purchase of 50 or more</Text>
                                        <Text style={styles.cpnStyle}>Discount</Text>
                                    </View>
                                    <View style={styles.v2}>
                                        <Text style={styles.cpnvalidity}>Validity period : 2023-10-20</Text>
                                        <TouchableOpacity style={styles.applyBtn} onPress={() => applyBtn()}>
                                            <Text style={{ color: '#EFB442', fontWeight: "bold" }}>Apply Coupon</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.cpnContainer4}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                        <Text style={styles.cpnbrande}>Quick Ride</Text>
                                        <Text style={styles.cpntext}>20%</Text>
                                    </View>
                                    <View style={styles.distText}>
                                        <Text style={styles.cpnStyle1}>Any purchase of 50 or more</Text>
                                        <Text style={styles.cpnStyle}>Discount</Text>
                                    </View>
                                    <View style={styles.v2}>
                                        <Text style={styles.cpnvalidity}>Validity period : 2023-10-20</Text>
                                        <TouchableOpacity style={styles.applyBtn} onPress={() => applyBtn()}>
                                            <Text style={{ color: '#D54337', fontWeight: "bold" }}>Apply Coupon</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.pickStylecontainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={pickupmodal}
                >
                    <ScrollView scrollEnabled={true} >
                        <View style={[styles.pickStyleView]}>
                            <Text style={styles.pickupTextStyle}>Pickup Location</Text>
                            <View>
                                <TextInput
                                    placeholder={'Enter House Number'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={pickuphousenum}
                                    onChangeText={value => {
                                        setPickuphousenum(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Locality'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={picklocality}
                                    onChangeText={value => {
                                        setPicklocality(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter City'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={pickupcity}
                                    onChangeText={value => {
                                        setPickupcity(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter State'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={pickstate}
                                    onChangeText={value => {
                                        setPickstate(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Pincode'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={6}
                                    keyboardType='number-pad'
                                    value={pickuppincode}
                                    onChangeText={value => {
                                        setPickuppincode(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Nearest Place'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={pickupnearplace}
                                    onChangeText={value => {
                                        setPickupnearplace(value)
                                    }
                                    }
                                />
                            </View>
                            <View style={{ paddingTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.btnStyle}
                                    onPress={() => {
                                        setPickupmodal(false)
                                        Toast.showWithGravity('Pickup data saved', Toast.LONG, Toast.TOP);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </Modal>
            </View>
            <View style={styles.pickStylecontainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={dropupmodal}
                >
                    <ScrollView scrollEnabled={true} >
                        <View style={[styles.pickStyleView]}>
                            <Text style={styles.pickupTextStyle}>Dropup Location</Text>
                            <View>
                                <TextInput
                                    placeholder={'Enter House Number'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={dropuphousenum}
                                    onChangeText={value => {
                                        setDropuphousenum(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Locality'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={dropuplocality}
                                    onChangeText={value => {
                                        setDropuplocality(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter City'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={dropupcity}
                                    onChangeText={value => {
                                        setDropupcity(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter State'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={dropstate}
                                    onChangeText={value => {
                                        setDropstate(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Pincode'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={6}
                                    keyboardType='number-pad'
                                    value={dropuppinocde}
                                    onChangeText={value => {
                                        setDropuppincode(value)
                                    }
                                    }
                                />
                                <TextInput
                                    placeholder={'Enter Nearest Place'}
                                    placeholderTextColor={'#6C707B'}
                                    style={styles.inputContainerStyle}
                                    maxLength={50}
                                    value={dropupnearplace}
                                    onChangeText={value => {
                                        setDropupnearplace(value)
                                    }
                                    }
                                />
                            </View>
                            <View style={{ paddingTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.btnStyle}
                                    onPress={() => {
                                        setDropupmodal(false)
                                        Toast.showWithGravity('Dropup data saved', Toast.LONG, Toast.TOP);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </Modal>
            </View>
        </ScrollView>
    );
};
{/* <FlatList
    data={couponData}
    numColumns={2}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => {
        return (
            <View>
                <Text>{item}</Text>
            </View>
        );
    }}
/> */}
const { height, width } = Dimensions.get('screen');
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
    inputContainer: {
        width: width - 100,
        borderColor: "#D5D7D8",
        color: "#000",
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: "500",
    },
    inputContainerrr: {
        alignItems: "center",
        backgroundColor: '#D5D7D8',
        borderRadius: 10,
        height: 45,
        width: 60,
        margin: 10,
        top: 5,
        borderColor: "#D5D7D8",
        color: "#000",
        marginHorizontal: 20,
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight: "500"
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
        fontWeight: "bold"
    },
    couponContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    coupenChildContainer: {
        width: width - 10,
        height: 700,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
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
    cpnheadingContainer: {
        backgroundColor: '#00796A',
        width: width - 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    cpnContainer: {
        marginTop: 20,
        height: 130,
        width: width - 20,
        backgroundColor: "#45A15E",
        borderRadius: 10,

    },
    distText: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        bottom: 20
    },
    v2: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 2,
        padding: 10,
        bottom: 20,
        borderStyle: 'dashed',
        borderColor: "white"
    },
    cpnContainer2: {
        marginTop: 20,
        height: 130,
        width: width - 20,
        backgroundColor: "#268EDD",
        borderRadius: 10,
    },
    cpnContainer3: {
        marginTop: 20,
        height: 130,
        width: width - 20,
        backgroundColor: "#EFB442",
        borderRadius: 10,
    },
    cpnContainer4: {
        marginTop: 20,
        height: 130,
        width: width - 20,
        backgroundColor: "#D54337",
        borderRadius: 10,

    },
    cpnContainer5: {
        marginTop: 20,
        height: 100,
        width: width - 20,
        backgroundColor: "#7148A0",
        borderRadius: 10,

    },
    cpnContainer6: {
        marginTop: 20,
        height: 100,
        width: width - 20,
        backgroundColor: "#7148A0",
        borderRadius: 10,

    },
    applyBtn: {
        height: 30,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    cpnbrande: {
        fontSize: 18,
        fontWeight: "500",
        color: "white",
        fontFamily: "sans-serif"
    },
    cpntext: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    },
    cpnStyle: {
        color: "white",
        fontSize: 14,
        textAlign: "right",
    },
    cpnStyle1: {
        color: "white",
        fontSize: 14,
        textAlign: "right",
    },
    cpnvalidity: {
        color: "white",
        fontSize: 12,
    },
    centeredView: {

    },
    modalView: {
        width: width - 20,
        height: 350,
        marginTop: 80,
        backgroundColor: 'white',
        borderRadius: 17,
        alignItems: 'center',
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
    vehicleContainer: {
        alignItems: "center",
    },
    button: {
        borderRadius: 17,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#00796A',
        width: '95%',
        marginTop: 60,
        alignItems: "center",
        alignSelf: "center"
    },

    modalText: {
        color: "#434242",
        fontWeight: "bold",
        fontSize: 16,
    },

    chTxt: {
        color: "#434242",
        fontWeight: "500",
        fontSize: 14,
    },
    modalTxxt: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20,
    },
    cpnTxtt: {
        color: "#00796A",
        fontWeight: "bold",
        fontSize: 14,
    },
    cpnTxt: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 11,
        bottom: 15
    },
    errTxt: {
        color: "red",
        fontSize: 12,
        top: 8
    },
    walletBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    locStyle: {
        width: width - 20,
        height: 250,
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
    },
    map: {
        height: 420,
        bottom: 50
    },
    txtCont: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingHorizontal: 20,
        margin: 10,
        paddingTop: 20
    },
    txtContainer: {
        height: 50,
        width: 130,
        borderRadius: 20,
        backgroundColor: "#FFE601",
        justifyContent: "center",
        alignItems: "center"
    },
    txtContainerrr: {
        borderRadius: 11,
        backgroundColor: "#D5E3E3",
        padding: 5,
        left: -15
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
    pickStylecontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickStyleView: {
        marginTop: 100,
        width: width - 20,
        height: 550,
        backgroundColor: 'white',
        borderRadius: 9,
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
    pickupTextStyle: {
        color: "#434242",
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center",
        padding: 10
    },
    inputContainerStyle: {
        width: width - 50,
        borderColor: "#D5D7D8",
        color: "#000",
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: "500",
        borderWidth: 0.5,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 17
    },
    btnStyle: {
        backgroundColor: '#00796A',
        width: width - 50,
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 17,
        padding: 5,
        elevation: 2,
    }
});

export default PickDropMap;
