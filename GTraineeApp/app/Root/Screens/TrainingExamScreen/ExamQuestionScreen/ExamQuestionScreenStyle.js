import React from "react";
import { StyleSheet } from "react-native";
import { color } from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: color._018CCA,
    },
    startButtonStyle: {
        alignSelf: 'center',
        width: '40%',
        backgroundColor: color._018CCA,
    },
    viewButtonStyle: {
        width: '30%',
        backgroundColor: color._018CCA,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 20
    },
    viewButtonStyle1: {
        width: '30%',
        backgroundColor: color._018CCA,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 20,
        borderRadius:5
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 15
    },
    testNameStyle: {
        fontSize: 25
    },
    nameContainerStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
});

export default styles;
