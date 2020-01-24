import React, { Component } from 'react';
import { View, Text} from 'react-native';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'
import {Badge} from 'native-base';
import { dateFormate } from 'app/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ItemView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showFullMsg: false
        }
    }
    
    showFullText = () => {
        this.setState({showFullMsg: !this.state.showFullMsg})
    }
    render() {
        const { item } = this.props;
        const {showFullMsg} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={styles.textView}>
                        <TextView style={styles.nameStyle}>{'Training Name: '}{item.training}</TextView>
                        <TextView  style={styles.textStyle}>{'Training BatchId: '}{item.batch_id}</TextView>
                        <TextView  style={styles.textStyle}>{'Training GroupId: '}{item.group_id}</TextView>
                        <TextView  style={styles.textStyle}>{'Trainer: '}{item.trainer}</TextView>
                        <TextView  style={styles.textStyle}>{'date: '}{dateFormate(item.date)}</TextView>
                        <TextView  style={styles.textStyle}>{'Topic: '}{item.topic}</TextView>
                        <TextView  style={styles.textStyle}>{'Training time: '}{item.start_time} {'to'} {item.end_time} </TextView>
                        <View style={{flexDirection:'row' }}>
                            <TextView  style={styles.textStyle}>{'Location: '}{item.training_room}, {item.location_name == '' ? 'N/A' : item.location_name}</TextView> 
                            {
                                item.location_map == '' ? 
                                null 
                                :
                                    <TouchableOpacity style={{ paddingLeft: 20 }}
                                        onPress={() => { this.props.onItemClick && this.props.onItemClick(item.location_map) }}
                                    ><Text style={styles.touchableTextStyle}>See on map</Text></TouchableOpacity>
                            }
                        </View>
                    </View>
                    <Badge style={styles.badgeStyle}>
                        <TextView style={styles.textColor}>{item.type}</TextView>
                    </Badge>
                </View>
            </View>
        )
    }
}
