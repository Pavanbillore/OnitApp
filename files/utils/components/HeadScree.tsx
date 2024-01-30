import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import React from 'react'
import Icon from './Icon';
import { COLORS } from '../../const/constants';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

const HeadScree = () => {
    const navigation = useNavigation()
    console.log('navv', navigation)
    return (
        <View>
            <View
                style={{
                    padding: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Homem')}>
                    <Icon name="left" family="AntDesign" color={COLORS.BLACK} size={25} />
                </TouchableOpacity>

                {/* <View style={styles.input}>
                    <Image
                        source={require('../../assets/logo/search.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginHorizontal: 10 }}
                    />
                    <TextInput
                        placeholder="Search"
                        style={{
                            color: COLORS.GREY,
                            fontSize: 16,
                            fontFamily: 'poppins-medium',
                        }}
                    />
                    </View>*/}
            </View>
        </View>
    )
}

export default HeadScree

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderRadius: 5,
        width: width * 0.85,
        // marginHorizontal: 10,
        backgroundColor: '#00796A1A',
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
    },
})