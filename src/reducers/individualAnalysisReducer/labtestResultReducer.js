import {
    LAB_TEST_INITIALIZE,
    LAB_TEST_LIST_RECEIVE_FAILED_RESULT,
    LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT,
    LAB_TEST_LIST_REQUEST_POST,
    LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_RESULT,
    LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_RESULT,
    LAB_TEST_RESULT_FULL_TRACE_REQUEST_POST,
    LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_RESULT,
    LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_RESULT,
    LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST
} from '../../actions/individualAnalysisAction/labtestResultAction';

// Lab Test 分为三个模块
// 其中 labTestList 负责存储检查清单，这部分清单包含数据库中出现过的所有检查的名单，和某个具体的查询无关
// labTestFullTrace指的是某个指标的长期演变模式，和具体查询相关
// singleVisitLabTestTrace指的是某个指标在一次入院中的变化趋势，和具体查询相关
const initStateInfo = {
    labTestNameList: {
        isFetchingData: false,
        isDataValid: false,
        list: {}
    },
    labTestFullTrace: {},
    singleVisitLabTestTrace: {}
};

const labtestResultReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST:
            return singleVisitLabTestTraceRequestPost(state, action.queryID);
        case LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_RESULT:
            return singleVisitLabTestTraceReceiveSuccessResult(state, action.labTestName, action.labTestTrace, action.queryID);
        case LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_RESULT:
            return singleVisitLabTestTraceReceiveFailedResult(state, action.queryID);

        case LAB_TEST_RESULT_FULL_TRACE_REQUEST_POST:
            return labTestFullTraceRequestPost(state, action.queryID);
        case LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_RESULT:
            return labTestFullTraceReceiveSuccessResult(state, action.labTestName, action.labTestTrace, action.queryID);
        case LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_RESULT:
            return labTestFullTraceReceiveFailedResult(state, action.queryID);

        case LAB_TEST_INITIALIZE:
            return labTestInitialize(state, action.queryID);

        case LAB_TEST_LIST_REQUEST_POST:
            return labTestListRequestPost(state);
        case LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT:
            return labTestListReceiveSuccessResult(state, action.labTestList);
        case LAB_TEST_LIST_RECEIVE_FAILED_RESULT:
            return labTestListReceiveFailedResult(state);
        default: return {...state};
    }
};

function labTestListRequestPost(state){
    return {...state, labTestNameList: {...state.labTestNameList, isFetchingData: true}};
}

function labTestListReceiveSuccessResult(state, labTestNameList){
    return {...state, labTestNameList: {isFetchingData: false, isDataValid: true, list: labTestNameList}};
}

function labTestListReceiveFailedResult(state, queryID){
    return {...state, labTestNameList: {isFetchingData: false, isDataValid: false}};
}

function labTestInitialize(state, queryID) {
    state['labTestFullTrace'][queryID] = {
        isFetchingData: true,
        isDataValid: false,
        trace: {}
    };
    state['singleVisitLabTestTrace'][queryID] = {
        isFetchingData: true,
        isDataValid: false,
        trace: {}
    };
}

function labTestFullTraceRequestPost(state, queryID){
    let trace = state['labTestFullTrace'][queryID].trace;
    state['labTestFullTrace'][queryID] = ({
        isFetchingData: true,
        isDataValid: false,
        trace: {...trace}
    });
    return {...state};
}

function labTestFullTraceReceiveSuccessResult(state, labTestName, labTestTrace, queryID){
    let trace = state.labTestFullTrace[queryID].trace;
    trace[labTestName] = labTestTrace;

    state.labTestFullTrace[queryID] = ({
        isFetchingData: false,
        isDataValid: true,
        trace: {...trace}
    });
    return {...state}
}

function labTestFullTraceReceiveFailedResult(state, queryID){
    state.labTestFullTrace[queryID] = ({
        isFetchingData: false,
        isDataValid: false,
        trace: {...state.labTestFullTrace[queryID].trace}
    });
    return {...state}
}

function singleVisitLabTestTraceRequestPost(state, queryID){
    let trace = state['singleVisitLabTestTrace'][queryID].trace;
    state['singleVisitLabTestTrace'][queryID] = ({
        isFetchingData: true,
        isDataValid: false,
        trace: {...trace}
    });
    return {...state}
}

function singleVisitLabTestTraceReceiveSuccessResult(state, labTestName, labTestTrace, queryID){
    let trace = state.singleVisitLabTestTrace[queryID].trace;
    trace[labTestName] = labTestTrace;

    state.singleVisitLabTestTrace[queryID] = ({
        isFetchingData: false,
        isDataValid: true,
        trace: {...trace}
    });
    return {...state}
}

function singleVisitLabTestTraceReceiveFailedResult(state, queryID){
    state.singleVisitLabTestTrace[queryID] = ({
        isFetchingData: false,
        isDataValid: false,
        trace: {...state.singleVisitLabTestTrace[queryID].trace}
    });
    return {...state}
}

export default labtestResultReducer;