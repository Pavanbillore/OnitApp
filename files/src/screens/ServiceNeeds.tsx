import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    ImageRequireSource,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    ToastAndroid, ActivityIndicator
} from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import HomeScreen from '../../utils/components/slider';
import LocationDetail from '../../utils/components/LocationDetail';
import serviceList from '../../const/serviceList';
import Header from '../../utils/components/Header';
import { COLORS } from '../../const/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllServices } from '../../backend/slice';
import ActivityLoader from '../../utils/components/ActivityLoader';
import LateLogin from '../../utils/components/LateLogin';
import TabNavigator from '../../utils/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Homemain from './Homemain';
import { BASE_URL } from '../../utils/components/api';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const { height, width } = Dimensions.get('window');

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const ServiceNeeds = ({ navigation }) => {
    const { accessToken, userId, allServices, userNumber } = useSelector(
        (state: any) => state.auth,
    );

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [text, onChangeText] = useState('');
    const [services, setServices] = useState([]);

    useEffect(() => {

        fetchServices()
        // if (!allServices) {
        //   fetchServices();
        // }
        setServices(allServices);
        console.log('ALL SERVINEEDS', services);
        setVisible(false);
        console.log('aa', userNumber)

    }, []);

    const fetchServices = async () => {


        try {
            setVisible(true);
            const res = await axios.get(
                `${BASE_URL}admin/get-all-active-services`,
            );
            dispatch(setAllServices(res.data.data));
            setServices(res.data.data);
            if (!res?.data?.data) {
                setVisible(true)
            }
            setVisible(false);
        } catch (error) {
            setVisible(false);
            console.log('EROOR', error);
            ToastAndroid.show('Try Again Later', ToastAndroid.SHORT);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('REFRESH');
        wait(2000).then(() => {
            fetchServices();
            setServices(allServices);
            console.log('ALL SERVI', services);
            setRefreshing(false);
        });
    }, []);

    const extraction = services.filter((curElem: any) => {
        return curElem.service_name.toLowerCase().includes(text.toLowerCase());
    });

    const Card = ({ services }: any) => {
        // console.log(services.item);
        console.log('ALL SERVINEEDS', services);
        // return(<View><Text>2</Text></View>)
        return (
            <View style={{marginLeft:wp('0.03%'),marginRight:wp('0.25%'),marginTop:12,paddingHorizontal:wp('0.25%'),paddingVertical:hp('0.15%'),borderRadius:5}}>

                {
                    !(services.item._id === '64462802f77b1ff1d68890fd' && '643798aa8dae27264ca2a0dc') ?
                        <TouchableOpacity
                            style={
                                services.item._id === '6373436f1307e26d44ac8cdb'
                                    ? styles.buttonTrendingService
                                    : styles.button
                            }
                            onPress={() => {
                                navigation.navigate('MainService', { service: services.item })
                                console.log('aa', services.item._id)

                                // userId
                                //   : setLoginModal(true);
                            }}>
                            {services.item[0] && (
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#FFBB00',
                                        paddingHorizontal: 3,
                                        borderRadius: 3,
                                        color: COLORS.WHITE,
                                        top: -12,
                                        position: 'relative',
                                    }}>
                                    Trending
                                </Text>
                            )}


                            <View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image
                                    style={{
                                        height: 40,
                                        width: 40,
                                        // justifyContent:'center',
                                        // alignItems:'center'
                                    }}
                                    source={
                                        // services.item._id === '6373436f1307e26d44ac8cdb'
                                        //   ? require('../../assets/logo/ac.png')
                                        //   : services.item._id === '637b76f47c7cd9e139b39d02'
                                        //   ? require('../../assets/logo/elc.png')
                                        //   : services.item._id === '637b788c7c7cd9e139b39d09'
                                        //   ? require('../../assets/logo/elc.png')
                                        //   : services.item._id === '637b79997c7cd9e139b39d10'
                                        //   ? require('../../assets/logo/beauty.png')
                                        //   : services.item._id === '637b79cd7c7cd9e139b39d17'
                                        //   ? require('../../assets/logo/hc.png')
                                        //   : services.item._id === '637b7a0e7c7cd9e139b39d1e'
                                        //   ? require('../../assets/logo/plmber.png')
                                        //   : services.item._id === '637b7ab07c7cd9e139b39d2c'
                                        //   ? require('../../assets/logo/homecare.png')
                                        //   : services.item._id === '637b76f47c7cd9e139b39d02'
                                        //   ? require('../../assets/logo/elc.png')
                                        //   : services.item._id === '63b9162bfa46443c582e1940'
                                        //   ? require('../../assets/logo/homecare.png')
                                        // : require('../../assets/logo/elc.png')
                                        // {uri: services?.item?.image}
                                        services?.item?.image
                                            ? { uri: services?.item?.image }
                                            : require('../../assets/logo/elc.png')
                                    }
                                />
                                </View>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        textAlign: 'center',
                                        color: COLORS.BLACK,
                                        fontSize: 11,
                                    }}>
                                    {services.item?.service_name.split('-')[0]}
                                </Text>
                            </View>


                        </TouchableOpacity> : null

                }







            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#00796A' }}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#00796A"
            />
            <View style={{}}>
                <Header />
            </View>
            <ActivityLoader
                visible={visible}
                setVisible={() => setVisible(!visible)}
            />

            <View
                style={{
                    flex: 10,
                    marginTop: 15,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingHorizontal: 10,
                }}>
                {/* <Text
                    style={{
                        justifyContent: 'center',
                        fontSize: 18,
                        fontWeight: '700',
                        color: COLORS.BLACK,
                        marginTop: 10,
                    }}>
                    How can we help you today?
                </Text> */}
                {/* <View
                    style={{
                        flexDirection: 'row',
                        width: width * 0.85,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            borderColor: COLORS.DARK_GREEN,
                            padding: 10,
                            borderWidth: 1,
                            paddingHorizontal: 20,
                        }}>
                        <Text
                            style={{
                                color: COLORS.DARK_GREEN,
                                fontSize: 15,
                                textAlign: 'center',
                            }}>
                            View All Offers
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={
                            () => navigation.navigate('BookTechnician')
                            // navigation.navigate('BookingDetails', {
                            //   ticketData: {
                            //     personal_details: {
                            //       primary_phone: {
                            //         country_code: '+91',
                            //         mobile_number: '9873371012',
                            //       },
                            //       alternate_phone: {
                            //         country_code: '+91',
                            //         mobile_number: '9876543210',
                            //       },
                            //       name: 'Sahil',
                            //     },
                            //     specific_requirement: 'text',
                            //     service_provided_for: '637b7a4b7c7cd9e139b39d25',
                            //     address_details: {
                            //       house_number: 'houseno',
                            //       locality: 'local',
                            //       city: 'Faridabad',
                            //       state: 'Haryana',
                            //       pincode: '121001',
                            //       country: 'India',
                            //     },
                            //     time_preference: {
                            //       time_preference_type: 'Immediately',
                            //       specific_date_time: 'Immediately',
                            //     },
                            //     offers_applied: {
                            //       offer_code: 'OniT 2022',
                            //     },
                            //   },
                            //   serviceType: 'Carpentar',
                            // })
                        }
                        style={{
                            borderRadius: 5,
                            backgroundColor: COLORS.DARK_GREEN,
                            padding: 10,
                            paddingHorizontal: 20,
                        }}>
                        <Text
                            style={{ color: COLORS.WHITE, fontSize: 15, textAlign: 'center' }}>
                            Book a Technician
                        </Text>
                    </TouchableOpacity>
                </View> */}

                <Text
                    style={{
                        justifyContent: 'center',
                        fontSize: 19,
                        fontWeight: '700',
                        marginTop: 15,
                        color: COLORS.BLACK,
                        marginLeft: 5
                    }}>
                    Recommended Services:
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: '100%',
                        height: 140,
                        marginTop: 15,
                        borderRadius: 5,
                    }}>
                    <HomeScreen />
                </View>

                {/* <Text
                    style={{
                        justifyContent: 'center',
                        fontSize: 19,
                        fontWeight: '600',
                        marginTop: 10,
                        marginBottom: 0,
                        color: '#3A3A3A',
                        marginLeft: 5
                    }}>
                    Services:
                </Text> */}

                {/* For services  */}

                <View style={{ height:hp('75%'),width:wp('95%'),justifyContent:'center',alignItems:'center' }}>
                    {
                        visible == true ? <ActivityIndicator size="large" color="black" /> : null
                    }
                    <FlatList
                        style={{}}
                        // contentContainerStyle={{padding:24}}
                        // columnWrapperStyle={{justifyContent: 'center'}}
                        numColumns={3}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[COLORS.DARK_GREEN]}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        data={extraction}
                        renderItem={(item: any) => {
                            return <Card  services={item} />;
                        }}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>



            </View>
            {/* <View style={{
                height: 45,
                borderTopEndRadius: 20, borderTopLeftRadius: 20, backgroundColor: "white",
                paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between",
                shadowColor: 'black', elevation: 2, borderWidth: 1, borderColor: "#E5E7E9"
            }}>
                <View style={{ alignItems: "flex-start", marginLeft: 10, marginTop: 2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ServiceNeeds', { Tab: "Home" })} style={{ alignItems: 'center' }} >
                        <Ionicons name="home-outline" size={20} color="black" />
                        <Text style={{ fontSize: 13, color: 'black' }}>Home</Text>
                    </TouchableOpacity>
                </View>

              

                <View style={{ alignItems: "flex-start", marginTop: 2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BookingList', { Tab: "Home" })} style={{ alignItems: 'center' }} >
                        <Feather name="plus-circle" size={20} color="black" />
                        <Text style={{ fontSize: 13, color: 'black' }}>Bookings</Text>
                    </TouchableOpacity>
                </View>

              
                <View style={{ alignItems: "flex-start", marginTop: 2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyAccount', { Tab: "Home" })} style={{ alignItems: 'center' }} >
                        <Feather name="user" size={20} color="black" />
                        <Text style={{ fontSize: 13, color: 'black' }}>MyAccount</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
};

export default ServiceNeeds;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        //justifyContent: 'center',
        marginLeft: 0,
        marginTop: 10,
        height: 102,
        width: '100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 0,
        height: 102,
        width: 102,
        margin: 5,
        borderWidth: 1.2,
        borderColor: '#ddd',
    },
    buttonTrendingService: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 0,
        height: 102,
        width: 102,
        margin: 5,
        borderWidth: 1.2,
        borderColor: '#FFBB00',
    },
});
