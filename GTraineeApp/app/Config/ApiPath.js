import uuid from 'react-native-uuid';

const UUID = getUuid = () => {
  let data = uuid.v4();
  // console.log(data)
  let newStr = data.replace(/-/g, "z")
  // console.log(newStr)
  return newStr
}

export const APIPath = "http://10.0.1.152:8001/api";
//export const APIPath = "https://gtdh.thegatewaycorp.com/api";
export const GNNApiPath = "https://gnnservice.gatewaytechnolabs.com/api"

const loginHeaders = {
  'Content-Type': 'application/json',
  'LAuth': UUID()
}

const newsHeaders = {
  'Authorization': 'basic MzAwMQ=='
}
const headerForFileUpload = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
export const endPoints = {
  Login: { endpoint: "/Login", method: 'POST', headers: loginHeaders },
  News: { endpoint: "/NewsFeed/GetTop5TrendingNews?empId=3349", method: 'GET', headers: newsHeaders },
  NewsList: { endpoint: "/NewsFeed/GetNewsFeeds_Mobile?empId=3349&showAllRecords=false", method: 'GET', headers: newsHeaders },
  emergencyContacts: {endpoint: "/GetEmergencyContacts", method: 'GET'},
  FloorMap: { endpoint: "/GetFloorMaps", method: 'GET'},
  AllTraining: { endpoint: "/GetAllTrainings", method: 'GET'},
  MyTraining: { endpoint: "/UserTrainings/", method: 'GET'},
  TrainingAssestment: { endpoint: "/TrainingAssessmentList/", method: 'GET'},
  References: { endpoint: "/TrainingReferences/", method: 'GET'},
  Beverages: { endpoint: "/Cafeteria/InsertEmployeeCafeteriaDetails", method: 'POST'},
  NewsDetail: {endpoint: '/NewsFeed/GetNewsFeedDetailWithComments?EmpId=3349&NewsFeedId=', method: 'GET' , headers: newsHeaders},
  MySchedules: { endpoint: "/MySchedules/", method: 'GET'},
  TrainingScan: { endpoint: "/UserTrainingScan", method: 'POST'},
  RegisterQuery: { endpoint: "/RegisterQuery", method: 'POST'},
  TrainingAssesmentQuestion: { endpoint: "/TrainingAssessment/", method: 'GET'},
  BreakfastScan: { endpoint: "/UserBreakfastScan", method: 'POST'},
  Feedback: {endpoint: "/AfterTrainingFeedback", method: 'POST'},
  AnswerSubmit: { endpoint: "/UserAssessment", method: 'POST'},
  SendMail: { endpoint: "/sendContactEmail", method: 'POST'},
  Vendor: { endpoint: "/Cafe/", method: 'GET'},
  ChangePassword: { endpoint: "/ChangePassword", method: 'POST'},
  BuildVersionCheck: { endpoint: "/versions", method: 'GET'},
  ForgotPassword: { endpoint: "/ForgotPassword", method: 'POST'},
  FeedbackQuestion: { endpoint: "/getFeedback", method: 'GET'},
  UserGeneralFeedback: {endpoint: "/UserFeedback", method: 'POST'}
};


