import React, { useState } from "react";

import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput } from "react-native";

import commonStyles from "../commonStyles";

export default function AddTask({isVisible, onCancel}){

    const initialState = {
        desc: ''
    }

    const [state, setState] = useState(initialState)

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input} value={state.desc} placeholder='Informe a Descrição' onChangeText={desc => setState({...state, desc})}/>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    }, 
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    }
})