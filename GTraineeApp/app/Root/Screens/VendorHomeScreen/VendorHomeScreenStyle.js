import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   buttonStyle: {
    margin:15,
    width: '40%',
    backgroundColor: color._018CCA,
},
headerContainer: {
    borderBottomWidth: 1 , 
    borderBottomColor:'#e2e2e2' , 
    display: 'flex' , 
    flexDirection:'row' , 
    alignItems:'flex-end' , 
    justifyContent:'space-between'
},
countTextStyle : { 
    margin:15 , 
    fontSize: 20
}
});

export default styles;
