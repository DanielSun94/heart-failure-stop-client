import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const VALID_VISIT_REQUEST_POSTS = 'VALID_VISIT_REQUEST_POSTS';
export const VALID_VISIT_SUCCESS_POSTS = 'VALID_VISIT_SUCCESS_POSTS';
export const VALID_VISIT_FAILED_POSTS = 'VALID_VISIT_FAILED_POSTS';

function requestPosts() {
    return ({type: VALID_VISIT_REQUEST_POSTS})
}


function receiveSuccessResult(res) {
  return ({
      type: VALID_VISIT_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: VALID_VISIT_FAILED_POSTS,}
}

export function fetchPosts(unifiedPatientID) {
    let params = {unifiedPatientID: unifiedPatientID};
    
    return function(dispatch) {
        dispatch(requestPosts())
        let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
        return fetch(url, {method: NormalizedName.GET})
        .then(res => {res.json()},
            error => {console.log(error); dispatch(receiveFailedResult())})
        .then(res => dispatch(receiveSuccessResult(res)));
  }
}
