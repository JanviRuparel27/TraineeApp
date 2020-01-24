import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'
import {Badge, ListItem, Right, Body} from 'native-base';
import {right} from 'app/assets'
import { dateFormate } from 'app/Constants';

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
        const { item, selectedItem} = this.props;
        const {showFullMsg} = this.state;
        return (
            <ListItem style={styles.container} 
            onPress={() => {
                selectedItem && selectedItem(item)
            }}
            >
                <Body style={styles.mainView}>
                    <View style={styles.textView}>
                        <TextView style={styles.nameStyle}>{'Training Name: '}{item.training}</TextView>
                        <TextView  style={styles.textStyle}>{'Training Created At: '}{dateFormate(item.start_date)}</TextView>
                        {/* <TextView  style={styles.textStyle}>{'Training Updated At: '}{dateFormate(item.updated_at)}</TextView> */}
                    </View>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => {
                        selectedItem && selectedItem(item)
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
