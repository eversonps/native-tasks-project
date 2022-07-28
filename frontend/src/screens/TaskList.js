import React, { useEffect, useState} from "react";

import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from "react-native";

import todayImage from '../assets/imgs/today.jpg'

import moment from "moment";

import commonStyles from "../commonStyles";

import Task from "../components/Task";

import AddTask from "./AddTask";
import Icon from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-community/async-storage";

export default function TaskList(){
    const [visibleTasks, setVisibleTasks] = useState([])
    const [showModalAddTask, setShowModalAddTask] = useState(false)

    const initialState = {
        showDoneTasks: true,
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar Livro de React Native',
                estimateAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Ler Livro de React Native',
                estimateAt: new Date(),
                doneAt: null,
            }
        ]
    }

    const [tasks, setTasks] = useState(initialState)

    function toogleFilter(){
        setTasks({...tasks, showDoneTasks: !tasks.showDoneTasks})
    }

    function filterTasks(){
        let visibleTasks = null

        if(tasks.showDoneTasks){
            visibleTasks = [...tasks.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = tasks.tasks.filter(pending)
        }

        setVisibleTasks(visibleTasks)
        console.log(AsyncStorage.getItem('tasksState'))
        AsyncStorage.setItem('tasksState', JSON.stringify(tasks))
       
    }

    function toogleTask(id) {
        const tasksAux = [...tasks.tasks]

        tasksAux.forEach(task => {
            if(task.id === id){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        setTasks({...tasks, tasks: [...tasksAux], showDoneTasks: tasks.showDoneTasks})
        filterTasks()
    }

    function onCancel(){
        setShowModalAddTask(false)
    }

    function deleteTask(id){
        const tasksAux = tasks.tasks.filter(task => task.id !== id)

        setTasks({...tasks, tasks: tasksAux})
        filterTasks()
    }

    function addTask(newTask){
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

       let tasksAux = [...tasks.tasks]

        tasksAux.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        setTasks({...tasks, tasks: tasksAux})
        setShowModalAddTask(false)
        filterTasks()
    }   

    useEffect(() =>{
        filterTasks()
    }, [tasks])

    useEffect(() => {
        AsyncStorage.getItem('tasksState').then(tasksAux => {
            setTasks(JSON.parse(tasksAux) || initialState)
        })
        
    }, [])

    const today = moment().locale('pt-br').format('ddd, d [de] MMMM')
    return (
        <View style={styles.container}>
            <AddTask isVisible={showModalAddTask} onCancel={onCancel} onSave={addTask}/>
            <ImageBackground source={todayImage} style={styles.background}>
                <View style={styles.iconBar}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={toogleFilter}>
                            <Icon name={tasks.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList}>
                <FlatList data={visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item} toogleTask={toogleTask} onDelete={deleteTask}/>} />
            </View>
           
           <TouchableOpacity style={styles.addButton} onPress={() => setShowModalAddTask(true)} activeOpacity={0.7}>
                <Icon name="plus" size={20} color={commonStyles.colors.secondary}/>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 20
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})