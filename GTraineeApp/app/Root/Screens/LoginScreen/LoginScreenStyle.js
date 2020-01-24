import { StyleSheet } from "react-native";
import { color } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    inputbox: {
        height: 35,
        borderBottomColor: color._DDDDDD,
        borderBottomWidth: 1,
        marginBottom: 10,
        fontSize: wp('3%'),
    },
    textStyle: {
        fontSize: wp('2.5%'),
        paddingBottom: 2,
    },
    rightTextStyle:{
        fontSize: wp('3%'),
        color:color._018CCA,
        fontWeight:'bold',
        paddingBottom:hp('7%'),
    },
    footerStyle: {
        backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'
    },
    fontStyle: {
        fontSize: wp('3%'),
        paddingBottom: 2,
        color: 'black'
    },
    buttonTextStyle: {
        color: 'white'
    },
    imageStyle: { height: 50, width: 200, resizeMode: 'contain' },
    container1: {
        flex: 1,
        marginTop: hp('18%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
    },
    buttonStyle: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: color._018CCA,
        height: hp('4%')
        // height:'15%'
    },
    modalStyle:{
        marginTop: hp('30%'), 
        marginLeft:wp('10%'), 
        marginRight:wp('10%')
    },
    modalTextStyle:{
        margin:30, 
        textAlign:'center',
        fontSize: wp('3.5%'),
        color:color._018CCA,
        fontWeight:'bold'
    },
    modalButtonStyle: {
        alignSelf: 'center',
        width: '100%',
        marginTop:hp('2%'),
        backgroundColor: color._018CCA,
        height: hp('4%')
        // height:'15%'
    },
});
export default styles;