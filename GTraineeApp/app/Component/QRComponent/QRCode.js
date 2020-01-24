import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
} from 'react-native';

const QRCode = props => {
    const {
        loading
    } = props;
    return (
        <Modal
            visible={loading}
            transparent={false}
        >
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.50)',
                flex: 1, justifyContent: 'center', alignItems: 'center',
            }}>
                <Text>{'Hello'}</Text>
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({});
export default QRCode;
