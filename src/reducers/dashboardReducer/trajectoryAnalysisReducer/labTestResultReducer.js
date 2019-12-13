import {
    LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POSTS,
    LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_POSTS,
    LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_POSTS,
    LAB_TEST_RESULT_FULL_TRACE_REQUEST_POSTS,
    LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_POSTS,
    LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_POSTS,
    LAB_TEST_LIST_POSTS,
    LAB_TEST_LIST_RECEIVE_SUCCESS_POSTS,
    LAB_TEST_LIST_RECEIVE_FAILED_POSTS,
    LAB_TEST_RESET
} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/labtestResultAction';

const initStateInfo = {
    isFetchingList: false,
    fetchListFailed: false,
    labTestList: [],
    isDataFetching: false,
    fetchDataFailed: false,
    labTestFullTrace: {},
    singleVisitLabTestTrace: {}
}
const labtestResultReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case LAB_TEST_RESULT_SINGLE_VISIT_REQUEST_POSTS: return (
            {...state, isDataFetching: true}
            );
        case LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_SUCCESS_POSTS: {
            let singleVisitTrace = {...state.singleVisitLabTestTrace}
            const labTestName = action.labTestName
            singleVisitTrace[labTestName] = action.labTestTrace
            return {...state, isDataFetching: false, singleVisitLabTestTrace: singleVisitTrace};
        }
        case LAB_TEST_RESULT_SINGLE_VISIT_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false, fetchDataFailed: true}
            );
        case LAB_TEST_RESULT_FULL_TRACE_REQUEST_POSTS: return (
            {...state, isDataFetching: true}
            );
        case LAB_TEST_RESULT_FULL_TRACE_RECEIVE_SUCCESS_POSTS: {
            let fullTrace = {...state.labTestFullTrace}
            const labTestName = action.labTestName
            fullTrace[labTestName] = action.labTestTrace
            return (
            {...state, isDataFetching: false, labTestFullTrace: fullTrace}
            );
        }
        case LAB_TEST_RESULT_FULL_TRACE_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false, fetchDataFailed: true}
            );
        case LAB_TEST_LIST_POSTS: return (
            {...state, isFetchingList: true});
        case LAB_TEST_LIST_RECEIVE_SUCCESS_POSTS: return (
            {...state, isFetchingList: false,
                labTestList: action.labTestList}
            );
        case LAB_TEST_LIST_RECEIVE_FAILED_POSTS: return (
            {...state, isFetchingList: false,
                fetchListFailed: true}
            );
        case LAB_TEST_RESET:{
        return (
            
            {
                ...initStateInfo, labTestList: state.labTestList
            }
            );
        }
        default: return state;
    }
}

export default labtestResultReducer;