/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer, createStackNavigator} from "react-navigation";
import {GTLStyleableButton} from 'react-native-gtlcomponent'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class App extends Component {
  onSuccess = (e) => {
    alert(e.data)
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <QRCodeScanner
            onRead={this.onSuccess}
            //flashMode={QRCodeScanner.Constants.FlashMode.torch}
            topContent={
              <Text style={styles.centerText}>
                Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                    </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        <GTLStyleableButton
        onPress={(v)=>{alert(v)}}
        onLongPress={(v)=>{alert(v)}}
        value={"My Button with own style"}
        buttonStyle={styles.btnStyle}
        textStyle={{ color: "#fff", margin: 5, textAlign: "center" }}
      />
        </SafeAreaView>
      </>
    );
  }
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  btnStyle:{
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 2,
    margin: 5,
    width: wp('80%')
  }
});

export default createAppContainer(AppNavigator);

