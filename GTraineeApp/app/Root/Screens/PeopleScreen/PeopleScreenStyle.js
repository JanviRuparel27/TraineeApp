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
    indicatorContainer: {
        flex: 1,
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white'
    },
    indicatorText: {color: color._555555, textAlign: 'center'},
    indicatorSelectedText: {
        color: color._018CCA, textAlign: 'center'
    },
    

});
export default styles;

