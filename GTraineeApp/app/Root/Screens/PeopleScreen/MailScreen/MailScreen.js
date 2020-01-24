import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Footer, Button } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { View, Text, TextInput } from "react-native";
import styles from './MailScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {sendMailCall} from 'app/store/sendMail';

class MailScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            subject:'',
            emailId:'',
            name:''
        }
    }

    componentWillMount() {
        let emailId = this.props.navigation.getParam("emailId", null)
        this.setState({
            emailId:emailId.email,
            name:emailId.name
        })
    }

    handleSubjectChange = (e) => {
        this.setState({
            subject: e
        })
    }

    handleMsgChange = (e) => {
        this.setState({
            message: e
        })
    }

    submitQuery = async() => {

        if(this.state.subject=='' ||this.state.message== ''){
            return alert('Both fields are required')
        }

        // alert(this.state.subject + " "+ this.state.message + " "+this.state.emailId)
        // console.log(this.state.textareaValue + " " + this.state.queryName)
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            var getUserEmail = await AsyncStorage.getItem('UserEmail');
            var getUserName = await AsyncStorage.getItem('UserName');
            const sendMailHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }
            const params ={
                "name": this.state.name,
                "to": this.state.emailId,
                "subject": this.state.subject,
                "body": this.state.message,
                "from_mail": getUserEmail,
                "from_name": getUserName
            }

            this.props.sendMailCall(params, this.props, sendMailHeader, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        alert(res.data.response.data.message)
                        this.props.navigation.navigate('HomeScreen')
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
            subject: '',
            message: ''
        })
    }
    

    render() {
        const { message, subject} = this.state
        return (
            <Container>
                <MainHeader bodyContent={'Mail Box'} leftIcon={left}
                 backAction={() => {
                    this.props.navigation.goBack()
                }} />
                <View style={{ margin: 20, flex: 1 }}>
                    <TextInput
                        value={subject}
                        style={styles.textBoxStyle}
                        maxLength={20}
                        placeholder = {'subject'}
                        onChangeText={this.handleSubjectChange}
                    />
                    <TextInput
                        value={message}
                        style={styles.textareaStyle}
                        multiline
                        numberOfLines={3}
                        maxLength={40}
                        placeholder = {'Message'}
                        onChangeText={this.handleMsgChange}
                    />
                </View>
                <Footer style={{ backgroundColor: '#f2f2f2' }}>
                    <Button full onPress={this.submitQuery}
                        style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Submit'} </Text></Button>
                </Footer>
            </Container>


        );
    }
}


const mapActionCreators = {
    sendMailCall
};

export default connect(
    null,
    mapActionCreators
)(MailScreen);