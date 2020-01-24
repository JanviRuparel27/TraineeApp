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
        const { item, selectedItem} = this.props;
        return (
            <ListItem style={styles.container} 
            onPress={() => {
                this.props.onItemClick && this.props.onItemClick(item)
            }}
            >
                <Body style={styles.mainView}>
                    <View style={styles.textView}>
                        <TextView style={styles.nameStyle}>{'Training Name: '}{item.training}</TextView>
                        {/* <TextView  style={styles.textStyle}>{'Training Created At: '}{dateFormate(item.created_at)}</TextView> */}
                        <TextView  style={styles.textStyle}>{'Training Created At: '}{dateFormate(item.start_date)}</TextView>

                    </View>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => {
                        this.props.onItemClick && this.props.onItemClick(item)
                    }}>
                        <Image
                            style={styles.rightimageStyle}
                            source={right}
                        />
                    </TouchableOpacity>
                </Right>
            </ListItem>
        )
    }
}
