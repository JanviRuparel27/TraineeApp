import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

const Loader = props => {
    const {
        loading
    } = props;
    return (
        <Modal
            visible={loading}
            transparent={true}
        >
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.50)',
                flex: 1, justifyContent: 'center', alignItems: 'center',
            }}>

                <ActivityIndicator size="large" color="#ffffff"/></View>

        </Modal>
    )
}
const styles = StyleSheet.create({});
export default Loader;
