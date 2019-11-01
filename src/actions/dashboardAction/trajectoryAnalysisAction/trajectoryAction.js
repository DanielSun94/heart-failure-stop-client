import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const TRAJECTORY_REQUEST = 'TRAJECTORY_REQUEST';
export const TRAJECTORY_RECEIVE_SUCCESS_POSTS = 'TRAJECTORY_RECEIVE_SUCCESS_POSTS';
export const TRAJECTORY_RECEIVE_FAILED_POSTS = 'TRAJECTORY_RECEIVE_FAILED_POSTS';

function requestPosts() {
    return ({type: TRAJECTORY_REQUEST})
}


function receiveSuccessResult(res) {
  return ({
      type: TRAJECTORY_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: TRAJECTORY_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(unifiedPatientID) {
    let params = {unifiedPatientID: unifiedPatientID};

    return function(dispatch) {
      dispatch(requestPosts());
      
      let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
      return fetch(url, {method: NormalizedName.GET})
            .then(res => {res.json()},
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}