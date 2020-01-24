import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, View, Text } from 'react-native'
import { Container , Tabs , Tab } from 'native-base'
import { MainHeader, Loader } from 'app/Component'
import { notificaiton, left } from 'app/assets';
import { getAllTrainingSchedule } from 'app/store/allTrainingSchedule';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import ItemView from './ItemView';
import styles from './TrainingExamScreenStyle'
import { myTrainingList } from 'app/store/myTrainingList';

class TrainingExamScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTrainingListArr: [],
            noDataFound: false,
            noDataFound1:false
        }
    }
    
    UNSAFE_componentWillMount = async () => {

        // try {
        //     var getToken = await AsyncStorage.getItem('Token');
        //     const floorHeader = {
        //         'Authorization': `Bearer ${getToken}`
        //     }
        //     this.props.getAllTrainingSchedule(null, this.props, floorHeader, {
        //         SuccessCallback: res => {
        //             //console.log(res)
        //             if (res.data) {
        //                 this.setState({
        //                     myTrainingListArr: res.data.response.data.trainings
        //                 })
        //             } else {
        //                 this.setState({
        //                     noDataFound: true
        //                 })
        //             }
        //         },
        //         FailureCallback: res => {
        //             // console.log(res)
        //             alert('something went wrong')
        //             this.setState({
        //                 noDataFound: true
        //             })
        //         }
        //     })

        // } catch (error) {
        //     alert(error.message);
        //     this.setState({
        //         noDataFound: true
        //     })
        // }

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
                                myTrainingListArr: res.data.response.data
                            })
                        }else{
                            this.setState({
                                noDataFound1: true
                            })
                        }
                        // this.setState({
                        //     myTrainingListArr: res.data.response.data
                        // })
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

    }
    selectedSelectedTraining = (item) => {
        // this.props.navigation.navigate("ExamQuestionScreen", { id: item.id })
        // this.props.navigation.navigate("AssesmentList" , { id: item.id })
        this.props.navigation.navigate("ExamTopicListScreen", { topics: item.topics })
    }

    render() {
        const {noDataFound1,myTrainingListArr} = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Assessments & Results'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />

                {
                    this.props.loading ? <Loader /> :
                    noDataFound1 ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={myTrainingListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} onItemClick={this.selectedSelectedTraining} />
                                }
                            />
                }
               
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.allTraining.fetching,
    allTrainingListData: state.allTraining.allTrainingList.data,
    myTrainingListArr: state.myTraining.myTrainingList,
})

const mapDispatchToProps = {
    getAllTrainingSchedule,
    myTrainingList
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingExamScreen)