import trajectoryAnalysisReducer from './trajectoryAnalysisReducer';
import blankPageReducer from './blankPageReducer'
import { combineReducers } from 'redux';
import {TOGGLE_FRONT_STAGE_STATE, DASHBOARD_CONTENT,TOGGLE_DASHBOARD_MOBILE_VIEW, TRAJECTORY_ANALYSIS_MODULE} 
  from '../../actions/dashboardAction/dashboardAction';

const initStateInfo = {
  mobileView: false,
  frontStagePage: TRAJECTORY_ANALYSIS_MODULE
}

const dashboardGeneralInfoReducer = (state=initStateInfo, action) => {
  switch(action.type){
    case DASHBOARD_CONTENT: {return {...state, frontStagePage: action.content}}
    case TOGGLE_DASHBOARD_MOBILE_VIEW: {return {...state, mobileView: action.viewState}}
    case TOGGLE_FRONT_STAGE_STATE: {return {...state, isFrontStage: !state.frontStagePage}}
    default: return state
  }
}

const dashboardContentReducer = combineReducers({
  dashboardGeneralInfo: dashboardGeneralInfoReducer, 
  trajectoryAnalysis: trajectoryAnalysisReducer, 
  blankPage: blankPageReducer}) 

export default dashboardContentReducer;


