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
    ActivityIndicator
} from 'react-native';
import { COLORS } from '../../const/constants';
import Icon from '../../utils/components/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setActiveBookings, setVehicleData } from '../../backend/slice';
import { API } from '../../utils/components/api';
import axios from 'axios';
import Back from 'react-native-vector-icons/AntDesign';
import { useEvent } from 'react-native-reanimated';
const { height, width } = Dimensions.get('screen');
const PickDrops = (props: any) => {
    const { navigation } = props;
    const [loading, setloading] = useState(false);
    // const [selectVehicle, setSelectVehicle] = useState('');
    const [vehicledata, setVehicledata] = useState<any>([]);
    const [selectimage, setSelectimage] = useState('');
    const [vehicleDatas, setvehicleDatas] = useState('');
    const [modal, setModal] = useState(false);
    const Vehicles = [
        {
            id: 0,
            name: 'Bikes',
            image: require('../../assets/image/Bikeblack.png'),
            family: 'MaterialIcons',
        },
        {
            id: 1,
            name: 'E- Rickshaw',
            image: require('../../assets/image/blueauto.png'),
            family: 'MaterialIcons',
        },
        {
            id: 2,
            name: 'Auto',
            image: require('../../assets/image/eauto.png'),
            family: 'Fontisto',
        },
        {
            id: 3,
            name: 'Four Wheeler',
            image: require('../../assets/image/whitecar.png'),
            family: 'Fontisto',
        },
    ];

    const confirmBtn = () => {
        navigation.navigate('PickDropMap');
        setModal(false);
    }
    const getData = async () => {
        setloading(true);
        try {
            const res = await axios({
                method: 'get',
                url:
                    API.GET_VEHICLE
            });
            if (res) {
                console.log('get vehicle data', res.data?.data);
                setVehicledata(res.data?.data);
                setVehicleData(res.data?.data);
                console.log('get vehicle data', res.data?.data);
                setloading(false);
            } else {
                console.log('API ERROR', res);
                setloading(false);
            }
        } catch (err) {
            console.log('ERROR REQUESTS', err);
            setloading(false);
        }
    };


    useEffect(() => {
        getData();

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00796A" translucent={true} />
            <View style={{ padding: 10, justifyContent: "center" }}>
                <View
                    style={[
                        styles.containerTxt,
                        {
                            backgroundColor: '#D5D7D8',
                        },
                    ]}
                >
                    <Text
                        style={{ color: COLORS.BLACK, fontSize: 20, fontWeight: '500' }}>
                        Select Your Vehicle Type
                    </Text>
                </View>
                {loading ? (
                    <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <ActivityIndicator size={'large'} color={'#00796A'} />
                    </View>
                ) : (
                    <View>
                        {
                            vehicledata.map((item: any, index: any) => (
                                <TouchableOpacity
                                    style={[
                                        styles.container,
                                        {
                                            backgroundColor:
                                                vehicleDatas == item.vehicleType ? COLORS.WHITE : COLORS.WHITE,
                                        },
                                    ]}
                                    onPress={() => {
                                        item.id == index
                                            ? setvehicleDatas(item.vehicleType)
                                            : setvehicleDatas(item.vehicleType);
                                        setSelectimage(item.image);
                                        setModal(true);
                                        console.log(item.vehicleType)
                                    }}>
                                    {item.id >= 0 ? (
                                        <Image source={item.image} resizeMode='contain' style={{ width: 150, height: 100, }} />
                                    ) : (
                                        <Icon
                                            name={item.image}
                                            family={item.family}
                                            size={30}
                                            color={
                                                vehicleDatas == item.vehicleType ? COLORS.DARK_GREEN : COLORS.BLACK
                                            }
                                        />
                                    )}
                                    <Text
                                        style={[
                                            styles.texTxt,
                                            {
                                                color:
                                                    vehicleDatas == item.vehicleType
                                                        ? COLORS.DARK_GREEN
                                                        : COLORS.BLACK,
                                            },
                                        ]}>
                                        {item.vehicleType}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )}

            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: "flex-start", padding: 10 }} onPress={() => setModal(false)}>
                                <Back name='arrowleft' color={'#000'} size={26} />
                            </TouchableOpacity>
                            <View style={styles.vehicleContainer}>
                                <Image source={require('../../assets/image/Bikeblack.png')} resizeMode='contain' style={{ width: 300, height: 180, }} />
                                <Text
                                    style={[
                                        styles.textTxt,
                                    ]}>
                                    {vehicleDatas ? vehicleDatas : ''}
                                </Text>
                            </View>
                            <Text style={styles.modalText}>1 Pillion Rider (No Luggage) Min Charge Rs 49/-</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => confirmBtn()}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default PickDrops;
const styles = StyleSheet.create({
    container: {
        margin: 2,
        width: width,
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        alignSelf: "center",
        elevation: 5,
        bottom: 40
    },
    containerTxt: {
        width: width,
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        elevation: 5,
        alignSelf: "center",
        bottom: 40
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 400,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: width,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 30,
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
        marginTop: 20,
        width: width - 20,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 4,
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
        marginTop: 20,
        alignItems: "center"
    },

    modalText: {
        paddingTop: 30,
        textAlign: 'center',
        color: "#434242",
        fontWeight: "bold"
    },
});

