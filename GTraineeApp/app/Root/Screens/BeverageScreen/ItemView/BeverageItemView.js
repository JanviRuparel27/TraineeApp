import React, {Component} from 'react'
import {Card, CardItem, Body, Thumbnail, Text} from 'native-base';
import {View,Image, TouchableOpacity} from 'react-native'
import styles from './BeverageItemViewStyle';
import {color} from "app/Theme";
import cs from  'app/CommonStyle';
import {iconScanned} from "app/assets";
export default class BeverageItemView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {item, selectedValue, teatime1,tea1, tea2,teatime2} = this.props;
        return (
            // <TouchableOpacity style={styles.container} onPress={() => {
            //     this.props.onItemClick && this.props.onItemClick(item)
            // }}>
            //     <Card 
            //     style={item.title == selectedValue ?styles.selectedcard :styles.card}
            //     >
            //             <Thumbnail small square source={item.image} style={{tintColor: color._018CCA}}/>
            //             <Text style={styles.textStyle} numberOfLines={1}>{item.title}</Text>

            //     </Card>
            // </TouchableOpacity>
                
            
               item.title == tea1 ?
               <TouchableOpacity style={styles.container}>
                <Card 
                style={styles.selectedcard}
                >
                        <Thumbnail small square source={item.image} style={{tintColor: color._018CCA}}/>
                        <Text style={styles.textStyle} numberOfLines={1}>{item.title}</Text>
                        <Image source={iconScanned} style={{position:'absolute', height:200, width:200, resizeMode: 'contain'}}/>
                        <Text style={styles.textStyle1}>{teatime1}</Text>

                </Card> 
                </TouchableOpacity>
                
                :

                item.title == tea2 ?

                <TouchableOpacity style={styles.container}>
                <Card 
                style={styles.selectedcard}
                >
                        <Thumbnail small square source={item.image} style={{tintColor: color._018CCA}}/>
                        <Text style={styles.textStyle} numberOfLines={1}>{item.title}</Text>
                        <Image source={iconScanned} style={{position:'absolute', height:200, width:200, resizeMode: 'contain'}}/>
                        <Text style={styles.textStyle1}>{teatime2}</Text>

                </Card> 
                </TouchableOpacity>
                :
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
