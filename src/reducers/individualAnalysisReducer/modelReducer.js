import {
    MODEL_EXECUTE_REQUEST,
    MODEL_RECEIVE_FAILED_RESULT,
    MODEL_RECEIVE_SUCCESS_RESULT,
    MODEL_PANEL_INITIALIZE,
    MODEL_RESET,
    ADD_SELECTED_MODEL,
    DELETE_SELECTED_MODEL,
    MODEL_SET_STATE,
    MODEL_DELETE_ALL
} from '../../actions/individualAnalysisAction/modelAction';

const initStateInfo = {};

const modelReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case MODEL_DELETE_ALL: return deleteAllModel(state, action.queryID);
        case ADD_SELECTED_MODEL: return addSelectedModel(state, action.unifiedModelName, action.queryID);
        case DELETE_SELECTED_MODEL: return deleteSelectedModel(state, action.unifiedModelName, action.queryID);
        case MODEL_PANEL_INITIALIZE: return modelPanelInitialize(state, action.queryID);
        case MODEL_RESET: return(
            modelReset(state, action.params, action.queryID)
        );
        case MODEL_EXECUTE_REQUEST: return (
            modelRequest(state, action.modelCategory, action.modelName, action.modelFunction, action.queryID)
        );
        case MODEL_RECEIVE_SUCCESS_RESULT: return (
            modelSuccessResult(state, action.modelCategory, action.modelName, action.modelFunction,
                action.result, action.queryID)
        );
        case MODEL_RECEIVE_FAILED_RESULT: return (
            modelFailedResult(state, action.modelCategory, action.modelName, action.modelFunction, action.queryID)
        );
        case MODEL_SET_STATE: return {...action.newState};
        default: return state;
    }
};

function deleteAllModel(state, queryID){
    delete state[queryID];
    return {...state}
}

function addSelectedModel(state, unifiedModelName, queryID) {
    state[queryID].selectedModelList.push(unifiedModelName);
    return {...state};
}

function deleteSelectedModel(state, selectedModel, queryID) {
    state[queryID].selectedModelList = state[queryID].selectedModelList.filter(e => e !== selectedModel);
    return {...state};
}

function modelFailedResult(state, modelCategory, modelName, modelFunction, queryID) {
    const unifiedModelName = modelCategory + "_" + modelName + "_" + modelFunction;
    state[queryID].modelDetail[unifiedModelName] = {
        ...state[queryID].modelDetail[unifiedModelName],
        isFetchingData: false,
        isDataValid: false
    };
    return {...state};
}

function modelSuccessResult(state, modelCategory, modelName, modelFunction, result, queryID) {
    const unifiedModelName = modelCategory + "_" + modelName + "_" + modelFunction;
    state[queryID].modelDetail[unifiedModelName] = {
        ...state[queryID].modelDetail[unifiedModelName],
        result: result,
        isFetchingData: false,
        isDataValid: true
    };
    return {...state};
}

function modelRequest(state, modelCategory, modelName, modelFunction, queryID) {
    const unifiedModelName = modelCategory + "_" + modelName + "_" + modelFunction;
    state[queryID].modelDetail[unifiedModelName] = {
        modelCategory: modelCategory,
        modelName: modelName,
        modelFunction: modelFunction,
        result: [0],
        isFetchingData: true,
        isDataValid: false
    };
    return {...state};
}

function modelReset(state, params, queryID){
    state[queryID] = {
        ...state[queryID],
        modelDetail: {},
        correspondingUnifiedPatientID: params.unifiedPatientID,
        correspondingHospitalCode: params.hospitalCode,
        correspondingVisitID: params.visitID,
        correspondingVisitType: params.visitType,
    };
    return {...state};
}

function modelPanelInitialize(state, queryID){
    if(!state[queryID])
        state[queryID] = ({
            modelDetail: {},
            selectedModelList: [],
            correspondingUnifiedPatientID: "",
            correspondingHospitalCode: "",
            correspondingVisitID: "",
            correspondingVisitType: "",
        });
    return {...state}
}

export default modelReducer;