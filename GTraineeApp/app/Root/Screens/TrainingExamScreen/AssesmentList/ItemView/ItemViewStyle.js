import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
         borderBottomWidth: 0.5
    },
    mainView:{
        flexDirection: 'row', 
        display:'flex'
    },
    textStyle:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%')
    },
    nameStyle:{
        fontSize:wp('3.5%'),
        marginBottom:hp('0.5%'),
        color:color._018CCA,
    },
    textColor:{
        color:'white',
        textAlign:'center'
    },
    textView:{
        width:wp('90%'),
        paddingRight: 10
    },
   
    rightimageStyle: {
        width: wp('5%'),
        height: hp('5%'),
        tintColor: color._018CCA
    },
});
export default styles;
