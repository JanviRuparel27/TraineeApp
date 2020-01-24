import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1
    },
    card: {
        height: wp('30%'),
        width: wp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    innercard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        marginTop: 12,
        textAlign:'center'
    }
});

export default styles;
