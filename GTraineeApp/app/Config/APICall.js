import axios from 'axios';
import { APIPath } from './ApiPath';
export let propData, endPointsData, paramsData, headersData, methodData, successCallBackData, failureCallbackData
export const APICall = (props, endPoints, params, headers, method, { SuccessCallback, FailureCallback }) => {
    propData = props;
    endPointsData = endPoints;
    paramsData = params;
    headersData = headers;
    methodData = method;
    successCallBackData = SuccessCallback;
    failureCallbackData = FailureCallback;
    //console.log(`${APIPath}${endPoints}`)
    return axios({
        method: method,
        url: `${APIPath}${endPoints}`,
        data: params,
        headers: headers
    }, { SuccessCallback, FailureCallback })
        .then((response) => {
            //console.log(response.data)
            if (response.data.status == true) {
                SuccessCallback(response);
            } else {
                FailureCallback(response)
            }
        })
        .catch((error) => {
            FailureCallback(error)
        })
}
export const retryCall = () => {
    // console.log("hi")
    // console.log(propData, endPointsData, paramsData, headersData, methodData);
    // APICall(propData,endPointsData, paramsData, headersData, methodData,{successCallBackData:successCallBackData,failureCallbackData})
    axios({
        method: methodData,
        url: `${APIPath}${endPointsData}`,
        data: paramsData,
        headers: headersData
    }, { successCallBackData, failureCallbackData })
        .then((response) => {
            if (response.data.statusCode === 200) {
                successCallBackData(response);
            } else {
                failureCallbackData(response)
            }
        })
        .catch((error) => {
            failureCallbackData(error)
        })
}