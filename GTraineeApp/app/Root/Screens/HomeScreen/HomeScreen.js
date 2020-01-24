import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import DashboardTab from './DashboardTab';
import RewardTab from './RewardTab';
import ScanQRTab from './ScanQRTab';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import {iconDashboard, iconProfilefooter, iconReward, iconScanner, iconSettings} from 'app/assets'
import {color} from "app/Theme";
import styles from "./HomeScreenStyle";
import cs from 'app/CommonStyle'
const Tab = createBottomTabNavigator

(
    {
        'Dashboard': {
            screen: DashboardTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconDashboard : iconDashboard}
                    />
                )
            }),
        },
        'Reward': {
            screen: RewardTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconReward : iconReward}

                    />
                )
            }),
        },
        'Scan': {
            screen: ScanQRTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (

                    <View style={[{
                        marginTop: -60, height: 60,
                        alignItems: 'center',
                        justifyContent:'center',
                        width: 60,
                        borderRadius:30,
                        backgroundColor:'white',
                        borderColor:'#919191',
                        borderWidth:0.3
                    },cs.shadow]}>
                        <View style={{position:'absolute',bottom:-5,backgroundColor:'white',height: 30,width:62}}/>
                        <Image style={ styles.selectedIcon2  }
                               source={iconScanner}

                    />

                    </View>
                )
            }),
        }
        , 'Setting': {
            screen: SettingTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconSettings : iconSettings}

                    />
                )
            }),
        }
        , 'Profile': {
            screen: ProfileTab,
            navigationOptions: () => ({
                tabBarVisible:false,
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconProfilefooter : iconProfilefooter}
                    />
                )
            }),
        }
    },
    {

        defaultNavigationOptions : ({navigation}) =>{
            return{


                tabBarOptions: {

                    tabBarVisible:true,
                    activeTintColor: color._018CCA,
                    inactiveTintColor: 'gray',
                    showLabel: true,
                    style: {
                        paddingTop: 10,
                        paddingBottom: 5,
                        height: 60
                    },
                    swipeEnabled: true,
                    animationEnabled: true,
                },
            }
        }
,

    }
);

const TabScreen = createStackNavigator({
    // HomeScreen: {
    //     screen: Tab, lazy: false, navigationOptions: {
    //         header: null, tabBarOnPress: ({navigation, defaultHandler}) => {
    //             defaultHandler();
    //         },
    //     }
    // },
    HomeScreen: {
        screen: DashboardTab, lazy: false, navigationOptions: {
            header: null, tabBarOnPress: ({navigation, defaultHandler}) => {
                defaultHandler();
            },
        }
    },
});


const MyNavigator = createSwitchNavigator({
    routeNameOne: TabScreen,
});
export default TabScreen;

