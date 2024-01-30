import React, { useEffect } from "react";
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
    ScrollView,
} from "react-native";
import Task from "../TabsScreen/Task";
const { height, width } = Dimensions.get("window");
const TaskManager = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F8F8F8",
            }}
        >

            {/* <View style={{backgroundColor:"red",flexGrow:1}}> */}

                <Task />
            {/* </View> */}
        </View>
    );
};

export default TaskManager;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "flex-start",
    },

    listTab: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 5,
    },
    btnTab: {
        width: "55%",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#fff",
        padding: 8,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    textTab: {
        fontSize: 18,
        color: "#161716",
    },
});
