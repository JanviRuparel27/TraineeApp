import React from "react";
import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   buttonStyle: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: color._018CCA,
},
textareaStyle: {
    marginTop: 5,
    height: 90,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    fontSize: 18 
}
});

export default styles;
