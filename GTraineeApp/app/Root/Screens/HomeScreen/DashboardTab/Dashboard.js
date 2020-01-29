import React, { Component } from "react";
import { connect } from "react-redux";
import { Container , Fab , Icon, Thumbnail } from "native-base";
import { CarouselItem, MainHeader } from "app/Component";
import { Dimensions, FlatList, View , Alert , Platform} from "react-native";
import {
    approval,
    benifits,
    company,
    eCare,
    letters,
    news,
    notificaiton,
    payslip,
    profile,
    request,
    tavel,
    tax,
    timesheet,
    Gnews,
    Generalfeedback,
    myTrainings,
    pointOfContact,
    presenceScanner,
    registerQuery,
    trainingReferences,
    trainingSchedule,
    assesmentsResults,
    beverages,
    floorMap,
} from 'app/assets';
import DashboardItemView from "./ItemView";
import Carousel from "react-native-snap-carousel";
import RecentView from "app/Component/RecentView";
import AsyncStorage from '@react-native-community/async-storage';
import { gettop5news } from 'app/store/news'
import axios from 'axios';
import { Loader, NoInternet } from "app/Component";
import styles from "./DashboardStyle";
import base64 from 'react-native-base64'



const screenWidth = Math.round(Dimensions.get('window').width);

class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            flatListData: [
                // { id: '1', title: 'My Trainings', image: news, screen: 'AllTrainingScreen' },
                { id: '1', title: 'My Trainings', image: myTrainings, screen: 'TrainingScheduleScreen' },
                { id: '2', title: 'Training References', image: trainingReferences, screen: 'MyTrainingScreen' },
                { id: '3', title: 'Assessments & Results', image: assesmentsResults, screen: 'TrainingExamScreen' },
                // { id: '5', title: 'Notification', image: notificaiton, screen: 'NotificationScreen' },
                //{ id: '6', title: 'Presence Scanner', image: profile, screen: 'PeopleScreen' },
                { id: '4', title: 'Beverages', image: beverages, screen: 'BeverageScreen' },
                { id: '5', title: 'Register Query', image: registerQuery, screen: 'RegisterQueryScreen' },
                { id: '6', title: 'Point of Contact', image: pointOfContact, screen: 'PeopleScreen' },
                { id: '7', title: 'G-News', image: Gnews, screen: 'NewsScreen' },
                { id: '8', title: 'General Feedback', image: Generalfeedback, screen: '' },
                { id: '9', title: 'Floor Map', image: floorMap, screen: 'FloorMapScreen' },
                // {id: '1', title: 'TimeSheet', image: timesheet, screen: 'TaskSheetScreen'},
                // { id: '1', title: 'Beverages', image: timesheet, screen: 'BeverageScreen' },
                // { id: '2', title: 'Notification', image: notificaiton, screen: 'NotificationScreen' },
                // { id: '3', title: 'Floor Map', image: payslip, screen: 'FloorMapScreen' },
                // { id: '4', title: 'Training List', image: news, screen: 'AllTrainingScreen' },
                // { id: '5', title: 'Contact List', image: profile, screen: 'PeopleScreen' },
                // { id: '6', title: 'References', image: benifits, screen: 'MyTrainingScreen' },
                // { id: '7', title: 'Training Exam', image: tavel, screen: 'TrainingExamScreen' },
                // { id: '8', title: 'Schedule', image: company, screen: 'TrainingScheduleScreen' },
                // { id: '9', title: 'News', image: news, screen: 'NewsScreen' },
                // { id: '10', title: 'Register Query', image: request, screen: 'RegisterQueryScreen' },
                // { id: '10', title: 'Request', image: request, screen: 'RequestScreen' },
                // { id: '11', title: 'Approval', image: approval, screen: '' },
                // { id: '12', title: 'E-care', image: eCare, screen: '' },

            ],
            newsData : null
        }

    }

    _renderItem({ item, index }) {
        return (
            <CarouselItem item={item} navigation={this.props.navigation}/>
        );
    }

    UNSAFE_componentWillMount = async () => {
        try {
            var storedEmployeeId = await AsyncStorage.getItem('EmployeeId');
            var encodedEmpId = base64.encode('3110')
            const newsHeader = {
                'Authorization': `basic ${encodedEmpId}`
            }
            this.props.gettop5news(null, this.props, newsHeader, {
                SuccessCallback: res => {
                    console.log(res.data)
                    if(res.data){
                        this.setState({
                            newsData : res.data.Data
                        })
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert('something went wrong')
                }
            })
            
        } catch (error) {
            alert(error.message);
        }

        // this.props.gettop5news(null, this.props, {
        //     SuccessCallback: res => {
        //         //console.log(res)
        //     },
        //     FailureCallback: res => {
        //         // console.log(res)
        //         alert('something went wrong')
        //     }
        // })

        //console.log(value)
    }

    handleLogoutClick = async() =>{
        // console.log(Platform.OS)
        if(Platform.OS == 'android'){
            Alert.alert(
                'Alert',
                'Are you sure, you want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {
                    // AsyncStorage.clear();
                    AsyncStorage.removeItem('Token');
                    this.props.navigation.navigate('LoginScreen')
                  }
                },
                ],
                {cancelable: false},
              );
        }
        else{
            // AsyncStorage.clear();
            AsyncStorage.removeItem('Token');
            this.props.navigation.navigate('LoginScreen')
        }
    }

    handleNotificationClick = () => {
        this.props.navigation.navigate('NotificationScreen')
    }

    handleChangePassClick = () => {
        this.props.navigation.navigate('ChangePasswordScreen')
    }

    render() {
        const { flatListData , newsData} = this.state;

        return (
            <Container>
                <MainHeader 
                bodyContent={'Dashboard'}
                leftIcon={notificaiton}
                optionMenu={true}
                onMenuItemPress={this.handleLogoutClick}
                onChangePassItemPress={this.handleChangePassClick}
                backAction={this.handleNotificationClick}
                  />
                {this.props.loading == false &&
                    <Carousel
                        containerCustomStyle={styles.carouselContainer}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={newsData}
                        firstItem={1}
                        loop={true}
                        autoplay={true}
                        layout={"default"}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth - 80}
                    />
                }
                {this.props.loading == false &&
                    <FlatList
                        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        style={{ marginTop: 10 }}
                        numColumns={3}
                        data={flatListData}
                        renderItem={({ item }) =>
                            <DashboardItemView item={item} onItemClick={(e) => {
                                if(e.screen == ''){
                                    alert('Comming Soon')
                                }
                                else{
                                    this.props.navigation.navigate(e.screen)
                                }
                            }} />
                        }
                    />
                }
                <Loader loading={this.props.loading} />
                <Fab
                    style={styles.fabButtonStyle}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('ScanQRScreen')}>
                        <Thumbnail small  source={presenceScanner} />
                    {/* <Icon type="Ionicons" name="qr-scanner" /> */}
                </Fab>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.news.loading,
        newsList: state.news.newsData.data
    };
};

const mapDispatchToProps = {
    gettop5news
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
