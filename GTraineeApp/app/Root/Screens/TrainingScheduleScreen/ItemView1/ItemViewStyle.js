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
        padding: 10,
        width:wp('75%')
    },
    badgeStyle:{
        margin:10,
        backgroundColor: color._018CCA,
        width:wp('20%'), 
        height:hp('5%'),
        display: 'flex',
        justifyContent: 'center'
    },
    textStyle1:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%'),
    },
    textStyle2:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%'),
        fontWeight:'bold'
    },
    touchableTextStyle: {
        color:color._018CCA,
        borderBottomWidth: 1,
        borderBottomColor: color._018CCA
    },
    topicListContainer : {
        flexDirection:'row' ,
         width:wp('98%')
        }
});
export default styles;
