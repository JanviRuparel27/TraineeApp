import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Body, Card, Content, Text,Tabs, Tab} from 'native-base';
import {TextView} from 'app/Component';
import styles from './ItemViewStyle';
import cs from 'app/CommonStyle';
import {imageNews} from 'app/assets';
import { dateFormate } from '../../../../Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ItemView extends Component {

  render() {
    const {item} = this.props;
    // console.log(item)
    return (
      <View>
        {/* <View style={styles.newsTypeMainView}>
          <Card style={styles.card}>
            <TextView style={styles.newsTypeStyle}>{item.CategoryName}</TextView>
          </Card>
        </View> */}
        <View style={styles.mainView}>
        <TouchableOpacity 
         onPress={() => {
                this.props.onItemClick && this.props.onItemClick(item)
            }}
        >
          <Card style={{borderRadius: 5}} >
            <View style={{flexDirection: 'row'}} >
              <Image
                style={[styles.imageStyle, cs.shadow]}
                source={{uri: item.ImagePath}}
              />
              <Body style={{alignItems: 'flex-start' , display:'flex'}}>
                <View style={styles.innerView}>
                  <TextView  numberOfLines={3} style={styles.headerText}>{item.Title}</TextView>
                  <View style={{flexDirection: 'row'}}>
                    <TextView style={styles.dateText}>{dateFormate(item.EventDate)}</TextView>
                    <TextView style={styles.dateText}>{' | '}</TextView>
                    <TextView  style={styles.dateText}>{item.CategoryName}</TextView>
                  </View>
                  {/* <TextView numberOfLines={1} style={styles.detailText}>{'item.newsDetail'}</TextView> */}
                </View> 
              </Body>
            </View>
          </Card>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ItemView;
