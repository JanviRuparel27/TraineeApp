import React from "react";
import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex: 1,
        marginTop:hp('10'),
        position:'absolute'
    },
    outerContainer:{
        height:hp('70%'),
    }
});

export default styles;
