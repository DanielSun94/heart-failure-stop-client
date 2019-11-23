import { combineReducers } from 'redux';
import riskReducer from './riskReducer';
import trajectoryReducer from './trajectoryReducer';
import unifiedPatientIDAndPatientBasicInfoReducer from './unifiedPatientIDAndPatientBasicInfoReducer';
import examReducer from './examReducer';
import labTestResultReducer from './labTestResultReducer';
import orderReducer from './orderReducer';
import vitalSignReducer from './vitalSignReducer';

export default combineReducers({
    risk: riskReducer,
    trajectory: trajectoryReducer,
    unifiedPatientIDAndPatientBasicInfo: unifiedPatientIDAndPatientBasicInfoReducer,
    exam: examReducer,
    labTestResult: labTestResultReducer,
    order: orderReducer,
    vitalSign: vitalSignReducer
})
