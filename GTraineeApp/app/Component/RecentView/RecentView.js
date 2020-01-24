import React from 'react'
import {Card} from 'native-base';
import {
    Animated,
    default as Easing,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import styles from './RecentViewStyle';
import cs from 'app/CommonStyle'
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {timesheet, payslip, iconClosed, iconRecentlyused} from 'app/assets'
import {showToast} from "../../Utils";

export default class RecentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            fadeIn: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
            spinValue: new Animated.Value(0)

        }
    }


    fadeIn() {
        this.state.spinValue.setValue(0)
        this.state.fadeIn.setValue(0)
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start()
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }
        ).start();
    }

    fadeOut() {
        this.state.fadeIn.setValue(1)
        this.state.spinValue.setValue(0)

        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 0,
                duration: 600,
                useNativeDriver: true
            }
        ).start(() => {
            this.setState(prevState => ({
                open: !prevState.open
            }))
        });

    }

    render() {
        this.state.spinValue.setValue(0);
        // First set up animation
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start()

// Second interpolate beginning and end values (in this case 0 and 1)
        const spinRight = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const spinLeft = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        });
        return (
            <View
                onPress={() => {
                    this.fadeOut()
                }}
            >
                <View

                    style={this.state.open ? {
                        flex: 1,
                        backgroundColor: 'rgba(77,77,77,0.62)',
                        height: hp('100%')
                    } : {flex: 1, height: hp('5%')}}>

                    <View style={styles.container}>
                        {this.state.open && <Animated.View
                            style={{
                                zIndex: 3,
                                position: 'absolute',
                                right: 10,
                                bottom: 5, opacity: this.state.fadeIn
                            }}
                        >
                            <Card style={[styles.card]}>

                                <View style={styles.innercard}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                        horizontal={true}
                                        data={["Tasksheet", "Payslips", "Tax", "News"]}
                                        renderItem={(item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.fadeOut()

                                                    }}
                                                    style={styles.appContainer}>
                                                    <View style={[styles.appHolder, cs.shadow]}>
                                                        <Image source={timesheet}
                                                               style={[{height: 25, width: 25}, cs.shadow]}/>
                                                    </View>
                                                    <Text style={styles.appName} numberOfLines={1}>{item.item}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />


                                </View>
                            </Card></Animated.View>}
                        <TouchableOpacity
                            onPress={() => {
                                if (!this.state.open) {
                                    this.setState(prevState => ({
                                        open: !prevState.open
                                    }), () => {
                                        this.fadeIn()
                                    });

                                } else {
                                    this.fadeOut();
                                }


                            }}
                            style={[cs.shadow, {
                                height: 45,
                                width: 45,
                                borderRadius: 25,
                                backgroundColor: 'black',
                                position: 'absolute',
                                right: 10,
                                bottom: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 3,
                            }]}>
                            <Animated.Image
                                style={{
                                    height: 45,
                                    width: 45,
                                    zIndex: 3,
                                    transform: [{rotate: this.state.open ? spinRight : spinLeft}]
                                }}
                                source={this.state.open ? iconClosed : iconRecentlyused}
                            />


                        </TouchableOpacity>
                    </View>


                </View></View>
        )
    }
}
