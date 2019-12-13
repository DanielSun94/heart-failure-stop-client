import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../../utils/queryUtilFunction';
import ParaName from '../../../utils/ParaName';
import RouteName from '../../../utils/RouteName';
import {pinyinSort} from '../../../utils/queryUtilFunction'
import pinyin from 'pinyin'

export const LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POSTS = 'LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POSTS';
export const LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_POSTS = 'LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_POSTS';
export const LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_POSTS = 'LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_POSTS';
export const LAB_TEST_RESULT_FULL_TRACE_REQUEST_POSTS = 'LAB_TEST_RESULT_FULL_TRACE_REQUEST_POSTS';
export const LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_POSTS = 'LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_POSTS';
export const LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_POSTS = 'LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_POSTS';
export const LAB_TEST_LIST_POSTS = 'LAB_TEST_LIST_POSTS';
export const LAB_TEST_LIST_RECEIVE_SUCCESS_POSTS = 'LAB_TEST_LIST_RECEIVE_SUCCESS_POSTS';
export const LAB_TEST_LIST_RECEIVE_FAILED_POSTS = 'LAB_TEST_LIST_RECEIVE_FAILED_POSTS';
export const LAB_TEST_RESET = 'LAB_TEST_RESET';

export function requestSingleVisitPosts() {
    return {
      type: LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POSTS
    }
}


export function receiveSingleVisitSuccessResult(labTestName, labTestTrace) {
  return {
      type: LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_POSTS,
      labTestName: labTestName,
      labTestTrace: labTestTrace
    }
}

export function receiveSingleVisitFailedResult() {
  return {
    type: LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_POSTS
  }
}

export function requestFullTracePosts() {
  return {
    type: LAB_TEST_RESULT_FULL_TRACE_REQUEST_POSTS
  }
}


export function receiveFullTraceSuccessResult(labTestName, labTestTrace) {
return {
    type: LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_POSTS,
    labTestName: labTestName,
    labTestTrace: labTestTrace
  }
}

export function receiveFullTraceFailedResult() {
  return {
    type: LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_POSTS
  }
}

export function requestListPosts() {
  return {
    type: LAB_TEST_LIST_POSTS
  }
}


export function receiveListSuccessResult(res) {
return {
    type: LAB_TEST_LIST_RECEIVE_SUCCESS_POSTS,
    labTestList: res
  }
}

export function receiveListFailedResult() {
  return {
    type: LAB_TEST_LIST_RECEIVE_FAILED_POSTS
  }
}

export function reset() {
  return {
    type: LAB_TEST_RESET
  }
}

export function fetchSingleVisitLabTestResult(params) {
  
    return function(dispatch, getState) {
        dispatch(requestSingleVisitPosts())
        let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_LAB_TEST_SINGLE_VISIT_ONE_ITEM + queryParamsTrans(params);
        let token = getState().session.authenticToken
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
        .then(res => res.json(),
              error => {console.log(error); dispatch(receiveSingleVisitFailedResult())})
        .then(
          res => {
            if(res.status && !(res.status === '200' || res.status === 200)){
              console.log('get lab test info successed')
            }
            else{
              dispatch(receiveSingleVisitSuccessResult(params.itemName, res))
              console.log('get lab test info successed')
            }
          }
        )
  }
}

export function fetchFullTraceLabTestResult(params) {
  
  return function(dispatch, getState) {
      dispatch(requestFullTracePosts())
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_LAB_TEST_ONE_ITEM_FULL_TRACE + queryParamsTrans(params);
      let token = getState().session.authenticToken
      let header = {'Authorization': token};

      return fetch(url, {method: ParaName.GET, headers: header})
      .then(res => res.json(),
            error => {console.log(error); dispatch(receiveFullTraceFailedResult())})
      .then(
        res => {
          if(res.status && !(res.status === '200' || res.status === 200)){
            console.log('get lab test info successed')
          }
          else{
            dispatch(receiveFullTraceSuccessResult(params.itemName, res))
            console.log('get lab test info successed')
          }
        }
      )
}
}

export function fetchLabTestList() {
  
  return function(dispatch, getState) {
      dispatch(requestListPosts())
      let url = RouteName.B_TRAJECTORY_ANALYSIS_DATA_ROOT + RouteName.B_TRAJECTORY_ANALYSIS_LAB_TEST_LIST
      let token = getState().session.authenticToken
      let header = {'Authorization': token};
      
      
      return fetch(url, {method: ParaName.GET, headers: header})
      .then(res => res.json(),
            error => {console.log(error); dispatch(receiveFullTraceFailedResult())})
      .then(
        res => {
          if(res.status && !(res.status === '200' || res.status === 200)){
            console.log('get lab test list successed')
          }
          else{
            pinyinSort(res)
            let itemListWithPinyin = []
            for(let item of res){
              const firstLetterList = pinyin(item, {style: pinyin.STYLE_FIRST_LETTER})
              let firstLetterStr = ""
              for(let strList of firstLetterList)
                firstLetterStr += strList[0]
              firstLetterStr = firstLetterStr.toLowerCase()
              itemListWithPinyin.push([item, firstLetterStr])
            }
            dispatch(receiveListSuccessResult(itemListWithPinyin))
            console.log('get lab test list successed')
          }
        }
      )
  }
}