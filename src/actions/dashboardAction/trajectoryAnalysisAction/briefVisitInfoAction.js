import fetch from 'cross-fetch';
import NormalizedName from '../../../utils/ParaName';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import RouteName from '../../../utils/RouteName';

export const BRIEF_VISIT_INFO_REQUEST_POSTS = 'BRIEF_VISIT_INFO_REQUEST_POSTS';
export const BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS = 'BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS';
export const BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS = 'BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: BRIEF_VISIT_INFO_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
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

export function fetchPosts(params) {
    return function(dispatch, getState) {
      dispatch(requestPosts());
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO + 
      queryParamsTrans(params);
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
        .then(  res => res.json(),
                error => {console.log(error); dispatch(receiveFailedResult())})
                .then(res => dispatch(receiveSuccessResult(res)));
              }
}