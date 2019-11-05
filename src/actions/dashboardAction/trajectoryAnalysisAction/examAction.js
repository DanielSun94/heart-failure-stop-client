import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const EXAM_REQUEST_POSTS = 'EXAM_REQUEST_POSTS';
export const EXAM_RECEIVE_SUCCESS_POSTS = 'EXAM_RECEIVE_SUCCESS_POSTS';
export const EXAM_RECEIVE_FAILED_POSTS = 'EXAM_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: EXAM_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
  return ({
      type: EXAM_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: EXAM_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {
  return function(dispatch) {
      dispatch(requestPosts())
      let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_EXAM + queryParamsTrans(params);
      return fetch(url, {method: NormalizedName.GET})
      .then(res => res.json(),
          error => {console.log(error); dispatch(receiveFailedResult())})
      .then(res => dispatch(receiveSuccessResult(res)));
}
}
  