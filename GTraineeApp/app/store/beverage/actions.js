import * as types from './actionTypes';
import { apiLoadingStart, apiLoadingStop } from 'app/store/global'
import { endPoints } from '../../Config/ApiPath';
import { GNNAPICall } from '../../Config/GNNAPICall';

export const selectedBeverage = (params, props, headers, { SuccessCallback, FailureCallback }) => {
    //console.log(endPoints.News.endpoint+ null+ endPoints.News.headers+ endPoints.News.method)
    return (dispatch) => {
        dispatch(apiLoadingStart());
        dispatch({ type: types.BEVERAGES_FETCH_REQUEST })
        GNNAPICall(props, endPoints.Beverages.endpoint, params, headers, endPoints.Beverages.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.BEVERAGES_FETCH_SUCCESS, payload: response })
                    SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.BEVERAGES_FETCH_FAIL, payload: response })
                    FailureCallback(response);
                }
            })
    }
};