import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import * as validVisitSelect from './trajectoryAnalysisModuleSelectAction'
import * as basicInfo from './patientBasicInfoAction'
import * as exam from './examAction';
import * as detailedVisitInfo from './detailedVisitInfoAction';
import * as labTestResult from './labTestResultAction';
import * as oralMedicalIntervention from './oralMedicalInterventionAction';
import * as vitalSign from './vitalSignAction';
import * as briefVisitInfo from './briefVisitInfoAction';
import RouteName from '../../../utils/RouteName';

// 异步操作
export const UNIFIED_PATIENT_ID_REQUEST_POSTS = 'UNIFIED_PATIENT_ID_REQUEST_POSTS';
export const UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS = 'UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS';
export const UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS = 'UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS';

// 同步操作
export const CHANGE_LOCAL_PATIENT_ID = 'CHANGE_LOCAL_PATIENT_ID';
export const CHANGE_TARGET_VISIT = 'CHANGE_TARGET_VISIT';
export const SHOW_DETAIL = 'SHOW_DETAIL';




export function changeTargetVisit(event) {
    let index = String(event.currentTarget.selectedIndex);
    let dataset = event.currentTarget[index].dataset;
    let visitID = dataset['visitid'];
    let visitType = dataset['visittype'];
    let hospitalCode = dataset['hospitalcode'];

    return ({type: CHANGE_TARGET_VISIT, visitID: visitID, visitType: visitType, hospitalCode: hospitalCode})
}

export function showDetailToggle(event) {
  return function(dispatch, getState) {
    let state = getState()
    let currentState = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.showDetail;
    dispatch({type: SHOW_DETAIL, showDetail: !currentState});
  }
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

export function fetchPosts(event) {
    // 由于此event默认由form的submit触发（默认会刷新页面，但是在本处我们不希望这样），因此要避免缺省动作
    event.preventDefault();

    let localPatientID = event.currentTarget[0].value;
    
    // 在确定病人local ID 后，查询其全局ID并且查出其各次入院
    return function(dispatch, getState) {
      dispatch(requestPosts());

      let state = getState();
      let hospitalCode = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.hospitalCode;
      let params = {patientID: localPatientID, hospitalCode: hospitalCode};
      let urlIdMapping = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID + queryParamsTrans(params);
      console.log('id map url： '+ urlIdMapping);
      // get unified patient id
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      fetch(urlIdMapping, {method: NormalizedName.GET, headers: header})
      .then(res => res.json(), error => console.log(error))
      .then(res => {console.log(res); return res;})
      .then(res => dispatch(receiveSuccessResult(res)))
      .then(() => console.log('id mapping successed'))
      .then(() => {
        let state = getState();
        let unifiedPatientID = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.unifiedPatientID;
        let params = {unifiedPatientID: unifiedPatientID};

        // 查找目标病人的基本信息和合法访问
        dispatch(basicInfo.fetchPosts(params))
        dispatch(getValidVisit(params))
      })
      .then(()=>{
        // 在找出合法访问后，默认直接显示第一次访问的简要信息
        let state = getState()
        let unifiedPatientID = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.unifiedPatientID;
        let hospitalCode = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.hospitalCode;
        let visitID = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.visitID;
        let visitType = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.visitType;
        let params = {unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode, visitID: visitID, visitType: visitType};

        dispatch(briefVisitInfo.fetchPosts(params));

        // 如果在展示细节的面板打开时切换了病人，必须直接响应新病人的数据
        dispatch(exam.fetchPosts(params));
        dispatch(detailedVisitInfo.fetchPosts(params));
        dispatch(labTestResult.fetchPosts(params));
        dispatch(oralMedicalIntervention.fetchPosts(params));
        dispatch(vitalSign.fetchPosts(params));
      })
  }
}

function getValidVisit(params){
  return function(dispatch, getState) {
    let validVisitSearching = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
    let token = getState().session.authenticToken
    let header = {'Authorization': token};
    console.log('valid visit search url： '+ validVisitSearching);
    fetch(validVisitSearching, {method: NormalizedName.GET, headers: header})
    .then(res => res.json(), error => {console.log(error); dispatch(validVisitSelect.receiveFailedResult())})
    .then(res => {console.log(res); return res;})
    .then(res => dispatch(validVisitSelect.receiveSuccessResult(res)))
    .then(() => console.log('valid visit search successed'))
  }
}