import React, { useState } from "react";

import { View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";;
import backgroundImage from '../assets/imgs/login.jpg'

import AuthInput from "../components/AuthInput";
import commomStyle from '../commonStyles'

import { server, showSuccess, showError } from "../common";
import axios from "axios";

export default function Auth({navigation}){
    const [stageNew, setStageNew] = useState(false)

    const initalState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [user, setUser] = useState(initalState)

    function signinOrSignup(){
        if(stageNew){
            signup()
        }else{
            signin()
        }
    }

    async function signup(){
        try{
            await axios.post(`${server}/signup`, {
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            })

            showSuccess('Usuario cadastrado!')
            setStageNew(false)
            setUser({...initalState})
        }catch(e){
            showError(e)
        }
    }

    async function signin(){
        try{
            const res = await axios.post(`${server}/signin`, {
                email: user.email,
                password: user.password,
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            navigation.navigate('Home')
        }catch(e){
            showError(e)
        }
    }

    const validations = []
    validations.push(user.email && user.email.includes('@'))
    validations.push(user.password && user.email.length >= 6)

    if(stageNew){
        validations.push(user.name && user.name.trim().length >= 3)
        validations.push(user.confirmPassword)
        validations.push(user.password === user.confirmPassword)
    }

    const validForm = validations.reduce((t, a) => t && a)

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>{stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                {
                    stageNew && <AuthInput icon='user' placeholder="Nome" value={user.name} style={styles.input} onChangeText={name => setUser({...user, name})}/>
                }
                <AuthInput icon='at' placeholder="E-mail" value={user.email} onChangeText={email => setUser({...user, email})} style={styles.input}/>
                <AuthInput icon='lock' placeholder="Senha" value={user.password} onChangeText={password => setUser({...user, password})} style={styles.input}/>
                {
                    stageNew && <AuthInput icon='asterisk' placeholder="Confirmação de Senha" value={user.confirmPassword} style={styles.input} onChangeText={confirmPassword => setUser({...user, confirmPassword})}/>
                }
               
                <TouchableOpacity onPress={signinOrSignup} disabled={!validForm}>
                    <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
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