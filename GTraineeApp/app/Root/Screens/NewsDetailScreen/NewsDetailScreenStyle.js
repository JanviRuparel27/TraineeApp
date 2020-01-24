import React from "react";
import {StyleSheet , Dimensions} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    carouselContainer:{
        padding:10,
    },
    carouselStyle:{
        height: hp('25%'), 
        width: wp('80%'), 
        overflow: 'hidden', 
        margin: 5, 
        borderRadius: 10 
   },
   contentContainer: {
       marginLeft: 20 ,
        marginRight: 20
    },
    titleText: {fontSize : 25, marginTop:15},
    smallTextContainer: {
        display:'flex' ,
        flexDirection: 'row' , 
        borderBottomWidth : 2 , 
        borderBottomColor: 'orange' , 
        paddingBottom :5
    },
    smallText : {paddingLeft: 3},
    orangeText : {
        paddingLeft: 3 , 
        color: 'orange'
    },
    descriptionContainer : {
        backgroundColor: 'blue' ,
        height: hp('35%'),
        width: screenWidth - 40,
        marginTop: 10
     },

});

export default styles;