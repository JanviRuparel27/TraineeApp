import React, { Component } from 'react'
import { ListItem, Body, Right } from 'native-base'
import { TextView } from 'app/Component';
import { Image, TouchableOpacity } from 'react-native';
import styles from './ItemViewStyle';
import { right } from 'app/assets';

export default class ItemView extends Component {
    render() {
        const { item, handleSelectItem } = this.props;
        return (
            <ListItem onPress={() => {
                this.props.onItemClick && this.props.onItemClick(item)
            }}>
                <Body style={styles.mainView}>
                    <TextView style={styles.innerText}>{item.document_name}</TextView>
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
