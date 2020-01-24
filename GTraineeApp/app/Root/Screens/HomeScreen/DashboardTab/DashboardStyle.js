import React from "react";
import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {color} from "app/Theme";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#626262', flex: 1
    },
    innerMain: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderColor: "#d0d0d0"
    },
    carouselContainer:{
        padding:10,
        height:hp('40%')
    },
    fabButtonStyle: { 
        backgroundColor: color._018CCA ,
        width: 50, 
        height: 50,
        borderRadius: 25
    }
    
});

export default styles;
