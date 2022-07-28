import React, { useState } from "react";

import { View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";;
import backgroundImage from '../assets/imgs/login.jpg'

import commomStyle from '../commonStyles'
export default function Auth(){
    const [stageNew, setStageNew] = useState(false)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function signinOrSignup(){
        if(stageNew){
            Alert.alert('Sucesso!, Criar conta')
        }else{
            Alert('Sucesso!', 'Logar')
        }
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>{stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                {
                    stageNew && <TextInput placeholder="Nome" value={user.name} style={styles.input} onChangeText={name => setUser({...user, name})}/>
                }
                <TextInput placeholder="E-mail" value={user.email} onChangeText={(email => setUser(...user, email))} style={styles.input}/>
                <TextInput placeholder="Senha" value={user.password} onChangeText={(password => setUser(...user, password))} style={styles.input}/>
                {
                    stageNew && <TextInput placeholder="Confirmação de Senha" value={user.confirmPassword} style={styles.input} onChangeText={confirmPassword => setUser({...user, confirmPassword})}/>
                }
               
                <TouchableOpacity onPress={signinOrSignup}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{stageNew ? 'Registrar' : 'Entrar'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setStageNew(!stageNew)}>
                <Text style={styles.buttonText}>{stageNew ? 'Ja possui conta?' : 'Ainda nao possui conta?'}</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    title: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.secondary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commomStyle.fontFamily,
        fontSize: 20,
        color: '#FFF'
    }
})