import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const ORAL_MEDICAL_INTERVENTION_REQUEST = 'ORAL_MEDICAL_INTERVENTION_REQUEST';
export const ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS = 'ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS';
export const ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS = 'ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: ORAL_MEDICAL_INTERVENTION_REQUEST})
}


export function receiveSuccessResult(res) {
  return ({
      type: ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {

    return function(dispatch, getState) {
      dispatch(requestPosts());
      
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_MEDICAL_ORAL_INTERVENTION + queryParamsTrans(params);
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}