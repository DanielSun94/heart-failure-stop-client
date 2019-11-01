import {
    EXAM_REQUEST_POSTS,
    EXAM_RECEIVE_FAILED_POSTS,
    EXAM_RECEIVE_SUCCESS_POSTS} 
    from '../../../../actions/dashboardAction/trajectoryAnalysisAction/examAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: []
}
const examReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case EXAM_REQUEST_POSTS: return (
            {isDataFetching: true,
            isDataValid: false});
        case EXAM_RECEIVE_SUCCESS_POSTS: return (
            {isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case EXAM_RECEIVE_FAILED_POSTS: return (
            {isDataFetching: false,
            isDataValid: false}
            );
    }
}

export default examReducer;