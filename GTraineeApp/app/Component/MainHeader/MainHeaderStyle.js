import {StyleSheet} from "react-native";

import {color} from "app/Theme";

const styles = StyleSheet.create({
    headerStyle: {
        flexShrink:0,
        backgroundColor: color._018CCA,
    },
    headerBody: {
        alignItems: "center",
        flex: 3,
        color:'white',
        flexDirection:'row',
         justifyContent:'center'
    },
    headerLeft: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        flexDirection: "row"
    },
    headerLeftSide: {
        width: 35,
        height: 35,
        tintColor: 'white',
        resizeMode: "contain",
    },
    headerRightSide: {
        width: 24,
        height: 24,
        tintColor: 'white',
        resizeMode: "contain"
    },
    headerBodyImage: {
        width: 100,
        height: 35,
        resizeMode: "contain"
    },
    headerBodyContent: {
        fontSize: 18,
        color: 'white',
        fontWeight: "bold"
    },
    nextButtonText: {
        fontSize: 18,
        color: color.black,
        fontWeight: "bold"
    },
    leftButton:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftButtonWhite:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    prevButtonText: {
        fontSize: 18,
        color: color.black,
    },isTimestyle:{
        padding: 5,
        flexDirection: 'row',
        backgroundColor: color._EC6BAE,
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight:-10
    }
});

export default styles;
