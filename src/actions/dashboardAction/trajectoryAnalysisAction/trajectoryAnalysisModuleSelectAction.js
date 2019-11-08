import * as exam from './examAction';
import * as detailedVisitInfo from './detailedVisitInfoAction';
import * as labTestResult from './labTestResultAction';
import * as oralMedicalIntervention from './oralMedicalInterventionAction';
import * as vitalSign from './vitalSignAction';
import * as briefVisitInfo from './briefVisitInfoAction';
export const VISIT_INFO_REQUEST_POSTS = 'VISIT_INFO_REQUEST_POSTS';
export const VISIT_INFO_SUCCESS_POSTS = 'VISIT_INFO_SUCCESS_POSTS';
export const VISIT_INFO_FAILED_POSTS = 'VISIT_INFO_FAILED_POSTS';
export const SET_CURRENT_VISIT_INFO = 'SET_CURRENT_VISIT_INFO'


export function visitInfoFetch(event) {
  // 由于此event默认由form的submit触发（默认会刷新页面，但是在本处我们不希望这样），因此要避免缺省动作
  
  // 在确定病人local ID 后，查询其全局ID并且查出其各次入院
  return function(dispatch, getState) {
    let targetIndex = event.currentTarget.selectedIndex;
    let hospitalCode = event.currentTarget[targetIndex].dataset.hospitalcode;
    let visitID = event.currentTarget[targetIndex].dataset.visitid;
    let visitType = event.currentTarget[targetIndex].dataset.visittype;
    let hospitalName = event.currentTarget[targetIndex].dataset.hospitalName;

    dispatch(setCurrentVisitInfo(hospitalName, hospitalCode, visitID, visitType));

    let state = getState();
    let unifiedPatientID = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.unifiedPatientID;
    let params = {unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode, visitID: visitID, visitType: visitType};
      
    dispatch(briefVisitInfo.fetchPosts(params));
    dispatch(exam.fetchPosts(params));
    dispatch(detailedVisitInfo.fetchPosts(params));
    dispatch(labTestResult.fetchPosts(params));
    dispatch(oralMedicalIntervention.fetchPosts(params));
    dispatch(vitalSign.fetchPosts(params));
    }
}

export function receiveSuccessResult(res) {
  return ({
      type: VISIT_INFO_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: VISIT_INFO_FAILED_POSTS,}
}

export function requestPosts() {
  return {type: VISIT_INFO_REQUEST_POSTS,}
}

export function setCurrentVisitInfo(hospitalName, hospitalCode, visitID, visitType){
  return {type: SET_CURRENT_VISIT_INFO,
        hospitalCode: hospitalCode,
        visitID: visitID,
        visitType: visitType,
        hospitalName: hospitalName}
}