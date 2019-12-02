import { combineReducers } from 'redux';
import riskReducer from './riskReducer';
import trajectoryReducer from './trajectoryReducer';
import unifiedPatientIDAndPatientBasicInfoReducer from './unifiedPatientIDAndPatientBasicInfoReducer';
import examReducer from './examReducer';
import labtestResultReducer from './labtestResultReducer';
import orderReducer from './orderReducer';
import vitalSignReducer from './vitalSignReducer';

export default combineReducers({
    risk: riskReducer,
    trajectory: trajectoryReducer,
    unifiedPatientIDAndPatientBasicInfo: unifiedPatientIDAndPatientBasicInfoReducer,
    exam: examReducer,
    labtestResult: labtestResultReducer,
    order: orderReducer,
    vitalSign: vitalSignReducer,
})
