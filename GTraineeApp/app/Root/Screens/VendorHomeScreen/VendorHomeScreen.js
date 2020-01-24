import React, { Component } from 'react';
import {View, Text , FlatList,Alert , Platform } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container , Button, Content } from 'native-base';
import { MainHeader, Loader } from "app/Component";
import styles from './VendorHomeScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {getVendorList} from 'app/store/VendorList/actions';
import { connect } from 'react-redux';
import NoDataFoundView from 'app/Component/NoDataFoundView';
import ItemView from './ItemView/ItemView';
import { dateFormateValue } from 'app/Constants';

 class VendorHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          noDataFound: false,
          listData: [],
          isFetching: false,
          todayDate: null,
          count: null
        };
      }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
        this.getApiData() ;
      };
     
      handleDatePicked = date => {
        var selectedDate = dateFormateValue(date)
        this.setState({
            todayDate: selectedDate
        })
        this.hideDateTimePicker();

      };

      UNSAFE_componentWillMount = async () => {
        var today = dateFormateValue(new Date())
          this.setState({
                todayDate: today
          })
        this.getApiData() ;
    }
    
    getApiData = async () => {
      try {
        var getToken = await AsyncStorage.getItem('Token');
        var date = this.state.todayDate;
        const header = {
          'Authorization': `Bearer ${getToken}`
        }
        this.props.getVendorList(null, this.props, header, date, {
          SuccessCallback: res => {
            if (res.data) {
              // console.log(res.data.response.data.length)
              if(res.data.response.data.length > 0){
                this.setState({
                  noDataFound: false,
                  listData: res.data.response.data,
                  isFetching: false,
                  count:res.data.response.data.length
                })
              }
              else{
                this.setState({
                  noDataFound: true,
                  isFetching: false,
                  count:res.data.response.data.length
                })
              }
            } else {
              this.setState({
                noDataFound: true,
                isFetching: false
              })
            }

          },
          FailureCallback: res => {
            this.setState({
              noDataFound: true,
              isFetching: false
            })
          }
        })
      } catch (error) {
        // alert(error.message);
        this.setState({
          noDataFound: true,
          isFetching: false
        })
      }
    }


    onRefresh = () => {
      this.setState({ isFetching: true });
      this.getApiData() 
   }
    
   handleLogoutClick = async() =>{
    // console.log(Platform.OS)
    if(Platform.OS == 'android'){
        Alert.alert(
            'Alert',
            'Are you sure, you want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {
                AsyncStorage.clear();
                this.props.navigation.navigate('LoginScreen')
              }
            },
            ],
            {cancelable: false},
          );
    }
    else{
        AsyncStorage.clear();
        this.props.navigation.navigate('LoginScreen')
    }
}

    render() {
      const {noDataFound,listData , count} = this.state;
      // console.log(listData)
        return (
            <Container>
             {/* <MainHeader 
                bodyContent={'User List'}
                  /> */}
              <MainHeader 
                bodyContent={'User List'}
                optionMenu={true}
                onMenuItemPress={this.handleLogoutClick}
                  />
               <View style={styles.headerContainer}>
                <Button full onPress={this.showDateTimePicker}
                            style={styles.buttonStyle}><Text style={{ color: 'white' }} > {'Select Date'} </Text></Button>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <Text style={styles.countTextStyle}>Total Count : {count}</Text>
                </View>
                {
                      this.props.loading ? <Loader loading={this.props.loading} /> :
                      noDataFound ? <NoDataFoundView /> :
                              <FlatList
                                  data={listData}
                                  onRefresh={() => this.onRefresh()}
                                  refreshing={this.state.isFetching}
                                  renderItem={({ item }) =>
                                      <ItemView item={item} />
                                  }
                              />
                  }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
  loading: state.vendorList.fetching
})

const mapDispatchToProps = {
  getVendorList
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorHomeScreen)

