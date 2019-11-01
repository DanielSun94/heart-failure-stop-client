import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const VITAL_SIGN_REQUEST_POSTS = 'VITAL_SIGN_REQUEST_POSTS';
export const VITAL_SIGN_RECEIVE_SUCCESS_POSTS = 'VITAL_SIGN_RECEIVE_SUCCESS_POSTS';
export const VITAL_SIGN_RECEIVE_FAILED_POSTS = 'VITAL_SIGN_RECEIVE_FAILED_POSTS';

function requestPosts() {
    return ({type: VITAL_SIGN_REQUEST_POSTS})
}


function receiveSuccessResult(res) {
  return ({
      type: VITAL_SIGN_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: VITAL_SIGN_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(unifiedPatientID, hospitalCode, visitType, visitID) {
    let params = {unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode, visitType: visitType, visitID: visitID};
    
    return function(dispatch) {
        dispatch(requestPosts())
        let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_VITAL_SIGN + queryParamsTrans(params);
        return fetch(url, {method: NormalizedName.GET})
        .then(res => {res.json()},
            error => {console.log(error); dispatch(receiveFailedResult())})
        .then(res => dispatch(receiveSuccessResult(res)));
  }
}
    