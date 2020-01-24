import React, {Component} from "react";
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {Image, View, Platform, Alert, Linking} from 'react-native'
import {Gtrainee} from "app/assets";
import styles from "./SplashScreenStyle";
import {SessionManager} from "react-native-gtlcomponent";
import {SesstionKey} from "app/Constants";
import Translater from "app/i18n/SyncTranslate";
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {getVersionValue} from 'app/store/version';
import Update from "app/Component/Update";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdate:false
        }
    }


    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    checkLogin = async() => {
        Translater.setConfig("en");
        const data = await this.performTimeConsumingTask();
        const token = await AsyncStorage.getItem('Token');
        const Role = await AsyncStorage.getItem('Role');

        if (data !== null) {
            try {
                if (token) {
                        if(Role == 'Trainee'){
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction); 
                        }
                        else if(Role == 'Vendor'){
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'VendorHomeScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction); 
                        }else {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
                            });
                            this.props.navigation.dispatch(resetAction); 
                            this.props.navigation.navigate('LoginScreen')
                        }
                } 
                else {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
                    });
                    this.props.navigation.dispatch(resetAction); 
                    this.props.navigation.navigate('LoginScreen');
                }
              } catch (error) {
                
            }
        }
    }

    async componentDidMount() {
        //console.log(DeviceInfo)
        let version = DeviceInfo.getVersion();
        //alert("yes outside")
        this.props.getVersionValue(null, this.props,null, {
            SuccessCallback: res => {
                if(res.data.response){
                    let versionObj = res.data.response.data
                    if(Platform.OS == 'ios'){
                        //console.log(version)
                        if(version != versionObj.ios){
                            console.log("not match in ios")
                            this.setState({
                                isUpdate: true
                            })
                            //this.showPopup()
                            //alert("yes")
                            //this.props.navigation.navigate('LoginScreen')
                        }else{
                            console.log("match in ios")
                            this.checkLogin()
                        }
                    }
                    else if (Platform.OS == 'android'){
                        //console.log(version)
                        if(version != versionObj.android){
                            console.log("not match in android")
                            this.setState({
                                isUpdate: true
                            })
                        }else{
                            console.log("match in android")
                            this.checkLogin()
                        }
                    }
                }
            },
            FailureCallback: res => {
                console.log(res)
            }
        })
        
        // Translater.setConfig("en");
        // const data = await this.performTimeConsumingTask();
        // const token = await AsyncStorage.getItem('Token');
        // const Role = await AsyncStorage.getItem('Role');

        // if (data !== null) {
        //     try {
        //         if (token) {
        //                 if(Role == 'Trainee'){
        //                     const resetAction = StackActions.reset({
        //                         index: 0,
        //                         actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
        //                     });
        //                     this.props.navigation.dispatch(resetAction); 
        //                 }
        //                 else if(Role == 'Vendor'){
        //                     const resetAction = StackActions.reset({
        //                         index: 0,
        //                         actions: [NavigationActions.navigate({ routeName: 'VendorHomeScreen' })],
        //                     });
        //                     this.props.navigation.dispatch(resetAction); 
        //                 }else {
        //                     const resetAction = StackActions.reset({
        //                         index: 0,
        //                         actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        //                     });
        //                     this.props.navigation.dispatch(resetAction); 
        //                     this.props.navigation.navigate('LoginScreen')
        //                 }
        //         } 
        //         else {
        //             const resetAction = StackActions.reset({
        //                 index: 0,
        //                 actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        //             });
        //             this.props.navigation.dispatch(resetAction); 
        //             this.props.navigation.navigate('LoginScreen');
        //         }
        //       } catch (error) {
                
        //     }
        // }
    }

    showPopup = () => {
        //Alert.alert('Version update', 'Please update your APP')

        Alert.alert(
            'Alert',
            'Are you sure, you want to logout?',
            [
              {text: 'OK', onPress: () => {
               
                this.props.navigation.navigate('LoginScreen')
              }
            },
            ],
            {cancelable: false},
          );
    }

    render() {
        const {isUpdate} = this.state
        return (
            <View style={styles.container1}>
                {
                    isUpdate ?  <Update /> :<Image style={styles.imageStyle} source={Gtrainee}/>
                }
                
            </View>
        );
    }
}

const mapActionCreators = {getVersionValue};
const mapStateToProps = state => {
    return {
        loading: state.version.fetching,
        versionInfo: state.version.data
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(SplashScreen);


