import {
    ORDER_SET_SELECTED_ORDER,
    ORDER_INITIALIZE,
    ORDER_REQUEST_POST,
    ORDER_RECEIVE_SUCCESS_RESULT,
    ORDER_DELETE,
    ORDER_SET_STATE,
    ORDER_RECEIVE_FAILED_RESULT}
    from '../../actions/individualAnalysisAction/orderAction';


const initStateInfo = {};

const orderReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case ORDER_SET_STATE: return {...action.newState};
        case ORDER_SET_SELECTED_ORDER: return setNewSelectedOrder(state, action.selectedOrder, action.queryID);
        case ORDER_INITIALIZE: return orderInitialize(state, action.queryID);
        case ORDER_DELETE: return orderDelete(state, action.queryID);
        case ORDER_REQUEST_POST: return orderRequestPost(state, action.queryID);
        case ORDER_RECEIVE_SUCCESS_RESULT: return orderReceiveSuccessResult(state, action.content, action.params, action.queryID);
        case ORDER_RECEIVE_FAILED_RESULT: return orderReceiveFailedResult(state, action.queryID);
        default: return {...state};
    }
};

function setNewSelectedOrder(state, selectedOrder, queryID){
    state[queryID] = {...state[queryID], selectedOrder: selectedOrder};
    return {...state}
}

function orderDelete(state, queryID){
    delete state[queryID];
    return {...state}
}

function orderInitialize(state, queryID){
    if(!state[queryID])
        state[queryID] = ({
            isFetchingData: false,
            isDataValid: false,
            content: [],
            selectedOrder: "",
            correspondingUnifiedPatientID: "",
            correspondingHospitalCode: "",
            correspondingVisitID: "",
            correspondingVisitType: "",
        });
    return {...state}
}

function orderRequestPost(state, queryID){
    state[queryID] = {...state[queryID], isFetchingData: true};
    return {...state}
}

function orderReceiveSuccessResult(state, content, params, queryID){
    state[queryID] = ({
        ...state[queryID],
        isFetchingData: false,
        isDataValid: true,
        content: content,
        correspondingUnifiedPatientID: params.unifiedPatientID,
        correspondingHospitalCode: params.hospitalCode,
        correspondingVisitID: params.visitID,
        correspondingVisitType: params.visitType,
    });
    return {...state}
}

function orderReceiveFailedResult(state, queryID){
    state[queryID] = {...state[queryID], isFetchingData: false, isDataValid: false};
    return {...state}
}

export default orderReducer;