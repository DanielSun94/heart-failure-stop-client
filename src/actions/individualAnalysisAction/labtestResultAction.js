import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';
import {pinyinSort} from '../../utils/queryUtilFunction'
import pinyin from 'pinyin'

export const LAB_TEST_INITIALIZE = 'LAB_TEST_INITIALIZE';
export const LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST = 'LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST';
export const LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_RESULT = 'LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_RESULT';
export const LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_RESULT = 'LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_RESULT';
export const LAB_TEST_RESULT_FULL_TRACE_REQUEST_POST = 'LAB_TEST_RESULT_FULL_TRACE_REQUEST_POST';
export const LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_RESULT = 'LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_RESULT';
export const LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_RESULT = 'LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_RESULT';
export const LAB_TEST_LIST_REQUEST_POST = 'LAB_TEST_LIST_REQUEST_POST';
export const LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT = 'LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT';
export const LAB_TEST_LIST_RECEIVE_FAILED_RESULT = 'LAB_TEST_LIST_RECEIVE_FAILED_RESULT';

export function labTestInitialize(queryID) {
    return {
        type: LAB_TEST_INITIALIZE,
        queryID: queryID
    }
}

function labTestSingleVisitRequestPost(queryID) {
    return {
        type: LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST,
        queryID: queryID
    }
}


function labTestSingleVisitReceiveSuccessResult(labTestName, labTestTrace, queryID) {
    return {
        type: LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_RESULT,
        labTestName: labTestName,
        labTestTrace: labTestTrace,
        queryID: queryID
    }
}

function labTestSingleVisitReceiveFailedResult(queryID) {
    return {
        type: LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_RESULT,
        queryID: queryID
    }
}

function labTestFullTraceRequestPost(queryID) {
    return {
        type: LAB_TEST_RESULT_FULL_TRACE_REQUEST_POST,
        queryID: queryID
    }
}


function labTestFullTraceReceiveSuccessResult(labTestName, labTestTrace, queryID) {
    return {
        type: LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_RESULT,
        labTestName: labTestName,
        labTestTrace: labTestTrace,
        queryID: queryID
    }
}

function labTestFullTraceReceiveFailedResult(queryID) {
    return {
        type: LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_RESULT,
        queryID: queryID
    }
}

function labTestListRequestPost(queryID) {
    return {
        type: LAB_TEST_LIST_REQUEST_POST,
        queryID: queryID
    }
}


function labTestListReceiveSuccessResult(res) {
    return {
        type: LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT,
        labTestList: res,
    }
}

function labTestListReceiveFailedResult() {
    return {
        type: LAB_TEST_LIST_RECEIVE_FAILED_RESULT,
    }
}

export function labTestFetchSingleVisitLabTestResult(params, queryID) {
    // LabTest 一次只Fetch一个特定LabTest项的所有检查记录
    return function(dispatch, getState) {
        dispatch(labTestSingleVisitRequestPost(queryID));
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_LAB_TEST_SINGLE_VISIT_ONE_ITEM + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(labTestSingleVisitReceiveFailedResult(queryID))})
            .then(res => {dispatch(labTestSingleVisitReceiveSuccessResult(params.itemName, res, queryID))})
    }
}

export function labTestFetchFullTraceLabTestResult(params, queryID) {
    // LabTest 一次只Fetch一个特定LabTest项的所有检查记录
    return function(dispatch, getState) {
        dispatch(labTestFullTraceRequestPost(queryID));
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_LAB_TEST_ONE_ITEM_FULL_TRACE + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(labTestFullTraceReceiveFailedResult(queryID))})
            .then(res => {dispatch(labTestFullTraceReceiveSuccessResult(params.itemName, res, queryID))})
    }
}

export function fetchLabTestList() {
    // LabTestList全局统一，无需queryID标识
    return function(dispatch, getState) {
        dispatch(labTestListRequestPost());
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_LAB_TEST_LIST;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(labTestListReceiveSuccessResult())})
            .then(
                res => {
                    pinyinSort(res);
                    let itemListWithPinyin = [];
                    for(let item of res){
                        const firstLetterList = pinyin(item, {style: pinyin.STYLE_FIRST_LETTER});
                        let firstLetterStr = "";
                        for(let strList of firstLetterList)
                            firstLetterStr += strList[0];
                        firstLetterStr = firstLetterStr.toLowerCase();
                        itemListWithPinyin.push([item, firstLetterStr])
                    }
                    dispatch(labTestListReceiveFailedResult(itemListWithPinyin));
                }
            )
    }
}