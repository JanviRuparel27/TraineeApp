import React from "react";
import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    carouselStyle:{
        height: hp('30%'), 
        width: wp('80%'), 
        overflow: 'hidden', 
        margin: 5, 
        borderRadius: 10 
   },
   textStyle:{
    fontSize: 12,
    paddingLeft: 5,
    paddingBottom: hp('9%'),
    color: 'white',
    width: wp('90%')
   }
});

export default styles;