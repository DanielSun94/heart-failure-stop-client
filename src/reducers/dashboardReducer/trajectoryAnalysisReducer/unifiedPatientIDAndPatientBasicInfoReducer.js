import {
    UNIFIED_PATIENT_ID_REQUEST_POSTS,
    UNIFIED_PATIENT_ID_RECEIVE_POSTS_SUCCESS,
    UNIFIED_PATIENT_ID_REQUEST_POSTS_UNKOWN_ERROR,
    UNIFIED_PATIENT_ID_NOT_FOUND,
    CHANGE_LOCAL_PATIENT_ID,
    PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS,
    PATIENT_BASIC_INFO_REQUEST_POSTS,
    PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction';

export const ERROR_UNKNOWN = 'errorUnknown';
export const ERROR_NOT_FOUND = 'errorNotFound'
export const ERROR_NO_ERROR = 'errorNoError'

const initState = {
    localPatientID: "S115664930",
    unifiedPatientID: "",
    errorType: ERROR_NO_ERROR,
    patientBasicInfo:{
        errorType: ERROR_NO_ERROR,
        patientName: "",
        sex: "",
        ethnicGroup: "",
        birthday: ""
    }
}

const unifiedPatientIDAndPatientBasicInfoReducer = (state=initState, action) => {
    switch (action.type){
        case UNIFIED_PATIENT_ID_REQUEST_POSTS: {
            console.log('fetching unified patient id');
            return {...state, errorType: ERROR_NO_ERROR};
        }
        case UNIFIED_PATIENT_ID_RECEIVE_POSTS_SUCCESS: {
            console.log('fetch unified patient success');
            return {...state, unifiedPatientID: action.unifiedPatientID};
        }
        case UNIFIED_PATIENT_ID_REQUEST_POSTS_UNKOWN_ERROR: {
            console.log('known error, fetch unified patient id failed');
            return {...state, unifiedPatientID: "", errorType: ERROR_UNKNOWN};;
        }
        case UNIFIED_PATIENT_ID_NOT_FOUND: {
            console.log('no valid unified patient id found');
            return {...state, unifiedPatientID: "", errorType: ERROR_NOT_FOUND};
        }

        case CHANGE_LOCAL_PATIENT_ID: return (
            {...state, errorType: ERROR_NO_ERROR, localPatientID: action.localPatientID});

        case PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS: {
            console.log('get patient basic info successed');
            return {...state, patientBasicInfo: 
                {...state.patientBasicInfo, 
                    patientName: action.res.patientName,
                    sex: action.res.sex,
                    ethnicGroup: action.res.ethnicGroup,
                    birthday: action.res.birthday,
                }};
        }
        case PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS: {
            console.log('unknown error, get patient basic info failed');
            return {...state, patientBasicInfo: {errorType: ERROR_UNKNOWN}};
        }
        case PATIENT_BASIC_INFO_REQUEST_POSTS:  {
            console.log('get patient basic info');
            return {...state, patientBasicInfo: {errorType: ERROR_NO_ERROR}};
        }
        default: return state;
    }
}

export default unifiedPatientIDAndPatientBasicInfoReducer
    