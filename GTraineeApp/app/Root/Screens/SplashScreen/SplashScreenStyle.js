import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    imageStyle:{height: 70, width:250,resizeMode: 'contain'},
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
    },
});
export default styles;

