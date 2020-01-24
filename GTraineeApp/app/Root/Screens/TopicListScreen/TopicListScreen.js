import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Tabs, Tab,Badge } from 'native-base'
import { MainHeader, Loader } from 'app/Component'
import { notificaiton, left } from 'app/assets';
import { getTrainingAssesment } from 'app/store/AssesmentList/actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ItemView from './ItemView'
import NoDataFoundView from 'app/Component/NoDataFoundView';
import styles from './TopicListScreenStyle'

class TopicListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assesmentListArr: [],
            noDataFound: false,
            resultTab: false,
            group: null,
            batch: null
        }
    }
    UNSAFE_componentWillMount = async () => {
        let topicList = this.props.navigation.getParam("topics", null);
        let group = this.props.navigation.getParam("group", null);
        let batch = this.props.navigation.getParam("batch", null);
        let noData = false;
        if(topicList.length <= 0){
            // console.log(topicList)
            noData = true
        }
        this.setState({
            assesmentListArr: topicList,
            group: group,
            batch: batch,
            noDataFound:noData
        })
    }
    selectedSelectedTraining = (item) => {
        this.props.navigation.navigate("ReferenceScreen", { references: item,group:this.state.group, batch:this.state.batch })
    }

    render() {
        const { noDataFound, assesmentListArr, group, batch } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Trainings and References'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={styles.viewStyle}>
                    <Badge style={styles.badgeStyle}>
                        <Text style={styles.textColor}>{group}</Text>
                    </Badge>
                    <Badge style={styles.badgeStyle}>
                        <Text style={styles.textColor}>{batch}</Text>
                    </Badge>
                </View>
                {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <FlatList
                                data={assesmentListArr}
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
    trainingAssesmentList: state.trainingAssesmentList
})

const mapDispatchToProps = {
    getTrainingAssesment
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicListScreen)
