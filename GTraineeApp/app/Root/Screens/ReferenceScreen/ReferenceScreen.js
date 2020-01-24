import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Tab, Tabs, Badge } from "native-base";
import { MainHeader } from "app/Component";
import { left, notificaiton } from 'app/assets';
import { View, Text, FlatList } from 'react-native'
import styles from "./ReferenceScreenStyle";
import { TextView, Loader } from 'app/Component'
import { color } from "app/Theme";
import { getReferences } from 'app/store/references';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import ItemView from './ItemView';

export class ReferenceScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            documentsList: [],
            slideList: [],
            syllabusList: [],
            groupName: null,
            batchId: null,
            noDataFound: false,
            noDataFoundDocuments: false,
            noDataFoundSlides: false,
            noDataFoundSyllabus: false
        }
    }

    UNSAFE_componentWillMount = async () => {
        let group = this.props.navigation.getParam("group", null);
        let batch = this.props.navigation.getParam("batch", null);

        if(group!=null){
            this.setState({
                groupName:group
            })
        }else{
            this.setState({
                groupName:'N/A'
            })
        }
        if(batch!=null){
            this.setState({
                batchId:batch
            })
        }else{
            this.setState({
                batchId:'N/A'
            })
        }

        let referencesList = this.props.navigation.getParam("references", null);
        if (referencesList == null) {
            this.setState({
                noDataFound: true
            })
        } else {
            // console.log(referencesList.references.slide.length,"referencesList.references.slide.length")
            // console.log(referencesList.references.document.length,"referencesList.references.document.length")
            // console.log(referencesList.references.syllabus.length,"referencesList.references.syllabus.length")
            if (referencesList.references.syllabus) {
                //alert('hi')
                if (referencesList.references.syllabus.length > 0) {
                    this.setState({
                        syllabusList: referencesList.references.syllabus
                    })
                } else {
                    this.setState({
                        noDataFoundSyllabus: true
                    })
                }
            } else {
                this.setState({
                    noDataFoundSyllabus: true
                })
            }

            if (referencesList.references.document) {
                //alert('hi')
                if (referencesList.references.document.length > 0) {
                    this.setState({
                        documentsList: referencesList.references.document
                    })
                } else {
                    this.setState({
                        noDataFoundDocuments: true
                    })
                }
            } else {
                this.setState({
                    noDataFoundDocuments: true
                })
            }

            if (referencesList.references.slide) {
                //alert('hi')
                if (referencesList.references.slide.length > 0) {
                    this.setState({
                        slideList: referencesList.references.slide
                    })
                } else {
                    this.setState({
                        noDataFoundSlides: true
                    })
                }
            } else {
                this.setState({
                    noDataFoundSlides: true
                })
            }

            // if (referencesList.references.document.length > 0) {
            //     this.setState({
            //         documentsList: referencesList.references.document
            //     })
            // } else {
            //     this.setState({
            //         noDataFoundDocuments: true
            //     })
            // }
            // if (referencesList.references.slide.length > 0) {
            //     this.setState({
            //         slideList: referencesList.references.slide
            //     })
            // } else {
            //     this.setState({
            //         noDataFoundSlides: true
            //     })
            // }

        }
        // let id = this.props.navigation.getParam("id", null)
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
        //     this.props.getReferences(null, this.props, floorHeader, id, {
        //         SuccessCallback: res => {
        //             //console.log(res)
        //             if (res.data) {
        //                 if (Object.entries(res.data.response.data).length != 0) {
        //                     if (res.data.response.data.document.length > 0) {
        //                         this.setState({
        //                             documentsList: res.data.response.data.document,
        //                         })
        //                     } else {
        //                         this.setState({
        //                             noDataFound: true
        //                         })
        //                     }
        //                     if (res.data.response.data.slide.length > 0) {
        //                         this.setState({
        //                             slideList: res.data.response.data.slide,
        //                         })
        //                     } else {
        //                         this.setState({
        //                             noDataFound: true
        //                         })
        //                     }
        //                     if (res.data.response.data.syllabus.length > 0) {
        //                         this.setState({
        //                             syllabusList: res.data.response.data.syllabus
        //                         })
        //                     } else {
        //                         this.setState({
        //                             noDataFound: true
        //                         })
        //                     }
        //                     // this.setState({
        //                     //     documentsList: res.data.response.data.document,
        //                     //     slideList: res.data.response.data.slide,
        //                     //     syllabusList: res.data.response.data.syllabus
        //                     // })
        //                 } else {
        //                     this.setState({
        //                         noDataFound: true
        //                     })
        //                 }
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

    }

    selectedFloorName = (data) => {
        // this.props.navigation.navigate("ShowPDFScreen", { url: data.document_link, name:"Reference File" })
        this.props.navigation.navigate("ShowPDFScreen", { url: data.document_url, name: "Reference File" })
    }

    render() {
        const { noDataFound, documentsList, syllabusList, slideList, groupName, batchId, noDataFoundDocuments, noDataFoundSlides, noDataFoundSyllabus } = this.state;
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


                <Tabs tabBarUnderlineStyle={styles.tabStyle}>
                    <Tab heading={'Documents'} tabStyle={styles.tabBlockStyle}
                        textStyle={styles.textStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTextStyle={styles.textStyle}
                    >
                        {
                            this.props.loading ? <Loader /> :
                                noDataFoundDocuments ? <NoDataFoundView navigation={this.props.navigation} /> :
                                    // <View>
                                    //     <TextView>{'Documents'}</TextView>
                                    // </View>
                                    <FlatList
                                        data={documentsList}
                                        renderItem={({ item }) =>
                                            <ItemView onItemClick={this.selectedFloorName} item={item} />
                                        }
                                    />
                        }
                    </Tab>
                    <Tab heading={'Syllabus'}
                        tabStyle={styles.tabBlockStyle}
                        textStyle={styles.textStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTextStyle={styles.textStyle}>
                        {
                            this.props.loading ? <Loader /> :
                                noDataFoundSyllabus ? <NoDataFoundView navigation={this.props.navigation} /> :
                                    <FlatList
                                        data={syllabusList}
                                        renderItem={({ item }) =>
                                            <ItemView onItemClick={this.selectedFloorName} item={item} />
                                        }
                                    />
                        }
                    </Tab>
                    <Tab heading={'Slides'}
                        tabStyle={styles.tabBlockStyle}
                        activeTabStyle={styles.activeTabStyle}
                        textStyle={styles.textStyle}
                        activeTextStyle={styles.textStyle}>
                        {
                            this.props.loading ? <Loader /> :
                                noDataFoundSlides ? <NoDataFoundView navigation={this.props.navigation} /> :
                                    <FlatList
                                        data={slideList}
                                        renderItem={({ item }) =>
                                            <ItemView onItemClick={this.selectedFloorName} item={item} />
                                        }
                                    />
                        }
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    referencesListArr: state.references.referencesList,
    loading: state.references.fetching,
})

const mapDispatchToProps = {
    getReferences
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceScreen)

