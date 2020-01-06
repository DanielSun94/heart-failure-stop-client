import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import algorithmReducer from "./algorithmReducer";
import individualAnalysisReducer from './individualAnalysisReducer/index';

const rootReducer = combineReducers({
    individual: individualAnalysisReducer,
    session: sessionReducer,
    algorithm: algorithmReducer
});

export default rootReducer;
