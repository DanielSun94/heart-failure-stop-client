import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const MODEL_EXECUTE_REQUEST = 'MODEL_EXECUTE_REQUEST';
export const MODEL_RECEIVE_SUCCESS_RESULT = 'MODEL_RECEIVE_SUCCESS_RESULT';
export const MODEL_RECEIVE_FAILED_RESULT = 'MODEL_RECEIVE_FAILED_RESULT';

export function requestPosts(predictionTask, queryID) {
    return ({type: MODEL_EXECUTE_REQUEST, predictionTask: predictionTask, queryID: queryID})
}

export function receiveSuccessResult(res, predictionTask, currentOrPreviousVisitResult, queryID) {
    return ({
        type: MODEL_RECEIVE_SUCCESS_RESULT,
        result: res,
        currentOrPreviousVisitResult: currentOrPreviousVisitResult,
        predictTask: predictionTask,
        queryID: queryID
    })
}

export function receiveFailedResult(queryID) {
    return {type: MODEL_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function fetchPosts(params, predictionTask, currentOrPreviousVisitResult, queryID) {
    return function(dispatch, getState) {
        dispatch(requestPosts(predictionTask, queryID));
        let url = RouteName.B_MACHINE_LEARNING + RouteName.B_TENSORFLOW_HAWKES_RNN + queryParamsTrans({...params, 'predictTask': predictionTask});
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(receiveFailedResult(queryID))})
            .then(res => {dispatch(receiveSuccessResult(res, predictionTask, currentOrPreviousVisitResult, queryID))})
    }
}
