import {
    FETCH_MODEL_DATA_REQUEST,
    FETCH_MODEL_DATA_SUCCESS,
    FETCH_MODEL_DATA_FAILED,
    EXECUTE_MODEL_REQUEST,
    EXECUTE_MODEL_SUCCESS,
    EXECUTE_MODEL_FAILED,
    MODEL_SET_STATE,
    ADD_SELECTED_MODEL,
    DELETE_SELECTED_MODEL,
    DELETE_QUERY,
    CREATE_NEW_MODEL_QUERY,
    SET_VISIT,
    EDIT_INPUTS
} from '../../actions/individualAnalysisAction/individualModelAction';

const initStateInfo = {
    // queryID: {"unifiedModelName":
    //  {'inputs': {}, 'otherInfo': {}, isDataValid: false, isFetchingData: false
};

const individualModelReducer = (state=initStateInfo, action) => {
    switch (action.type) {
        case FETCH_MODEL_DATA_REQUEST: {return fetchModelDataRequest(state, action.unifiedModelName, action.id)}
        case FETCH_MODEL_DATA_SUCCESS: {return fetchModelDataSuccess(state, action.data, action.unifiedModelName, action.id)}
        case FETCH_MODEL_DATA_FAILED: {return fetchModelDataFailed(state, action.unifiedModelName, action.id)}
        case EXECUTE_MODEL_REQUEST: {return executeModelRequest(state, action.unifiedModelName, action.id)}
        case EXECUTE_MODEL_SUCCESS: {return executeModelSuccess(state, action.unifiedModelName, action.result, action.id)}
        case EXECUTE_MODEL_FAILED: {return executeModeFailed(state, action.unifiedModelName, action.id)}
        case MODEL_SET_STATE: {return modelSetState(action.state)}
        case ADD_SELECTED_MODEL: {return addSelectedModel(state, action.unifiedModelName, action.id)}
        case DELETE_SELECTED_MODEL: {return deleteSelectedModel(state, action.unifiedModelName, action.id)}
        case DELETE_QUERY: {return deleteQuery(state, action.id)}
        case CREATE_NEW_MODEL_QUERY: {return createNewModelQuery(state, action.id)}
        case SET_VISIT: {return setVisit(state, action.unifiedPatientID, action.hospitalCode, action.visitType,
            action.visitID, action.id)}
        case EDIT_INPUTS: {return setNewInputs(state, action.unifiedModelName, action.newInputs, action.id)}
        default: return state;
    }
};

function setNewInputs(state, unifiedModelName, newInputs, queryID) {
    state[queryID]['model'][unifiedModelName]['inputs'] = newInputs;
    return {...state}
}

function setVisit(state, unifiedPatientID, hospitalCode, visitType, visitID, queryID) {
    state[queryID] = {
        ...state[queryID],
        unifiedPatientID: unifiedPatientID,
        hospitalCode: hospitalCode,
        visitType: visitType,
        visitID: visitID,
    };
    return {...state}
}

function executeModelRequest(state, unifiedModelName, queryID) {
    state[queryID]['model'][unifiedModelName]={
        ...state[queryID]['model'][unifiedModelName],
        isFetchingOutput: true,
        isOutputValid: false,
        output: [0],
        otherOutputInfo: null,
    };
    return {...state}
}

function executeModelSuccess(state, unifiedModelName, data, queryID) {
    // 根据约定，data的内容可以自定，但是必须包括一个'inputs'key，对应的格式的对象可以序列化（JSON）后即为模型运算结果
    // 其余的key所对应的信息均填入otherInputsInfo
    const otherInfo = {...data};
    delete otherInfo['outputs'];

    state[queryID]['model'][unifiedModelName]={
        ...state[queryID]['model'][unifiedModelName],
        isOutputValid: true,
        isFetchingOutput: false,
        output: data['outputs'],
        otherOutputInfo: otherInfo
    };
    return {...state}
}

function executeModeFailed(state, unifiedModelName, queryID) {
    state[queryID]['model'][unifiedModelName]={
        ...state[queryID]['model'][unifiedModelName],
        isOutputValid: false,
        isFetchingOutput: false,
    };
    return {...state}
}

function fetchModelDataRequest(state, unifiedModelName, queryID){
    state[queryID]['model'][unifiedModelName]={
        ...state[queryID]['model'][unifiedModelName],
        isInputsValid: false,
        isFetchingInputs: true,
        inputs: null,
        otherInputsInfo: null,
    };
    return {...state}
}

function fetchModelDataSuccess(state, data, unifiedModelName, queryID) {
    // 根据约定，data的内容可以自定，但是必须包括一个'inputs'key，对应的格式的对象可以序列化（JSON）后直接传到tf server中进行计算
    // 其余的key所对应的信息均填入otherInputsInfo
    const otherInfo = {...data};
    otherInfo['originInputs'] = otherInfo['inputs'];
    delete otherInfo['inputs'];

    state[queryID]['model'][unifiedModelName]={
        ...state[queryID]['model'][unifiedModelName],
        isInputsValid: true,
        isFetchingInputs: false,
        inputs: data['inputs'],
        otherInputsInfo: otherInfo
    };
    return {...state}
}

function fetchModelDataFailed(state, unifiedModelName, queryID) {
    state[queryID]['model'][unifiedModelName]={
        ...state[queryID][unifiedModelName],
        isInputsValid: false,
        isFetchingInputs: false,
    };
    return {...state}
}

function modelSetState(state){
    return {...state}
}

function addSelectedModel(state, unifiedModelName, queryID) {
    state[queryID]['model'][unifiedModelName]={
        inputs: null,
        otherInputsInfo: null,
        output: [0],
        otherOutputInfo: null,
        isFetchingInputs: false,
        isInputsValid: false,
        isFetchingOutput: false,
        isOutputValid: false,
    };
    return {...state}
}

function deleteSelectedModel(state, unifiedModelName, queryID) {
    delete state[queryID]['model'][unifiedModelName];
    return {...state}
}

function deleteQuery(state, queryID) {
    delete state[queryID];
    return {...state}
}

function createNewModelQuery(state, queryID) {
    if(!state[queryID]){
        state[queryID]={
            unifiedPatientID: "",
            hospitalCode: "",
            visitType: "",
            visitID: "",
            model: {}
        }
    }
    return {...state}
}

export default individualModelReducer;