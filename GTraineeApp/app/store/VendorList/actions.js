import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const getVendorList = (params, props, headers , date , {SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.VENDOR_LIST_FETCH_REQUEST})
	   APICall(props,`${endPoints.Vendor.endpoint}${date}`,params, headers,endPoints.Vendor.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.VENDOR_LIST_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.VENDOR_LIST_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};