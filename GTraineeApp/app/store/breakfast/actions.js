import * as types from './actionTypes';
import { apiLoadingStart, apiLoadingStop } from 'app/store/global'
import { endPoints } from '../../Config/ApiPath';
import { APICall } from '../../Config/APICall';


export const selectedBreakfast = (params, props, headers, { SuccessCallback, FailureCallback }) => {
    //console.log(endPoints.News.endpoint+ null+ endPoints.News.headers+ endPoints.News.method)
    return (dispatch) => {
        dispatch(apiLoadingStart());
        dispatch({ type: types.BREAKFAST_FETCH_REQUEST })
        APICall(props, endPoints.BreakfastScan.endpoint, params, headers, endPoints.BreakfastScan.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.BREAKFAST_FETCH_SUCCESS, payload: response })
                    SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.BREAKFAST_FETCH_FAIL, payload: response })
                    FailureCallback(response);
                }
            })
    }
};