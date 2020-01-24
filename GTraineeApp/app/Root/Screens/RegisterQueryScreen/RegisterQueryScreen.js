import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Footer, Button, Toast } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets'
import { View, Text, TextInput } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import styles from './RegisterQueryScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import { registerQuery } from 'app/store/registerQuery';

class RegisterQueryScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textareaValue: '',
            queryName:''
        }
    }

    handleTextChange = (e) => {
        this.setState({
            textareaValue: e
        })
    }

    submitQuery = async() => {

        if(this.state.queryName=='' ||this.state.textareaValue== ''){
            return alert('Both fields are required')
        }
        // console.log(this.state.textareaValue + " " + this.state.queryName)
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            const scanHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }
            const params = {
                "user_id": getUserId,
                "query_type": this.state.queryName,
                "description": this.state.textareaValue
            }
            this.props.registerQuery(params, this.props, scanHeader, {
                SuccessCallback: res => {
                    //console.log(res)
                    if (res.data) {
                        //alert(res.data.response.data.message)
                        Toast.show({
                            text: res.data.response.data.message,
                            position: "bottom",
                            type: "success",
                            duration: 3000
                          })
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
            queryName: '',
            textareaValue: ''
        })
    }
    onChangeDropdownValue = (e) => {
        this.setState({
            queryName: e
        })
    }

    render() {
        let data = [{
            value: 'App',
        }, {
            value: 'Training',
        }];
        return (
            <Container>
                <MainHeader bodyContent={'Register Query'} leftIcon={left}
                 backAction={() => {
                    this.props.navigation.goBack()
                }} />
                <View style={{ margin: 20, flex: 1 }}>
                    <Dropdown
                        label='Select Query'
                        data={data}
                        value={this.state.queryName}
                        onChangeText={this.onChangeDropdownValue}
                    />
                    <TextInput
                        value={this.state.textareaValue}
                        style={styles.textareaStyle}
                        placeholder="Enter Your query here..."
                        multiline
                        numberOfLines={3}
                        onChangeText={this.handleTextChange}
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
    registerQuery
};

export default connect(
    null,
    mapActionCreators
)(RegisterQueryScreen);