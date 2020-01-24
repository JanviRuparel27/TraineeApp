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
        margin:10,
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
    },
    textStyle:{
        color:color._018CCA
    },
    noDataTextStyle: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        marginTop: 13
    },
    noDataContainer: {
        flex:1 , 
        alignItems:'center' , 
        justifyContent:'center' , 
        paddingTop: 30
    }
});

export default styles;