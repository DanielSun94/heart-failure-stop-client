import {
    LAB_TEST_RESULT_RECEIVE_SUCCESS_POSTS,
    LAB_TEST_RESULT_REQUEST_POSTS,
    LAB_TEST_RESULT_RECEIVE_FAILED_POSTS} 
    from '../../../../actions/dashboardAction/trajectoryAnalysisAction/labTestResultAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: ""
}
const labTestResultReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case LAB_TEST_RESULT_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case LAB_TEST_RESULT_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case LAB_TEST_RESULT_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default labTestResultReducer;