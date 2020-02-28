import {
    LAB_TEST_CODING_MAP_REQUEST_FAILED,
    LAB_TEST_CODING_MAP_REQUEST_SUCCESS,
    LAB_TEST_CODING_MAP_REQUEST,
    MEDICINE_CODING_MAP_REQUEST_FAILED,
    MEDICINE_CODING_MAP_REQUEST_SUCCESS,
    MEDICINE_CODING_MAP_REQUEST,
    DIAGNOSIS_CODING_MAP_REQUEST_FAILED,
    DIAGNOSIS_CODING_MAP_REQUEST_SUCCESS,
    DIAGNOSIS_CODING_MAP_REQUEST,
    OPERATION_CODING_MAP_REQUEST_FAILED,
    OPERATION_CODING_MAP_REQUEST_SUCCESS,
    OPERATION_CODING_MAP_REQUEST
} from './../actions/contextInfoAction'

const initialState = {
    diagnosisCode: {isFetchingData: false, isDataValid: false, list: [], map: {}},
    operationCode: {isFetchingData: false, isDataValid: false, list: [], map: {}},
    labTestCode: {isFetchingData: false, isDataValid: false, list: [], map: {}},
    medicineCode: {isFetchingData: false, isDataValid: false, list: [], map: {}},
};

const contextInfoReducer = (state=initialState, action)=>{
    switch (action.type) {
        case LAB_TEST_CODING_MAP_REQUEST_FAILED: return labTestRequestFailed(state);
        case LAB_TEST_CODING_MAP_REQUEST_SUCCESS: return labTestRequestSuccess(state, action.result);
        case LAB_TEST_CODING_MAP_REQUEST: return labTestRequest(state);
        case MEDICINE_CODING_MAP_REQUEST_FAILED: return medicineRequestFailed(state);
        case MEDICINE_CODING_MAP_REQUEST_SUCCESS: return medicineRequestSuccess(state, action.result);
        case MEDICINE_CODING_MAP_REQUEST: return medicineRequest(state);
        case DIAGNOSIS_CODING_MAP_REQUEST_FAILED: return diagnosisRequestFailed(state);
        case DIAGNOSIS_CODING_MAP_REQUEST_SUCCESS: return diagnosisRequestSuccess(state, action.result);
        case DIAGNOSIS_CODING_MAP_REQUEST: return diagnosisRequest(state);
        case OPERATION_CODING_MAP_REQUEST_FAILED: return operationRequestFailed(state);
        case OPERATION_CODING_MAP_REQUEST_SUCCESS: return operationRequestSuccess(state, action.result);
        case OPERATION_CODING_MAP_REQUEST: return operationRequest(state);
        default: return {...state};
    }
};

function diagnosisRequest(state) {
    state.diagnosisCode={
        ...state.diagnosisCode,
        isFetchingData: true,
        isDataValid: false,
    };
    return {...state}
}

function diagnosisRequestSuccess(state, result) {
    const list = JSON.parse(result);
    const map = {};
    for(const item of list){
        map[item[0]]=item[1]
    }
    state.diagnosisCode={
        ...state.diagnosisCode,
        isFetchingData: false,
        isDataValid: true,
        list: list,
        map: map,
    };
    return {...state}
}

function diagnosisRequestFailed(state) {
    state.diagnosisCode={
        ...state.diagnosisCode,
        isFetchingData: false,
    };
    return {...state}
}

function medicineRequest(state) {
    state.medicineCode={
        ...state.medicineCode,
        isFetchingData: true,
        isDataValid: false,
    };
    return {...state}
}

function medicineRequestSuccess(state, result) {
    const list = JSON.parse(result);
    const map = {};
    for(const item of list){
        map[item[0]]=item[1]
    }
    state.medicineCode={
        ...state.medicineCode,
        isFetchingData: false,
        isDataValid: true,
        list: list,
        map: map
    };
    return {...state}
}

function medicineRequestFailed(state) {
    state.medicineCode={
        ...state.medicineCode,
        isFetchingData: false,
    };
    return {...state}
}

function labTestRequest(state) {
    state.labTestCode={
        ...state.labTestCode,
        isFetchingData: true,
        isDataValid: false,
    };
    return {...state}
}

function labTestRequestSuccess(state, result) {
    const list = JSON.parse(result);
    const map = {};
    for(const item of list){
        map[item[0]]=item
    }
    state.labTestCode={
        ...state.labTestCode,
        isFetchingData: false,
        isDataValid: true,
        list: list,
        map: map
    };
    return {...state}
}

function labTestRequestFailed(state) {
    state.labTestCode={
        ...state.labTestCode,
        isFetchingData: false,
    };
    return {...state}
}

function operationRequest(state) {
    state.operationCode={
        ...state.operationCode,
        isFetchingData: true,
        isDataValid: false,
    };
    return {...state}
}

function operationRequestSuccess(state, result) {
    const list = JSON.parse(result);
    const map = {};
    for(const item of list){
        map[item[0]]=item[1]
    }
    state.operationCode={
        ...state.operationCode,
        isFetchingData: false,
        isDataValid: true,
        list: list,
        map: map
    };
    return {...state}
}

function operationRequestFailed(state) {
    state.operationCode={
        ...state.operationCode,
        isFetchingData: false,
    };
    return {...state}
}

export default contextInfoReducer;