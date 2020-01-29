import {combineReducers} from 'redux'

import login from './login'
import global from './global'
import news from './news'
import newsList from './newsList'
import floormap from './floorMap'
import allTraining from './allTrainingSchedule'
import myTraining from './myTrainingList'
import references from './references'
import newsDetail from './newsDetail'
import schedules from './mySchedules'
import scan from './trainingScan'
import trainingAssesment from './AssesmentList'
import breakfast from './breakfast'
import feedback from './Feedback'
import sendMail from './sendMail'
import vendorList from './VendorList'
import version from './version'
import getFeedbackQuestion from './getFeedbackQuestion'
import userGeneralFeedback from './userGeneralFeedback'
import beverage from './beverage'

export default combineReducers({
    login,
    global,
    news,
    newsList,
    floormap,
    allTraining,
    myTraining,
    references,
    newsDetail,
    schedules,
    scan,
    trainingAssesment,
    breakfast,
    feedback,
    sendMail,
    vendorList,
    version,
    getFeedbackQuestion,
    userGeneralFeedback,
    beverage
})

