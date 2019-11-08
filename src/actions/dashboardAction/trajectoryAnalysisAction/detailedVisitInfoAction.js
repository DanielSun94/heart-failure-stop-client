import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const DETAILED_VISIT_INFO_REQUEST_POSTS = 'DETAILED_VISIT_INFO_REQUEST_POSTS';
export const DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS = 'DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS';
export const DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS = 'DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: DETAILED_VISIT_INFO_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
  return ({
      type: DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
      content: {admissionTime: res[NormalizedName.ADMISSION_TIME], patientName: res[NormalizedName.PATIENT_NAME],
        dischargeTime: res[NormalizedName.DISCHARGE_TIME], hospitalName: res[NormalizedName.HOSPITAL_NAME], 
        mainDiagnosis: res[NormalizedName.MAIN_DIAGNOSIS],
        operation: res[NormalizedName.OPERATION], otherDiagnosis: res[NormalizedName.OTHER_DIAGNOSIS], age: res[NormalizedName.AGE], 
        sex: res[NormalizedName.SEX], visitType: res[NormalizedName.VISIT_TYPE], visitID: res[NormalizedName.VISIT_ID], }
    })
}


export function receiveFailedResult() {
  return {type: DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {

    function stateContentReorganize(res){
        let mainDiagnosisStr = "";
        let operationStr = "";
        let otherDiagnosisStr = "";
        for (let singleMainDiag of res[NormalizedName.MAIN_DIAGNOSIS]){
            mainDiagnosisStr += singleMainDiag;
        }
        for (let singleOperation of res[NormalizedName.OPERATION]){
            operationStr += singleOperation;
        }
        for (let singleOtherDiag of res[NormalizedName.OTHER_DIAGNOSIS]){
            otherDiagnosisStr += singleOtherDiag;
        }
        return {admissionTime: res[NormalizedName.ADMISSION_TIME], patientName: res[NormalizedName.PATIENT_NAME],
            dischargeTime: res[NormalizedName.DISCHARGE_TIME], hospitalName: res[NormalizedName.HOSPITAL_NAME], mainDiagnosis: mainDiagnosisStr,
            operation: operationStr, otherDiagnosis: otherDiagnosisStr, age: res[NormalizedName.AGE], sex: res[NormalizedName.SEX]};
    }
    

    return function(dispatch, getState) {

    dispatch(requestPosts())

    let url =  RouteName.TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO + queryParamsTrans(params);
    
    let token = getState().session.authenticToken
    let authorization = NormalizedName.AUTHORIZATION
    let header = {authorization: token};
    return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(res => stateContentReorganize(res))
            .then(res => dispatch(receiveSuccessResult(res)));
  }
}



    