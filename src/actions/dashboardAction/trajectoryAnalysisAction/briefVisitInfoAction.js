import fetch from 'cross-fetch';
import NormalizedName from '../../../utils/normalizedName';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';

export const BRIEF_VISIT_INFO_REQUEST_POSTS = 'BRIEF_VISIT_INFO_REQUEST_POSTS';
export const BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS = 'BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS';
export const BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS = 'BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS';

function requestPosts() {
    return ({type: BRIEF_VISIT_INFO_REQUEST_POSTS})
}


function receiveSuccessResult(res) {
  return ({
      type: BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
      content: {
          admissionTime: res[NormalizedName.ADMISSION_TIME],
        deathFlag: res[NormalizedName.DEATH_FLAG],
        dischargeTime: res[NormalizedName.DISCHARGE_TIME],
        hospitalName: res[NormalizedName.HOSPITAL_NAME],
        mainDiagnosis: res[NormalizedName.MAIN_DIAGNOSIS],
        symptom: res[NormalizedName.SYMPTOM]}
    })
}


export function receiveFailedResult() {
  return {type: BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS}
}

export function fetchPosts(unifiedPatientID, hospitalCode, visitType, visitID) {
    let params = {unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode,visitType: visitType, visitID: visitID};
    

    return function(dispatch) {
      dispatch(requestPosts());
      let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO + 
      queryParamsTrans(params);
      
      return fetch(url, {method: NormalizedName.GET})
        .then(  res => {res.json()},
                error => {console.log(error); dispatch(receiveFailedResult())})
                .then(res => dispatch(receiveSuccessResult(res)));
              }
}