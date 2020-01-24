import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Content} from "native-base";
import {MainHeader} from "app/Component";
import {notificaiton, left} from 'app/assets'
import {View, Text} from "react-native";
import {TextView} from 'app/Component';
import styles from './PinViewSceenStyle';
import PinView from 'app/Component/PinView';

class PinViewScreen extends Component {
    handleOtp = (otp) => {
        //alert(otp+"alert")
        this.props.navigation.navigate('ChangePasswordScreen',{"isForgot":true})
    }
    render() {
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Verify PIN'} 
                  backAction={() => {
                    this.props.navigation.goBack()
                }}
                />
                <Content>
                    <View style={styles.container}>
                        <TextView style={styles.textColor}>{'Enter'} <TextView
                            style={styles.textColor1}>{'6'}</TextView> {'Digit PIN'} </TextView>
                    </View>
                    <View>
                        <PinView handleOtp={this.handleOtp} navigation={this.props.navigation}/>
                    </View>

                </Content>
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(PinViewScreen);
