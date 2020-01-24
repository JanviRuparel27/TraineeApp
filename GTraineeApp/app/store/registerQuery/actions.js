import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const registerQuery = (params, props, headers , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.REGISTER_QUERY_FETCH_REQUEST})
	   APICall(props,endPoints.RegisterQuery.endpoint,params, headers,endPoints.RegisterQuery.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.REGISTER_QUERY_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.REGISTER_QUERY_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};