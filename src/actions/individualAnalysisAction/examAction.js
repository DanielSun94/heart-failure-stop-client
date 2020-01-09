import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import NormalizedName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const EXAM_SELECTED_EXAM = "EXAM_SELECTED_EXAM";
export const EXAM_INITIALIZE = "EXAM_INITIALIZE";
export const EXAM_DELETE = "EXAM_INITIALIZE";
export const EXAM_REQUEST_POST = 'EXAM_REQUEST_POST';
export const EXAM_RECEIVE_SUCCESS_RESULT = 'EXAM_RECEIVE_SUCCESS_RESULT';
export const EXAM_RECEIVE_FAILED_RESULT = 'EXAM_RECEIVE_FAILED_RESULT';
export const EXAM_SET_STATE = "EXAM_SET_STATE";

export function examSetState(newState) {
    return ({type: EXAM_SET_STATE, newState: newState})
}

export function setNewSelectedExam(newSelectedExam, queryID) {
    return ({type: EXAM_SELECTED_EXAM, queryID: queryID, newSelectedExam: newSelectedExam})
}

function examRequestPost(queryID) {
    return ({type: EXAM_REQUEST_POST, queryID: queryID})
}

function examDelete(queryID) {
    return ({type: EXAM_DELETE, queryID: queryID})
}


export function examInitialize(queryID) {
    return ({type: EXAM_INITIALIZE, queryID: queryID})
}


function examReceiveSuccessResult(res, params, queryID) {
    return ({
        type: EXAM_RECEIVE_SUCCESS_RESULT,
        queryID: queryID,
        content: res,
        params: params
    })
}


function examReceiveFailedResult(queryID) {
    return {type: EXAM_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function examFetchPosts(params, queryID) {
    // Exam是一次Fetch当前入院的所有Exam记录
    return function(dispatch, getState) {
        dispatch(examRequestPost(queryID));
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_EXAM + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(examReceiveFailedResult(queryID))})
            .then(res => dispatch(examReceiveSuccessResult(res, params, queryID)));
    }
}
