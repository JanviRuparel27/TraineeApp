import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Image, TouchableOpacity} from 'react-native';
import {TextView} from 'app/Component';
import styles from './NoDataFoundViewStyle';
import {noDataFound} from 'app/assets';

class NoDataFoundView extends Component {
  render() {
    return (
      <View style={styles.contentContainer}>
        <Image style={styles.imageContainer} source={noDataFound} />
        <TextView style={styles.noDataTextStyle}>No Data Available</TextView>
        <TextView style={styles.bottomTextStyle}>
          No data is available to show you right now!
        </TextView>
        {
          this.props.navigation ? 
          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={e => this.props.navigation.navigate('HomeScreen')}>
          <TextView style={styles.buttonTextStyle}>Go to Dashboard</TextView>
        </TouchableOpacity>
        : null
        }
       
      </View>
    );
  }
}

export default NoDataFoundView;
