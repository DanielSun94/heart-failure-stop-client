import { combineReducers } from 'redux';
import detailedVisitInfoReducer from './detailedVisitInfoReducer';
import examReducer from './examReducer';
import labTestResultReducer from './labTestResultReducer';
import oralMedicalInterventionReducer from './oralMedicalInterventionReducer';
import vitalSignReducer from './vitalSignReducer';

export default combineReducers({
    detailedVisitInfoReducer,
    examReducer,
    labTestResultReducer,
    oralMedicalInterventionReducer,
    vitalSignReducer
})
