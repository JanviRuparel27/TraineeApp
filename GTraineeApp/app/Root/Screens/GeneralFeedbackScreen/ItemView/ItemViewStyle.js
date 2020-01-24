import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
         borderBottomWidth: 1,
         borderBottomColor: 'gray',
         padding: 10
    },
    mainView:{
        flexDirection: 'row', 
        display:'flex'
    },
    textStyle:{
        fontSize:wp('2.5%'),
        marginBottom:hp('0.5%')
    },
    innerView:{
        flexDirection: 'row',
        backgroundColor:'white',
        padding: 7 ,
        borderRadius: 5
    },
    innerCircle:{
     height: 12,
     width: 12,
     borderRadius: 6,
     backgroundColor: color._018CCA,
    },
    outerCircle:{
     height: 20,
     width: 20,
     borderRadius: 10,
     borderWidth: 2,
     borderColor: color._018CCA,
     alignItems: 'center',
     justifyContent: 'center',
    },
    outerView:{
        margin:10,
        height:hp('50%'),
    },
    font:{
        fontSize: wp('3.5%')
    },
    innerFont:{
        paddingLeft: 20,
        fontSize: wp('3%')
    }
});
export default styles;
