import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Tabs, Tab, ScrollableTab } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets';
import { View, Text, FlatList } from "react-native";
import { getAllNewsList } from 'app/store/newsList'
import { Loader, TextView  } from "app/Component";
import NoDataFoundView from 'app/Component/NoDataFoundView';
import ItemView from './ItemView';
import styles from './NewsScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64'

class NewsScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            allNewsList: [],
            noDataFound: false

        }
    }
    
    componentDidMount = async () => {

        try {
            var storedEmployeeId = await AsyncStorage.getItem('EmployeeId');
            // var encodedEmpId = base64.encode(storedEmployeeId)
            var encodedEmpId = base64.encode('3110')
            const newsHeader = {
                'Authorization': `basic ${encodedEmpId}`
            }
            this.props.getAllNewsList(null, this.props,newsHeader, {
                SuccessCallback: res => {
                    // console.log(res)
                    //console.log('SuccessCallback')
                    if (res.data) {
                        if(res.data.Data){
                            this.setState({
                                allNewsList: res.data.Data
                            })
                        }
                        else{
                            this.setState({
                                noDataFound: true
                            })
                        }
                    }
                     else {
                        this.setState({
                            noDataFound: true
                        })
                    }
                },
                FailureCallback: res => {
                    //console.log('FailureCallback')
                    this.setState({
                        noDataFound: true
                    })
                    alert('something went wrong')
                }
            })
            
        } catch (error) {
            //console.log('catch')
            alert(error.message);
        }

    }

    handleNewsClick = (item) => {
        this.props.navigation.navigate('NewsDetailScreen', item);
      }

    render() {
        return (
            <Container>
                <MainHeader bodyContent={'G-News'} leftIcon={left}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }} />

                {this.props.loading == false &&
                    //     <FlatList
                    //         contentContainerStyle={{paddingBottom:20}}
                    //         data={this.props.allNewsList.Data}
                    //         renderItem={({item}) => (
                    //              <ItemView item={item}/>
                    //         )}
                    //   />
                    // <Tabs tabBarUnderlineStyle={styles.tabStyle} renderTabBar={() => <ScrollableTab />} >
                    //     <Tab heading={'Latest News'} tabStyle={styles.tabBlockStyle}
                    //         textStyle={styles.textStyle}
                    //         activeTabStyle={styles.activeTabStyle}
                    //         activeTextStyle={styles.textStyle}
                    //     >
                    //         <View>
                    //             <TextView>{'Latest News'}</TextView>
                    //         </View>
                    //     </Tab>
                    //     <Tab heading={'Corporate News'}
                    //         tabStyle={styles.tabBlockStyle}
                    //         textStyle={styles.textStyle}
                    //         activeTabStyle={styles.activeTabStyle}
                    //         activeTextStyle={styles.textStyle}>
                    //         <View>
                    //             <TextView>{'Corporate News'}</TextView>
                    //         </View>
                    //     </Tab>
                    //     <Tab heading={'Business News'}
                    //         tabStyle={styles.tabBlockStyle}
                    //         activeTabStyle={styles.activeTabStyle}
                    //         textStyle={styles.textStyle}
                    //         activeTextStyle={styles.textStyle}>
                    //         <View>
                    //             <TextView>{'Business News'}</TextView>
                    //         </View>
                    //     </Tab>
                    //     <Tab heading={'Team@Gateway News'}
                    //         tabStyle={styles.tabBlockStyle}
                    //         activeTabStyle={styles.activeTabStyle}
                    //         textStyle={styles.textStyle}
                    //         activeTextStyle={styles.textStyle}>
                    //         <View>
                    //             <TextView>{'Team@Gateway News'}</TextView>
                    //         </View>
                    //     </Tab>
                    //     <Tab heading={'Global Team News'}
                    //         tabStyle={styles.tabBlockStyle}
                    //         activeTabStyle={styles.activeTabStyle}
                    //         textStyle={styles.textStyle}
                    //         activeTextStyle={styles.textStyle}>
                    //         <View>
                    //             <TextView>{'Global Team News'}</TextView>
                    //         </View>
                    //     </Tab>
                    // </Tabs>

                    this.state.noDataFound ? 
                    <NoDataFoundView navigation={this.props.navigation} /> :

                    <Tabs tabBarUnderlineStyle={styles.tabStyle} renderTabBar={() => <ScrollableTab />} >
                        {
                            this.state.allNewsList.map((data)=>(
                                <Tab heading={data.CategoryName}
                                tabStyle={styles.tabBlockStyle}
                                activeTabStyle={styles.activeTabStyle}
                                textStyle={styles.textStyle}
                                activeTextStyle={styles.textStyle}>

                                   <FlatList
                                        contentContainerStyle={{paddingBottom:20}}
                                        data={data.feeds}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item}) => (
                                            <ItemView item={item}  onItemClick={this.handleNewsClick} />
                                        )}
                                    />

                            </Tab>
                            ))
                        }

                    </Tabs>


                }
                <Loader loading={this.props.loading} />

            </Container>


        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.newsList.loading,
        allNewsList: state.newsList.newsListData.data
    };
};

const mapDispatchToProps = {
    getAllNewsList
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsScreen);