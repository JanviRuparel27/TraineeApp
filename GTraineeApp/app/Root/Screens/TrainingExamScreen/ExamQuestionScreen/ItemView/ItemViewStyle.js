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
    innerGreenCircle:{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'green',
       },
       innerRedCircle:{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'red',
       },
    outerCircle:{
     height: 24,
     width: 24,
     borderRadius: 12,
     borderWidth: 2,
     borderColor: color._018CCA,
     alignItems: 'center',
     justifyContent: 'center',
    },
    outerGreenCircle: {
     height: 24,
     width: 24,
     borderRadius: 12,
     borderWidth: 2,
     borderColor: 'green',
     alignItems: 'center',
     justifyContent: 'center',
    },
    outerView:{
        margin:10,
        height:hp('50%'),
    },
});
export default styles;
