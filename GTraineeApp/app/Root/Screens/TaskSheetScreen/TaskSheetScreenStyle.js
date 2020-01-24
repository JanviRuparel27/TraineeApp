import {StyleSheet} from "react-native";
import {color} from 'app/Theme';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.white,
    },
    container: {
        alignItems: 'center', marginTop: 50,
        justifyContent: 'center',
        backgroundColor: color.white,
    },
    progressView: {
        height: 100, width: 100, marginTop: 100
    },
    createdBy: {
        marginTop: 100
    },
    text: {
        padding: 10
    },
    logo: {width: 400, height: 400, resizeMode: 'contain'}

});
export default styles;

