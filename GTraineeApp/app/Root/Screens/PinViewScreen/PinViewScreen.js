import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { View, Text, Platform } from "react-native";
import { TextView } from 'app/Component';
import styles from './PinViewSceenStyle';
import PinView from 'app/Component/PinView';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import { Loader } from "app/Component";

class PinViewScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            confirmResult:null,
            isLoading:false
        }
    }
    
   async componentDidMount(){
    // if(Platform.OS === 'android'){
        var UserMobNumber = await AsyncStorage.getItem('UserMobNumber')
        //console.log(UserMobNumber)
        firebase.auth().signInWithPhoneNumber(UserMobNumber)
        .then(confirmResult => 
            {
                //console.log(confirmResult)
            this.setState({
            confirmResult:confirmResult
            })
            }
        )
        .catch(error => { alert(error.message) })
    // }
  
   }
    handleOtp = async(otp) => {
        // var UserMobNumber = await AsyncStorage.getItem('UserMobNumber')
        // alert(UserMobNumber)
        // if(Platform.OS === 'android'){
        this.setState({
            isLoading:true
        })
        if(this.state.confirmResult!=null){
            this.state.confirmResult.confirm(otp)
                    .then(user => {
                        //alert('opt is true')
                        this.setState({
                            isLoading:false
                        })
                        this.props.navigation.navigate('ChangePasswordScreen', { "isForgot": true })
                    }
                    )
                .catch(error => {
                    this.setState({
                        isLoading:false
                    })
                    alert('OTP is not valid')
                })
        }
        //this.props.navigation.navigate('ChangePasswordScreen', { "isForgot": true })
        // }
    }
    render() {
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Verify PIN'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <Content>
                    <View style={styles.container}>
                        <TextView style={styles.textColor}>{'Enter'} <TextView
                            style={styles.textColor1}>{'6'}</TextView> {'Digit PIN'} </TextView>
                    </View>
                    <View>
                        <PinView handleOtp={this.handleOtp} navigation={this.props.navigation} />
                    </View>

                </Content>
                <Loader loading={this.state.isLoading} />
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(PinViewScreen);
