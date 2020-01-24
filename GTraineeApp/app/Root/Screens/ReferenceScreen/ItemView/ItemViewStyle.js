import React from "react";
import { StyleSheet } from "react-native";
import { color } from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',alignItems: 'center',
    },
    leftImageStyle: {
        width: wp('9%'),
        height: wp('9%'),
        tintColor: color._018CCA,
        resizeMode:'contain'
    },
    rightimageStyle: {
        width: wp('3%'),
        height: hp('3%'),
        tintColor: color._018CCA
    },
    innerText: {
        paddingLeft: wp('2%'),
        fontSize: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;
