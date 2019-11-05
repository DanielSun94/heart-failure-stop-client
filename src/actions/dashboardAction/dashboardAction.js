export const TOGGLE_DASHBOARD_MOBILE_VIEW = 'TOGGLE_DASHBOARD_MOBILE_VIEW';

export const DASHBOARD_CONTENT = 'DASHBOARD_CONTENT';
export const TRAJECTORY_ANALYSIS_MODULE = 'TRAJECTORY_ANALYSIS_MODULE';
export const BLANK_PAGE = 'BLANK_PAGE';

export const TOGGLE_FRONT_STAGE_STATE = 'TOGGLE_FRONT_STAGE_STATE';

export function changeContent(content){
  return ({
    type: DASHBOARD_CONTENT,
    page: content
  });
}

export function toggleMobileView(value){
    return({
        type: TOGGLE_DASHBOARD_MOBILE_VIEW,
        viewState: value
    })
}

export function changeFrontStageState(content){
  return ({
    type: TOGGLE_FRONT_STAGE_STATE,
  });
}
