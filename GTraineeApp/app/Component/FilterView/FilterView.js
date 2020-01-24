import React from 'react'
import {Card} from 'native-base';
import {Animated, default as Easing, Image, TouchableOpacity, View} from 'react-native'
import styles from './FilterViewStyle';
import cs from 'app/CommonStyle'
import {iconCloseFilter, iconFilter} from 'app/assets'
import {TextView} from "app/Component";

export default class FilterView extends React.Component {
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
        ).start(()=>{
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
            outputRange: [ '360deg','0deg']
        });
        return (
            <View>
                <View >
                    {this.state.open && <Animated.View
                        style={{opacity: this.state.fadeIn}}
                    ><Card style={[styles.card, cs.shadow]}>

                        <View style={styles.innercard}>

                            <TextView style={styles.textHeader}>{'SORT BY'}</TextView>
                            <View style={cs.lines}/>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState(prevState => ({
                                        open: !prevState.open
                                    }))
                                    this.props.onFilterApply && this.props.onFilterApply(1)
                                }}
                            >
                                <TextView style={styles.textItem}>{'Location City'}</TextView></TouchableOpacity>

                            <View style={cs.lines}/>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState(prevState => ({
                                        open: !prevState.open
                                    }))
                                    this.props.onFilterApply && this.props.onFilterApply(2)
                                }}
                            >
                                <TextView style={styles.textItem}>{'Designation & dept.'}</TextView></TouchableOpacity>


                            <View style={styles.textItem}/>

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
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'white',
                            position: 'absolute',
                            right: -25,
                            bottom: -25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex:3
                        }]}>
                        <Animated.Image
                            style={{height: 55, width: 55, zIndex: 3, transform: [{rotate: this.state.open?spinRight:spinLeft}]}}
                            source={this.state.open ? iconCloseFilter : iconFilter}/>

                        {this.state.open && <Animated.View style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'white',
                            position: 'absolute',
                            left: -2,
                            top: -2
                        }}/>}

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
