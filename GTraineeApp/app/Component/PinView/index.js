import React, {Component} from 'react';
import {Alert} from 'react-native';
import {color} from 'app/Theme'
import CodeInput from './PinView';
import SessionManager from "react-native-gtlcomponent/SessionManager";
import {SesstionKey} from "../../Constants";

export default class PinView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            compKey: ''
        };
    }

    _onFinishCheckingCode1(isValid) {
        this.props.handleOtp(isValid)
        //if (isValid=== this.state.compKey) {
        //  this.props.navigation.navigate("HomeScreen")
       // } else {
         // this.setState({compKey: ''})

     //   }
        // console.log(isValid);
        // if (!isValid) {
        //     Alert.alert(
        //         'Confirmation Code',
        //         'Code not match!',
        //         [{text: 'OK'}],
        //         {cancelable: false}
        //     );
        // } else {
        //     this.props.navigation.navigate("HomeScreen")
        // }
    }

    async componentDidMount(): void {
        let key = await SessionManager.getValueForKey(SesstionKey.ISPINSET)
        this.setState({compKey: key})
        //alert(JSON.stringify(key))
    }

    render() {

        return (
            <CodeInput
                ref="codeInputRef2"
                secureTextEntry
                activeColor={color._018CCA}
                inactiveColor={color._018CCA}
                autoFocus={true}
                ignoreCase={true}
                inputPosition='center'
                size={40}
                onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
                onCodeChange={(code) => {
                    this.state.code = code
                }}
            />
        );
    }
}
