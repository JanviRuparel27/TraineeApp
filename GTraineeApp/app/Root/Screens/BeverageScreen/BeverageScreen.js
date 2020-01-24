import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { MainHeader } from "app/Component";
import { notificaiton, left, breakfast,snacks,tea} from 'app/assets'
import { View, FlatList, TouchableOpacity } from "react-native";
import { TextView } from 'app/Component'
import { Card, CardItem, Body, Thumbnail, Text, Footer, Button } from 'native-base';
import BeverageItemView from "./ItemView/BeverageItemView";
import styles from './BeverageScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';

class BeverageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flatListData: [
                { id: '1', title: 'Breakfast', image: breakfast },
                { id: '2', title: 'Tea', image: tea },
                { id: '3', title: 'Snacks', image: snacks },
            ],
            flag: null,
            teaTime: [
                { id: '1', title: 'Tea 1' },
                { id: '2', title: 'Tea 2' }
            ],
            radioSelected: null,
            selectedRadioName:null,
            IsTea:null
        }
    }
    handleSelectClick = (item) => {
        this.setState({
            flag: item.title,
            selectedRadioName:null,
            radioSelected:null
        })
    }
    radioClick(item) {
        this.setState({
            radioSelected: item.id,
            selectedRadioName: item.title,
            IsTea:item.id
        })
    }

    selectedItemTea = () => {
        //alert(this.state.IsTea)
        //let IsTea = this.state.IsTea
        let IsTea = 1,
        IsSnacks = 0,
        Slot = this.state.IsTea
        this.submitBeverage(IsSnacks,IsTea,Slot)
    }
    selectedItemBreakfast = () => {
        this.props.navigation.navigate("QRScanner", null )
    }
    selectedItemSnacks = () => {
      
        let IsTea = 0,
        IsSnacks = 1,
        Slot = 0
        this.submitBeverage(IsSnacks,IsTea,Slot)
    }

    submitBeverage = async(IsSnacks,IsTea,Slot) => {
        try {
            var EmpId = await AsyncStorage.getItem('EmployeeId');
            let param = {
                "EmpId":EmpId,"IsSnacks":parseInt(IsSnacks),"IsTea":parseInt(IsTea),"Slot":parseInt(Slot)
            }
            this.props.navigation.navigate("QRScanner", { data: param })

        } catch (error) {
            alert('something went wrong')
        }
    }
    
    render() {
        const { flatListData, flag, teaTime, radioSelected, selectedRadioName } = this.state
        return (
            <Container style={styles.container}>
                <MainHeader bodyContent={'Beverages'} leftIcon={left} 
                    backAction={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <Content>
                    <View style={styles.flatListStyle}>
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <TextView style={styles.textStyle}>{'Please Select Your Menu'}</TextView>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatContainerStyle}
                            style={{ marginTop: 10 }}
                            numColumns={3}
                            data={flatListData}
                            renderItem={({ item }) =>
                                <BeverageItemView item={item} selectedValue={flag} onItemClick={(e) => this.handleSelectClick(item)} />
                            }
                        />
                    </View>
                    {
                        flag == 'Tea' &&
                        <View style={styles.outerView}>
                            <View style={{ alignItems: 'center', margin: 20 }}>
                                <TextView style={styles.textStyle}>{'Please Select Time'}</TextView>
                            </View>
                            <View>
                                {
                                    teaTime.map((item, index) => (
                                        <TouchableOpacity key={item.id} onPress={this.radioClick.bind(this, item)}>
                                            <View style={styles.innerView}>
                                                <View style={styles.outerCircle}>
                                                    {
                                                        item.id == this.state.radioSelected ?
                                                            <View style={styles.innerCircle} />
                                                            : null
                                                    }
                                                </View>
                                                <TextView style={{ paddingLeft: 20 }}>{item.title}</TextView>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    }
                </Content>
                {
                        flag=='Snacks' &&
                        <Footer style={{ backgroundColor: '#f2f2f2' }}>
                        <Button full onPress={this.selectedItemSnacks}
                            style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Scan'} </Text></Button>
                        </Footer>
                    }
                     {
                        flag=='Breakfast' &&
                        <Footer style={{ backgroundColor: '#f2f2f2' }}>
                        <Button full onPress={this.selectedItemBreakfast}
                            style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Scan'} </Text></Button>
                        </Footer>
                    }
                    {
                        flag=='Tea' && radioSelected!=null && 
                        <Footer style={{ backgroundColor: '#f2f2f2' }}>
                        <Button full onPress={this.selectedItemTea}
                            style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Scan'} </Text></Button>
                        </Footer>
                    }
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(BeverageScreen);