import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";
/*All screen will be added to createStackNavigator*/
import SplashScreen from "./Root/Screens/SplashScreen";
import HomeScreen from "./Root/Screens/HomeScreen";
import AuthScreen from "./Root/Screens/AuthScreen";
import TaskSheetScreen from "./Root/Screens/TaskSheetScreen";
import TaxScreen from "./Root/Screens/TaxScreen";
import PeopleScreen from "./Root/Screens/PeopleScreen";
import LoginScreen from "./Root/Screens/LoginScreen";
import UnlockPINScreen from "./Root/Screens/UnlockPINScreen";
/*add all screen above this line*/
import {fromRight} from "././navigationTransitions";
import PinViewScreen from "./Root/Screens/PinViewScreen/PinViewScreen";
import PayslipScreen from "./Root/Screens/PayslipScreen/PayslipScreen";
import LettersScreen from "./Root/Screens/Letters/LettersScreen";
import ChangePasswordScreen from "./Root/Screens/ChangePasswordScreen/ChangePasswordScreen";
import TravelScreen from "./Root/Screens/TravelScreen";
import RequestScreen from "./Root/Screens/RequestScreen"
import HolidayListScreen from "./Root/Screens/HolidayListScreen";
import ActivatePinViewScreen from "./Root/Screens/ActivatePinViewScreen";
import ReActivatePinViewScreen from "./Root/Screens/ActivatePinViewScreen/ReActivatePinViewScreen";
import LocationScreen from "./Root/Screens/LocationScreen";
import FlexiBenefitScreen from "./Root/Screens/FlexiBenefitScreen";
import BenifitsScreen from "./Root/Screens/BenifitsScreen";
import NewsScreen from "./Root/Screens/NewsScreen";
import BeverageScreen from "./Root/Screens/BeverageScreen/BeverageScreen";
import ScanQRScreen from './Root/Screens/HomeScreen/ScanQRTab';
import FloorMapScreen  from "./Root/Screens/FloorMapScreen/FloorMapScreen";
import NotificationScreen  from "./Root/Screens/NotificationScreen/NotificationScreen";
import TrainingScheduleScreen  from "./Root/Screens/TrainingScheduleScreen/TrainingScheduleScreen";
import MyTrainingScreen from "./Root/Screens/MyTrainingScreen/MyTrainingScreen";
import ShowPDFView from "./Root/Screens/FloorMapScreen/ShowPDFView";
import ReferenceScreen from "./Root/Screens/ReferenceScreen";
import NewsDetailScreen from './Root/Screens/NewsDetailScreen';
import TrainingExamScreen  from "./Root/Screens/TrainingExamScreen/TrainingExamScreen";
import QRScanner from "./Root/Screens/BeverageScreen/Scanner/QRScanner";
import AllTrainingScreen from "./Root/Screens/AllTrainingScreen/AllTrainingScreen";
import FeedbackScreen from "./Root/Screens/FeedbackScreen/FeedbackScreen";
import ExamQuestionScreen from "./Root/Screens/TrainingExamScreen/ExamQuestionScreen/ExamQuestionScreen";
import RegisterQueryScreen from "./Root/Screens/RegisterQueryScreen/RegisterQueryScreen";
import AssesmentList from './Root/Screens/TrainingExamScreen/AssesmentList/AssesmentList'
import ResultScreen from './Root/Screens/ResultScreen/ResultScreen';
import MailScreen from "./Root/Screens/PeopleScreen/MailScreen";
import TopicListScreen from "./Root/Screens/TopicListScreen/TopicListScreen";
import ExamTopicListScreen from "./Root/Screens/TrainingExamScreen/ExamTopicListScreen/ExamTopicListScreen";
import VendorHomeScreen from './Root/Screens/VendorHomeScreen/VendorHomeScreen';
import GeneralFeedbackScreen  from "./Root/Screens/GeneralFeedbackScreen/GeneralFeedbackScreen";

console.disableYellowBox = true;

const StackScreen = createStackNavigator(
    {
        SplashScreen: {
            screen: SplashScreen,
            navigationOptions: () => ({
                header: null
            })
        }, AuthScreen: {
            screen: AuthScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        BeverageScreen: {
            screen: BeverageScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        FloorMapScreen: {
            screen: FloorMapScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        NotificationScreen: {
            screen: NotificationScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        TrainingScheduleScreen: {
            screen: TrainingScheduleScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        ScanQRScreen: {
            screen: ScanQRScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: () => ({
                header: null
            })
        }, TaskSheetScreen: {
            screen: TaskSheetScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        TaxScreen: {
            screen: TaxScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        PeopleScreen: {
            screen: PeopleScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        PinViewScreen: {
            screen: PinViewScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        ActivatePinViewScreen: {
            screen: ActivatePinViewScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        ReActivatePinViewScreen: {
            screen: ReActivatePinViewScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        PayslipScreen:{
            screen: PayslipScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        LettersScreen:{
            screen: LettersScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        ChangePasswordScreen:{
            screen: ChangePasswordScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        TravelScreen:{
            screen: TravelScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        RequestScreen:{
            screen: RequestScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        HolidayListScreen:{
            screen:HolidayListScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        LocationScreen:{
            screen:LocationScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        FlexiBenefitScreen:{
            screen:FlexiBenefitScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        BenifitsScreen:{
            screen:BenifitsScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        NewsScreen:{
            screen:NewsScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        NewsDetailScreen:{
            screen:NewsDetailScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        UnlockPINScreen:{
            screen:UnlockPINScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        ShowPDFScreen:{
            screen:ShowPDFView,
            navigationOptions:()=>({
                header:null
            })
        },
        ReferenceScreen:{
            screen:ReferenceScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        MyTrainingScreen:{
            screen:MyTrainingScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        TrainingExamScreen:{
            screen:TrainingExamScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        QRScanner:{
            screen:QRScanner,
            navigationOptions:()=>({
                header:null
            })
        },
        AllTrainingScreen:{
            screen:AllTrainingScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        FeedbackScreen:{
            screen:FeedbackScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        ExamQuestionScreen: {
            screen:ExamQuestionScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        RegisterQueryScreen:{
            screen:RegisterQueryScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        AssesmentList: {
            screen: AssesmentList,
            navigationOptions:()=>({
                header:null
            })
        },
        ResultScreen: {
            screen: ResultScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        MailScreen: {
            screen: MailScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        TopicListScreen: {
            screen: TopicListScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        ExamTopicListScreen:{
            screen: ExamTopicListScreen,
            navigationOptions:()=>({
                header:null
            })
        },
         VendorHomeScreen: {
            screen: VendorHomeScreen,
            navigationOptions:()=>({
                header:null
            })
        },
        GeneralFeedbackScreen:{
            screen: GeneralFeedbackScreen,
            navigationOptions:()=>({
                header:null
            })
        }
    },

    {
        /*
         * fromRight will animate screen from right side while open
         */
        transitionConfig: nav => fromRight()
    }
);

export default createAppContainer(StackScreen);
