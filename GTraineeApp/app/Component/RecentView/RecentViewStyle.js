import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    card: {

        padding:10,
        width: wp('95%'),
        borderRadius: 10,
        backgroundColor: color._0F9DEC,
        borderColor: color._0F9DEC,
        marginBottom: 60,

    },
    innercard: {
        margin: 3,
        flexDirection:'row'
    },
    textStyle: {
        padding: 5
    },
    textHeader: {
        padding: 5,
        color: color._919191,
        fontSize: 10
    },
    textItem: {
        padding: 10,
        color: color._555555,
        fontSize: 12
    },appContainer: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:90
    },appHolder:{
        height: 35,
        width: 35,
        padding: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appName:{color: 'white',padding:5}
});

export default styles;
