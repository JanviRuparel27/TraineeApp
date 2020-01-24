import React, {Component} from 'react'
import {Card, CardItem, Body, Thumbnail, Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native'
import styles from './BeverageItemViewStyle';
import {color} from "app/Theme";
import cs from  'app/CommonStyle'
export default class BeverageItemView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {item, selectedValue} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                this.props.onItemClick && this.props.onItemClick(item)
            }}>
                <Card 
                style={item.title == selectedValue ?styles.selectedcard :styles.card}
                >
                        <Thumbnail small square source={item.image} style={{tintColor: color._018CCA}}/>
                        <Text style={styles.textStyle} numberOfLines={1}>{item.title}</Text>

                </Card>
            </TouchableOpacity>
        )
    }
}
