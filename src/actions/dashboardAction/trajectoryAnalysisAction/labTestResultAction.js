import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

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
    return function(dispatch) {
        dispatch(requestPosts())
        let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_LAB_TEST + queryParamsTrans(params);
        return fetch(url, {method: NormalizedName.GET})
        .then(res => res.json(),
            error => {console.log(error); dispatch(receiveFailedResult())})
        .then(res => dispatch(receiveSuccessResult(res)));
  }
}
    