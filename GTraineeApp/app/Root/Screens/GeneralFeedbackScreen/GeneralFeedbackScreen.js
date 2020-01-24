import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList , View , Text , TextInput} from 'react-native'
import ItemView from './ItemView'
import { Container, Button, Footer, Toast } from 'native-base'
import { MainHeader, Loader  } from 'app/Component';
import { left } from 'app/assets';
import AsyncStorage from '@react-native-community/async-storage';
import {getFeedbackQuestion} from 'app/store/getFeedbackQuestion/actions'
import styles from './GeneralFeedbackScreenStyle'
import {userGeneralFeedback} from 'app/store/userGeneralFeedback'

class GeneralFeedbackScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            noDataFound: false,
            answerArr:[],
            questions: [],
            textareaValue: '',
            radioButtonValue: [
                {
                    "id": 1,
                    "ans": "Strongly Disagree"
                },
                {
                    "id": 2,
                    "ans": "Disagree"
                },
                {
                    "id": 3,
                    "ans": "Neutral"
                },
                {
                    "id": 4,
                    "ans": "Agree"
                },
                {
                    "id": 5,
                    "ans": "Strongly Agree"
                }

            ]
        }
    }

    handleSubmitAns = (ansArr) => {
        this.setState({ answerArr:ansArr },()=>console.log(this.state.answerArr))
    }

    UNSAFE_componentWillMount = async () => {
       
        try {
            var getToken = await AsyncStorage.getItem('Token');
            const Header = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.getFeedbackQuestion(null, this.props, Header, {
                SuccessCallback: res => {
                    if (res.data) {
                        if(res.data.response.data.length > 0){
                            this.setState({
                                questions: res.data.response.data
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
                    alert('something went wrong')
                    // this.setState({
                    //     noDataFound:true
                    // })  
                }
            })

        } catch (error) {
            alert(error.message);
        }

    }

    submitFeedback = async () => {
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            const Header = {
                'Authorization': `Bearer ${getToken}`
            }
            const params = {
                "user_id": getUserId,
                // "trainer_id": this.props.navigation.state.params.feedbackData.trainer_id,
                // "training_id": this.props.navigation.state.params.feedbackData.training_id,
                "schedule_id": this.props.navigation.state.params.feedbackData.schedule_id,
                "comment": this.state.textareaValue,
                "questions": this.state.answerArr
            }
            this.props.userGeneralFeedback(params, this.props, Header, {
                SuccessCallback: res => {
                    if (res.data) {
                        Toast.show({
                            text: res.data.response.data.message,
                            position: "bottom",
                            type: "success",
                            duration: 3000
                          })
                          this.props.navigation.navigate('HomeScreen')
                    }else{
                        Toast.show({
                            text: "something went wrong",
                            position: "bottom",
                            type: "warning",
                            duration: 3000
                          })
                    }
                },
                FailureCallback: res => {
                    // alert('something went wrong')
                    Toast.show({
                        text: "something went wrong",
                        position: "bottom",
                        type: "warning",
                        duration: 3000
                      })
                }
            })

        } catch (error) {
            alert(error.message);
        }
    }
    handleTextChange = (e) => {
        this.setState({
            textareaValue: e
        })
    }

    render() {
        const { questions,radioButtonValue , noDataFound } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'General Feedback'}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={{margin: 10}}>
                    <TextInput
                        value={this.state.textareaValue}
                        style={styles.textareaStyle}
                        placeholder="Enter Your Comments here..."
                        multiline
                        numberOfLines={3}
                        onChangeText={this.handleTextChange}
                    />
                </View>
                {
                    this.props.loading ? <Loader /> :
                    noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                    <FlatList
                    data={questions}
                    renderItem={({ item }) =>
                        <ItemView item={item} handleCount={this.handleSubmitAns} option={radioButtonValue} />
                    }
                />
                }
                <Footer style={{ backgroundColor: '#f2f2f2' }}>
                        <Button full onPress={this.submitFeedback}
                            style={styles.startButtonStyle}><Text style={{ color: 'white' }} > {'Submit'} </Text></Button>
                    </Footer>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.floormap.fetching,
})

const mapDispatchToProps = {
    getFeedbackQuestion,
    userGeneralFeedback
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralFeedbackScreen)
