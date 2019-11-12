import ParaName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';

export const TRAJECTORY_REQUEST = 'TRAJECTORY_REQUEST';
export const TRAJECTORY_RECEIVE_SUCCESS_POSTS = 'TRAJECTORY_RECEIVE_SUCCESS_POSTS';
export const TRAJECTORY_RECEIVE_FAILED_POSTS = 'TRAJECTORY_RECEIVE_FAILED_POSTS';

// 同步操作
export const CHANGE_LOCAL_PATIENT_ID = 'CHANGE_LOCAL_PATIENT_ID';
export const CHANGE_TARGET_VISIT = 'CHANGE_TARGET_VISIT';

export function requestPosts() {
    return ({type: TRAJECTORY_REQUEST})
}


export function receiveSuccessResult(res) {
  return ({
      type: TRAJECTORY_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: TRAJECTORY_RECEIVE_FAILED_POSTS,}
}


function getValidVisit(params){
  return function(dispatch, getState) {
    let validVisitSearching = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_TRAJECTORY + queryParamsTrans(params);
    let token = getState().session.authenticToken
    let header = {'Authorization': token};
    console.log('valid visit search url： '+ validVisitSearching);
    fetch(validVisitSearching, {method: ParaName.GET, headers: header})
    .then(res => res.json(), error => {console.log(error); dispatch(receiveFailedResult())})
    .then(res => {console.log(res); return res;})
    .then(res => dispatch(receiveSuccessResult(res)))
    .then(() => console.log('valid visit search successed'))
  }
}

export function changeTargetVisit(event) {
  let index = String(event.currentTarget.selectedIndex);
  let dataset = event.currentTarget[index].dataset;
  let visitID = dataset['visitid'];
  let visitType = dataset['visittype'];
  let hospitalCode = dataset['hospitalcode'];

  return ({type: CHANGE_TARGET_VISIT, visitID: visitID, visitType: visitType, hospitalCode: hospitalCode})
}
