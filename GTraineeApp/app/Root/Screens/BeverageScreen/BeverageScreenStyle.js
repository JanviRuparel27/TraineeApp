import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   flatListStyle:{
    //    height:hp('40%'),
   },
   flatContainerStyle:{
        paddingBottom: 30, 
        //height: hp('70%'),

   },
   innerView:{
       margin:10,
       flexDirection: 'row',
       backgroundColor:'white',
       paddingTop:20,
       paddingBottom:20,
       paddingLeft:10,
       borderRadius: 5
   },
   innerCircle:{
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: color._018CCA,
   },
   outerCircle:{
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color._018CCA,
    alignItems: 'center',
    justifyContent: 'center',
   },
   outerView:{
       margin:10,
       height:hp('50%'),
   },
   container:{
       backgroundColor:color._e8e8e8
   },
   buttonStyle: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: color._018CCA,
},
textStyle:{
    fontWeight: 'bold', 
    color: color._018CCA
}
});

export default styles;
