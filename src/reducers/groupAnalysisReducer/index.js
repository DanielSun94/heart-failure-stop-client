import { combineReducers } from 'redux';
import managementReducer from "./managementReducer";

const groupAnalysisReducer = combineReducers({
    management: managementReducer,
});

export default groupAnalysisReducer;