import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Emoji from 'react-native-emoji';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';

const MessageScreen = () => {
    const { accessToken, userId, allServices, userNumber, userData } = useSelector(
        (state: any) => state.auth,
    );
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log('id', userData?._id);


    // const socket = io('https://3.110.90.170:8001'); // Replace with your AWS IP
    // useEffect(() => {
    //     let newUserId=userData?._id
    //     console.log('socket')
    //     // Event listener for the 'new-user-add' event
    //     socket.on('new-user-add', (newUserId) => {
    //       console.log('New user connected:', newUserId);
    //     });

    //     return () => {
    //       socket.off('new-user-add');
    //     };
    //   }, []);

    // Connect to Socket.io
    useEffect(() => {
        console.log("Inside message useEffect");

        socket.current = io('http://3.110.90.170:8001');
        socket.current.emit("new-user-add", userData?._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
        console.log('socket', socket)
    }, [])
    const sendMessage = () => {
        if (message.trim() === '') {
            return;
        }

        setMessages([...messages, message]);
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                {messages.map((msg, index) => (
                    <Text key={index} style={styles.messageText}>
                        {msg}
                    </Text>
                ))}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placeholder="Type a message..."
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Emoji name="speech_balloon" style={styles.sendButtonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    messageContainer: {
        flex: 1,
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 16,
        color: '#000000',
    },
    sendButton: {
        backgroundColor: '#4a8dff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sendButtonIcon: {
        fontSize: 20,
        color: '#ffffff',
    },
})