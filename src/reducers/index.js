import { combineReducers } from 'redux';

import dashboardContentReducer from './dashboardReducer/index';

const rootReducer = combineReducers({
  dashboardContentReducer
});

export default rootReducer;
