import {
    VITAL_SIGN_RECEIVE_FAILED_RESULT,
    VITAL_SIGN_RECEIVE_SUCCESS_RESULT,
    VITAL_SIGN_REQUEST_POST,
    VITAL_SIGN_INITIALIZE,
    VITAL_SIGN_DELETE
}
    from '../../actions/individualAnalysisAction/vitalSignAction';


const initStateInfo = {};

const vitalSignReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case VITAL_SIGN_INITIALIZE: return vitalSignInitialize(state, action.queryID);
        case VITAL_SIGN_DELETE: return vitalSignDelete(state, action.queryID);
        case VITAL_SIGN_REQUEST_POST: return vitalSignRequestPost(state, action.queryID);
        case VITAL_SIGN_RECEIVE_SUCCESS_RESULT: return vitalSignReceiveSuccessResult(state, action.content, action.queryID);
        case VITAL_SIGN_RECEIVE_FAILED_RESULT: return vitalSignReceiveFailedResult(state, action.queryID);
        default: return {...state};
    }
};

function vitalSignInitialize(state, queryID){
    // 当发起请求时，更改相应QueryID的数据请求状态，清空之前的数据
    state[queryID] = ({
        isFetchingData: false,
        isDataValid: false,
        content: []
    });
    return {...state}
}


function vitalSignDelete(state, queryID){
    delete state[queryID];
    return {...state}
}

function vitalSignRequestPost(state, queryID){
    // 当发起请求时，更改相应QueryID的数据请求状态，清空之前的数据
    state[queryID] = {...state[queryID], isFetchingData: true, isDataValid: false,};
    return {...state}
}

function vitalSignReceiveSuccessResult(state, content, queryID){
    state[queryID] = ({
        isFetchingData: false,
        isDataValid: true,
        content: content
    });
    return {...state}
}

function vitalSignReceiveFailedResult(state, queryID){
    state[queryID] = {...state[queryID], isFetchingData: false, isDataValid: false,};
    return {...state}
}

export default vitalSignReducer;