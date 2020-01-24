import * as types from './actionTypes';

import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {API, ContentType, Method, SessionManager} from "react-native-gtlcomponent";
// import {endPoints, SesstionKey} from "app/Constants";
import {ToastType, showToast} from "app/Utils";


import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const loginUser = (params, props, {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.LOGIN_FETCH_REQUEST})
	   APICall(props,endPoints.Login.endpoint,params, endPoints.Login.headers,endPoints.Login.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.LOGIN_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.LOGIN_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};


