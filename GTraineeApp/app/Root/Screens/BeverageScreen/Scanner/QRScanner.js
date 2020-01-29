import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './QRScannerStyle';
import { selectedBeverage } from 'app/store/beverage'
import AsyncStorage from '@react-native-community/async-storage';
import base64 from "react-native-base64";
import { selectedBreakfast } from 'app/store/breakfast';
import { showToast, ToastType } from "../../../../Utils";

class QRScanner extends Component {

    onSuccess = async (e) => {
        var paramsData = this.props.navigation.state.params
        if (this.props.navigation.state.params == null) {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            //let tokendata = String(e.data).trim(); 
            if (e.data == 'BREAKFAST|TEA|SNACK') {
                const params = {
                    "user_id": getUserId,
                    "gdth_trainee_qr": e.data
                }
                const breakfastHeader = {
                    'Authorization': `Bearer ${getToken}`,
                    'Content-Type': 'application/json'
                }
                this.props.selectedBreakfast(params, this.props, breakfastHeader, {
                    SuccessCallback: res => {
                        //console.log(res)
                        if (res.data) {
                            if (res.data.response.data.message) {
                                //alert("Taken Breakfast successfully!")
                                showToast(res.data.response.data.message, ToastType.SUCCESS)
                                this.props.navigation.navigate('HomeScreen')
                            } else {
                                //alert(res.data.response.data.error)
                                showToast(res.data.response.data.error, ToastType.DANGER)
                                this.props.navigation.navigate('HomeScreen')
                            }
                        } else {
                            alert('something went wrong')
                            this.props.navigation.navigate('HomeScreen')
                        }
                    },
                    FailureCallback: res => {
                        //alert("Something went wrong! Please try again")
                        //alert(res.data.response.data.error)
                        //alert(res.data.Data)
                        showToast(res.data.response.data.error, ToastType.DANGER)
                        this.props.navigation.navigate('BeverageScreen')
                    }
                })
            } else {
                alert("Something went wrong! Please try again")
                this.props.navigation.navigate('BeverageScreen')
                return
            }
        }
        else {
            if (paramsData.data.IsTea == 1) {
                if (e.data == 'BREAKFAST|TEA|SNACK') {
                    var EmployeeId = await AsyncStorage.getItem('EmployeeId');
                    var baseEmpId = base64.encode(EmployeeId)
                    // var pass = await AsyncStorage.getItem('Password');
                    const beverageHeader = {
                        'Content-Type': 'application/json',
                        'Authorization': `basic ${baseEmpId}`
                    }
                    this.props.selectedBeverage(paramsData.data, this.props, beverageHeader, {
                        SuccessCallback: res => {
                            //console.log(res)
                            if (res.data) {
                                let start = new Date();
                                let hours = start.getHours(), minutes = start.getMinutes(), AMPM = ""
                                if (hours > 12) {
                                    AMPM = "PM"
                                } else {
                                    AMPM = "AM"
                                }
                                let time = hours + ":" + minutes + " " + AMPM
                                if (paramsData.data.Slot == 1) {
                                    AsyncStorage.setItem('Tea1', 'Tea/Coffee 1');
                                    AsyncStorage.setItem('Tea1Time', time);
                                }
                                else if (paramsData.data.Slot == 2) {
                                    AsyncStorage.setItem('Tea2', 'Tea/Coffee 2');
                                    AsyncStorage.setItem('Tea2Time', time);
                                }
                                alert("QRCode Scan successfully")
                                this.props.navigation.navigate('HomeScreen')
                            } else {
                                alert('something went wrong')
                                this.props.navigation.navigate('HomeScreen')
                            }
                        },
                        FailureCallback: res => {
                            //alert("Sorry! You have already taken Tea/Coffee for this slot!")
                            //alert(res.data.Data)
                            showToast("Sorry! You have already taken Tea/Coffee for this slot!", ToastType.DANGER)
                            this.props.navigation.navigate('BeverageScreen')
                        }
                    })
                }
                else {
                    alert("Something went wrong! Please try again")
                    this.props.navigation.navigate('BeverageScreen')
                    return
                }
            }
            else if (paramsData.data.IsSnacks == 1) {
                if (e.data == 'BREAKFAST|TEA|SNACK') {
                    var EmployeeId = await AsyncStorage.getItem('EmployeeId');
                    var baseEmpId = base64.encode(EmployeeId)
                    // var pass = await AsyncStorage.getItem('Password');
                    const beverageHeader = {
                        'Content-Type': 'application/json',
                        'Authorization': `basic ${baseEmpId}`
                    }
                    this.props.selectedBeverage(paramsData.data, this.props, beverageHeader, {
                        SuccessCallback: res => {
                            //console.log(res)
                            if (res.data) {
                                alert("QRCode Scan successfully")
                                this.props.navigation.navigate('HomeScreen')
                            } else {
                                alert('something went wrong')
                                this.props.navigation.navigate('HomeScreen')
                            }
                        },
                        FailureCallback: res => {
                            //alert("Something went wrong! Please try again")
                            showToast("Something went wrong! Please try again later", ToastType.DANGER)
                            this.props.navigation.navigate('BeverageScreen')
                        }
                    })
                }
                else {
                    alert("Something went wrong! Please try again later")
                    this.props.navigation.navigate('BeverageScreen')
                    return
                }

            }
            else {
                alert('Something went wrong')
                this.props.navigation.navigate('BeverageScreen')
            }
        }
    }
    // onSuccess = async (e) => {
    //     //console.log("success", e.data)
    //     if (this.props.navigation.state.params == null) {
    //         //console.log("in breakfast")
    //         var getToken = await AsyncStorage.getItem('Token');
    //         var getUserId = await AsyncStorage.getItem('UserId');
    //         //let tokendata = String(e.data).trim(); 
    //         if (e.data == '"test-break-fast-code"') {                
    //             const params = {
    //                 "user_id": getUserId,
    //                 "gdth_trainee_qr": e.data
    //             }
    //             const breakfastHeader = {
    //                 'Authorization': `Bearer ${getToken}`,
    //                 'Content-Type': 'application/json'
    //             }
    //             this.props.selectedBreakfast(params, this.props, breakfastHeader, {
    //                 SuccessCallback: res => {
    //                     //console.log(res)
    //                     if (res.data) {
    //                         if (res.data.response.data.message) {
    //                             alert("Taken Breakfast successfully!")
    //                             this.props.navigation.navigate('HomeScreen')
    //                         } else {
    //                             alert(res.data.response.data.error)
    //                             this.props.navigation.navigate('HomeScreen')
    //                         }
    //                     } else {
    //                         alert('something went wrong')
    //                         this.props.navigation.navigate('HomeScreen')
    //                     }
    //                 },
    //                 FailureCallback: res => {
    //                     //alert("Something went wrong! Please try again")
    //                     alert(res.data.response.data.error)
    //                     //alert(res.data.Data)
    //                     this.props.navigation.navigate('BeverageScreen')
    //                 }
    //             })
    //         } else {
    //             alert("Something went wrong! Please try again")
    //             this.props.navigation.navigate('BeverageScreen')
    //             return
    //         }
    //     } else {
    //         //console.log('in else')
    //         var paramsData = this.props.navigation.state.params
    //         // if (e.data == "TEA") {
    //         //     console.log(paramsData.data.IsTea)
    //         //     alert("yes")
    //         // }
    //         if (e.data == "TEA") {
    //            // console.log(paramsData.data.IsTea)
    //             if (paramsData.data.IsTea == 1) {
    //                // console.log(paramsData.data.IsTea)
    //                 // var paramsData = this.props.navigation.state.params
    //                 // alert(JSON.stringify(this.props.navigation.state.params))
    //                 var EmployeeId = await AsyncStorage.getItem('EmployeeId');
    //                 var baseEmpId = base64.encode(EmployeeId)
    //                 // var pass = await AsyncStorage.getItem('Password');
    //                 const beverageHeader = {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `basic ${baseEmpId}`
    //                 }
    //                 // alert(JSON.stringify(beverageHeader))
    //                 this.props.selectedBeverage(paramsData.data, this.props, beverageHeader, {
    //                     SuccessCallback: res => {
    //                         //console.log(res)
    //                         if (res.data) {
    //                             alert("QRCodeScan successfully")
    //                             this.props.navigation.navigate('HomeScreen')
    //                         } else {
    //                             alert('something went wrong')
    //                             this.props.navigation.navigate('HomeScreen')
    //                         }
    //                     },
    //                     FailureCallback: res => {
    //                         alert("Sorry! You have already taken Tea/Coffee for this slot!")
    //                         //alert(res.data.Data)
    //                         this.props.navigation.navigate('BeverageScreen')
    //                     }
    //                 })
    //             } else {
    //                 //console.log('Invalid')
    //                 alert("Invalid Scan Value")
    //                 this.props.navigation.navigate('BeverageScreen')
    //             }
    //         } else if(e.data == 'BREAKFAST|TEA|SNACK') {
    //            // console.log('paramsData.data')
    //             if (paramsData.data.IsSnacks == 1) {
    //                 //console.log('SNACKS')
    //                 //var paramsData = this.props.navigation.state.params
    //                 // alert(JSON.stringify(this.props.navigation.state.params))
    //                 var EmployeeId = await AsyncStorage.getItem('EmployeeId');
    //                 var baseEmpId = base64.encode(EmployeeId)
    //                 // var pass = await AsyncStorage.getItem('Password');
    //                 const beverageHeader = {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `basic ${baseEmpId}`
    //                 }
    //                 // alert(JSON.stringify(beverageHeader))
    //                 this.props.selectedBeverage(paramsData.data, this.props, beverageHeader, {
    //                     SuccessCallback: res => {
    //                         //console.log(res)
    //                         if (res.data) {
    //                             alert("QRCodeScan successfully")
    //                             this.props.navigation.navigate('HomeScreen')
    //                         } else {
    //                             alert('something went wrong')
    //                             this.props.navigation.navigate('HomeScreen')
    //                         }
    //                     },
    //                     FailureCallback: res => {
    //                         alert("Sorry! You have already taken Tea/Coffee for this slot!")
    //                         //alert(res.data.Data)
    //                         this.props.navigation.navigate('BeverageScreen')
    //                     }
    //                 })
    //             } else {
    //                // console.log("invalid")
    //                 alert("Invalid Scan Value")
    //                 this.props.navigation.navigate('BeverageScreen')
    //             }
    //         } else {
    //             alert('something went wrong')
    //             this.props.navigation.navigate('BeverageScreen')
    //         }
    //     }
    // }

    render() {
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Scan QR Code'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                {/* <View><Text>{'Scan QRCode'}</Text></View> */}
                {/* <View style={styles.container}> */}
                <QRCodeScanner
                    onRead={this.onSuccess}
                //cameraProps={styles.outerContainer}
                //flashMode={QRCodeScanner.Constants.FlashMode.torch}

                />
                {/* </View> */}
            </Container>


        );
    }
}



const mapActionCreators = {
    selectedBeverage,
    selectedBreakfast
};

const mapStateToProps = state => {
    return {
        beverageMSG: state.beverage.beverageData
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(QRScanner);