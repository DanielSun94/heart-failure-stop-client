import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const LAB_TEST_RESULT_REQUEST_POSTS = 'LAB_TEST_RESULT_REQUEST_POSTS';
export const LAB_TEST_RESULT_RECEIVE_SUCCESS_POSTS = 'LAB_TEST_RESULT_RECEIVE_SUCCESS_POSTS';
export const LAB_TEST_RESULT_RECEIVE_FAILED_POSTS = 'LAB_TEST_RESULT_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: LAB_TEST_RESULT_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
  return ({
      type: LAB_TEST_RESULT_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: LAB_TEST_RESULT_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {
    return function(dispatch, getState) {
        dispatch(requestPosts())
        let url = RouteName.TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.TRAJECTORY_ANALYSIS_LAB_TEST + queryParamsTrans(params);
        let token = getState().session.authenticToken
        let authorization = NormalizedName.AUTHORIZATION
        let header = {authorization: token, 'Content-Type': 'application/json'};
        return fetch(url, {method: NormalizedName.GET, headers: header})
        .then(res => res.json(),
            error => {console.log(error); dispatch(receiveFailedResult())})
        .then(res => dispatch(receiveSuccessResult(res)));
  }
}
    