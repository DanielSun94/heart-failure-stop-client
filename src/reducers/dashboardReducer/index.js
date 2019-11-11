import trajectoryAnalysisReducer from './trajectoryAnalysisReducer';
import blankPageReducer from './blankPageReducer'
import { combineReducers } from 'redux';

const dashboardContentReducer = combineReducers({
  trajectoryAnalysis: trajectoryAnalysisReducer, 
  blankPage: blankPageReducer}) 

export default dashboardContentReducer;


