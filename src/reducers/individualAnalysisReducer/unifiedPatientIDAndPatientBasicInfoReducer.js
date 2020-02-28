import {
    CHANGE_LOCAL_PATIENT_ID,
    UNIFIED_ID_AND_BASIC_INFO_INITIALIZE,
    PATIENT_BASIC_INFO_RECEIVE_FAILED_RESULT,
    PATIENT_BASIC_INFO_RECEIVE_SUCCESS_RESULT,
    PATIENT_BASIC_INFO_REQUEST_POST,
    UNIFIED_PATIENT_ID_NOT_FOUND,
    UNIFIED_PATIENT_ID_RECEIVE_FAILED_RESULT,
    UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_RESULT,
    UNIFIED_PATIENT_ID_REQUEST_POST,
    UNIFIED_ID_AND_BASIC_INFO_DELETE,
    PATIENT_BASIC_INFO_SET_STATE
} from '../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction';

export const FAILED_ERROR = 'failedError';
export const FAILED_NOT_FOUND = 'failedNotFound';
export const IS_FETCHING = 'isFetching';
export const SUCCESS = 'complete';
export const NO_ACTION = 'noAction';

const initState = {};

const unifiedPatientIDAndPatientBasicInfoReducer = (state=initState, action) => {
    switch (action.type){
        case PATIENT_BASIC_INFO_SET_STATE: return {...action.newState};
        case UNIFIED_ID_AND_BASIC_INFO_INITIALIZE: return initialize(state, action.queryID);

        case UNIFIED_ID_AND_BASIC_INFO_DELETE: return panelDelete(state, action.queryID);

        case UNIFIED_PATIENT_ID_REQUEST_POST: return unifiedPatientIDRequest(state, action.queryID);

        case UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_RESULT:
            return unifiedPatientIDReceiveSuccess(state, action.unifiedPatientID, action.queryID);

        case UNIFIED_PATIENT_ID_RECEIVE_FAILED_RESULT:
            return unifiedPatientIDReceiveFailed(state, action.queryID);

        case UNIFIED_PATIENT_ID_NOT_FOUND: return unifiedPatientIDNotFound(state, action.queryID);

        case CHANGE_LOCAL_PATIENT_ID: return changeLocalPatientID(state, action.localPatientID, action.queryID);

        case PATIENT_BASIC_INFO_RECEIVE_SUCCESS_RESULT: {
            return patientBasicInfoReceiveSuccess(state, action.res, action.queryID);
        }
        case PATIENT_BASIC_INFO_RECEIVE_FAILED_RESULT: {
            return patientBasicInfoReceiveFailed(state, action.queryID);
        }
        case PATIENT_BASIC_INFO_REQUEST_POST:
            return patientBasicInfoRequest(state, action.queryID);

        default: return {...state};
    }
};

function panelDelete(state, queryID){
    delete state[queryID];
    return {...state}
}

function initialize(state, queryID){
    if(!state[queryID])
        state[queryID] = {
            localPatientID: "",
            unifiedPatientID: "",
            dataStatus: NO_ACTION,
            patientBasicInfo:{
                dataStatus: NO_ACTION,
                patientName: "",
                sex: "",
                ethnicGroup: "",
                birthday: ""
            },
        };
    return {...state}
}

function changeLocalPatientID(state, localPatientID, queryID){
    let queryState = state[queryID];
    state[queryID] = {...queryState, localPatientID: localPatientID};
    return {...state}
}


function unifiedPatientIDRequest(state, queryID){
    let queryState = state[queryID];
    state[queryID] = {...queryState, dataStatus: IS_FETCHING};
    return {...state}
}

function unifiedPatientIDReceiveSuccess(state, unifiedPatientID, queryID){
    let queryState = state[queryID];
    state[queryID] = {...queryState, unifiedPatientID: unifiedPatientID, dataStatus: SUCCESS};
    return {...state}
}

function unifiedPatientIDReceiveFailed(state, unifiedPatientID, queryID){
    let queryState = state[queryID];
    state[queryID] = {...queryState, dataStatus: FAILED_ERROR};
    return {...state}
}

function unifiedPatientIDNotFound(state, queryID){
    let queryState = state[queryID];
    state[queryID] = {...queryState, dataStatus: FAILED_NOT_FOUND};
    return {...state}
}

function patientBasicInfoRequest(state, queryID){
    let queryState = state[queryID];
    let basicInfoState = queryState['patientBasicInfo'];
    basicInfoState['dataStatus']= IS_FETCHING;
    queryState = {...queryState, patientBasicInfo: {...basicInfoState}};
    state[queryID] = queryState;
    return {...state}
}

function patientBasicInfoReceiveSuccess(state, res, queryID){
    let queryState = state[queryID];
    let basicInfoState = {
        dataStatus: SUCCESS,
        patientName: res.patientName,
        sex: res.sex,
        ethnicGroup: res.ethnicGroup,
        birthday: res.birthday,
    };
    queryState = {...queryState, patientBasicInfo: {...basicInfoState}};
    state[queryID] = queryState;
    return {...state}
}

function patientBasicInfoReceiveFailed(state, queryID){
    let queryState = state[queryID];
    let basicInfoState = queryState['patientBasicInfo'];
    basicInfoState['dataStatus']= FAILED_ERROR;
    queryState = {...queryState, patientBasicInfo: {...basicInfoState}};
    state[queryID] = queryState;
    return {...state}
}

export default unifiedPatientIDAndPatientBasicInfoReducer
    