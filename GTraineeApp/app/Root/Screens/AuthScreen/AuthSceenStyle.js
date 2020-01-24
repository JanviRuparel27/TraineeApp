import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height
    },
    cardDesign: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color._f2f2f2,
        width: '55%',
        borderRadius: 5,
        padding: 25,
        marginBottom: wp('10%')
    },
    authMainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    authSubView: {
        justifyContent: 'center',
        alignItems: 'center', marginBottom: 15
    },
    bottomView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        marginTop: wp('10%')
    },
    textView: {
        marginBottom: 5,
    },
    imageView: {
        height: wp('20%'), width: wp('20%'),

    },
    rememberMeText: {
        marginLeft: 15
    }
});

export default styles;
