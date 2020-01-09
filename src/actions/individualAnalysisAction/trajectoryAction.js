import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';
import {queryParamsTrans} from '../../utils/queryUtilFunction';

export const TRAJECTORY_INITIALIZE = "TRAJECTORY_INITIALIZE";
export const DETAILED_VISIT_INFO_REQUEST_POST = 'DETAILED_VISIT_INFO_REQUEST_POST';
export const DETAILED_VISIT_INFO_RECEIVE_SUCCESS_RESULT = 'DETAILED_VISIT_INFO_RECEIVE_SUCCESS_RESULT';
export const DETAILED_VISIT_INFO_RECEIVE_FAILED_RESULT = 'DETAILED_VISIT_INFO_RECEIVE_FAILED_RESULT';
export const TRAJECTORY_REQUEST_POST = 'TRAJECTORY_REQUEST_POST';
export const TRAJECTORY_RECEIVE_SUCCESS_RESULT = 'TRAJECTORY_RECEIVE_SUCCESS_RESULT';
export const TRAJECTORY_RECEIVE_FAILED_RESULT = 'TRAJECTORY_RECEIVE_FAILED_RESULT';
export const CHANGE_TARGET_VISIT = 'CHANGE_TARGET_VISIT';
export const TRAJECTORY_DELETE = "TRAJECTORY_DELETE";

export const TRAJECTORY_SET_STATE = "TRAJECTORY_SET_STATE";

export function trajectorySetState(newState) {
    return ({type: TRAJECTORY_SET_STATE, newState: newState})
}

export function trajectoryInitialize(queryID) {
    return ({type: TRAJECTORY_INITIALIZE, queryID: queryID})
}

export function trajectoryDelete(queryID) {
    return ({type: TRAJECTORY_DELETE, queryID: queryID})
}

function trajectoryRequestPost(queryID) {
    return ({type: TRAJECTORY_REQUEST_POST, queryID: queryID})
}


function trajectoryReceiveSuccessResult(res, unifiedPatientID, queryID) {
    return ({
        type: TRAJECTORY_RECEIVE_SUCCESS_RESULT,
        content: res,
        queryID: queryID,
        unifiedPatientID: unifiedPatientID
    })
}


function trajectoryReceiveFailedResult(queryID) {
    return {type: TRAJECTORY_RECEIVE_FAILED_RESULT, queryID: queryID}
}


export function getValidVisitAndSetDefaultVisit(params, queryID){
    return function(dispatch, getState) {
        let validVisitSearching = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        dispatch(trajectoryRequestPost(queryID));
        fetch(validVisitSearching, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(trajectoryReceiveFailedResult(queryID))})
            .then(
                res => {
                    // 将获取到的访问按照时间顺序排序
                    res.sort(
                        function(a, b)
                        {
                            const timeA = new Date(a.admissionTime.replace(/\//g, '-'));
                            const timeB = new Date(b.admissionTime.replace(/\//g, '-'));
                            return timeA.getTime() - timeB.getTime()
                        }
                    );
                    for(let index in res){
                        if(!res.hasOwnProperty(index))
                            continue;
                        res[index][ParaName.VISIT_NO] = index
                    }
                    dispatch(trajectoryReceiveSuccessResult(res, params.unifiedPatientID, queryID));
                }
            )
            .then(()=>{
                const visitList= getState().individual.trajectory[queryID].visitList;
                dispatch(changeTargetVisit(visitList[visitList.length-1], queryID))
            })
    }
}

export function changeTargetVisit(params, queryID) {
    const visitNo = params.visitNo;
    const visitID = params.visitID;
    const visitType = params.visitType;
    const hospitalCode = params.hospitalCode;
    const hospitalName = params.hospitalName;

    return ({
        type: CHANGE_TARGET_VISIT,
        queryID: queryID,
        visitNo: visitNo,
        visitID: visitID,
        visitType: visitType,
        hospitalCode: hospitalCode,
        hospitalName: hospitalName
    })
}


function detailedVisitInfoRequestPost(queryID) {
    return ({type: DETAILED_VISIT_INFO_REQUEST_POST, queryID: queryID})
}


function detailedVisitInfoReceiveSuccessResult(res, queryID) {
    return ({
        type: DETAILED_VISIT_INFO_RECEIVE_SUCCESS_RESULT,
        queryID: queryID,
        content: {admissionTime: res[ParaName.ADMISSION_TIME], patientName: res[ParaName.PATIENT_NAME],
            dischargeTime: res[ParaName.DISCHARGE_TIME], hospitalName: res[ParaName.HOSPITAL_NAME],
            mainDiagnosis: res[ParaName.MAIN_DIAGNOSIS], deathFlag: res[ParaName.DEATH_FLAG], symptom: res[ParaName.SYMPTOM],
            operation: res[ParaName.OPERATION], otherDiagnosis: res[ParaName.OTHER_DIAGNOSIS], age: res[ParaName.AGE],
            sex: res[ParaName.SEX], visitType: res[ParaName.VISIT_TYPE], visitID: res[ParaName.VISIT_ID], }
    })
}


function detailedVisitInfoReceiveFailedResult(queryID) {
    return {type: DETAILED_VISIT_INFO_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function fetchDetailedVisitInfoPosts(params, queryID) {

    function stateContentReorganize(res){
        // 组装主诊断，手术，其它诊断等可能对应多条记录的信息
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
        mainDiagnosisStr = mainDiagnosisStr.substr(0, mainDiagnosisStr.length-1);
        operationStr = operationStr.substr(0, operationStr.length-1);
        otherDiagnosisStr = otherDiagnosisStr.substr(0, otherDiagnosisStr.length-1);
        return {
            admissionTime: res[ParaName.ADMISSION_TIME],
            patientName: res[ParaName.PATIENT_NAME],
            deathFlag: res[ParaName.DEATH_FLAG],
            symptom: res[ParaName.SYMPTOM],
            dischargeTime: res[ParaName.DISCHARGE_TIME],
            hospitalName: res[ParaName.HOSPITAL_NAME],
            mainDiagnosis: mainDiagnosisStr,
            operation: operationStr,
            otherDiagnosis: otherDiagnosisStr,
            age: res[ParaName.AGE],
            sex: res[ParaName.SEX]};
    }


    return function(dispatch, getState) {

        let url =  RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_VISIT_DETAILED_INFO + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        dispatch(detailedVisitInfoRequestPost(queryID));
        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(detailedVisitInfoReceiveFailedResult(queryID))})
            .then(res => stateContentReorganize(res))
            .then(res => {dispatch(detailedVisitInfoReceiveSuccessResult(res, queryID));}
            )
    }
}



