import React from "react";

import { View, Text , StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import commonStyles from "../commonStyles";

import moment from "moment";
import 'moment/locale/pt-br'

export default function Task({desc, estimateAt, doneAt, id, toogleTask, onDelete}) {
    const doneOrNotStyle = doneAt != null ? { textDecorationLine: 'line-through' } : {}

    const date = doneAt ? doneAt : estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    function getCheckView(doneAt){

        if(doneAt){
            return (
                <View style={styles.done}>
                    <Icon name='check' size={20} color='#FFF'></Icon>
                </View>
            )
        }else{
            return (
                <View style={styles.pending}>
                </View>
            )
        }  
    }

    function getRightContent(){
        return (
            <TouchableOpacity style={styles.right} onPress={() => onDelete && onDelete(id)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    function getLeftContent(){
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#FFF' style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }


    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => onDelete && onDelete(id)}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => toogleTask(id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]}>{desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>     
                </View>
            </Swipeable>
        </GestureHandlerRootView>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    excludeText: {  
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10
    }
})