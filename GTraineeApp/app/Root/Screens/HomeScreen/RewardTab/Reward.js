import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Content} from "native-base";
import {MainHeader} from "app/Component";
import {notificaiton} from 'app/assets'
import {View, Text} from "react-native";

class Reward extends Component {
    render() {
        return (
            <Container>
                <MainHeader  bodyContent={'Rewards'} rightIcon={notificaiton}/>
                {/*<MainHeader leftIcon={left} bodyContent={'Profile'} rightIcon={notificaiton}/>*/}
               
                <View>
                <Text>{'Rewards'}</Text>
                </View>
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(Reward);
