import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import NormalizedName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_RECEIVE_SUCCESS_POSTS = 'ORDER_RECEIVE_SUCCESS_POSTS';
export const ORDER_RECEIVE_FAILED_POSTS = 'ORDER_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: ORDER_REQUEST})
}


export function receiveSuccessResult(res) {
  return ({
      type: ORDER_RECEIVE_SUCCESS_POSTS,
      content: res
    })
}


export function receiveFailedResult() {
  return {type: ORDER_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts(params) {

    return function(dispatch, getState) {
      dispatch(requestPosts());
      
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_ORDER + queryParamsTrans(params);
      let token = getState().session.authenticToken;
      let header = {'Authorization': token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(receiveFailedResult())})
            .then(
              res => {
                if(res.status && !(res.status === '200' || res.status === 200)){
                  dispatch(receiveFailedResult());
                  console.log('Unknown: Error, get order info failed')
                }
                else{
                  dispatch(receiveSuccessResult(res));
                  console.log('get order info succeed')
                }
              }
            )
  }
}