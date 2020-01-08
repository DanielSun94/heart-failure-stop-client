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
    LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POST,
    LAB_TEST_FILTER_STR,
    LAB_TEST_SELECTED_LAB_TEST_ITEM,
    LAB_TEST_SHOWING_SINGLE_VISIT,
    LAB_TEST_RESET
} from '../../actions/individualAnalysisAction/labtestResultAction';

// Lab Test 分为三个模块
// 其中 labTestList 负责存储检查清单，这部分清单包含数据库中出现过的所有检查的名单，和某个具体的查询无关
// labTestFullTrace指的是某个指标的长期演变模式，和具体查询相关
// singleVisitLabTestTrace指的是某个指标在一次入院中的变化趋势，和具体查询相关
const initStateInfo = {
    labTestNameList: {},
    labTestFullTrace: {},
    singleVisitLabTestTrace: {},
    correspondingVisit: {},
    selectedLabtest: {},
    showSingleVisit: {},
    filterStr: {}
};

const labtestResultReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case LAB_TEST_RESET: return labTestReset(state, action.params, action.resetType, action.queryID);
        case LAB_TEST_SELECTED_LAB_TEST_ITEM:
            return labTestSetSelectedItem(state, action.selectedLabTest, action.queryID);
        case LAB_TEST_SHOWING_SINGLE_VISIT:
            return labTestShowingSingle(state, action.showingSingle, action.queryID);
        case LAB_TEST_FILTER_STR:
            return labTestFilteredStr(state, action.filterStr, action.queryID);
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
            return labTestListRequestPost(state, action.queryID);
        case LAB_TEST_LIST_RECEIVE_SUCCESS_RESULT:
            return labTestListReceiveSuccessResult(state, action.labTestList, action.queryID);
        case LAB_TEST_LIST_RECEIVE_FAILED_RESULT:
            return labTestListReceiveFailedResult(state, action.queryID);
        default: return {...state};
    }
};

function labTestSetSelectedItem(state, selectedItem, queryID){
    state['selectedLabtest'][queryID] = selectedItem;
    return {...state}
}

function labTestFilteredStr(state, filterStr, queryID){
    state['filterStr'][queryID] = filterStr;
    return {...state}
}

function labTestShowingSingle(state, showingSingle, queryID){
    state['showSingleVisit'][queryID] = showingSingle;
    return {...state}
}

function labTestListRequestPost(state, queryID){
    let list = state['labTestNameList'][queryID].labTestNameList;
    state['labTestNameList'][queryID] = ({
        isFetchingData: true,
        isDataValid: false,
        labTestNameList: [...list]
    });
    return {...state};
}

function labTestListReceiveSuccessResult(state, labTestNameList, queryID){
    state.labTestNameList[queryID] = ({
        isFetchingData: false,
        isDataValid: true,
        labTestNameList: labTestNameList
    });
    return {...state}
}

function labTestListReceiveFailedResult(state, queryID){
    state.labTestNameList[queryID] = ({
        isFetchingData: false,
        isDataValid: false,
        labTestNameList: state['labTestNameList'][queryID].labTestNameList
    });
    return {...state}
}

function labTestInitialize(state, queryID) {
    if(!state[queryID]){
        state['labTestNameList'][queryID] = {
            isFetchingData: false,
            isDataValid: false,
            labTestNameList: [],
        };
        state['labTestFullTrace'][queryID] = {
            isFetchingData: false,
            isDataValid: false,
            trace: {},
        };
        state['singleVisitLabTestTrace'][queryID] = {
            isFetchingData: false,
            isDataValid: false,
            trace: {},
        };
        state['correspondingVisit'][queryID] = {
            correspondingUnifiedPatientID: "",
            correspondingHospitalCode: "",
            correspondingVisitID: "",
            correspondingVisitType: "",
        };
        state['selectedLabtest'][queryID] = "";
        state['showSingleVisit'][queryID] = "";
        state['filterStr'][queryID] = "";
    }
    return {...state}
}

function labTestReset(state, params, resetType, queryID) {
    if(resetType==='visit'||resetType==='patient'){
        state['singleVisitLabTestTrace'][queryID] = {
            isFetchingData: false,
            isDataValid: false,
            trace: {},
        };
    }
    if(resetType==='patient'){
        state['labTestFullTrace'][queryID] = {
            isFetchingData: false,
            isDataValid: false,
            trace: {},
        };
    }

    state['correspondingVisit'][queryID] = {
        correspondingUnifiedPatientID: params.unifiedPatientID,
        correspondingHospitalCode: params.hospitalCode,
        correspondingVisitID: params.visitID,
        correspondingVisitType: params.visitType,
    };
    return {...state}
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