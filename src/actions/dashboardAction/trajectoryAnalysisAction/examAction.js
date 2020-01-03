import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

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
  return function(dispatch, getState) {
      dispatch(requestPosts());
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_EXAM + queryParamsTrans(params);
      let token = getState().session.authenticToken;
      let header = {'Authorization': token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
      .then(res => res.json(),
          error => {console.log(error); dispatch(receiveFailedResult())})
      .then(res => dispatch(receiveSuccessResult(res)));
}
}
  