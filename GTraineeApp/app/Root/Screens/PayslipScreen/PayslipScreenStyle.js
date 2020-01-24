import React from "react";
import { StyleSheet } from "react-native";
import { color } from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   checkboxStyle: {
      borderRadius: 4, height: 23, width: 23, alignItems: 'center'
   },
   //    contentStyle:{
   //         flex:1,flexDirection: 'column-reverse',padding:10
   //    },
   textStyle:{
      paddingLeft:hp('2%'),
      fontSize:12
   },
   innerText:{
      paddingLeft:hp('2%'),
      fontSize:16
   },
   contentStyle: {
      height: hp('80%'),
      alignContent: 'center',
      justifyContent: 'center',
   },
   buttonStyle: {
      alignSelf:'center',
      width: '90%',
      backgroundColor:color._018CCA,

   },
   bottom: {
      width: '100%',
      position: 'absolute',
      bottom: 5,
      margin: 10,
   },
   imageStyle:{
      width: wp('3%'),
      height: hp('3%'),
      tintColor: color._018CCA

   }
});

export default styles;
