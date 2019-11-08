import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import dashboardContentReducer from './dashboardReducer/index';

const rootReducer = combineReducers({
  dashboardContent: dashboardContentReducer,
  session: sessionReducer
});

export default rootReducer;
