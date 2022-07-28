import React from "react";

import { View, TextInput, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"

export default function AuthInput({icon, style, placeholder, value, onChangeText}){

   return (
        <View style={styles.container}>
            <Icon name={icon} size={20} style={styles.icon}/>
            <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        marginLeft: 20,
    },
    input: {
        marginLeft: 20,
        width: '70%'
    }
})