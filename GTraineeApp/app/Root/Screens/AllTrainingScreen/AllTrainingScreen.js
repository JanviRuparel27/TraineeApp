import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Badge } from "native-base";
import { MainHeader, Loader } from "app/Component";
import { notificaiton, left } from 'app/assets';
import { FlatList, View } from 'react-native'
import ItemView from './ItemView';
import { TextView } from 'app/Component'
import styles from "./AllTrainingScreenStyle";
import { myTrainingList } from 'app/store/myTrainingList';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';

class AllTrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingListArr: [],
            noDataFound: false
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
                        this.setState({
                            trainingListArr: res.data.response.data
                        })
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
    render() {
        const { trainingListArr, noDataFound } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Training List'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={trainingListArr}
                                renderItem={({ item }) =>
                                    <ItemView item={item} />
                                }
                            />
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    myTrainingListArr: state.myTraining.myTrainingList,
    loading:state.myTraining.fetching
})

const mapDispatchToProps = {
    myTrainingList
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTrainingScreen)
