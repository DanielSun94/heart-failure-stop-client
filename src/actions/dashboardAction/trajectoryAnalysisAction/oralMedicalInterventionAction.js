import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

export const ORAL_MEDICAL_INTERVENTION_REQUEST = 'ORAL_MEDICAL_INTERVENTION_REQUEST';
export const ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS = 'ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS';
export const ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS = 'ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS';

function requestPosts() {
    return ({type: ORAL_MEDICAL_INTERVENTION_REQUEST})
}


function receiveSuccessResult(res) {
  return ({
      type: ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(unifiedPatientID, hospitalCode, visitType, visitID) {
    let params = {
        unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode, visitType: visitType, visitID: visitID};

    return function(dispatch) {
      dispatch(requestPosts());
      
      let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_MEDICAL_ORAL_INTERVENTION + queryParamsTrans(params);
      return fetch(url, {method: NormalizedName.GET})
            .then(res => {res.json()},
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}