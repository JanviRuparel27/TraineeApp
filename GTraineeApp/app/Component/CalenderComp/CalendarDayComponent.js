import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import cs from 'app/CommonStyle'
import {color} from 'app/Theme'
import {TextView} from "app/Component";

const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class CalendarDayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDayPress = this.onDayPress.bind(this);
    }

    getContentStyle() {
        const {state, marking = {}, date, current} = this.props;
        const style = {
            content: {

                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#ffffff',
                backgroundColor: '#ffffff',
                marginTop: 5
            },
            text: {},
            indicator: {height: 8, width: 8, borderRadius: 4, margin: 3}

        };

        if (marking.soldOut) {
            style.text.color = '#fff';
            style.content.backgroundColor = '#e35052';
            style.content.borderRadius = 50;
        } 
        // else if (marking.blocked) {
        //     style.text.color = '#fff';
        //     style.content.backgroundColor = '#c1c2c1';
        //     style.content.borderRadius = 50;
        // }
        //  else if (state === 'disabled') {
        //     style.text.color = '#c1c2c1';
        //     style.indicator.backgroundColor = 'white'
        // } 
         else if (state === 'today' && current === date.dateString) { //&& current === date.dateString remov this based on logic require #nikhil
            style.content.borderRadius = 50;
            style.text.color = '#fff';
            style.content.backgroundColor = color._EC6BAE;
            style.content.borderRadius = 50;
            style.indicator.backgroundColor = 'red'

        } else if (current === date.dateString) {
            style.content.borderRadius = 50;
            style.text.color = '#fff';
            style.content.backgroundColor = color._EC6BAE;
        }

        return style;
    }

    getFooterTextStyle() {
        const {marking = {}} = this.props;
        const style = {
            color: 'red'
        };

        if (marking.inventory > 0) {
            style.color = '#4caf50';
        }
        return style;
    }

    getInventoryCount() {
        const {marking = {}} = this.props;
        if (typeof marking === 'object') {
            if (marking.inventory >= 0) {
                return marking.inventory;
            }
        }
        return 'NA';
    }

    onDayPress() {
        this.props.onPress && this.props.onPress(this.props.date);
    }

    render() {
        const contentStyle = this.getContentStyle();
        const {state, marking = {}, date, current} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {
                        this.props.horizontal ?
                            <TextView style={styles.weekName} numberOfLines={1}>
                                {
                                    weekDaysNames[this.props.date.weekDay]
                                }
                            </TextView>
                            :
                            null
                    }
                </View>
                <View style={contentStyle.indicator}/>
                <TouchableOpacity
                    style={[styles.content, contentStyle.content, cs.shadow]}
                    onPress={this.onDayPress}
                >
                    <TextView style={[styles.contentText, contentStyle.text]}>
                        {String(this.props.children)}
                    </TextView>
                </TouchableOpacity>
                {/*<View>*/}
                {/*    <TextView style={this.getFooterTextStyle()}>*/}
                {/*        {this.getInventoryCount()}*/}
                {/*    </TextView>*/}
                {/*</View>*/}
            </View>
        )
            ;
    }
}

CalendarDayComponent.propTypes = {
    children: PropTypes.any,
    state: PropTypes.string,
    marking: PropTypes.any,
    horizontal: PropTypes.bool,
    date: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    current: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7
    },
    weekName: {
        width: 32,
        textAlign: 'center',
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#7c7c7c'
    },
    content: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        fontSize: 18
    }
});

export default CalendarDayComponent;
