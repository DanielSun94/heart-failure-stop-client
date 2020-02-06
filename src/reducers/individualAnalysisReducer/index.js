import { combineReducers } from 'redux';
import modelReducer from './individualModelReducer';
import trajectoryReducer from './trajectoryReducer';
import unifiedPatientIDAndPatientBasicInfoReducer from './unifiedPatientIDAndPatientBasicInfoReducer';
import examReducer from './examReducer';
import labtestResultReducer from './labtestResultReducer';
import orderReducer from './orderReducer';
import vitalSignReducer from './vitalSignReducer';

const individualAnalysisReducer = combineReducers({
    model: modelReducer,
    trajectory: trajectoryReducer,
    unifiedPatientIDAndPatientBasicInfo: unifiedPatientIDAndPatientBasicInfoReducer,
    exam: examReducer,
    labtestResult: labtestResultReducer,
    order: orderReducer,
    vitalSign: vitalSignReducer,
});

export default individualAnalysisReducer;