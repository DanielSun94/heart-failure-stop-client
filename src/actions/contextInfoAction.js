// 正常运行需要一些准备信息（目前主要是手术、药物、诊断、实验室检查的编码表），需要预先载入
import RouteName from "../utils/RouteName";
import ParaName from "../utils/ParaName";

export const LAB_TEST_CODING_MAP_REQUEST = 'LAB_TEST_CODING_MAP_REQUEST';
export const LAB_TEST_CODING_MAP_REQUEST_SUCCESS = 'LAB_TEST_CODING_MAP_REQUEST_SUCCESS';
export const LAB_TEST_CODING_MAP_REQUEST_FAILED = 'LAB_TEST_CODING_MAP_REQUEST_FAILED';
export const MEDICINE_CODING_MAP_REQUEST = "MEDICINE_CODING_MAP_REQUEST";
export const MEDICINE_CODING_MAP_REQUEST_SUCCESS = "MEDICINE_CODING_MAP_REQUEST_SUCCESS";
export const MEDICINE_CODING_MAP_REQUEST_FAILED = "MEDICINE_CODING_MAP_REQUEST_FAILED";
export const OPERATION_CODING_MAP_REQUEST = "OPERATION_CODING_MAP_REQUEST";
export const OPERATION_CODING_MAP_REQUEST_SUCCESS = "OPERATION_CODING_MAP_REQUEST_SUCCESS";
export const OPERATION_CODING_MAP_REQUEST_FAILED = "OPERATION_CODING_MAP_REQUEST_FAILED";
export const DIAGNOSIS_CODING_MAP_REQUEST = "DIAGNOSIS_CODING_MAP_REQUEST";
export const DIAGNOSIS_CODING_MAP_REQUEST_SUCCESS = "DIAGNOSIS_CODING_MAP_REQUEST_SUCCESS";
export const DIAGNOSIS_CODING_MAP_REQUEST_FAILED = "DIAGNOSIS_CODING_MAP_REQUEST_FAILED";

export function getLabTestCodingMap() {
    return function (dispatch, getState) {
        dispatch(labTestCodingMapRequest());
        let url = RouteName.B_CONTEXT_INFO + RouteName.B_LAB_TEST_CODE;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {
                    console.log(error);
                    dispatch(labTestCodingMapRequestFailed())
                })
            .then(res => dispatch(labTestCodingMapRequestSuccess(res['response'])))
    };
}

export function getMedicineCodingMap() {
    return function (dispatch, getState) {
        dispatch(medicineCodingMapRequest());
        let url = RouteName.B_CONTEXT_INFO + RouteName.B_MEDICINE_CODE;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {
                    console.log(error);
                    dispatch(medicineCodingMapRequestFailed())
                })
            .then(res => dispatch(medicineCodingMapRequestSuccess(res['response'])))
    };
}

export function getDiagnosisCodingMap() {
    return function (dispatch, getState) {
        dispatch(diagnosisCodingMapRequest());
        let url = RouteName.B_CONTEXT_INFO + RouteName.B_DIAGNOSIS_CODE;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {
                    console.log(error);
                    dispatch(diagnosisCodingMapRequestFailed())
                })
            .then(res => dispatch(diagnosisCodingMapRequestSuccess(res['response'])))
    };
}

export function getOperationCodingMap() {
    return function (dispatch, getState) {
        dispatch(operationCodingMapRequest());
        let url = RouteName.B_CONTEXT_INFO + RouteName.B_OPERATION_CODE;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {
                    console.log(error);
                    dispatch(operationCodingMapRequestFailed())
                })
            .then(res => dispatch(operationCodingMapRequestSuccess(res['response'])))
    };
}


function labTestCodingMapRequest() {
    return {type: LAB_TEST_CODING_MAP_REQUEST}
}

function labTestCodingMapRequestSuccess(result) {
    return  {type: LAB_TEST_CODING_MAP_REQUEST_SUCCESS, result: result}
}

function labTestCodingMapRequestFailed() {
    return {type: LAB_TEST_CODING_MAP_REQUEST_FAILED}
}

function medicineCodingMapRequest() {
    return {type: MEDICINE_CODING_MAP_REQUEST}
}

function medicineCodingMapRequestSuccess(result) {
    return {type: MEDICINE_CODING_MAP_REQUEST_SUCCESS, result: result}
}

function medicineCodingMapRequestFailed() {
    return {type: MEDICINE_CODING_MAP_REQUEST_FAILED}
}

function diagnosisCodingMapRequest() {
    return {type: DIAGNOSIS_CODING_MAP_REQUEST}
}

function diagnosisCodingMapRequestSuccess(result) {
    return {type: DIAGNOSIS_CODING_MAP_REQUEST_SUCCESS, result: result}
}

function diagnosisCodingMapRequestFailed() {
    return {type: DIAGNOSIS_CODING_MAP_REQUEST_FAILED}
}

function operationCodingMapRequest() {
    return {type: OPERATION_CODING_MAP_REQUEST}
}

function operationCodingMapRequestSuccess(result) {
    return {type: OPERATION_CODING_MAP_REQUEST_SUCCESS, result: result}
}

function operationCodingMapRequestFailed() {
    return {type: OPERATION_CODING_MAP_REQUEST_FAILED}
}