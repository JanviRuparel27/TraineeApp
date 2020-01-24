import * as types from './actionTypes';
import {apiLoadingStart, apiLoadingStop} from 'app/store/global'
import {endPoints} from '../../Config/ApiPath';
import {APICall} from '../../Config/APICall';

export const getAssesmentQuestion = (params, props, headers , id , userId,{SuccessCallback, FailureCallback}) => {
    return (dispatch) => {
        dispatch(apiLoadingStart());
       dispatch({type: types.TRAINING_ASSESMENT_QUESTION_FETCH_REQUEST})
	   APICall(props,`${endPoints.TrainingAssesmentQuestion.endpoint}${id}${'/'}${userId}`,params, headers,endPoints.TrainingAssesmentQuestion.method,
            {
                SuccessCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.TRAINING_ASSESMENT_QUESTION_FETCH_SUCCESS, payload:response})
					SuccessCallback(response);
                },
                FailureCallback: response => {
                    dispatch(apiLoadingStop());
					dispatch({type: types.TRAINING_ASSESMENT_QUESTION_FETCH_FAIL, payload:response})
                    FailureCallback(response);
                }
            })
    }
};