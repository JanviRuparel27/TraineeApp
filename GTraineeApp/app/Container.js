import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noInternetScreenStart, noInternetScreenStop, noInternetConnected } from "app/store/global";
import Navigation from "./Navigation";
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import { Loader, NoInternet } from "app/Component";
import { Container } from 'native-base';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { dateFormate } from './Constants';

class Containers extends Component {
    _subscription: NetInfoSubscription | null = null;

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
        }

    }

    async componentDidMount() {
        this.checkPermission();
        // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        this._subscription = NetInfo.addEventListener(state => {
            this.setState({
                isConnected: state.isConnected
            })
            this.props.noInternetConnected(state.isConnected)
        });

        let todayDate = await AsyncStorage.getItem('TodaysDate');

        if(todayDate !== null){
            if(todayDate !== dateFormate(new Date())){
                AsyncStorage.removeItem('Breakfast')
                AsyncStorage.removeItem('BreakfastTime')
                AsyncStorage.removeItem('Tea1')
                AsyncStorage.removeItem('Tea1Time')
                AsyncStorage.removeItem('Tea2')
                AsyncStorage.removeItem('Tea2Time')
            }
        }
        else{
            AsyncStorage.setItem('TodaysDate' , dateFormate(new Date()));
        }
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        //console.log('fcmToken')
        //console.log(fcmToken)
        // if (this.validatePhoneNumber()) {
        //     firebase
        //       .auth()
        //       .signInWithPhoneNumber(this.state.phone)
        //       .then(confirmResult => {
        //         this.setState({ confirmResult })
        //         alert(JSON.stringify(confirmResult))
        //       })
        //       .catch(error => {
        //         alert(error.message)
        
        //         console.log(error)
        //       })
        //   } else {
        //     alert('Invalid Phone Number')
        //   }
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

   

    render() {
        return (
            <Container>
                <Navigation />
                <NoInternet isInternetConnected={!this.props.isInternetConnected} onRetry={() => {
                    alert("onRetry Pressed")
                }} />
                <Loader loading={this.props.globalLoding} />
            </Container>
        );
    }
}

const mapActionCreators = { noInternetScreenStop, noInternetScreenStart, noInternetConnected };

const mapStateToProps = state => {
    return {
        isInternetConnected: state.global.isInternetConnected,
        globalLoding: state.global.loading
    };
};

export default connect(
    mapStateToProps,
    mapActionCreators
)(Containers);
