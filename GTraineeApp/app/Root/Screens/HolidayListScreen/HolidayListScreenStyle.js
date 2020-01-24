import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    headerView:{
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomColor:color._f2f2f2,
        borderTopColor:color._f2f2f2,
        margin:10
    },
    header: {
        fontSize: wp('4%'),
        color:color._018CCA,
        paddingLeft:10,
        paddingBottom:5,
        paddingTop:5
    }
});

export default styles;
