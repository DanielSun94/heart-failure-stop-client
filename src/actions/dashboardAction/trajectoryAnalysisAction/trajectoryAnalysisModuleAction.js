import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/normalizedName';

// 异步操作
export const UNIFIED_PATIENT_ID_REQUEST_POSTS = 'UNIFIED_PATIENT_ID_REQUEST_POSTS';
export const UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS = 'UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS';
export const UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS = 'UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS';

// 同步操作
export const CHANGE_LOCAL_PATIENT_ID = 'CHANGE_LOCAL_PATIENT_ID';
export const CHANGE_TARGET_VISIT = 'CHANGE_TARGET_VISIT';
export const SHOW_DETAIL = 'SHOW_DETAIL';


//export function changeLocalPatientID(event) {
//    return ({type: CHANGE_LOCAL_PATIENT_ID, localPatientID: e.target.value})
//}

export function changeTargetVisit(event) {
    let index = String(event.currentTarget.selectedIndex);
    let dataset = event.currentTarget[index].dataset;
    let visitID = dataset['visitid'];
    let visitType = dataset['visittype'];
    let hospitalCode = dataset['hospitalcode'];

    return ({type: CHANGE_TARGET_VISIT, visitID: visitID, visitType: visitType, hospitalCode: hospitalCode})
}

export function showDetailToggle(currentState) {
    return ({type: SHOW_DETAIL, showDetail: !currentState})
}

export function requestPosts() {
    return ({type: UNIFIED_PATIENT_ID_REQUEST_POSTS})
}

export function receiveSuccessResult(res) {
  return ({
      type: UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS,
      unifiedPatientID: res
    })
}


export function receiveFailedResult() {
  return {type: UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(localPatientID, hospitalCode) {
    let params = {patientID: localPatientID, hospitalCode: hospitalCode};

    return function(dispatch) {
      dispatch(requestPosts());
      
      let url = NormalizedName.TRAJECTORY_ANALYSIS_DATA_ROOT + NormalizedName.TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID + queryParamsTrans(params);
      return fetch(url, {method: NormalizedName.GET})
            .then(res => {res.json()},
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}
