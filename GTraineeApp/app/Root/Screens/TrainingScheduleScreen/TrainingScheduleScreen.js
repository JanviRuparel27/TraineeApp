import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Badge, Button, Tabs, Tab } from "native-base";
import { MainHeader, Loader } from "app/Component";
import { notificaiton, left } from 'app/assets';
import { FlatList, View , Text} from 'react-native'
import ItemView from './ItemView';
import ItemView1 from './ItemView1'
import CalenderView from "app/Component/CalenderComp";
import styles from "./TrainingScheduleScreenStyle";
import { mySchedules } from 'app/store/mySchedules';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import { dateFormateValue } from 'app/Constants';
import { dateFormate } from 'app/Constants';
import { myTrainingList } from 'app/store/myTrainingList';

class TrainingScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alltrainingListArr: [],
            trainingListArr: [],
            noDataFound: false,
            noDataFound1: false,
            isDateTimePickerVisible: false,
            todayDate: null
        }
    }
    UNSAFE_componentWillMount = async () => {

        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            const myTrainingHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.myTrainingList(null, this.props, myTrainingHeader, getUserId, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        if(res.data.response.data.length > 0){
                            this.setState({
                                alltrainingListArr: res.data.response.data
                            })
                        }else{
                            this.setState({
                                noDataFound1: true
                            })
                        }
                    } else {
                        this.setState({
                            noDataFound1: true
                        })
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    //alert('something went wrong')
                    this.setState({
                        noDataFound1: true
                    })
                }
            })
        } catch (error) {
            alert(error.message);
            this.setState({
                noDataFound1:true
            })
        }

        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            var today = dateFormateValue(new Date())
            this.setState({
                todayDate: today
            })
            const mySchedulesHeader = {
                'Authorization': `Bearer ${getToken}`
            }
    
            this.props.mySchedules(null, this.props, mySchedulesHeader, getUserId, today, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        // console.log(res.data.response.data.schedules)
                        if (res.data.response.data.schedules.length > 0) {
                            this.setState({
                                trainingListArr: res.data.response.data.schedules
                            })
                        } else {
                            this.setState({
                                noDataFound: true
                            })
                        }
                    } else {
                        this.setState({
                            noDataFound: true
                        })
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    //alert('something went wrong')
                    this.setState({
                        noDataFound: true
                    })
                }
            })

        } catch (error) {
            alert(error.message);
            this.setState({
                noDataFound: true,
            })
        }

    }

    handleDatePicked = date => {
        // this.hideDateTimePicker()
        let formatedDate = dateFormateValue(date.dateString)
        var selectedDate = dateFormate(date.dateString)
        this.setState({
            todayDate: selectedDate
        })
        this.handleAPICall(formatedDate)
    }

    handleAPICall = async (formatedDate) => {
        // console.log(formatedDate)
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            const mySchedulesHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.mySchedules(null, this.props, mySchedulesHeader, getUserId, formatedDate, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {

                        if (res.data.response.data.schedules.length > 0) {
                            this.setState({
                                trainingListArr: res.data.response.data.schedules,
                                noDataFound: false
                            })
                        } else {
                            this.setState({
                                noDataFound: true
                            })
                        }
                    } else {
                        this.setState({
                            noDataFound: true
                        })
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert('something went wrong')
                    this.setState({
                        noDataFound: true
                    })
                }
            })

        } catch (error) {
            alert(error.message);
            this.setState({
                noDataFound: true
            })
        }

    }
    handleMapTextClick = (data) => {
        this.props.navigation.navigate("ShowPDFScreen", { url: data , name:"Floor Map" })
    }

    render() {
        const { trainingListArr, noDataFound,noDataFound1, isDateTimePickerVisible, todayDate, alltrainingListArr } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'My Trainings'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />

                {/* {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={trainingListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} />
                                }
                            />
                } */}
                <Tabs tabBarUnderlineStyle={styles.tabStyle}>
                    <Tab heading={'All trainings'} tabStyle={styles.tabBlockStyle}
                        textStyle={styles.textStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTextStyle={styles.textStyle}
                    >
                        {
                            this.props.myLoading ? <Loader /> :
                                noDataFound1 ? <NoDataFoundView navigation={this.props.navigation} /> :
                                    // <View>
                                    //     <TextView>{'Documents'}</TextView>
                                    // </View>
                                    <FlatList
                                        data={alltrainingListArr}
                                        renderItem={({ item }) =>
                                            <ItemView1 onItemClick={this.handleMapTextClick} item={item} />
                                        }
                                    />
                        }
                    </Tab>
                    <Tab heading={'Training Schedule'}
                        tabStyle={styles.tabBlockStyle}
                        activeTabStyle={styles.activeTabStyle}
                        textStyle={styles.textStyle}
                        activeTextStyle={styles.textStyle}>
                         <Content>
                                <CalenderView onDayPress={this.handleDatePicked}/>
                        {
                            this.props.loading ? <Loader /> :
                                   
                                        
                                       noDataFound ? 
                                       <View style={styles.noDataContainer}>
                                            <Text style={styles.noDataTextStyle}>No Data Available</Text> 
                                       </View>
                                       
                                       :
                                        <FlatList
                                            data={trainingListArr}
                                            renderItem={({ item }) =>
                                                <ItemView  item={item} onItemClick={this.handleMapTextClick}/>
                                            }
                                        />
                                    
                        }
                        </Content>

                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    myScheduleListArr: state.schedules.mySchedulesList,
    myTrainingListArr: state.myTraining.myTrainingList,
    myLoading: state.myTraining.fetching,
    loading: state.schedules.fetching
})

const mapDispatchToProps = {
    mySchedules,
    myTrainingList
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScheduleScreen)
