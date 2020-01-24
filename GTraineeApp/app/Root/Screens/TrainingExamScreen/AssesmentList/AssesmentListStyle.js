import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
      },
    textStyle:{
        color:color._018CCA
    },
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
    },
    tabStyle: {
        borderBottomWidth:3 ,
         borderBottomColor: color._018CCA
        },
    tabBlockStyle : {
        backgroundColor: 'white'
    },
    activeTabStyle: {
        backgroundColor: 'white' ,
        borderColor: 'blue'
    }
});

export default styles;