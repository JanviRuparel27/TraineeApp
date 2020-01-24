import React from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import {right, left} from 'app/assets'
import {color} from "../../Theme";
import {TextView} from "app/Component";
const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import cs from 'app/CommonStyle'
class CalendarHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={this.props.onPressArrowLeft}
                    >
                        <Image
                            style={[styles.icon, styles.leftIcon]}
                            source={right}
                        />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <TextView style={styles.dateText}>
                            {this.props.headerData.calendarDate}
                        </TextView>
                        <TextView style={styles.dateHeaderWeek}>
                            {' (Week #)'+'10'}
                        </TextView>
                    </View>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={this.props.onPressArrowRight}
                    >
                        <Image
                            style={styles.icon}
                            source={right}
                        />
                    </TouchableOpacity>

                </View>
                <View style={cs.lines}/>
            </View>
        );
    }
}

CalendarHeaderComponent.propTypes = {
    headerData: PropTypes.object.isRequired,
    horizontal: PropTypes.bool,
    onPressArrowRight: PropTypes.func.isRequired,
    onPressArrowLeft: PropTypes.func.isRequired,
    onPressListView: PropTypes.func.isRequired,
    onPressGridView: PropTypes.func.isRequired
};

const styles = StyleSheet.create({

    container: {},
    header: {

        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between'
    },
    week: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    weekName: {
        marginTop: 2,
        marginBottom: 7,
        width: 32,
        textAlign: 'center',
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#7c7c7c'
    },
    dateText: {
        fontSize: 14,
        color: color._555555,
        alignSelf: 'center'
    },
    dateHeaderWeek: {
        fontSize: 12,
        color: color._919191,
        alignSelf: 'center'
    },
    iconContainer: {},
    leftIcon: {
        transform: [{rotate: '180deg'}]
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: color._555555
    }
});

export default CalendarHeaderComponent;
