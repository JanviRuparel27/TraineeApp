import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1, padding: 5
    },
    card: {

        width: wp('50%'),
        borderRadius: 5,

    },
    innercard: {margin: 3},
    // textStyle:{
    //     padding:12
    // }
    textStyle: {
        padding: 5
    }, textHeader: {
        padding: 5,
        color: color._919191,
        fontSize: 10
    }, textItem: {
        padding: 10,
        color: color._555555,
        fontSize: 12
    }
});

export default styles;
