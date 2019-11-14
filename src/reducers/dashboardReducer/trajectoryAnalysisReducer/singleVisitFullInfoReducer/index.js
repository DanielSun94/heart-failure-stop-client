import { combineReducers } from 'redux';
import examReducer from './examReducer';
import labTestResultReducer from './labTestResultReducer';
import oralMedicalInterventionReducer from './oralMedicalInterventionReducer';
import vitalSignReducer from './vitalSignReducer';

export default combineReducers({
    exam: examReducer,
    labTestResult: labTestResultReducer,
    oralMedicalIntervention: oralMedicalInterventionReducer,
    vitalSign: vitalSignReducer
})
