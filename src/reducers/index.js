import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import algorithmReducer from "./algorithmReducer";
import dashboardContentReducer from './dashboardReducer/index';
import {CHANGE_FRONT_PAGE} from '../actions/frontPageAction'

const initStateInfo = {
  frontPage: ""
};
const frontPageReducer = (state=initStateInfo, action) => {
  if (action.type === CHANGE_FRONT_PAGE) {
      return (
          {frontPage: action.newPage});
  } else {
      return state;
  }
};

const rootReducer = combineReducers({
    dashboard: dashboardContentReducer,
    session: sessionReducer,
    frontPage: frontPageReducer,
    algorithm: algorithmReducer
});

export default rootReducer;
