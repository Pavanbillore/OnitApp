import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from "react-native";

const PaymentService=()=>{
   const  test = async () => {
        try {
            const _data = { amount: 100, phone: "9163277940", type: "Web" };
            const res = await axios.post(
                `https://api.onit.fit/payment/phonepe`,
                _data
            );
            const { code, data } = res?.data;

            if (code !== "PAYMENT_INITIATED") return;
            const url = data?.instrumentResponse?.redirectInfo?.url;

            const merchantTransactionId = data?.merchantTransactionId;
            window.open(url, "_blank", "noreferrer");
            checkStatusCron(merchantTransactionId);
        } catch (error) {
            console.log(error);
        }
    };

    const checkStatusApi = async (merchantTransactionId) => {
        try {
            const payload = {
                merchantTransactionId,
            };
            console.log("done");
            const res = await axios.post(
                `https://api.onit.fit/payment/check-status`,
                payload
            );
            const { data } = res;
            const { code } = data;
            console.log("code", code);
        } catch (e) {
            console.log(e);
        }
    };

    function checkStatusCron(merchantTransactionId){
        
        // const checkStatusApi = async (merchantTransactionId) => {
        //     try {
        //         const payload = {
        //             merchantTransactionId,
        //         };
        //         console.log("done");
        //         const res = await axios.post(
        //             `https://api.onit.fit/payment/check-status`,
        //             payload
        //         );
        //         const { data } = res;
        //         const { code } = data;
        //         console.log("code", code);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };

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
                }
            });
        }
    };
    
    return(
        <>
        <View>
            <Button onPress={test}>Payment</Button>
        </View>
        </>
    )
}

export default PaymentService;