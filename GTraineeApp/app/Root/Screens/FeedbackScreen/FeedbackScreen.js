import React, { Component } from 'react'
import { View, Text , TextInput , Alert,Platform } from 'react-native'
import {Container, Footer, Button} from 'native-base'
import {MainHeader} from 'app/Component'
import {left} from 'app/assets'
import styles from './FeedbackScreenStyle'
import { feedback } from 'app/store/Feedback';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';


class FeedbackScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textareaValue: '',
        }
    }

    handleTextChange = (e) => {
        this.setState({
            textareaValue: e
        })
    }

    submitFeedback = async() => {

        if(this.state.textareaValue== ''){
            return alert('Please Enter required input')
        }
        // console.log(this.state.textareaValue + " " + this.state.queryName)
        try {
            var getToken = await AsyncStorage.getItem('Token');
            const scanHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }
            const routeParams = this.props.navigation.state.params.feedbackData
            const params = {
            "user_id": routeParams.user_id,
            "trainer_id": routeParams.trainer_id, 
            "training_id": routeParams.training_id,
            "message": this.state.textareaValue
            }

            this.props.feedback(params, this.props, scanHeader, {
                SuccessCallback: res => {
                    if (res.data) {
                        if(Platform.OS == 'android'){
                        Alert.alert(
                            'Success',
                            res.data.response.data.message,
                            [
                              {text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen')},
                            ]
                          );
                        }else{
                            this.props.navigation.navigate('HomeScreen')
                        }
                    } else {
                        alert('something went wrong')
                    }
                },
                FailureCallback: res => {
                    // console.log(res)
                    alert('something went wrong')
                }
            })

        } catch (error) {
            alert(error.message);
        }
        this.setState({
            queryName: '',
            textareaValue: null
        })
    }

    render() {
     
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Feedback Form'} 
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={{ margin: 20, flex: 1 }}>
                <Text>Feedback:</Text>
                    <TextInput
                        placeholder="Enter Your Feedback here..."
                        value={this.state.textareaValue}
                        style={styles.textareaStyle}
                        multiline
                        numberOfLines={5}
                        maxLength={40}
                        onChangeText={this.handleTextChange}
                    />
                </View>
                <Footer style={{ backgroundColor: '#f2f2f2' }}>
                    <Button full onPress={this.submitFeedback}
                        style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Submit'} </Text></Button>
                </Footer>
            
            </Container>
        )
    }
}

const mapActionCreators = {
    feedback
};

export default connect(
    null,
    mapActionCreators
)(FeedbackScreen);