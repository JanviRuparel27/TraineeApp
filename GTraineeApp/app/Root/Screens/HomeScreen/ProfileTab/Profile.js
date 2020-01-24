import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Tabs, Tab, ScrollableTab} from "native-base";
import {MainHeader} from "app/Component";
import {left} from 'app/assets'
import {View, Text} from 'react-native'
class Profile extends Component {

    render() {
        return (
            <Container>

                <MainHeader leftIcon={left} bodyContent={'Profile'} optionMenu={true}
                            backAction={() => {
                                this.props.navigation.goBack()
                            }}
                />
                <View>
                    <Text>{'Profile'}</Text>
                </View>
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(Profile);
