import React from "react";

import { View, Text , StyleSheet, TouchableWithoutFeedback} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import commonStyles from "../commonStyles";

import moment from "moment";
import 'moment/locale/pt-br'

export default function Task({desc, estimateAt, doneAt, id, toogleTask}) {
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

    return (
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
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
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
    }

})