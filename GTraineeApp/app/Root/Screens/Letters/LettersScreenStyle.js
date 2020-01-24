import React from "react";
import { StyleSheet } from "react-native";
import { color } from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   leftImageStyle:{
      width: wp('11%'), 
      height: hp('7%'), 
      tintColor: color._018CCA
   },
   rightimageStyle:{
      // width: 30, 
      // height: 30, 
      width: wp('5%'), 
      height: hp('5%'), 
      tintColor: color._018CCA
   },
   innerText:{
      padding:hp('2%'),
      fontSize:hp('2.4%'),
      alignItems:'center',
      justifyContent:'center'
   },
});

export default styles;