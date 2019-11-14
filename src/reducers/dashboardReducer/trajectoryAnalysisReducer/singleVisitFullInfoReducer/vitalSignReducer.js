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

const vitalSignReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case VITAL_SIGN_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case VITAL_SIGN_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case VITAL_SIGN_RECEIVE_FAILED_POSTS: return (
            {visDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default vitalSignReducer;