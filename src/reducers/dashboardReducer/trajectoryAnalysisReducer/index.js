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
import {VISIT_INFO_REQUEST_POSTS, VISIT_INFO_SUCCESS_POSTS, VISIT_INFO_FAILED_POSTS, SET_CURRENT_VISIT_INFO} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAnalysisModuleSelectAction';

const initStateInfo = {
    isFrontStage: false,
    isDataFetching: false,
    isDataValid: false,
    localPatientID: '-1',
    unifiedPatientID: '',
    hospitalCode: '1',
    visitType: '住院',
    visitID: '1',
    showDetail: false,
    validVisitList: []
}
const trajectoryAnalysisGeneralInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case UNIFIED_PATIENT_ID_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case UNIFIED_PATIENT_ID_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            unifiedPatientID: action.unifiedPatientID}
            );
        case UNIFIED_PATIENT_ID_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        case CHANGE_LOCAL_PATIENT_ID: return (
            {...state, localPatientID: action.localPatientID});
        case CHANGE_TARGET_VISIT: return (
            {...state, hospitalCode: action.hospitalCode,
            visitType: action.visitType,
            visitID: action.visitID}
            );
        case SHOW_DETAIL: return (
            {...state, showDetail: action.showDetail}
            );

        case SET_CURRENT_VISIT_INFO: return(
                {...state, visitType: action.visitType, hospitalCode: action.hospitalCode, 
                    hospitalName: action.hospitalName, visitID: action.visitID}
            );
        case VISIT_INFO_REQUEST_POSTS: return(
            {...state,  isDataFetching: true,
                isDataValid: false})
                case VISIT_INFO_SUCCESS_POSTS: return(
                    {...state, validVisitList: action.content}
                    );
        case VISIT_INFO_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default combineReducers({
    trajectoryAnalysisGeneralInfo: trajectoryAnalysisGeneralInfoReducer,
    singleVisitFullInfo: singleVisitFullInfoReducer,
    briefVisitInfo: briefVisitInfoReducer,
    patientBasicInfo: patientBasicInfoReducer,
    risk: riskReducer,
    trajectory: trajectoryReducer
})
