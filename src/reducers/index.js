import { combineReducers } from 'redux';

import dashboardContentReducer from './dashboardReducer/index';

const rootReducer = combineReducers({
  dashboardContent: dashboardContentReducer
});

export default rootReducer;
