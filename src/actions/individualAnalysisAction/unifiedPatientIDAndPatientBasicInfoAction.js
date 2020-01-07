import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const UNIFIED_ID_AND_BASIC_INFO_INITIALIZE = 'UNIFIED_ID_AND_BASIC_INFO_INITIALIZE';
export const UNIFIED_ID_AND_BASIC_INFO_DELETE = "UNIFIED_ID_AND_BASIC_INFO_INITIALIZE";

// 以下为与获取unified patient id的相关Action代码
export const UNIFIED_PATIENT_ID_REQUEST_POST = 'UNIFIED_PATIENT_ID_REQUEST_POST';
export const UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_RESULT = 'UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_RESULT';
export const UNIFIED_PATIENT_ID_NOT_FOUND = 'UNIFIED_PATIENT_ID_NOT_FOUND';
export const UNIFIED_PATIENT_ID_RECEIVE_FAILED_RESULT = 'UNIFIED_PATIENT_ID_RECEIVE_FAILED_RESULT';
export const CHANGE_LOCAL_PATIENT_ID = 'CHANGE_LOCAL_PATIENT_ID';

// 以下为与获取patient basic info的相关Action代码
export const PATIENT_BASIC_INFO_REQUEST_POST = 'PATIENT_BASIC_INFO_REQUEST_POST';
export const PATIENT_BASIC_INFO_RECEIVE_SUCCESS_RESULT = 'PATIENT_BASIC_INFO_RECEIVE_SUCCESS_RESULT';
export const PATIENT_BASIC_INFO_RECEIVE_FAILED_RESULT = 'PATIENT_BASIC_INFO_RECEIVE_FAILED_RESULT';


export function fetchUnifiedPatientID(event, hospitalCode, queryID) {
    // 由于此event默认由form的submit触发（默认会刷新页面，但是在本处我们不希望这样），因此要避免缺省动作
    event.preventDefault();

    // 在确定病人local ID 后，查询其全局ID
    return function(dispatch, getState) {
        let state = getState();
        dispatch(unifiedIdAndBasicInfoUnifiedPatientIDRequestPost(queryID));

        let localPatientID = state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].localPatientID;
        let params = {patientID: localPatientID, hospitalCode: hospitalCode};
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_UNIFIED_PATIENT_ID + queryParamsTrans(params);

        // get unified patient id
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        fetch(url, {method: ParaName.GET, headers: header})
            .then(res=> res.json(),
                error => {console.log(error); dispatch(unifiedPatientIDReceiveFailedResult(queryID))})
            .then(res => {
                    if (res.unifiedPatientID==="noUnifiedPatientIDFound"){
                        dispatch(unifiedPatientIDNotFound(queryID));
                    }
                    else{
                        dispatch(unifiedPatientIDReceiveSuccessResult(res[ParaName.UNIFIED_PATIENT_ID], queryID));
                    }
                }
            )
    }
}

export function unifiedIdAndBasicInfoDelete(queryID) {
    return ({type: UNIFIED_ID_AND_BASIC_INFO_INITIALIZE, queryID: queryID})
}


export function unifiedIdAndBasicInfoInitialize(queryID) {
    return ({type: UNIFIED_ID_AND_BASIC_INFO_DELETE, queryID: queryID})
}

function unifiedIdAndBasicInfoUnifiedPatientIDRequestPost(queryID) {
    return ({type: UNIFIED_PATIENT_ID_REQUEST_POST, queryID: queryID})
}

function unifiedPatientIDReceiveSuccessResult(res, queryID) {
    return ({
        type: UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_RESULT,
        unifiedPatientID: res,
        queryID: queryID
    })
}

function unifiedPatientIDReceiveFailedResult(queryID) {
    return {type: UNIFIED_PATIENT_ID_RECEIVE_FAILED_RESULT, queryID: queryID}
}

function unifiedPatientIDNotFound(queryID) {
    return {type: UNIFIED_PATIENT_ID_NOT_FOUND, queryID: queryID}
}

function changeLocalPatientID(para, queryID) {
    return {type: CHANGE_LOCAL_PATIENT_ID, localPatientID: para, queryID: queryID}
}

function patientBasicInfoRequestPost(queryID) {
    return ({type: PATIENT_BASIC_INFO_REQUEST_POST, queryID: queryID})
}


function patientBasicInfoReceiveSuccessResult(res, queryID) {
    return ({
        type: PATIENT_BASIC_INFO_RECEIVE_SUCCESS_RESULT,
        queryID: queryID,
        res: {
            patientName: res[ParaName.PATIENT_NAME], sex: res[ParaName.SEX], birthday: res[ParaName.BIRTHDAY],
            ethnicGroup: res[ParaName.ETHNIC_GROUP]}
    })
}

function patientBasicInfoReceiveFailedResult(queryID) {
    return {type: PATIENT_BASIC_INFO_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function requestPatientBasicInfo(params, queryID) {

    return function(dispatch, getState) {
        dispatch(patientBasicInfoRequestPost(queryID));

        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_BASIC_INFO + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(patientBasicInfoReceiveFailedResult(queryID))})
            .then(res => dispatch(patientBasicInfoReceiveSuccessResult(res, queryID)))
    }
}
