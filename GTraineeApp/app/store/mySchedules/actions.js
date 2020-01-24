import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const mySchedules = (params, props, headers , id, today, {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.MYSCHEDULES_LIST_FETCH_REQUEST})
	   APICall(props,`${endPoints.MySchedules.endpoint}${id}/${today}`,params, headers,endPoints.MySchedules.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.MYSCHEDULES_LIST_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.MYSCHEDULES_LIST_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};