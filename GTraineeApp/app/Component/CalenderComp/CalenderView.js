import {Text, View, TouchableOpacity, Image} from "react-native";
import React, {Component} from "react";
// import {Calendar} from 'app/nodeModules/react-native-toggle-calendar';
import { Calendar } from 'react-native-toggle-calendar';
import CalendarDayComponent from "./CalendarDayComponent"
import CalendarHeaderComponent from "./CalendarHeaderComponent"
import cs from 'app/CommonStyle'
import {right} from 'app/assets'
import moment from "moment";

let calendarDate = moment();
export default class CalenderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarDate: calendarDate.format('YYYY-MM-DD'),
            horizontal: true
        }
        this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
        this.onPressArrowRight = this.onPressArrowRight.bind(this);
        this.onPressListView = this.onPressListView.bind(this);
        this.onPressGridView = this.onPressGridView.bind(this);
        this.onDayPress = this.onDayPress.bind(this);
    }

    onPressArrowLeft() {
        calendarDate = calendarDate.add(-1, 'week');
        this.updateCalendarDate();
    }

    onPressArrowRight() {
        calendarDate = calendarDate.add(1, 'week');
        this.updateCalendarDate();
    }

    onPressListView() {
        this.setState({horizontal: true});
    }

    onPressGridView() {
        this.setState({horizontal: false});
    }

    onDayPress(date) {
        calendarDate = moment(date.dateString);
        this.setState({horizontal: true})
        this.updateCalendarDate();
        this.props.onDayPress && this.props.onDayPress(date)
    }


    updateCalendarDate() {
        this.setState({
            calendarDate: calendarDate.format('YYYY-MM-DD')
        });
    }

    render() {
        const {markedDates, onDayPress} = this.props
        return (
            <View style={{flex: 1}}>
                <Calendar
                     // Hide day names. Default = false
                     hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    current={this.state.calendarDate}
                    dayComponent={CalendarDayComponent}
                    calendarHeaderComponent={CalendarHeaderComponent}
                    headerData={{
                        calendarDate: calendarDate.format('MMMM YYYY')
                    }}
                    //maxDate={new Date()}
                    style={{paddingLeft: 0, paddingRight: 0}}
                    onPressArrowLeft={this.onPressArrowLeft}
                    onPressArrowRight={this.onPressArrowRight}
                    onPressListView={this.onPressListView}
                    onPressGridView={this.onPressGridView}
                    markedDates={markedDates}
                    horizontal={this.state.horizontal}
                    onDayPress={this.onDayPress}
                />

                <TouchableOpacity
                    onPress={() => {
                        this.setState({horizontal: !this.state.horizontal})
                    }}
                    style={{paddingLeft: 20, paddingRight: 20, alignSelf: 'center'}}><Image source={right}
                                                                                            style={this.state.horizontal ? {
                                                                                                tintColor: 'gray',
                                                                                                height: 24,
                                                                                                width: 24,
                                                                                                transform: [{rotate: '90deg'}]
                                                                                            } : {
                                                                                                tintColor: 'gray',
                                                                                                height: 24,
                                                                                                width: 24,
                                                                                                transform: [{rotate: '270deg'}]
                                                                                            }}
                /></TouchableOpacity>
                <View style={cs.lines}/>
            </View>
        );
    }
}

