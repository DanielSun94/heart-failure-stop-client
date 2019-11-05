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
            {...state, isDataFetching: true,
            isDataValid: false});
        case EXAM_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case EXAM_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default examReducer;