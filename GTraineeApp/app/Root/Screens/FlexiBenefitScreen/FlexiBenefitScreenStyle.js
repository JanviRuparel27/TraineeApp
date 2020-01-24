import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    boldText:{
        fontSize: wp('3.5%')
    },
    card:  {
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 15, marginBottom: 35
    },
    buttonStyle: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: color._018CCA,

    },
    bottom: {
        // marginBottom:20
        position: 'relative',
        marginBottom:20,
        marginTop:10
    },
    mainView:{
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 10,
    },
    innerView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textStyle:{
        width:'30%',
        textAlign:'center'
    },
    textInputStyle:{
        width:'70%',
        borderColor:'gray',
        borderWidth:0.5,
        height:35,
        textAlign:'center',
        color:'black'
    },
    view:{
        margin: 10,
        alignItems:'center'
    },
    textViewStyle:{
        width:'40%',
        marginTop: 10
    }
});
export default styles;
