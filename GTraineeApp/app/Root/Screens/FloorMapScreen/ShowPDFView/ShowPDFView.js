import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { WebView } from 'react-native-webview';
import { View, StatusBar } from 'react-native';
import { MainHeader } from "app/Component";
import { left } from 'app/assets'

export default class ShowPDFView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             file : null,
             titleName:null
        }
    }

    componentWillMount(){
        let url = this.props.navigation.getParam("url", null)
        let titleName = this.props.navigation.getParam("name", null)
        const urlType = url.split('.').pop();
        if(urlType == 'png' || urlType == 'jpg' || urlType == 'jpeg' || urlType == 'gif' || urlType == 'heic' || urlType == 'heif'){
            this.setState({
                file : url,
                titleName:titleName
            })
        }
        else{
            this.setState({
                file : 'http://docs.google.com/gview?embedded=true&url='+url,
                imgFile: false,
                titleName:titleName
            })
        }

    }

    render() {
        return (
            <View>
                <MainHeader leftIcon={left} bodyContent={this.state.titleName}
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={{ height: '100%' }}>
                    <WebView
                        source={{ uri: this.state.file }}
                        javaScriptEnabled
                        domStorageEnabled
                        allowFileAccessFromFileURLs
                        startInLoadingState
                        originWhitelist={['*']}
                        mixedContentMode="compatibility"
                    />
                </View> 
            </View>

        )
    }
}
