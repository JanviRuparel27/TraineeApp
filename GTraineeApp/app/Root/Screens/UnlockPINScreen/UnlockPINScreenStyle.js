import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        marginTop: hp('30%')
    },
    forgotPin:{
        alignItems:'center',
        justifyContent:'center',
        marginTop: hp('15%')
    },
    textColor:{
        fontSize: wp('4%')
    },
    textColor1:{
        color:color._018CCA,
        fontSize: wp('4%')
    },
    textColor2:{
        color:color._EC6BAE,
        fontSize: wp('3%')
    },
});
export default styles;
