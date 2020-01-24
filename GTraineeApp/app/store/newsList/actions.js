import * as types from './actionTypes';
import { apiLoadingStart, apiLoadingStop } from 'app/store/global'
import { endPoints } from '../../Config/ApiPath';
import { GNNAPICall } from '../../Config/GNNAPICall';

export const getAllNewsList = (params, props,headers, { SuccessCallback, FailureCallback }) => {
    //console.log(endPoints.News.endpoint+ null+ endPoints.News.headers+ endPoints.News.method)
    return (dispatch) => {
        dispatch(apiLoadingStart());
        dispatch({ type: types.NEWSLIST_FETCH_REQUEST })
        GNNAPICall(props, endPoints.NewsList.endpoint, null, headers, endPoints.NewsList.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.NEWSLIST_FETCH_SUCCESS, payload: response })
                    SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.NEWSLIST_FETCH_FAIL, payload: response })
                    FailureCallback(response);
                }
            })
    }
};