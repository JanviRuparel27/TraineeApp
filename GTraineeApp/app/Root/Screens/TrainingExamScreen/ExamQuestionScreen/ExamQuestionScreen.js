import React, { Component } from 'react';
import { View, Text , FlatList, Alert} from 'react-native';
import { Container , Footer  , Header , Content , Button , List , ListItem} from 'native-base';
import { MainHeader, Loader } from 'app/Component';
import { left } from 'app/assets';
import styles from './ExamQuestionScreenStyle';
import { connect } from 'react-redux';
import ItemView from './ItemView';
import {getAssesmentQuestion} from 'app/store/trainingAssesment/actions';
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import moment from 'moment';
import TimerCountdown from './Timer/TimerCountdown';
import {answerSubmit} from 'app/store/answerSubmit'
let counter = 0

class ExamQuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            noDataFound: false,
            startExam: false,
            timer:null,
            seconds:null,
            correctAns:null,
            totalQuestion:null,
            answerArr:[],
            timeObj:'',
            startTime: new moment(),
            assesmentId:null,
            trainingId:null,
            instructions:null,
            isLoading:true
        }
    }
    UNSAFE_componentWillMount = async () => {
        let timer = this.props.navigation.state.params.time;

        let assesmentId = this.props.navigation.state.params.id;
        let trainingId = this.props.navigation.state.params.trainingId;
        let instructions = this.props.navigation.state.params.instructions
        var timerArr = timer.split(":");
        let seconds = null;
        seconds = (timerArr[0] * 3600) + (timerArr[1] * 60) + (timerArr[2] * 1)
        // console.log((timerArr[0] * 3600) + " " + timerArr[1] * 60 + " "+timerArr[2])
        // console.log(seconds)
        this.setState({
            timer:timer,
            seconds:seconds,
            assesmentId:assesmentId,
            trainingId:trainingId,
            instructions:instructions
        })
        try {
            let trainingId = this.props.navigation.state.params.id
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');
            const floorHeader = {
                'Authorization': `Bearer ${getToken}`
            }
            this.props.getAssesmentQuestion(null, this.props, floorHeader, trainingId,getUserId, {
                SuccessCallback: res => {
                    if (res.data) {
                        if(res.data.response.data.show_result == true){
                            this.setState({
                                questions: res.data.response.data.questions,
                                totalQuestion:res.data.response.data.questions.length,
                                isLoading:false
                            })
                        }
                        else{
                            this.setState({
                                noDataFound: true,
                                startExam: false,
                                isLoading:false
                            })
                        }
                    
                    } else {
                        this.setState({
                            noDataFound: true,
                            isLoading:false
                        })
                    }
                },
                FailureCallback: res => {
                    console.log(res)
                    alert('something went wrong')
                    this.setState({
                        noDataFound: true,
                        isLoading:false
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
    
    handleStartExamClick = () => {
        this.setState({
            startExam: true
        })
        // console.log(hours)
        // console.log(minutes)
        // console.log(seconds)
        // var fiveMinutes =  60 * minutes;
        // this.startTimer(fiveMinutes);
        
    }

    diff_minutes = (dt2, dt1) => {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        console.log(diff)
        return Math.abs(Math.round(diff));
    }

    handleSubmitExam = () => {
        //alert(this.state.correctAns + " " + this.state.totalQuestion)
        //console.log(this.state.answerArr, "here")
        
        let endTime = new moment();
        // let sec = endTime.diff(this.state.startTime, 'seconds') 
        // let min = endTime.diff(this.state.startTime, 'minutes')
        // let hr = endTime.diff(this.state.startTime, 'hours')
        let seconds = Math.floor((endTime - (this.state.startTime))/1000);
        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        let timeObj = {
            "h": hours,
            "m": minutes,
            "s": seconds
          };

        let totalAttemptedQuestion = this.state.answerArr.length
        //console.log(hr+ " "+min+" "+ seconds)
        
        this.state.questions.map((data)=>{
            this.state.answerArr.map((item) => {
                if(item.question_id == data.question_id){
                    if(item.answer_id == data.correct_answer){
                        // console.log(item.questionId,"questionId")
                        // console.log(data.question_id," data questionId")
                        counter = counter+1
                    }
                }
            })
            
        })
        // console.log(counter, "counter")
        // console.log(this.state.timeObj,"timeObj")
        //this.props.navigation.navigate('ResultScreen')
        
        let resultObj = {
            correctAns:counter,
            totalQuestion:this.state.totalQuestion,
            timeObj:timeObj,
            totalAttemptedQuestion:totalAttemptedQuestion
        }

        this.submitAnswer(resultObj)
        // this.props.navigation.navigate('ResultScreen',{params:resultObj})
    }

    submitAnswer = async(resultObj) => {
        try {
            var getToken = await AsyncStorage.getItem('Token');
            var getUserId = await AsyncStorage.getItem('UserId');

            const ansSubmitHeader = {
                'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            }

            const params = {
            "user_id": getUserId,
            "training_id": this.state.trainingId, 
            "assessment_id": this.state.assesmentId,
            "questions": this.state.answerArr
            }

            this.props.answerSubmit(params, this.props, ansSubmitHeader, {
                SuccessCallback: res => {
                    if (res.data) {
                        // Alert.alert(
                        //     'Success',
                        //     res.data.response.data.message,
                        //     [
                        //       {text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen') },
                        //     ]
                        //   );
                        if(res.data.response.data.message){
                            alert(res.data.response.data.message)
                            this.props.navigation.navigate('ResultScreen',{params:resultObj})
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
    }

    // getSelectedAnsData(val){
    //     // do not forget to bind getData in constructor
    //     console.log(val);
    // }
    handleSubmitCount = (ansArr) => {
        //console.log(ansArr)
        this.setState({ answerArr:ansArr })
    }

    // handleTimeChange = (time) => {
    //     this.setState({
    //         timeObj: time
    //     })
    // }

    componentWillUnmount(){
        counter = 0
    }

    render() {
        const {noDataFound,questions, isLoading , startExam, instructions} = this.state;
        // const timer = this.props.navigation.state.params.time;
        const result = this.props.navigation.state.params.result
        if(!result){
            return (
                <Container>
                     <MainHeader leftIcon={left} bodyContent={'Exam Paper'}
                        backAction={() => {
                            this.props.navigation.goBack()
                        }}
                    />
                        {
                            isLoading ? <Loader /> : 
                            noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                            <View style={styles.nameContainerStyle}>
                            <Text style={styles.testNameStyle}>Exam Name : {this.props.navigation.state.params.name} </Text>
                            <View style={{dislay: 'flex' , flexDirection:'row' }}>
                            <Button
                                onPress={() => alert(instructions)}
                                style={styles.viewButtonStyle}
                            >
                                <Text style={styles.buttonTextStyle}>View Instruction</Text>
                            </Button>
                            {
                                startExam ? 
                                    <View
                                        style={styles.viewButtonStyle1}
                                    >
                                        {/* <Text style={styles.buttonTextStyle}>{this.state.timer}</Text> */}
                                        {/* <TimerCountdown initialTime={this.state.seconds}/> */}
                                        <TimerCountdown  handleSubmit={this.handleSubmitExam} initialTime={this.state.seconds}/>
                                    </View>
                            : null
                            }
                           
                            </View>
                        </View>
                        }
                    {
                        startExam ? 
                            this.props.loading ? <Loader /> :
                            noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                                <FlatList
                                    data={questions}
                                    renderItem={({ item }) =>
                                        <ItemView handleCount={this.handleSubmitCount} item={item} result={false}/>
                                    }
                                />
                        :
                        null
                    }
                    {
                        startExam ?
                        this.props.loading ? <Loader /> :
                            noDataFound ? null :
                                <Footer style={{ backgroundColor: '#f2f2f2' }}>
                                    <Button full
                                        onPress={this.handleSubmitExam}
                                        style={styles.buttonStyle} ><Text style={{ color: 'white' }} > {'Submit Exam'} </Text></Button>
                                </Footer>
                        : 
                        isLoading ? <Loader /> :
                        noDataFound ? null :
                        <View style={{flex:1,display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                            <Button full
                                onPress={this.handleStartExamClick}
                                style={styles.startButtonStyle} ><Text style={{ color: 'white' , fontSize: 22 }} > {'Start Exam'} </Text></Button>
                        </View>
                          
                    }
    
               
                </Container>
            )
        }
        else{
            return(
                <Container>
                    <MainHeader leftIcon={left} bodyContent={'Assesment Result'}
                            backAction={() => {
                                this.props.navigation.goBack()
                            }}
                        />
                     {
                         this.props.loading ? <Loader /> :
                            noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                                <FlatList
                                    data={questions}
                                    renderItem={({ item }) =>
                                        <ItemView item={item} result={true}/>
                                    }
                                />
                    }
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    loading: state.allTraining.fetching,
})

const mapDispatchToProps = {
    getAssesmentQuestion,
    answerSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamQuestionScreen)
