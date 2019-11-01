import { combineReducers } from 'redux';
import singleVisitFullInfoReducer from './singleVisitFullInfoReducer';
import briefVisitInfoReducer from './briefVisitInfoReducer';
import patientBasicInfoReducer from './patientBasicInfoReducer';
import riskReducer from './riskReducer';
import trajectoryReducer from './trajectoryReducer';
import {UNIFIED_PATIENT_ID_REQUEST_POSTS,
    UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS,
    UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS,
    CHANGE_LOCAL_PATIENT_ID,
    CHANGE_TARGET_VISIT,
    SHOW_DETAIL} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAnalysisModuleAction';


const FETCH_DATA_IN_PROGRESS = 'FETCH_DATA_IN_PROGRESS';
const FETCH_DATA_SUCCEED = 'FETCH_DATA_SUCCEED';
const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED';

const initStateInfo = {
    isFrontStage: false,
    isDataOutOfDate: false,
    fetchingDataStatus: FETCH_DATA_SUCCEED,
    localPatientID: '',
    unifiedPatientID: '',
    hospitalCode: '1',
    visitType: '住院',
    visitID: '1',
    showDetail: false,
}
const trajectoryAnalysisGeneralInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case UNIFIED_PATIENT_ID_REQUEST_POSTS: return (
            {isDataFetching: true,
            isDataValid: false});
        case UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS: return (
            {isDataFetching: false,
            isDataValid: true,
            unifiedPatientID: action.unifiedPatientID}
            );
        case UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS: return (
            {isDataFetching: false,
            isDataValid: false}
            );
        case CHANGE_LOCAL_PATIENT_ID: return (
            {localPatientID: action.localPatientID});
        case CHANGE_TARGET_VISIT: return (
            {hospitalCode: action.hospitalCode,
            visitType: action.visitType,
            visitID: action.visitID}
            );
        case SHOW_DETAIL: return (
            {showDetail: action.showDetail}
            );
    }
}

export default combineReducers({
    trajectoryAnalysisGeneralInfoReducer,
    singleVisitFullInfoReducer,
    briefVisitInfoReducer,
    patientBasicInfoReducer,
    riskReducer,
    trajectoryReducer
})
