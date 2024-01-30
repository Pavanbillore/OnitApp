
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    ImageRequireSource,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    FlatList,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { BottomSheet } from 'react-native-btr';
import HomeScreen from '../../utils/components/slider';
import displayCurrentAddress from '../../location';
import LocationDetail from '../../utils/components/LocationDetail';
import { useSelector } from 'react-redux';
import homeList from '../../const/homeList';
import Locations from '../../location';
import { COLORS } from '../../const/constants';
import Header from '../../utils/components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import paymentService from '../../utils/components/PaymentService';
import Invoice from 'react-native-vector-icons/FontAwesome5';
import Wallet from 'react-native-vector-icons/AntDesign';
import Contact from 'react-native-vector-icons/FontAwesome5';
import Serviced from 'react-native-vector-icons/AntDesign';
import Map from 'react-native-vector-icons/AntDesign';
import Plush from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const { height, width, scale } = Dimensions.get('window');

const Homemain = (props: any) => {
    const { navigation } = props;
    const [visible, setVisible] = useState(false);
    const [text, onChangeText] = useState('');
    const { isAuthorized, userNumber } = useSelector((state: any) => state.auth)
    // const navigation = useNavigation();
    useEffect(() => {
        console.log('USER AUTHORIZED', isAuthorized)
        console.log('USER BUMBER', userNumber)
        setVisible(false)
    }, [])
    const extraction = homeList.filter(curElem => {
        return curElem.name.toLowerCase().includes(text.toLowerCase());
    });

    const homeData = [
        {
            id: 0,
            name: 'Task & Reminders',
            image: require('../../assets/image/invoice.png'),
            click: () => {
                navigation.navigate('/Contacts');
            },
        },
        {
            id: 1,
            name: 'Money Manager',
            image: require('../../assets/image/salaryy.png'),
        },
        {
            id: 2,
            name: 'Contact & Documents',
            image: require('../../assets/image/contact-book.png'),
        },
        {
            id: 3,
            name: 'Service Needs',
            image: require('../../assets/image/cleaning.png'),
        },
        {
            id: 4,
            name: 'Pick & Drop',
            image: require('../../assets/image/location.png'),
        },
        {
            id: 5,
            name: 'More',
            image: require('../../assets/image/add.png'),
        },
    ];
    const showToast = () => {
        Toast.showWithGravity(
            'More services is comming soon.',
            Toast.LONG,
            Toast.TOP,
        );

    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.DARK_GREEN, height: '18%' }}>
                <Header color={COLORS.DARK_GREEN} />
            </View>
            <View
                style={{

                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,


                }}>

                <Text
                    style={{
                        justifyContent: 'center',
                        fontSize: 17,
                        fontWeight: '700',
                        marginLeft: 16,
                        marginTop: 12,
                        color: COLORS.BLACK,
                    }}>
                    Recommended Services:
                </Text>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: '93%',
                        height: 130.5,
                        marginLeft: 10,
                        marginTop: 15,
                        borderRadius: 5,
                        position: 'relative',
                    }}>
                    <HomeScreen />
                </View>
            </View>

            <View style={styles.hdContainer}>
                <Text
                    style={styles.serviceText}>
                    Services:
                </Text>
                <View style={styles.parentContainer}>
                    <ScrollView>
                        <View style={styles.container}>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/invoice.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            Task & Reminders
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MoneyManager')}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/salaryy.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            Money Manager
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('ContactsTab')}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/contact-book.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            Contact & Documents
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ServiceNeeds')}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Text
                                            style={styles.servText}>
                                            Special Service
                                        </Text>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/cleaning.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            Service Needs
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('PickDrop')}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/location.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            Pick & Drop
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showToast()}>
                                    <View
                                        style={styles.mainContainer}>
                                        <Image
                                            style={styles.imgContain}
                                            source={require('../../assets/image/add.png')}
                                        />
                                        <Text
                                            style={styles.txtContainer}>
                                            More
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View >
    )
}

export default Homemain;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "white",
        width: '50%',
        paddingVertical: 5
    },
    parentContainer: {
        alignSelf: "center",
        justifyContent: 'center',
    },
    hdContainer: {
        height: hp('60%'),
        backgroundColor: "white"
    },
    mainContainer: {
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.13,
        width: width * 0.42,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1.2,
        borderColor: '#F8F8F8',
    },
    txtContainer: {
        marginTop: 10,
        marginLeft: 0,
        height: 18,
        color: COLORS.BLACK,
        fontWeight: '400',
    },
    servText: {
        alignSelf: 'center',
        backgroundColor: '#FFBB00',
        paddingHorizontal: 3,
        borderRadius: 3,
        color: COLORS.BLACK,
        bottom: 10

    },
    imgContain: {
        marginTop: 1,
        marginLeft: 0,
        height: 40,
        width: 40,
        backgroundColor: '#F8F8F8',
        overlayColor: '#F8F8F8',
        shadowColor: '#F8F8F8',
        borderColor: '#F8F8F8'
    },
    serviceText: {
        justifyContent: 'center',
        fontSize: 19,
        fontWeight: '600',
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 0,
        color: '#3A3A3A',
    },
})
