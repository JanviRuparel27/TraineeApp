import React, {Component} from 'react'
import {Card, CardItem, Body, Thumbnail, Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native'
import styles from './DashboardItemViewStyle';
import {color} from "app/Theme";
import cs from  'app/CommonStyle'
export default class DashboardItemView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                this.props.onItemClick && this.props.onItemClick(item)
            }}>
                <Card style={[styles.card]}>
                        <Thumbnail small square source={item.image} style={{tintColor: color._018CCA}}/>
                            <Text style={styles.textStyle} >{item.title}</Text>
                </Card>
            </TouchableOpacity>
        )
    }
}
