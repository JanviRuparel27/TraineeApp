import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, View, Text } from 'react-native'
import { Container, Badge } from 'native-base'
import { MainHeader, Loader } from 'app/Component'
import { notificaiton, left } from 'app/assets';
import { getAllTrainingSchedule } from 'app/store/allTrainingSchedule';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import ItemView from './ItemView';
import styles from './MyTrainingScreenStyle';
import { myTrainingList } from 'app/store/myTrainingList';

class MyTrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTrainingListArr: [],
            noDataFound: false,
            groupName: null,
            batchId: null,
            noDataFound1:false
        }
    }

    UNSAFE_componentWillMount = async () => {

        // try {
        //     var getToken = await AsyncStorage.getItem('Token');
        //     var Group = await AsyncStorage.getItem('Group');
        //     var Batch = await AsyncStorage.getItem('Batch');
        //     this.setState({
        //         groupName: Group,
        //         batchId: Batch
        //     })
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
            var Group = await AsyncStorage.getItem('Group');
            var Batch = await AsyncStorage.getItem('Batch');
            this.setState({
                groupName: Group,
                batchId: Batch
            })
            const myTrainingHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.myTrainingList(null, this.props, myTrainingHeader, getUserId, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        // this.setState({
                        //     myTrainingListArr: res.data.response.data
                        // })
                        if(res.data.response.data.length > 0){
                            this.setState({
                                myTrainingListArr: res.data.response.data
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

    }
    handleSelectedItem = (item) => {
        //this.props.navigation.navigate("ReferenceScreen", { id: item.id })
        this.props.navigation.navigate("TopicListScreen", { topics: item.topics, group:this.state.groupName, batch: this.state.batchId })
    }
    render() {
        const { noDataFound1, myTrainingListArr,groupName, batchId } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Trainings and References'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={styles.viewStyle}>
                    <Badge style={styles.badgeStyle}>
                        <Text style={styles.textColor}>{groupName}</Text>
                    </Badge>
                    <Badge style={styles.badgeStyle}>
                        <Text style={styles.textColor}>{batchId}</Text>
                    </Badge>
                </View>
                {
                    this.props.loading ? <Loader /> :
                    noDataFound1 ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={myTrainingListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} selectedItem={this.handleSelectedItem} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTrainingScreen)
