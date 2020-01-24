import React from "react";
import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
   headerText:{
       fontSize:wp('3%'),paddingBottom:3, paddingRight:5
   },
    dateText:{
        fontSize:wp('2%'),paddingBottom: 5
    },
    detailText:{
        fontSize:wp('2.5%')
    },
    mainView:{
       margin:10,
    },
    imageStyle:{
        width: 90, height: 90, marginLeft: -10, marginTop: -10,borderRadius: 5
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
    }
});

export default styles;