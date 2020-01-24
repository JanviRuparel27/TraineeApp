import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base'
import { iconWhatsapp, iconSkype, iconMailId, iconTelephone } from 'app/assets';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'

export default class ItemView extends Component {

    render() {
        const { item, handleCallClick, handleMailIDClick } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={styles.textView}>
                        <Text style={styles.nameStyle}>{item.name} <TextView style={styles.textStyle1}>{`(${item.profile})`} </TextView> </Text>
                        <View style={{flexDirection:'row'}}>
                            <TextView style={styles.textStyle2}>Contact For:</TextView>
                            <TextView style={styles.textStyle1}>{item.can_contact == '' ? 'N/A' : item.can_contact} </TextView>
                        </View>
                        {/* <TextView style={styles.textStyle2}>Contact For: <TextView style={styles.textStyle1}>{item.can_contact} </TextView> </TextView> */}
                    </View>
                    <View style={styles.imageView}>
                        <TouchableOpacity onPress={(e) => handleMailIDClick(item)}>
                            <Image style={styles.image} source={iconMailId} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => handleCallClick(item.phone)}>
                            <Image style={styles.image} source={iconTelephone} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
