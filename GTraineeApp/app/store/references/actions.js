import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const getReferences = (params, props, headers , id, {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.REFERENCES_FETCH_REQUEST})
	   APICall(props,`${endPoints.References.endpoint}${id}`,params, headers,endPoints.References.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.REFERENCES_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.REFERENCES_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};