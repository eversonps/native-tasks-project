import React, { useEffect, useState} from "react";

import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";

import todayImage from '../assets/imgs/today.jpg'

import moment from "moment";

import commonStyles from "../commonStyles";

import Task from "../components/Task";

import Icon from "react-native-vector-icons/FontAwesome";
export default function TaskList(){
    const [visibleTasks, setVisibleTasks] = useState([])
    const [tasks, setTasks] = useState({
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
    })

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

    useEffect(() =>{
        filterTasks()
    }, [tasks])

    const today = moment().locale('pt-br').format('ddd, d [de] MMMM')
    return (
        <View style={styles.container}>
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
                <FlatList data={visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {...item} toogleTask={toogleTask}/>} />
            </View>
           
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
    }
})