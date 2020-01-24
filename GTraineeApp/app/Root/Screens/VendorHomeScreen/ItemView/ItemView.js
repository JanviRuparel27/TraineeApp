import React, { Component } from 'react';
import { View, Text} from 'react-native';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'
import {Badge, ListItem , Right, Body} from 'native-base';
import { dateFormate } from '../../../../Constants';
import { Image, TouchableOpacity } from 'react-native';
import { right } from 'app/assets';


export default class ItemView extends Component {

    render() {
        const { item} = this.props;
        return (
            <ListItem style={styles.container} >
                <View style={styles.mainView}>
                    <View style={styles.textView}>
                        <TextView style={styles.nameStyle}>{'Name: '}{item.user}</TextView>
                        <TextView  style={styles.textStyle}>{'Time: '}{item.time}</TextView>

                    </View>
                </View>
            </ListItem>
        )
    }
}
