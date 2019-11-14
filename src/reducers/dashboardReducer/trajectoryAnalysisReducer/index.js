import { combineReducers } from 'redux';
import singleVisitFullInfoReducer from './singleVisitFullInfoReducer';
import riskReducer from './riskReducer';
import trajectoryReducer from './trajectoryReducer';
import unifiedPatientIDAndPatientBasicInfoReducer from './unifiedPatientIDAndPatientBasicInfoReducer';

export default combineReducers({
    singleVisitFullInfo: singleVisitFullInfoReducer,
    risk: riskReducer,
    trajectory: trajectoryReducer,
    unifiedPatientIDAndPatientBasicInfo: unifiedPatientIDAndPatientBasicInfoReducer
})
