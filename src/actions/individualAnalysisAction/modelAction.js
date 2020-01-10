import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const MODEL_SET_STATE = "MODEL_SET_STATE";
export const ADD_SELECTED_MODEL = "ADD_SELECTED_MODEL";
export const DELETE_SELECTED_MODEL = "DELETE_SELECTED_MODEL";
export const MODEL_RESET = "MODEL_RESET";
export const MODEL_PANEL_INITIALIZE = "MODEL_PANEL_INITIALIZE";
export const MODEL_EXECUTE_REQUEST = 'MODEL_EXECUTE_REQUEST';
export const MODEL_RECEIVE_SUCCESS_RESULT = 'MODEL_RECEIVE_SUCCESS_RESULT';
export const MODEL_RECEIVE_FAILED_RESULT = 'MODEL_RECEIVE_FAILED_RESULT';

export function modelSetState(newState) {
    return ({type: MODEL_SET_STATE, newState: newState})
}

export function addSelectedModel(unifiedModelName, queryID) {
    return ({
        type: ADD_SELECTED_MODEL,
        unifiedModelName: unifiedModelName,
        queryID: queryID})
}

export function deleteSelectedModel(unifiedModelName, queryID) {
    return ({
        type: DELETE_SELECTED_MODEL,
        unifiedModelName: unifiedModelName,
        queryID: queryID})
}

export function modelReset(params, queryID) {
    return ({
        type: MODEL_PANEL_INITIALIZE,
        params: params,
        queryID: queryID})
}

export function modelInitialize(queryID) {
    return ({
        type: MODEL_PANEL_INITIALIZE,
        queryID: queryID})
}

function modelRequestPost(modelCategory, modelName, modelFunction, queryID) {
    return ({
        type: MODEL_EXECUTE_REQUEST,
        modelCategory: modelCategory,
        modelName: modelName,
        modelFunction: modelFunction,
        queryID: queryID})
}

function modelReceiveSuccessResult(res, modelCategory, modelName, modelFunction, queryID) {
    return ({
        type: MODEL_RECEIVE_SUCCESS_RESULT,
        result: res.outputs[0],
        modelCategory: modelCategory,
        modelName: modelName,
        modelFunction: modelFunction,
        queryID: queryID
    })
}

function modelReceiveFailedResult(modelCategory, modelName, modelFunction, queryID) {
    return {
        type: MODEL_RECEIVE_FAILED_RESULT,
        modelCategory: modelCategory,
        modelName: modelName,
        modelFunction: modelFunction,
        queryID: queryID
    }
}

export function modelFetchPost(params, modelCategory, modelName, modelFunction, queryID) {
    return function(dispatch, getState) {
        dispatch(modelRequestPost(modelCategory, modelName, modelFunction, queryID));

        params = {...params, 'modelCategory': modelCategory, 'modelName': modelName, "modelFunction": modelFunction};

        let url = RouteName.B_MACHINE_LEARNING + RouteName.B_SINGLE_VISIT_INVOKE_MACHINE_LEARNING_SERVICE + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(modelReceiveFailedResult(queryID))})
            .then(res => {dispatch(modelReceiveSuccessResult(res, modelCategory, modelName, modelFunction, queryID))})
    }
}
