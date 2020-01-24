import React, { Component } from 'react';
import { View, Text} from 'react-native';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'
import {Badge} from 'native-base';

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
                    </View>
                    {/* <Badge style={styles.badgeStyle}>
                        <TextView style={styles.textColor}>{item.training_status}</TextView>
                    </Badge> */}
                </View>
            </View>
        )
    }
}
