import React, { Component } from 'react'
import { Container, Content, Text, Footer, Button } from 'native-base'
import { MainHeader, TextView } from 'app/Component'
import { left } from 'app/assets'
import { View } from 'react-native'
import styles from './ResultScreenStyle'

export default class ResultScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            correctAns: null,
            totalQuestion:null
        }
    }
    
    componentWillMount(){
        const resultObj = this.props.navigation.state.params.params
        this.setState({
            correctAns:resultObj.correctAns,
            totalQuestion:resultObj.totalQuestion,
            timeObj:resultObj.timeObj,
            totalAttemptedQuestion:resultObj.totalAttemptedQuestion
        })
    }
    render() {
        const { correctAns,totalQuestion,timeObj, totalAttemptedQuestion } = this.state
        return (
            <Container>
                <MainHeader 
                 bodyContent={'Result'}
                    // leftIcon={left}
                    // backAction={() => {
                    //     this.props.navigation.goBack()
                    // }}
                />
                <View style={styles.viewStyle}>

                    <TextView style={styles.innerText}>{'Test Name:'}</TextView>
                    <TextView style={styles.colorText}>{'Test'}</TextView>

                    <TextView style={styles.innerText}>{'Time Taken:'}</TextView>
                    <TextView style={styles.colorText}>{timeObj.h}{':'}{timeObj.m}{':'}{timeObj.s}</TextView>

                    <TextView style={styles.innerText}>{'Correct Answers'}</TextView>
                    <TextView style={styles.colorText}>{correctAns}{'/'}{totalQuestion}</TextView>

                    <TextView style={styles.innerText}>{'Total Attempted'}</TextView>
                    <TextView style={styles.colorText}>{totalAttemptedQuestion}{'/'}{totalQuestion}</TextView>

                    <TextView style={styles.innerText}>{'Note:'}</TextView>
                    <TextView style={styles.textStyle1}>{'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'}</TextView>

                </View>
                <Footer style={{ backgroundColor: '#f2f2f2' }}>
                    <Button full
                        onPress={() => this.props.navigation.navigate('HomeScreen')}
                        style={styles.buttonStyle} ><Text style={{ color: 'white' }} > {'Next'} </Text></Button>
                </Footer>
            </Container>
        )
    }
}
