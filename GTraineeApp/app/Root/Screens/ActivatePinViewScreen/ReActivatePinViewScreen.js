import React, {Component} from 'react'
import {Container, Content} from "native-base";
import {View} from 'react-native'
import styles from './ActivatePinViewScreenStyle'
import {TextView} from 'app/Component';
import PinView from 'app/Component/PinView';
import CodeInput from "../../../Component/PinView/PinView";
import {color} from "../../../Theme";
import {NavigationActions, StackActions} from "react-navigation";
import {SesstionKey} from "../../../Constants";
import SessionManager from "react-native-gtlcomponent/SessionManager";
import {showToast, ToastType} from "../../../Utils";

export default class ActivatePinViewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: undefined,
            confCode: undefined
        };
    }

    _onFinishCheckingCode1(isValid) {
        if (isValid === this.state.code) {
            SessionManager.storeKeyValue(SesstionKey.ISPINSET, this.state.code).then(() => {
                showToast("PIN Successfully created", ToastType.SUCCESS);
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "HomeScreen"
                        })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            });


        } else {
            showToast("PIN does not Match ", ToastType.DANGER);

        }

    }

    componentDidMount(): void {
        let pin = this.props.navigation.getParam("pin", null);
        if (pin !== null)
            this.setState({code: pin})
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <TextView style={styles.textColor}>{'Re-Enter'} <TextView
                            style={styles.textColor1}>{'4'}</TextView> {'Digit PIN'} </TextView>
                    </View>
                    <View>
                        <CodeInput
                            ref="codeInputRef2"
                            secureTextEntry
                            activeColor={color._018CCA}
                            inactiveColor={color._018CCA}
                            autoFocus={true}
                            ignoreCase={true}
                            inputPosition='center'
                            size={40}
                            onFulfill={(isValid) => {
                                this._onFinishCheckingCode1(isValid)
                            }}
                            onCodeChange={(code) => {
                                this.setState({confCode: code})
                            }}
                        />

                    </View>

                </Content>
            </Container>
        )
    }
}
