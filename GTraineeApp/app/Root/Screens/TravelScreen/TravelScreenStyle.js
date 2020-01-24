import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor:color._f3f3f3
    },
    indicatorText: {color: color._555555, textAlign: 'center'},
    indicatorSelectedText: {
        color: color._018CCA, textAlign: 'center'
    }
});

export default styles;