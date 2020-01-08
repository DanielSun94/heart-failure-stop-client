import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import NormalizedName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const ORDER_SET_SELECTED_ORDER = "ORDER_SET_SELECTED_ORDER";
export const ORDER_INITIALIZE = "ORDER_INITIALIZE";
export const ORDER_DELETE = "ORDER_DELETE";
export const ORDER_REQUEST_POST = 'ORDER_REQUEST_POST';
export const ORDER_RECEIVE_SUCCESS_RESULT = 'ORDER_RECEIVE_SUCCESS_RESULT';
export const ORDER_RECEIVE_FAILED_RESULT = 'ORDER_RECEIVE_FAILED_RESULT';

export function orderInitialize(queryID) {
    return ({type: ORDER_INITIALIZE, queryID: queryID})
}

export function setNewSelectedOrder(selectedOrder, queryID) {
    return ({type: ORDER_SET_SELECTED_ORDER, queryID: queryID, selectedOrder: selectedOrder})
}

function orderDelete(queryID) {
    return ({type: ORDER_DELETE, queryID: queryID})
}

function orderRequestPost(queryID) {
    return ({type: ORDER_REQUEST_POST, queryID: queryID})
}


function orderReceiveSuccessResult(res, params, queryID) {
  return ({
      type: ORDER_RECEIVE_SUCCESS_RESULT,
      content: res,
      params: params,
      queryID: queryID
    })
}


function orderReceiveFailedResult(queryID) {
  return {type: ORDER_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function orderFetchPost(params, queryID) {

    return function(dispatch, getState) {
      dispatch(orderRequestPost(queryID));
      
      let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_ORDER + queryParamsTrans(params);
      let token = getState().session.authenticToken;
      let header = {'Authorization': token};
      return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                  error => {console.log(error); dispatch(orderReceiveFailedResult(queryID))})
            .then(res => {dispatch(orderReceiveSuccessResult(res, params, queryID))})
  }
}