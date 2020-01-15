import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import algorithmReducer from "./algorithmReducer";
import individualAnalysisReducer from './individualAnalysisReducer/index';
import groupAnalysisReducer from "./groupAnalysisReducer";
import metaInfoReducer from "./metaInfoReducer";

const rootReducer = combineReducers({
    individual: individualAnalysisReducer,
    group: groupAnalysisReducer,
    metaInfo: metaInfoReducer,
    session: sessionReducer,
    algorithm: algorithmReducer,
});

export default rootReducer;
