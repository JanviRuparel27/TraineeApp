import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Text, Body, Thumbnail } from 'native-base';
import { View, FlatList, ImageBackground } from 'react-native'
import { dateFormate } from '../../Constants';
import styles from './CarouselItemStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CarouselItem extends React.PureComponent {
   constructor(props) {
       super(props)
       this.state = {
            newsImages: []
       }
   }

    handleNewsClick = (item) => {
        this.props.navigation.navigate('NewsDetailScreen', item);
    }

    componentWillMount(){
        let image = this.props.item.ImagePath;
        let resultImage = image.replace("Thumbnail" , "Detail");
        if(this.props.item.VideoUrl == ""){
            this.setState({
                newsImages : resultImage
            })
        }else{
            this.setState({
                newsImages : this.props.item.ImagePath
            })
        }
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={() => this.handleNewsClick(item)}>
                <ImageBackground
                    source={{ uri: this.state.newsImages }}
                    style={[styles.carouselStyle]}
                    resizeMode="stretch"
                    >
                    <View style={{
                        position: 'absolute', overflow: 'hidden',
                        bottom: 0, backgroundColor: 'rgba(0,0,0,0.50)', width: '100%'
                    }}>

                        <Text style={{
                            fontSize: 14,
                            padding: 5,
                            color: 'white',
                            width: '100%'
                        }}>{item.Title}</Text>

                        <Text style={{
                            fontSize: 14,
                            paddingLeft: 5,
                            color: 'white',
                            width: '100%'
                        }}>{item.CategoryName}</Text>

                        <Text style={styles.textStyle}>{dateFormate(item.PublishDate)}</Text>

                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}