import {
    ORDER_REQUEST,
    ORDER_RECEIVE_SUCCESS_POSTS,
    ORDER_RECEIVE_FAILED_POSTS} 
    from '../../actions/individualAnalysisAction/orderAction';


const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: []
};

const orderReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case ORDER_REQUEST: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case ORDER_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case ORDER_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
};

export default orderReducer;