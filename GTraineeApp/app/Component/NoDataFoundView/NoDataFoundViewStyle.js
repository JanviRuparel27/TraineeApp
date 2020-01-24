import {StyleSheet} from "react-native";
import {color} from "app/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:hp('20%')
    },
    imageContainer: {
        height: hp('15%'),
        width: wp('22%')
    },
    noDataTextStyle: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        marginTop: 13
    },
    bottomTextStyle: {
        marginTop: 22,
        fontSize: wp('3.5%')
    },
    buttonContainer: {
        width: wp('35%'),
        backgroundColor: '#018cca',
        borderRadius: 20,
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: wp('3.5%')
    }

})
export default styles;