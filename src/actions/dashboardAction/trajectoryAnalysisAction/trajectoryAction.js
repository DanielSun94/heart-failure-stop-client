import ParaName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';

export const DETAILED_VISIT_INFO_REQUEST_POSTS = 'DETAILED_VISIT_INFO_REQUEST_POSTS';
export const DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS = 'DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS';
export const DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS = 'DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS';
export const TRAJECTORY_REQUEST = 'TRAJECTORY_REQUEST';
export const TRAJECTORY_RECEIVE_SUCCESS_POSTS = 'TRAJECTORY_RECEIVE_SUCCESS_POSTS';
export const TRAJECTORY_RECEIVE_FAILED_POSTS = 'TRAJECTORY_RECEIVE_FAILED_POSTS';
export const CHANGE_TARGET_VISIT = 'CHANGE_TARGET_VISIT';

export function requestTrajectoryPosts() {
    return ({type: TRAJECTORY_REQUEST})
}


export function receiveTrajectorySuccessResult(res) {
  return ({
      type: TRAJECTORY_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveTrajectoryFailedResult() {
  return {type: TRAJECTORY_RECEIVE_FAILED_POSTS,}
}


export function getValidVisitAndSetDefaultVisit(params){
  return function(dispatch, getState) {
    let validVisitSearching = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
    let token = getState().session.authenticToken
    let header = {'Authorization': token};
    console.log('valid visit search url： '+ validVisitSearching);

    dispatch(requestTrajectoryPosts())
    fetch(validVisitSearching, {method: ParaName.GET, headers: header})
    .then(res => res.json())
    .then(
      res => {
        if(res.status && !(res.status == '200' || res.status == 200)){
          dispatch(receiveTrajectoryFailedResult())
          console.log('Unkown: Error, get trajectory info failed')
        }
        else{
          res.sort(
            function(a, b)
            {
              const timeA = new Date(a.admissionTime.replace(/\//g, '-'))
              const timeB = new Date(b.admissionTime.replace(/\//g, '-'))
              return timeA.getTime() - timeB.getTime()
            }
          )
          for(let index in res){
            res[index]['visitNo'] = index
          }
          dispatch(receiveTrajectorySuccessResult(res))
          console.log('get trajectory info successed')
        }
      }
    )
    .then(()=>{
      const visitList= getState().dashboard.trajectoryAnalysis.trajectory.visitList;
      dispatch(changeTargetVisit(visitList[visitList.length-1]))
    })
  }
}

export function changeTargetVisit(params) {
  const visitNo = params.visitNo;
  const visitID = params.visitID;
  const visitType = params.visitType;
  const hospitalCode = params.hospitalCode;
  const hospitalName = params.hospitalName;

  return ({
    type: CHANGE_TARGET_VISIT, 
    visitNo: visitNo,
    visitID: visitID, 
    visitType: visitType, 
    hospitalCode: hospitalCode,
    hospitalName: hospitalName
  })
}


export function requestDetailedVisitInfoPosts() {
    return ({type: DETAILED_VISIT_INFO_REQUEST_POSTS})
}


export function receiveDetailedVisitInfoSuccessResult(res) {
  return ({
      type: DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
      content: {admissionTime: res[ParaName.ADMISSION_TIME], patientName: res[ParaName.PATIENT_NAME],
        dischargeTime: res[ParaName.DISCHARGE_TIME], hospitalName: res[ParaName.HOSPITAL_NAME], 
        mainDiagnosis: res[ParaName.MAIN_DIAGNOSIS], deathFlag: res[ParaName.DEATH_FLAG], symptom: res[ParaName.SYMPTOM],
        operation: res[ParaName.OPERATION], otherDiagnosis: res[ParaName.OTHER_DIAGNOSIS], age: res[ParaName.AGE], 
        sex: res[ParaName.SEX], visitType: res[ParaName.VISIT_TYPE], visitID: res[ParaName.VISIT_ID], }
    })
}


export function receiveDetailedVisitInfoFailedResult() {
  return {type: DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS,}
}

export function fetchDetailedVisitInfoPosts(params) {

    function stateContentReorganize(res){
        let mainDiagnosisStr = "";
        let operationStr = "";
        let otherDiagnosisStr = "";
        for (let singleMainDiag of res[ParaName.MAIN_DIAGNOSIS]){
            mainDiagnosisStr += singleMainDiag + '，';
        }
        for (let singleOperation of res[ParaName.OPERATION]){
            operationStr += singleOperation + '，';
        }
        for (let singleOtherDiag of res[ParaName.OTHER_DIAGNOSIS]){
            otherDiagnosisStr += singleOtherDiag + '，';
        }
        mainDiagnosisStr = mainDiagnosisStr.substr(0, mainDiagnosisStr.length-1)
        operationStr = operationStr.substr(0, operationStr.length-1)
        otherDiagnosisStr = otherDiagnosisStr.substr(0, otherDiagnosisStr.length-1)
        return {
          admissionTime: res[ParaName.ADMISSION_TIME], patientName: res[ParaName.PATIENT_NAME], deathFlag: res[ParaName.DEATH_FLAG], 
          symptom: res[ParaName.SYMPTOM], dischargeTime: res[ParaName.DISCHARGE_TIME], hospitalName: res[ParaName.HOSPITAL_NAME], 
          mainDiagnosis: mainDiagnosisStr, operation: operationStr, otherDiagnosis: otherDiagnosisStr, age: res[ParaName.AGE], 
          sex: res[ParaName.SEX]};
    }
    

    return function(dispatch, getState) {

    let url =  RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO + queryParamsTrans(params);
    let token = getState().session.authenticToken
    let header = {'Authorization': token};

    dispatch(requestDetailedVisitInfoPosts())
    return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(receiveDetailedVisitInfoFailedResult())})
            .then(res => stateContentReorganize(res))
            .then(
              res => {
                if(res.status && !(res.status == '200' || res.status == 200)){
                  dispatch(receiveDetailedVisitInfoFailedResult())
                  console.log('Unkown: Error, get detailed visit info failed')
                }
                else{
                  dispatch(receiveDetailedVisitInfoSuccessResult(res))
                  console.log('get detailed visit info successed')
                }
              }
            )
  }
}



    