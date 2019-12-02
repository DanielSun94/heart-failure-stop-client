import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import ParaName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const RISK_REQUEST = 'RISK_REQUEST';
export const REQUEST_RECEIVE_SUCCESS_POST = 'REQUEST_RECEIVE_SUCCESS_POST';
export const REQUEST_RECEIVE_FAILED_POST = 'REQUEST_RECEIVE_FAILED_POST';

export function requestPosts(predictionTask) {
    return ({type: RISK_REQUEST, predictionTask: predictionTask})
}

export function receiveSuccessResult(res, predictionTask, currentOrPrevious) {
  return ({
      type: REQUEST_RECEIVE_SUCCESS_POST,
      result: res,
      currentOrPrevious: currentOrPrevious,
      predictTask: predictionTask
    })
}


export function receiveFailedResult() {
  return {type: REQUEST_RECEIVE_FAILED_POST,}
}

export function fetchPosts(params, predictionTask, currentOrPrevious) {
  return function(dispatch, getState) {
      dispatch(requestPosts(predictionTask))
      let url = RouteName.B_MACHINE_LEARNING + RouteName.B_TENSORFLOW_HAWKES_RNN + queryParamsTrans({...params, 'predictTask': predictionTask});
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      
      return fetch(url, {method: ParaName.GET, headers: header})
      .then(res => res.json(),
            error => {console.log(error); dispatch(receiveFailedResult())})
      .then(
        res => {
          if(res.status && !(res.status === '200' || res.status === 200)){
            dispatch(receiveFailedResult())
            console.log('Unkown: Error, get detailed visit info failed')
          }
          else{
            dispatch(receiveSuccessResult(res, predictionTask, currentOrPrevious))
            console.log('get detailed visit info successed')
          }
        }
      )
}
}
  