import React, { Component } from 'react';
import { View, Text} from 'react-native';
import styles from './ItemViewStyle';
import { TextView } from 'app/Component'

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
                        <Text style={styles.nameStyle}>{item.subject}</Text>
                        {
                            showFullMsg ?
                            <TextView onPress={this.showFullText} style={styles.textStyle}>{item.message}</TextView>
                            :
                            <TextView numberOfLines={2} onPress={this.showFullText} style={styles.textStyle}>{item.message}</TextView>
                        }
                    </View>
                </View>
            </View>
        )
    }
}
