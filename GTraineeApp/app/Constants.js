import {Method} from "react-native-gtlcomponent";

export const IS_LOGIN = "islogin";
export const APP_VERSION = "1.0";

export const apiConfig = {
    productionBaseURL: "http://10.0.1.68:8585/api/",
    testingBaseURL: "http://10.0.1.68:8585/api/",
    developmentBaseURL: "http://10.0.1.68:8585/api/",/*this must be exist*/
    alphaBaseURL: "http://10.0.1.68:8585/api/"
};

export const endPoints = {
    changePassword: {endpoint:"Credential/ChangePassword",method:Method.POST},
    verifyOtp:{endpoint:"credential/VerifyOTP",method:Method.GET},
    login: {endpoint:"credential/login",method:Method.POST},
    forgotPassword: {endpoint: "Credential/ForgotPassword",method:Method.GET}
};
export const SesstionKey = {
    USERS:"USERS",
    ISPINSET:"ISPINSET"
};

export const dateFormate = (data) => {
    var date = new Date(data);
    var getDate =  date.getDate()+'/' + (date.getMonth()+1) + '/'+date.getFullYear();
    return getDate
}

export const dateFormateValue = (data) => {
    var date = new Date(data);
    var getDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    return getDate
}

export const phonenumberValidate = (number) => {
    //const phoneNumberRegx = /^(?<!\d)\d{10}(?!\d)$/
    const phoneNumberRegx = /^\d{10}$/
    const value = phoneNumberRegx.test(number)
    return value
}