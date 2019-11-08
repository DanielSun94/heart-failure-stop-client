import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const PATIENT_BASIC_INFO_REQUEST_POSTS = 'PATIENT_BASIC_INFO_REQUEST_POSTS';
export const PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS = 'PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS';
export const PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS = 'PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: PATIENT_BASIC_INFO_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
  return ({
      type: PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS,
      content: {
        patientName: res[NormalizedName.PATIENT_NAME], sex: res[NormalizedName.SEX], birthday: res[NormalizedName.BIRTHDAY],
        ethnicGroup: res[NormalizedName.ETHNIC_GROUP]}
    })
}

export function receiveFailedResult() {
  return {type: PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {

    return function(dispatch, getState) {
      dispatch(requestPosts());
      
      let url = RouteName.TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.TRAJECTORY_ANALYSIS_BASIC_INFO + queryParamsTrans(params);
      let token = getState().session.authenticToken
      let authorization = NormalizedName.AUTHORIZATION
      let header = {authorization: token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}
