import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    imageStyle:{
        height: 70,
        width:350,
        resizeMode: 'contain',
        marginBottom:40
    },
    mainView:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    innerView:{
        marginLeft:wp('5%'),
        marginRight:wp('5%'),
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:30,
        paddingRight:30
    },
    headerMsg:{
        padding:5,
        textAlign:'center',
        fontWeight:'bold'
    },
    bodyMsg:{
        padding:5,
        textAlign:'center'
    },
    buttonStyle:{
        backgroundColor:color._018CCA,
        borderRadius:25
    },
    buttonTextStyle:{
        color:"white",
        paddingTop:10,
        paddingBottom:10,
        fontWeight:'bold',
        textAlign:'center'
    }
});
export default styles;

