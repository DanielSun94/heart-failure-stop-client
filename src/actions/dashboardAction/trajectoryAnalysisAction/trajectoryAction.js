import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const TRAJECTORY_REQUEST = 'TRAJECTORY_REQUEST';
export const TRAJECTORY_RECEIVE_SUCCESS_POSTS = 'TRAJECTORY_RECEIVE_SUCCESS_POSTS';
export const TRAJECTORY_RECEIVE_FAILED_POSTS = 'TRAJECTORY_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: TRAJECTORY_REQUEST})
}


export function receiveSuccessResult(res) {
  return ({
      type: TRAJECTORY_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: TRAJECTORY_RECEIVE_FAILED_POSTS,}
}