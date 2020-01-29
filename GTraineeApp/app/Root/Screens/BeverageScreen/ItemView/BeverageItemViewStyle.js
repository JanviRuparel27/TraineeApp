import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    card: {
        height: wp('35%'),
        width: wp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor:'white',
        marginRight: 7
    },
    selectedcard: {
        height: wp('35%'),
        width: wp('35%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor:color._DDDDDD,
        marginRight: 7

    },
    innercard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        marginTop: 12,
        color: color._018CCA
    },
    textStyle1: {
        marginTop: 12,
        color: color._018CCA
    }
});

export default styles;
