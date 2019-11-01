import trajectoryAnalysisReducer from './trajectoryAnalysisReducer';
import blankPageReducer from './blankPageReducer'
import { combineReducers } from 'redux';


const DASHBOARD_TRAJECTORY_ANALYSIS_PAGE = 'DASHBOARD_TRAJECTORY_ANALYSIS_PAGE';
const DASHBOARD_BLANK_PAGE = 'DASHBOARD_BLANK_PAGE';

const initStateInfo = {
  isFrontStage: false,
  mobileView: false,
  frontStagePage: DASHBOARD_BLANK_PAGE
}

const dashboardGeneralInfoReducer = (state=initStateInfo, action) => {

}

const dashboardContentReducer = combineReducers(dashboardGeneralInfoReducer, trajectoryAnalysisReducer, blankPageReducer) 

//const handleNavBarMobileOpen = () => {
//  setOpenNavBarMobile(true);
//};

//const handleNavBarMobileClose = () => {
//  setOpenNavBarMobile(false);
//};

export default dashboardContentReducer;


