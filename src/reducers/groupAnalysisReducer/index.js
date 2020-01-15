import { combineReducers } from 'redux';
import contentReducer from "./contentReducer";
import managementReducer from "./managementReducer";

const groupAnalysisReducer = combineReducers({
    management: managementReducer,
    content: contentReducer,
});

export default groupAnalysisReducer;