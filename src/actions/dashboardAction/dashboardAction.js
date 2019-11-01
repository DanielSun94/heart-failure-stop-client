export const DASHBOARD_CONTENT = 'DASHBOARD_CONTENT';
export const DASHBOARD_MOBILE_VIEW = 'DASHBOARD_MOBILE_VIEW';
export const TRAJECTORY_ANALYSIS_MODULE = 'TRAJECTORY_ANALYSIS_MODULE';
export const BLANK_PAGE = 'BLANK_PAGE';

export function changeContent(content){
  return ({
    type: content,
  });
}

export function toggleMobileView(){
    return({
        type: DASHBOARD_MOBILE_VIEW,
        content: 'toggle mobile view state'
    })
}