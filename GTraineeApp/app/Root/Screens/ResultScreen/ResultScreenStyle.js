import React from "react";
import { StyleSheet } from "react-native";
import { color } from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: color._018CCA,
    },
    viewStyle:{
        justifyContent:'center', 
        alignItems:'center', 
        flex:1, 
        paddingLeft:20, 
        paddingRight:20
    },
    textStyle:{
        marginBottom:20,
        fontSize:wp('3%'),
    },
    innerView:{
        flexDirection:'row',
        marginLeft:wp('20%'),
        marginRight:wp('20%'),
    },
    innerText:{
        marginRight:10,
        fontSize:wp('3.5%'),
        fontWeight:'bold'
    },
    textStyle1:{
        marginLeft:wp('8%'),
        marginRight:wp('8%'),
        color:color._018CCA,
        fontSize:wp('3%'),
    },
    colorText:{
        color:color._018CCA,
        fontSize:wp('3%'),
        marginBottom:25,
    }
});

export default styles;
