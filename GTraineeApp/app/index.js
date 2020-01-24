import React from "react";
import {Provider} from "react-redux";
import {configureStore} from "./store";
import Navigation from "./Navigation";
import {Root} from "native-base";
import  {API,DevelopmentMode} from "react-native-gtlcomponent";
import  {apiConfig} from 'app/Constants'
import Container from "./Container";
import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager'

const store = configureStore();

/* Default values */
KeyboardManager.setEnable(true);

API.getInstance().build(DevelopmentMode.DEVELOPMENT, apiConfig);
const App = () => (
    <Provider store={store}>
        <Root>
            <Container />
            {/*<Navigation/>*/}
        </Root>
    </Provider>
);

export default App;
