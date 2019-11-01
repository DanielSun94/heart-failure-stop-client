import {
    TRAJECTORY_REQUEST,
    TRAJECTORY_RECEIVE_SUCCESS_POSTS,
    TRAJECTORY_RECEIVE_FAILED_POSTS} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    conent: {}
}

const trajectoryReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case TRAJECTORY_REQUEST: return (
            {isDataFetching: true,
            isDataValid: false});
        case TRAJECTORY_RECEIVE_SUCCESS_POSTS: return (
            {isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case TRAJECTORY_RECEIVE_FAILED_POSTS: return (
            {isDataFetching: false,
            isDataValid: false}
            );
    }
}

export default trajectoryReducer;