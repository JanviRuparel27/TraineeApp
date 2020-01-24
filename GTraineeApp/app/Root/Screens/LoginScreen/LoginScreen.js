import { Image, Platform, TouchableOpacity, View, BackHandler, Alert, Modal } from "react-native";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Button, Container, Content, Footer, Spinner, Text, Toast } from "native-base";
import styles from "./LoginScreenStyle";
import { EditTextView, TextView, Loader } from "app/Component";
import { Gtrainee } from "app/assets";
import base64 from 'react-native-base64'
import { loginUser } from 'app/store/login'
import { color } from "app/Theme";
import DeviceInfo from 'react-native-device-info';
import Translater from "app/i18n";
import formValidation from '../../../Utils/InputValidation'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from "react-navigation";
import { phonenumberValidate } from "app/Constants";
import {forgotPassword} from 'app/store/forgotPassword'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            uid: '',
            error: '',
            modalVisible: false,
            phonenumber: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    handleForgotPassword = () => {

        let username = this.state.username;
        this.setModalVisible(true)
        //this.props.navigation.navigate("PinViewScreen", { otp: null })
        // this.props.forgotPassword(username, {
        //     SuccessCallback: res => {
        //         this.props.navigation.navigate("PinViewScreen", {otp: res.Data.OTP})
        //     }, FailureCallback: res => {
        //     }
        // })
    };

    componentDidMount() {
        // DeviceInfo.getUniqueId().then(uniqueId => {

        //     this.setState({uid: uniqueId})
        // });
        this.setState({ uid: DeviceInfo.getUniqueId() })
    }

    validateForm() {
        let errors = [];
        let formIsValid = true;
        const emailValidation = formValidation.validateEmail(this.state.username);

        if (this.state.username === '' || this.state.password === '') {
            formIsValid = false;
            errors = 'Please enter Values';
        }
        else if (!emailValidation) {
            formIsValid = false;
            errors = 'Please enter valid email address';
        }

        this.setState({
            error: errors
        });

        return formIsValid;
    }

    handleLoginSubmit = async () => {
        const token = "f2iMxgFjCjg:APA91bGxI52jMgTMnARrckA6nzswHE6URbTELnf4dMmEWWFD3oADQoC5JCyEBoQVQY_mrtS44su8t3NoBOu32cAuR3c4JlEHNIYQAjx3WSnE2xKUZIYhad0wqeY7PRUzBWSl6OZRF6Bu"
        if (this.validateForm()) {
            let params = {
                device_id: this.state.uid,
                provider: Platform.OS,
                email: this.state.username,
                password: this.state.password,
                UDID: token
            };
            this.props.loginUser(params, this.props, {
                SuccessCallback: res => {
                    // console.log(res)
                    if (res.data.response) {
                        if (res.data.response.data.role == 'Trainee') {
                            //console.log(res.data.response.data);
                            AsyncStorage.setItem('Token', res.data.response.data.token)
                            AsyncStorage.setItem('LoginId', JSON.stringify(res.data.response.data.gtl_login_id))
                            AsyncStorage.setItem('EmployeeId', JSON.stringify(res.data.response.data.gtl_employee_id))
                            AsyncStorage.setItem('UserId', JSON.stringify(res.data.response.data.id))
                            AsyncStorage.setItem('Group', res.data.response.data.group)
                            AsyncStorage.setItem('Batch', res.data.response.data.batch)
                            AsyncStorage.setItem('GroupId', JSON.stringify(res.data.response.data.group_id))
                            AsyncStorage.setItem('BatchId', JSON.stringify(res.data.response.data.batch_id))
                            AsyncStorage.setItem('UserEmail', res.data.response.data.email)
                            AsyncStorage.setItem('UserName', res.data.response.data.first_name + " " + res.data.response.data.last_name)
                            AsyncStorage.setItem('Role', res.data.response.data.role)
                            // this.props.navigation.navigate("HomeScreen")
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                        else if (res.data.response.data.role == 'Vendor') {
                            AsyncStorage.setItem('Token', res.data.response.data.token)
                            AsyncStorage.setItem('LoginId', JSON.stringify(res.data.response.data.gtl_login_id))
                            AsyncStorage.setItem('Role', res.data.response.data.role)
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'VendorHomeScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                        else {
                            alert('Only Trainee User can login')
                        }
                    }

                }, FailureCallback: res => {
                    //console.log(res)
                    if (res.data.response.data.error) {
                        alert(res.data.response.data.error)
                    }
                }
            })
        } else {
            setTimeout(() => {
                alert(this.state.error)
            }, 300)
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    handlePopupSubmit = async() => {
        //alert(this.state.phonenumber)
        //this.setModalVisible(!this.state.modalVisible)
        const validPhoneNumber = phonenumberValidate(this.state.phonenumber)
        if(validPhoneNumber){
            //alert("success")
            this.setModalVisible(!this.state.modalVisible)
            const forgotPassHeader = {
                'Content-Type': 'application/json'
            }
            const params = {
                "phone":this.state.phonenumber
            }
            this.props.forgotPassword(params, this.props, forgotPassHeader,{
                SuccessCallback: res => {
                    //console.log(res)
                   
                    if(res.data.response.data){
                        AsyncStorage.setItem('Token', res.data.response.data.token)
                        AsyncStorage.setItem('UserId', JSON.stringify(res.data.response.data.id))
                        AsyncStorage.setItem('UserEmail', res.data.response.data.email)
                        this.setState({
                            phonenumber:''
                        })
                    this.props.navigation.navigate("PinViewScreen")
                    }else{
                       alert('something went wrong')
                    }
                },
                FailureCallback: res => {
                    alert(JSON.stringify(res.data.response.data))
                }
            })

            // this.setState({
            //     phonenumber:''
            // })
            // this.props.navigation.navigate("PinViewScreen")
        }else{
            alert("Enter mobile number")
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.container1}>
                        <Image style={styles.imageStyle} source={Gtrainee} />
                    </View>
                    <View style={{ padding: 30, marginTop: 40 }}>

                        <EditTextView label={"EMAILID"} value={this.state.username} onChangeText={(text) => {
                            this.setState({ username: text })
                        }} />
                        <EditTextView label={'PASSWORD'} value={this.state.password} secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({ password: text })
                            }} />
                        <TouchableOpacity onPress={this.handleForgotPassword} style={{ alignItems: 'flex-end' }}>
                            <TextView style={styles.rightTextStyle}>{'Forgot Password?'}</TextView>
                        </TouchableOpacity>

                        {this.props.loading ? <Loader loading={this.props.loading} /> :
                            <Button onPress={this.handleLoginSubmit} full rounded
                                style={styles.buttonStyle}><TextView
                                    style={styles.buttonTextStyle}> {"Login"} </TextView></Button>}
                    </View>
                </Content>

                {/* Phone number Popup  start */}

                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.modalStyle}>
                            <View>
                                <TextView style={styles.modalTextStyle}>{'Enter your mobile number'}</TextView>
                                <EditTextView keyboardType="number-pad" label={"PhONE NUMBER"} value={this.state.phonenumber} onChangeText={(text) => {
                                    this.setState({ phonenumber: text })
                                }} />
                                 <Button onPress={this.handlePopupSubmit} full rounded
                                    style={styles.modalButtonStyle}>
                                        <TextView style={styles.buttonTextStyle}> {"Submit"} </TextView>
                                 </Button>
                                 <Button onPress={()=>this.setModalVisible(!this.state.modalVisible)} full rounded
                                    style={styles.modalButtonStyle}>
                                        <TextView style={styles.buttonTextStyle}> {"Cancel"} </TextView>
                                 </Button>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Phone number Popup end */}

                <Footer style={styles.footerStyle}>
                    <Text style={styles.fontStyle}>{'Copyright ©TheGatewayCorp'}</Text>
                </Footer>
            </Container>

        );
    }
}

const mapActionCreators = { loginUser, forgotPassword };

const mapStateToProps = state => {
    return {
        loading: state.login.fetching
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(LoginScreen);
