import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left } from 'app/assets';
import {FlatList} from 'react-native'
import ItemView from './ItemView';

class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flatListData: [
                {
                    id: 1,
                    subject:'Gateway Digital Visited Sanoma in Slush19',
                    message:'Gateway Digital’s existing customer Sanoma had created complimentary 360-degree Video of Prashant Shah.'
                },
                {
                    id: 2,
                    subject:'Blanket Distribution Drive – A Gateway Foundation Initiative',
                    message:'We are pleased to inform that The Gateway Foundation has undertaken its second initiative of Blanket Distribution Drive, starting from this week.'
                },
                {
                    id: 3,
                    subject:'Gateway Digital attends Slush 2019 – World’s Largest Startup, Corporates and Investor event in Helsinki',
                    message:'Slush is a unique event that started in Helsinki to promote tech startups, and today it has spread across many startups, corporates, tech partners and investors.'
                },
                {
                    id: 4,
                    subject:'GIFT Programme – A Gateway initiative for the Fast Track Career Development',
                    message:'We are delighted to announce that one of our team members Mr. Govind S Rawat, who started his career with us as a Senior Software Engineer, has gone through the various evaluation processes and has successfully cleared GIFT.'
                },
                {
                    id: 5,
                    subject:'Gateway Digital Visited Sanoma in Slush19',
                    message:'Gateway Digital’s existing customer Sanoma had created complimentary 360-degree Video of Prashant Shah.'
                },
                {
                    id: 6,
                    subject:'Gateway Digital attends Slush 2019 – World’s Largest Startup, Corporates and Investor event in Helsinki',
                    message:'Slush is a unique event that started in Helsinki to promote tech startups, and today it has spread across many startups, corporates, tech partners and investors.'
                }
            ]
        }
    }
    render() {
        const {flatListData} = this.state;
        return (
            <Container>
            <MainHeader leftIcon={left} bodyContent={'Notification'}
                backAction={() => {
                    this.props.navigation.goBack()
                }}
            />
              <FlatList
                    data={flatListData}
                    renderItem={({ item }) =>
                        <ItemView item={item}   />
                    }
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
