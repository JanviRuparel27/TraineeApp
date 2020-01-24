import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
         borderBottomWidth: 0.5
    },
    thumbnailView:{
        paddingLeft:10,
        width:wp('14%'),
        paddingTop:10
    },
    mainView:{
        flexDirection: 'row', 
        justifyContent:"space-between",
         display:'flex'
    },
    textStyle:{
        fontSize:wp('3%'),
        marginBottom:hp('0.5%')
    },
    textStyle1:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%'),
        paddingLeft: 5
    },
    textStyle2:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%'),
        fontWeight:'bold'
    },
    nameStyle:{
        fontSize:wp('3%'),
        marginBottom:hp('0.5%')
    },
    thumbnail:{
        width: wp('12%'), height: wp('12%')
    },
    textView:{
        width: wp('60%'), padding: 10
    },
    imageView:{
        flexDirection: 'row', justifyContent: 'space-between', width:wp('24%'), paddingTop:10,paddingRight: 10
    },
    image:{
         height: hp('5%'), width: wp('10%')
         //height: 30, width: 30
    }
});
export default styles;
