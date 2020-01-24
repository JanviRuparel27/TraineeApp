import {TouchableOpacity, Image, SafeAreaView, View, TextInput, Platform} from "react-native";
import {connect} from "react-redux";
import React, {Component} from "react";
import {Text, Container, Content, Header, Icon, Button, Title, Footer, Left, Right, Body, FooterTab} from "native-base";
import styles from "./ChangePasswordScreenStyle";
import {EditTextView, MainHeader, TextView,Loader} from "app/Component";
import {left, splashlogo, Gtrainee} from "app/assets";
import {ToastType, showToast} from "app/Utils";
import base64 from "react-native-base64";
import {changePass} from "app/store/changePass";
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from "react-navigation";

class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isVisible: false,
            UserId:1812
        }
    }

    componentDidMount() {
        // let isvisible = this.props.navigation.getParam("isVisible", false);
        // this.setState({isVisible: isvisible})
        // SessionManager.getValueForKey(SesstionKey.USERS).then((value) => {
        //     let j = JSON.parse(value);
        //
        //     this.setState({
        //         UserId: j.UserId
        //     })
        // });
    }

    handleChangePassSubmit = async() => {
        // if (this.state.newPassword != this.state.confirmPassword) {
        // }
        // alert("yes")
        if(this.state.newPassword == '' || this.state.oldPassword == ''){
            alert('All fields are required')
        }
        else{
            // alert(this.state.newPassword+ " "+ this.state.oldPassword)
            var getUserEmail = await AsyncStorage.getItem('UserEmail');
            var getToken = await AsyncStorage.getItem('Token');
            var params= {
                "email": getUserEmail,
                "password": this.state.oldPassword,
                "new_password": this.state.newPassword
            }
            const ChangePassHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type':'application/json'
            }
            this.props.changePass(params, this.props, ChangePassHeader, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        if(res.data.response.data.message){
                            AsyncStorage.setItem('Token' , res.data.response.data.token)
                            alert(res.data.response.data.message)
                            // this.props.navigation.navigate('HomeScreen')
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction); 
                        }else{
                            alert(res.data.response.data.error)
                            this.props.navigation.navigate('HomeScreen')
                        }
                    } else {
                        alert('something went wrong')
                        this.props.navigation.navigate('HomeScreen')
                    }
                },
                FailureCallback: res => {
                    //alert("Something went wrong! Please try again")
                    alert(res.data.response.data.error)
                    //alert(res.data.Data)
                    // this.props.navigation.navigate('BeverageScreen')
                }
            })
        }
    }
    handleLoginSubmit = () => {
        this.props.navigation.navigate("HomeScreen")
    }

    render() {
        const {isVisible} = this.state;
        return (
            <Container>
               <MainHeader
                    bodyContent={'Change Password'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                    // theme={'white'} leftText={"Back"} headerStyle={{backgroundColor: 'white'}}
                    leftIcon={left}
                    />
                <Content>
                    <View style={styles.container1}>
                        <Image style={styles.imageStyle} source={Gtrainee}/>
                    </View>
                    <View style={{padding: 30, marginTop: 40}}>
                        <EditTextView label={'CURRENT PASSWORD'} value={this.state.oldPassword}
                                                    secureTextEntry={true}
                                                    onChangeText={(text) => {
                                                        this.setState({oldPassword: text})
                                                    }}/>
                        
                        <EditTextView label={'NEW PASSWORD'} value={this.state.newPassword} secureTextEntry={true}
                                      onChangeText={(text) => {
                                          this.setState({newPassword: text})
                                      }}/>
                        {/* <EditTextView label={'CONFIRM PASSWORD'} value={this.state.confirmPassword}
                                      secureTextEntry={true}
                                      onChangeText={(text) => {
                                          this.setState({confirmPassword: text})
                                      }}/> */}

                        <Button onPress={this.handleChangePassSubmit} full rounded
                                style={styles.buttonStyle}><TextView
                            style={styles.buttonTextStyle}> {'Reset Password'} </TextView></Button>
                    </View>

                </Content>
                <Footer style={styles.footerStyle}>
                    <Text style={styles.fontStyle}>{'Copyright ©TheGatewayCorp'}</Text>
                </Footer>
                <Loader loading={this.props.globalLoding } />
            </Container>

        );
    }
}

const mapActionCreators = {
    changePass
};

const mapStateToProps = state => {
    return {
        globalLoding: state.global.loading
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(ChangePasswordScreen);
