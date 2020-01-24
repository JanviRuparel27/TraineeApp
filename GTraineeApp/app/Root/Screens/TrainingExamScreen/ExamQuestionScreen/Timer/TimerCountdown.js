import { Button } from "native-base";
import { View, Text } from "react-native";
import React, { Component } from 'react';

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// class TimerCountdown extends Component {
// constructor(props) {
//     super(props);
//     this.state ={
//         timer: props.initialTime
//     }
//   }

//   componentDidMount(){
//     this.interval = setInterval(
//       () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
//       1000
//     );
//   }

//   componentDidUpdate(){
//     if(this.state.timer === 1){ 
//       console.log("-------------------timer count down is leaking")
//       clearInterval(this.interval);
//       this.props.onTimerElapsed()
//     }
//   }

//   componentWillUnmount(){
//    clearInterval(this.interval);
//    this.props.onTimerElapsed()
//   }

//   render() {
//     console.log(this.state.timer)
//     return (
//         <Text style={this.props.style}> {this.state.timer} </Text>
//     )
//   }
// }

// export default TimerCountdown;



class TimerCountdown extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: null };
    this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if(hours<10){
      hours= '0'+hours
    }
    if(minutes<10){
      minutes= '0'+minutes
    }
    if(seconds<10){
      seconds= '0'+seconds
    }
    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    // this.props.handleTime(obj)
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.props.initialTime);
    console.log(timeLeftVar)
    this.setState({ time: timeLeftVar, seconds:this.props.initialTime },()=>{
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    });
    
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      alert('Time is over')
      // this.props.navigation.goBack()
      this.props.handleSubmit()
      clearInterval(this.timer);
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    return(
      <View>
        <Text style={{color:'white'}}>{this.state.time.h}:{this.state.time.m}:{this.state.time.s}</Text>
      </View>
    );
  }
}
export default TimerCountdown;