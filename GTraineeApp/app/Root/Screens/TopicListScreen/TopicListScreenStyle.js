import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    textColor:{
        color:'white',
        textAlign:'center'
    },
    viewStyle:{
       flexDirection: 'row', 
       display:'flex', 
       margin:15, 
       justifyContent:'space-evenly', 
    },
    badgeStyle:{
        backgroundColor: color._018CCA,
        width:wp('20%'), 
        height:hp('5%'),
        display: 'flex',
        justifyContent: 'center'
    }
});

export default styles;