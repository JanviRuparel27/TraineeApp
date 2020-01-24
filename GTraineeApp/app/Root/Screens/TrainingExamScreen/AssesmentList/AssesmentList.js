import React, { Component } from 'react'
import { View  , Text , FlatList} from 'react-native'
import { Container, Tabs, Tab } from 'native-base'
import { MainHeader, Loader } from 'app/Component'
import { notificaiton, left } from 'app/assets';
import styles from './AssesmentListStyle';
import {getTrainingAssesment} from 'app/store/AssesmentList/actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ItemView from './ItemView'
import NoDataFoundView from 'app/Component/NoDataFoundView';


class AssesmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assesmentListArr: [],
            assesmentResultListArr:[],
            noDataFound: false,
            resultTab: false,
            isLoading:true,
        }
    }
    UNSAFE_componentWillMount = async () => {
        try {
            let trainingId = this.props.navigation.state.params.id
            var getToken = await AsyncStorage.getItem('Token');
            const floorHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.getTrainingAssesment(null, this.props, floorHeader, trainingId, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        if(res.data.response.data.length > 0){
                            var assesmentListArr =  res.data.response.data.filter(function(data) {
                                return data.show_result != 1;
                            });
                            this.setState({
                                assesmentListArr: assesmentListArr,
                                isLoading:false,
                                assesmentResultListArr:res.data.response.data
                            })
                        }
                        else{
                            this.setState({
                                noDataFound: true,
                                isLoading:false
                            })
                        }
                    
                    } else {
                        this.setState({
                            noDataFound: true,
                            isLoading:false
                        })
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert('something went wrong')
                    this.setState({
                        noDataFound: true,
                        isLoading:false
                    })
                }
            })

        } catch (error) {
            alert(error.message);
            this.setState({
                noDataFound: true,
                isLoading:false
            })
        }

    }
    selectedSelectedTraining = (item ) => {
        console.log(item)
        this.props.navigation.navigate("ExamQuestionScreen", { id: item.id ,instructions:item.instructions, trainingId:item.training_id, name: item.exam_name , time: item.exam_duration , result: this.state.resultTab })
    }
    handleTabChange = ({ i }) => {
        if(i == 1)
        {
            this.setState({
                resultTab: true
            })
        }
        else{
            this.setState({
                resultTab: false
            })
        }
    }
    render() {
        const {noDataFound,assesmentListArr, isLoading,assesmentResultListArr} = this.state;
        return (
            <Container>
            <MainHeader leftIcon={left} bodyContent={'Training assesment'}
                backAction={() => {
                    this.props.navigation.goBack()
                }}
            />
            <Tabs tabBarUnderlineStyle={styles.tabStyle} onChangeTab={this.handleTabChange}>
                <Tab heading={'Assesments'} 
                    tabStyle={styles.tabBlockStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.textStyle}
                >
                {
                    // this.props.loading ? <Loader /> :
                    isLoading ? <Loader /> :
                        noDataFound || assesmentListArr.length == 0 ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={assesmentListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} onItemClick={this.selectedSelectedTraining} />
                                }
                            />
                   }
                </Tab>
                <Tab heading={'Result'}
                    tabStyle={styles.tabBlockStyle}
                    textStyle={styles.textStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTextStyle={styles.textStyle}>
                    {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={assesmentResultListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} onItemClick={this.selectedSelectedTraining}/>
                                }
                            />
                   }

                   {/* <Text>result</Text> */}
                </Tab>
            </Tabs>
        </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.allTraining.fetching,
    trainingAssesmentList: state.trainingAssesmentList
})

const mapDispatchToProps = {
    getTrainingAssesment
}

export default connect(mapStateToProps, mapDispatchToProps)(AssesmentList)
