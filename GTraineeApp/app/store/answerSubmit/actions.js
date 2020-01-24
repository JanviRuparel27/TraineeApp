import * as types from './actionTypes';
import { apiLoadingStart, apiLoadingStop } from 'app/store/global'
import { endPoints } from '../../Config/ApiPath';
import { APICall } from '../../Config/APICall';


export const answerSubmit = (params, props, headers, { SuccessCallback, FailureCallback }) => {
    //console.log(endPoints.News.endpoint+ null+ endPoints.News.headers+ endPoints.News.method)
    return (dispatch) => {
        dispatch(apiLoadingStart());
        dispatch({ type: types.ANSWER_SUBMIT_FETCH_REQUEST })
        APICall(props, endPoints.AnswerSubmit.endpoint, params, headers, endPoints.AnswerSubmit.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.ANSWER_SUBMIT_FETCH_SUCCESS, payload: response })
                    SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
                    dispatch({ type: types.ANSWER_SUBMIT_FETCH_FAIL, payload: response })
                    FailureCallback(response);
                }
            })
    }
};