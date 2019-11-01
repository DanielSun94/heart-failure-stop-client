import {
    VITAL_SIGN_REQUEST_POSTS,
    VITAL_SIGN_RECEIVE_SUCCESS_POSTS,
    VITAL_SIGN_RECEIVE_FAILED_POSTS} 
    from '../../../../actions/dashboardAction/trajectoryAnalysisAction/vitalSignAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: []
}

const examReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case VITAL_SIGN_REQUEST_POSTS: return (
            {isDataFetching: true,
            isDataValid: false});
        case VITAL_SIGN_RECEIVE_SUCCESS_POSTS: return (
            {isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case VITAL_SIGN_RECEIVE_FAILED_POSTS: return (
            {isDataFetching: false,
            isDataValid: false}
            );
    }
}

export default examReducer;