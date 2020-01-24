import React, { Component } from 'react';
import {Modal, Text,  View, Alert, TouchableOpacity,Linking, Image} from 'react-native';
import {Card} from 'native-base';
import {TextView} from 'app/Component';
import styles from './UpdateStyle';

class Update extends Component {

    handleRetry = () => {
        let url = 'https://gtdh.thegatewaycorp.com/app'
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              alert("Don't know how to open URI: " + url);
            }
          });
      }
    
    render() {
        return (
            <Modal
                // animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={() => {

                }}>
                <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                    <TextView style={styles.headerMsg} >{'New version available. Please update app'}</TextView>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.handleRetry}>
                        <TextView style={styles.buttonTextStyle}>{'UPDATE APP'}</TextView>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}
export default Update;