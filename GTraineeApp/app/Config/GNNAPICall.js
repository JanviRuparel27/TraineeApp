import axios from 'axios';
import { GNNApiPath } from './ApiPath';
export let propData, endPointsData, paramsData, headersData, methodData, successCallBackData, failureCallbackData
export const GNNAPICall = (props, endPoints, params, headers, method, { SuccessCallback, FailureCallback }) => {
    propData = props;
    endPointsData = endPoints;
    paramsData = params;
    headersData = headers;
    methodData = method;
    successCallBackData = SuccessCallback;
    failureCallbackData = FailureCallback;
        return axios({
            method: method,
            url: `${GNNApiPath}${endPoints}`,
            data: params,
            headers: headers
        }, { SuccessCallback, FailureCallback })
            .then((response) => {
                // console.log(response)
                SuccessCallback(response);
            })
            .catch((error) => {
                FailureCallback(error)
            })
}