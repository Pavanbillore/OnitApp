import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserAvatar from 'react-native-user-avatar';

const CheckScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "black", fontSize: 17, fontWeight: "700" }}>Money Manager</Text>

            </View>

            <View style={{ backgroundColor: "#FCECB9", height: 50, marginHorizontal: 30, borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 10, marginTop: 20 }}>
                <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 15, color: "black" }} >My Balance</Text>
                    <View style={{ justifyContent: "center", alignItems: "flex-end", flexGrow: 1 }}>
                        <Text style={{ color: "black", fontSize: 18 }}>40.00</Text>
                    </View>
                </View>


            </View>
            <View style={{ backgroundColor: "#D5CEFC", marginHorizontal: 25, borderRadius: 20 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text> Total Bill</Text>
                    <View style={{ backgroundColor: "red", flexGrow: 1, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 18, color: "black" }}>20</Text>
                    </View>
                </View>

                <View>
                    <Text>Split With</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                    <UserAvatar size={50} name="Avishay Bar" />
                    
                    <UserAvatar size={50} name="John Doe" bgColors={['#ccc', '#fafafa', '#ccaabb']} />
                    <UserAvatar size={50} name="John Doe" />
                    <UserAvatar size={50} name="Jane Doe" bgColor="#000" />
                </View>

            </View>
        </View>
    )
}

export default CheckScreen

const styles = StyleSheet.create({})

// FCECB9
// D5CEFC


