import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content } from "native-base";
import { MainHeader, Loader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { FlatList } from 'react-native';
import ItemView from './ItemView';
import { getFloorMap } from 'app/store/floorMap';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';

class FloorMapScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            floorListArr: [],
            noDataFound:false
        }
    }

    UNSAFE_componentWillMount = async () => {

        try {
            var getToken = await AsyncStorage.getItem('Token');
            const floorHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.getFloorMap(null, this.props, floorHeader, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        // this.setState({
                        //     floorListArr: res.data.response.data.floormaps
                        // })
                        if(res.data.response.data.floormaps.length > 0){
                            this.setState({
                                floorListArr: res.data.response.data.floormaps
                            })
                        }else{
                            this.setState({
                                noDataFound: true
                            })
                        }
                    }else{
                        this.setState({
                            noDataFound:true
                        })  
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert('something went wrong')
                    this.setState({
                        noDataFound:true
                    })  
                }
            })

        } catch (error) {
            alert(error.message);
        }

    }

    selectedFloorName = (data) => {
        this.props.navigation.navigate("ShowPDFScreen", { url: data.url , name:"Floor Map" })
    }
    render() {
        const { floorListArr, noDataFound } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Floor Map'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                        <FlatList
                            data={floorListArr}
                            renderItem={({ item }) =>
                                <ItemView onItemClick={this.selectedFloorName} item={item} handleSelectItem={this.handleYearClick} />
                            }
                        />
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.floormap.fetching,
    floorMapData: state.floormap.floormapList.data
})

const mapDispatchToProps = {
    getFloorMap
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorMapScreen)
