import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import dashboardContentReducer from './dashboardReducer/index';
import {CHANGE_FRONT_PAGE} from '../actions/frontPageAction'

const initStateInfo = {
  frontPage: ""
}
const frontPageReducer = (state=initStateInfo, action) => {
  switch (action.type){
      case CHANGE_FRONT_PAGE: return (
          {frontPage: action.newPage});
      default: return state;
  }
}

const rootReducer = combineReducers({
  dashboard: dashboardContentReducer,
  session: sessionReducer,
  frontPage: frontPageReducer
});

export default rootReducer;
