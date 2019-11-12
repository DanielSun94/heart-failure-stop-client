import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import ParaName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

// 以下为与获取unified patient id的相关Action代码
export const UNIFIED_PATIENT_ID_REQUEST_POSTS = 'UNIFIED_PATIENT_ID_REQUEST_POSTS';
export const UNIFIED_PATIENT_ID_RECEIVE_POSTS_SUCCESS = 'UNIFIED_PATIENT_ID_RECEIVE_POSTS_SUCCESS';
export const UNIFIED_PATIENT_ID_NOT_FOUND = 'UNIFIED_PATIENT_ID_NOT_FOUND';
export const UNIFIED_PATIENT_ID_REQUEST_POSTS_UNKOWN_ERROR = 'UNIFIED_PATIENT_ID_REQUEST_POSTS_UNKOWN_ERROR';
export const CHANGE_LOCAL_PATIENT_ID = 'CHANGE_LOCAL_PATIENT_ID';


export function requestUnifiedPatientID(event) {
    // 由于此event默认由form的submit触发（默认会刷新页面，但是在本处我们不希望这样），因此要避免缺省动作
    event.preventDefault();
    
    // 在确定病人local ID 后，查询其全局ID
    return function(dispatch, getState) {
      let state = getState();
      dispatch(requestUnifiedPatientIDPost());

      let localPatientID = state.dashboardContent.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.localPatientID
      let hospitalCode = state.session.user.institutionCode;
      let params = {patientID: localPatientID, hospitalCode: hospitalCode};
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID + queryParamsTrans(params);

      // get unified patient id
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      fetch(url, {method: ParaName.GET, headers: header})
      .then(res=> res.json())
      .then(res => {
            if(res.status && !(res.status == '200' || res.status == 200)){
              dispatch(requestUnifiedPatientIDFailedUnknownError())
              console.log('Unkown: Error, patient unified id mapping failed')
            }
            else if (res.unifiedPatientID==="noUnifiedPatientIDFound"){
              dispatch(requestUnifiedPatientIDFailedNotFound())
              console.log('no valid unified patient id found')
            }
            else{
              dispatch(requestUnifiedPatientIDSuccess(res[ParaName.unifiedPatientID]))
              console.log('patient unified id mapping successed')

              // 在拿到病人的全局ID后，查询其基本信息
              dispatch(fetchPatientBasicInfo(res))
            }
        }
      )
  }
}

export function requestUnifiedPatientIDPost() {
    return ({type: UNIFIED_PATIENT_ID_REQUEST_POSTS})
}

export function requestUnifiedPatientIDSuccess(res) {
  return ({
      type: UNIFIED_PATIENT_ID_RECEIVE_POSTS_SUCCESS,
      unifiedPatientID: res
    })
}

export function requestUnifiedPatientIDFailedUnknownError() {
  return {type: UNIFIED_PATIENT_ID_REQUEST_POSTS_UNKOWN_ERROR,}
}

export function requestUnifiedPatientIDFailedNotFound() {
  return {type: UNIFIED_PATIENT_ID_NOT_FOUND,}
}

export function changeLocalPatientID(para) {
  return {type: CHANGE_LOCAL_PATIENT_ID, localPatientID: para}
}


// 以下为与获取patient basic info的相关Action代码
export const PATIENT_BASIC_INFO_REQUEST_POSTS = 'PATIENT_BASIC_INFO_REQUEST_POSTS';
export const PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS = 'PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS';
export const PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS = 'PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS';

export function requestPatientBasicInfoPost() {
    return ({type: PATIENT_BASIC_INFO_REQUEST_POSTS})
}


export function requestPatientBasicInfoSuccess(res) {
  return ({
      type: PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS,
      res: {
        patientName: res[ParaName.PATIENT_NAME], sex: res[ParaName.SEX], birthday: res[ParaName.BIRTHDAY],
        ethnicGroup: res[ParaName.ETHNIC_GROUP]}
    })
}

export function requestPatientBasicInfoFailed() {
  return {type: PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS}
}

export function fetchPatientBasicInfo(params) {

    return function(dispatch, getState) {
      dispatch(requestPatientBasicInfoPost());
      
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_BASIC_INFO + queryParamsTrans(params);
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json())
            .then(
              res => {
                if(res.status && !(res.status == '200' || res.status == 200)){
                  dispatch(requestPatientBasicInfoFailed())
                  console.log('Unkown: Error, patient basic info fetch failed')
                }
                else{
                  dispatch(requestPatientBasicInfoSuccess(res))
                  console.log('patient basic info fetch success')
                }
              }
            )
            .catch(()=>console.log('Unkown: Error, patient basic info fetch failed'));
  }
}
