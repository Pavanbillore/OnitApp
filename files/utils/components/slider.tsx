import React, { useRef } from "react";
import { Text, TouchableOpacity, View, Image, Linking } from "react-native";
import Swiper from "react-native-web-swiper";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';


// export default class HomeScreen extends React.Component {
const HomeScreen = () => {
    const navigation = useNavigation()
    const link = () => {
        Linking.openURL('https://onit.serivces')
    }

    const swiperRef = useRef(null);

    const handlePrevPress = () => {
        if (swiperRef.current) {
            swiperRef.current.goToPrev();
          }
    };
  
    const handleNextPress = () => {
        if (swiperRef.current) {
            swiperRef.current.goToNext();
          }
    };

    const renderPrevButton = () => {
        return (
          <Icon
            name="chevron-left"
            size={30}
            color="white"
            style={{ marginLeft: 10 }}
            onPress={handlePrevPress}
          />
        );
      };
    
      const renderNextButton = () => {
        return (
          <Icon
            name="chevron-right"
            size={30}
            color="white"
            style={{ marginRight: 10 }}
            onPress={handleNextPress}
          />
        );
      };
    // render() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 140, width: "100%", borderRadius: 10 }}>
                <Swiper ref={swiperRef} loop timeout={2.5}  controlsProps={{PrevComponent:renderPrevButton,NextComponent:renderNextButton}} >
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://onit.services/')}
                    >


                        <Image
                            source={require("../../assets/image/kk.jpeg")}
                            style={{
                                height: 140,
                                width: "100%",
                                resizeMode: "stretch",
                                borderRadius: 10,
                            }}
                        />


                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://onit.services/')}
                    >
                        <Image
                            source={require("../../assets/image/banner.jpeg")}
                            style={{
                                height: 140,
                                width: "100%",
                                resizeMode: "stretch",
                                borderRadius: 10,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://onit.services/')}
                    >
                        <Image
                            source={require("../../assets/image/bann.jpeg")}
                            style={{
                                height: 140,
                                width: "100%",
                                resizeMode: "stretch",
                                borderRadius: 10,
                            }}
                        />
                    </TouchableOpacity>

                </Swiper>
            </View>
        </View>
    );
    // }
}
// }

export default HomeScreen
