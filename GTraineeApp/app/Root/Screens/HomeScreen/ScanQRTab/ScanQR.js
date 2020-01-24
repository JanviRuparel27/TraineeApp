import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanQRStyle';
import AsyncStorage from '@react-native-community/async-storage';
import { trainingScan } from 'app/store/trainingScan';
import {NavigationEvents} from 'react-navigation';

class ScanQR extends Component {

    onSuccess = async (e) => {
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            var BatchId = await AsyncStorage.getItem('BatchId');
            var GroupId = await AsyncStorage.getItem('GroupId');
            const scanHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }
            
            const QRCodeValue = e.data.split("/")
            // console.log(BatchId,GroupId)
            // console.log(QRCodeValue[4],QRCodeValue[5])
            
            //if(QRCodeValue[4] == BatchId && QRCodeValue[5]== GroupId){
                const params = {
                    "user_id": getUserId,
                    "training_id": QRCodeValue[0],
                    "trainer_id": QRCodeValue[1],
                    "schedule_id": QRCodeValue[2],
                    "gdth_trainee_qr": QRCodeValue[3],
                    "batch_id": QRCodeValue[4],
                    "group_id": QRCodeValue[5]
                }
               // console.log(params)
            this.props.trainingScan(params, this.props, scanHeader, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        if (res.data.response.data.is_already_in == true) {
                            // alert(res.data.response.data.message)
                            Toast.show({
                                text: res.data.response.data.message,
                                position: "bottom",
                                type: "success",
                                duration: 3000
                              })
                            this.props.navigation.navigate('GeneralFeedbackScreen' , {feedbackData : params})
                        } else {
                            // alert(res.data.response.data.message)
                            Toast.show({
                                text: res.data.response.data.message,
                                position: "bottom",
                                type: "success",
                                duration: 3000
                              })
                            this.props.navigation.goBack()
                        }
                    } else {
                        alert('something went wrong')
                        this.props.navigation.goBack()
                        // this.scanner.reactivate()
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert(res.data.response.data.error)
                    this.props.navigation.goBack()
                    // this.scanner.reactivate()
                }
            })
            //}
            // else{
            //     this.props.navigation.goBack()
            //     alert('This training is not valid for you')
            // }

        } catch (error) {
            alert(error.message);
        }
    }
    renderAgain = () => {
        this.scanner.reactivate()
    }
    render() {
        return (
            <Container>
                <NavigationEvents onDidFocus={this.renderAgain} />
                <MainHeader leftIcon={left} bodyContent={'Presence Scanner'} 
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                {/* <View><Text>{'Scan QRCode'}</Text></View> */}
                <QRCodeScanner
                    ref={(node) => { this.scanner = node }}
                    onRead={this.onSuccess}
                    //cameraProps={styles.outerContainer}
                    // reactivate={true}
                //flashMode={QRCodeScanner.Constants.FlashMode.torch}

                />
            </Container>


        );
    }
}

const mapActionCreators = {
    trainingScan
};

export default connect(
    null,
    mapActionCreators
)(ScanQR);
