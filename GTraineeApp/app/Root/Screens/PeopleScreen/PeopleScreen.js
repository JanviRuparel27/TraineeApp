import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import { FilterView, MainHeader, SearchView } from 'app/Component'
import { iconMic, iconSearch, left, notificaiton } from 'app/assets'
import { FlatList, Linking, View, Text } from 'react-native'
import ItemView from "./ItemView";
import {getContacts} from '../../../store/EmergencyContacts/actions'
import AsyncStorage from '@react-native-community/async-storage';
import NoDataFoundView from 'app/Component/NoDataFoundView';

const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

class PeopleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            isSearchStarted: false,
            results: [],
            flatListData: null,
            noDataFound:false
        }
    }

    onSpeechStart(e) {
        this.setState({
            isSearchStarted: true,
        });
    }
    handleWhatsAppClick = (data) => {
        Linking.openURL(
            'http://api.whatsapp.com/send?phone=' + data
        );
    }

    handleSkypeClick = (data) => {
        // Linking.openURL(`skype:live:nidhi.patel_16?chat`);

        let url = `skype:live:${data}?chat`
        Linking.canOpenURL(url).then(supported => {

            if (!supported) {
                alert('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => alert('An error occurred', err));

        //Linking.openURL(`skype:live:${data}?chat`)
    }

    handleMailIDClick = (data) => {
        this.props.navigation.navigate('MailScreen',{ emailId: data })
        // let url = `mailto:` + data
        // Linking.canOpenURL(url + data).then(supported => {

        //     if (!supported) {
        //         alert('Can\'t handle url: ' + url);
        //     } else {
        //         return Linking.openURL(url);
        //     }
        // }).catch(err => alert('An error occurred', err));
        //Linking.openURL(`mailto:` + data)
        // Linking.openURL(`inbox-gmail:`+data)
    }
    handleCallClick = (data) => {
        //Linking.openURL(`tel:${data}`)
        let url = `tel:${data}`
        Linking.canOpenURL(url).then(supported => {

            if (!supported) {
                alert('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => alert('An error occurred', err))
    }

    async componentWillMount(){
        try {
            var jsonOfItem = await AsyncStorage.getItem('Token');
              const contactsHeader = {
                    'Authorization': `Bearer ${jsonOfItem}`
                }

        this.props.getContacts(null , this.props, contactsHeader , {
            SuccessCallback: res => {
               if(res.data){
                //    this.setState({
                //     flatListData : res.data.response.data
                //    })
                if(res.data.response.data.length > 0){
                    this.setState({
                        flatListData: res.data.response.data
                    })
                }else{
                    this.setState({
                        noDataFound: true
                    })
                }
               }
            }, FailureCallback: res => {
                alert('something went wrong')
                this.setState({
                    noDataFound:true
                })  
            }
        })
            return jsonOfItem;
        } catch (error) {
          alert(error.message);
          this.setState({
            noDataFound:true
        })  
        }
    }

    render() {
        const { data, flatListData, noDataFound,isSearchStarted } = this.state;
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={"Point of Contact"} 
                    backAction={() => {
                        this.props.navigation.goBack()
                    }} />
                    {
                        noDataFound ? <NoDataFoundView navigation={this.props.navigation} /> :
                        <FlatList
                        data={flatListData}
                        renderItem={({ item }) =>
                            <ItemView item={item} handleCallClick={this.handleCallClick}
                                handleMailIDClick={this.handleMailIDClick}  />
                        }
                    />
                    }
            </Container>

        );
    }
}

const mapActionCreators = {getContacts};
const mapStateToProps = state => {
    return {};
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(PeopleScreen);

