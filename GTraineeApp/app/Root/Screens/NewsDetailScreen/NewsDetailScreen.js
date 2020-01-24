import React, { Component } from 'react'
import { View, Text, FlatList , Dimensions , ImageBackground} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Container } from "native-base";
import { CarouselItem, MainHeader  , Loader} from "app/Component";
import styles from "./NewsDetailScreenStyle";
import {left} from 'app/assets'
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import {getNewsDetail} from '../../../store/newsDetail/action'
import NoDataFoundView from 'app/Component/NoDataFoundView';
import Video from 'react-native-video';

import VideoPlayer from 'react-native-video-player';



const screenWidth = Math.round(Dimensions.get('window').width);

class NewsDetailScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        newsImages : [],
        newsData: [],
        noDataFound: false,
        newsVideo : '',
        thumbnailImage: ''
        }
    }
    

    _renderItem({ item, index }) {
        return (
        <ImageBackground
            source={{uri: item}}
            style={[styles.carouselStyle]}>
        </ImageBackground>
        );
    }

    UNSAFE_componentWillMount = () => {
            let newsFeedId = this.props.navigation.state.params.NewsFeedId
            this.props.getNewsDetail(newsFeedId ,null, {
                SuccessCallback: res => {
                    if (res.data) {
                        this.setState({
                            newsData: res.data.Data.NewsFeed
                        })
                        let imageUrl = res.data.Data.NewsFeed.ImagePath
                        const urlType = imageUrl.split('.').pop();
                        if(urlType == 'png' || urlType == 'jpg' || urlType == 'jpeg'){
                            this.setState({
                                newsImages: res.data.Data.NewsFeed.MultipleImageNames
                            })
                        }
                        else if(urlType == 'mp3' || urlType == 'mp4'){
                            this.setState({
                                newsVideo: res.data.Data.NewsFeed.MultipleVideoNames[0],
                                thumbnailImage: res.data.Data.NewsFeed.ThumnailImagePath
                            })
                        }

                        
                    } else {
                        this.setState({
                            noDataFound: true
                        })
                    }
                },
                FailureCallback: res => {
                    console.log(res)
                    alert('something went wrong')
                }
            })
            

    }
    render() {
        const { newsImages , newsData , noDataFound , newsVideo , thumbnailImage} = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'G-News'} 
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />

                    {
                    this.props.loading ? <Loader /> :
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                        <View >
                        {
                            newsImages.length > 0 ?
                            <Carousel
                            containerCustomStyle={styles.carouselContainer}
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={newsImages}
                            autoplay={true}
                            firstItem={1}
                            loop={true}
                            renderItem={this._renderItem}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth - 80}
                        />
                        : null
                        }
                        {
                            newsVideo != '' ?
                            <VideoPlayer
                             endWithThumbnail
                            thumbnail={{ uri: thumbnailImage }}
                            video={{ uri: newsVideo }}
                            ref={r => this.player = r}
                            />
                            : null
                        }
                    
                        <View style={styles.contentContainer}>
                            <Text style={styles.titleText}>{newsData.Title}</Text>
                            <View style={styles.smallTextContainer}>
                                <Text style={styles.smallText}>{newsData.FormattedPublishDate}</Text>
                                <Text style={styles.orangeText}> | </Text>
                                <Text style={styles.smallText}>{newsData.HostedBy}</Text>

                            </View>
                            <View style={styles.descriptionContainer}>
                            <WebView
                                source={{ html: `${newsData.Description}` }}
                                scalesPageToFit = {false}
                            />
                            </View>
                        </View>
                        </View>
                }
               
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.newsDetail.loading,
        newsDetailData: state.newsDetail.newsDetail.data
    };
};

const mapDispatchToProps = {
    getNewsDetail
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsDetailScreen);
