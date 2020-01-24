import React from "react";
import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    headerText: {
        fontSize: wp('3.5%'), paddingBottom: 3, paddingRight: 5, fontWeight: 'bold'
    },
    dateText: {
        fontSize: wp('2.5%'), paddingBottom: 5
    },
    detailText: {
        fontSize: wp('3%')
    },
    innerView: {
        margin: 15,
        paddingRight:10,
        backgroundColor: 'white'
    },
    imageStyle: {
        width: wp('26%'), height: wp('26%'), marginLeft: -10, marginTop: -10, borderRadius: 5
    },
    newsTypeStyle: {
        paddingRight: 15,
        paddingLeft: 15,
        color: 'white',
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },
    newsTypeMainView: {
        alignItems: 'flex-end', marginRight: 10, marginTop: 10
    },
    card: {
        backgroundColor: color._018CCA, borderRadius: 5
    },
    mainView: {
        marginLeft: 20, marginRight: 10, marginTop: 30
    }
});

export default styles;
