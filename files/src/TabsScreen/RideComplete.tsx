import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ToastAndroid,
    KeyboardAvoidingView,
    StatusBar,
    TextInput,
    ScrollView
} from 'react-native';
import { COLORS } from '../../const/constants';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../utils/components/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { Rating, AirbnbRating } from 'react-native-ratings';
const { height, width } = Dimensions.get('screen');
import Invoice from 'react-native-vector-icons/FontAwesome5';
import Mail from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const RideComplete = (props: any) => {
    const route = useRoute()
    const id = route.params?.id;
    const { navigation } = props;
    const [riderName, setriderName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [price, setPrice] = useState('');
    const [modePayment, setmodePayment] = useState('');
    const [rating, setRating] = useState('');
    const Imgs = require('../../assets/image/whitelg.png')
    const getData = async () => {
        // setloading(true);
        try {
            const res = await axios({
                method: 'get',
                url:
                    'http://13.233.255.20/consumerAppAppRoute/get-only-ticket/' + id
            });
            if (res) {
                setriderName(res.data.data.assigned_ids.assigned_technician_id.personal_details.name);
                // setriderImg(res.data.data.assigned_ids.assigned_technician_id.personal_details.profile_picture);
                // setPrice(res.data.data.ticket_price)
                // setRating(res.data.data.assigned_ids.assigned_technician_id.count_details.technician_rating);
                // setmodePayment(res.data.data.mode_of_payment);
                // setpincode(res.data.data.pickupAddress.pincode)
                console.log('ticket data', res.data?.data);
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
    useEffect(() => {
        getData();
    }, [])

    const ratingCompleted = () => {
        setRating(rating.toString())
        console.log("Rating is: " + rating.toString())
    }
    const submitFeedbackPress = () => {
        navigation.navigate('Homem');
        Toast.showWithGravity(
            'Feedback submitted successfully.',
            Toast.LONG,
            Toast.TOP,
        );
    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
                <StatusBar barStyle="dark-content" backgroundColor="#00796A" translucent={true} />
                <View style={styles.container}>
                    <Text style={styles.rideTxt}>Your ride has been completed</Text>
                    <Text style={styles.rateTxt}>Rate your ride</Text>
                    <View style={{ paddingTop: 50 }}>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Good", "Very Good", "Amazing", "Exellent",]}
                            defaultRating={5}
                            onFinishRating={ratingCompleted}
                            size={40}
                        />
                    </View>

                </View>
                <View style={{ paddingTop: 50 }}>
                    <TextInput
                        placeholder='Enter your feedback...'
                        numberOfLines={5}
                        placeholderTextColor={'#6C707B'}
                        value={feedback}
                        textAlignVertical='top'
                        multiline={true}
                        onChangeText={(value) => {
                            setFeedback(value)
                            console.log(value)
                        }}
                        style={styles.inputContainer}
                    />
                </View>
                <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
                    <TouchableOpacity style={[styles.buttonClose]} onPress={submitFeedbackPress}>
                        <Text style={styles.textStyle}>Submit Feedback</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    inputContainer: {
        width: '90%',
        height: 200,
        borderWidth: 1,
        borderColor: "#D5D7D8",
        color: "#000",
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 10,
        padding: 10
    },
    mailIcon: {
        zIndex: 1,
        top: 45,
        paddingLeft: 30
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
    },
    invoiceTxt: {
        color: '#000',
        fontSize: 18,
    },
    rideTxt: {
        color: '#414141',
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 10,
        // textTransform: "capitalize"
    },
    rateTxt: {
        color: '#414141',
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 5
    },
    invoiceMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5
    },
    buttonClose: {
        borderRadius: 7,
        backgroundColor: '#00796A',
        padding: 10,
        width: '90%',
        alignItems: "center",
        alignSelf: "center",
        marginTop: 20
    },
    imgCont: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
        marginTop: 10
    },
});

export default RideComplete;
