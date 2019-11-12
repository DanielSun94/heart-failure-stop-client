import { combineReducers } from 'redux';
import singleVisitFullInfoReducer from './singleVisitFullInfoReducer';
import briefVisitInfoReducer from './briefVisitInfoReducer';
import riskReducer from './riskReducer';
import trajectoryReducer from './trajectoryReducer';
import unifiedPatientIDAndPatientBasicInfoReducer from './unifiedPatientIDAndPatientBasicInfoReducer';

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
    validVisitList: []
}
const trajectoryAnalysisGeneralInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
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
    risk: riskReducer,
    trajectory: trajectoryReducer,
    unifiedPatientIDAndPatientBasicInfo: unifiedPatientIDAndPatientBasicInfoReducer
})
