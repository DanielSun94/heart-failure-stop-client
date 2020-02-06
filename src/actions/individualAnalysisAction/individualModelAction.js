import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import ParaName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const FETCH_MODEL_DATA_REQUEST = "FETCH_MODEL_DATA_REQUEST";
export const FETCH_MODEL_DATA_SUCCESS = "FETCH_MODEL_DATA_SUCCESS";
export const FETCH_MODEL_DATA_FAILED = "FETCH_MODEL_DATA_FAILED";
export const EXECUTE_MODEL_REQUEST = "EXECUTE_MODEL_REQUEST";
export const EXECUTE_MODEL_SUCCESS = "EXECUTE_MODEL_SUCCESS";
export const EXECUTE_MODEL_FAILED = "EXECUTE_MODEL_FAILED";
export const MODEL_SET_STATE = "MODEL_SET_STATE";
export const ADD_SELECTED_MODEL = "ADD_SELECTED_MODEL";
export const DELETE_SELECTED_MODEL = "DELETE_SELECTED_MODEL";
export const DELETE_QUERY = "DELETE_QUERY";
export const CREATE_NEW_MODEL_QUERY = "CREATE_NEW_MODEL_QUERY";
export const SET_VISIT = "SET_VISIT";

export function setVisit(unifiedPatientID, hospitalCode, visitType, visitID, queryID){
    return {type: SET_VISIT, id: queryID, unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode,
            visitType: visitType, visitID: visitID}
}

export function getModelDataAndExecuteModel(modelCategory, modelName, modelFunction, unifiedPatientID, hospitalCode,
                                            visitType, visitID, queryID){
    const unifiedModelName = modelCategory+"_"+modelName+"_"+modelFunction;
    return (dispatch, getState)=>{
        return dispatch(getModelData(modelCategory, modelName, modelFunction, unifiedPatientID, hospitalCode, visitType,
            visitID, queryID)).then(()=>{
                const data = getState().individual.model[queryID].model[unifiedModelName].inputs;
                const dataJson = JSON.stringify({"inputs": data});
                return dispatch(executeModel(modelCategory, modelName, modelFunction, dataJson, queryID))
        })
    }
}

function getModelData(modelCategory, modelName, modelFunction, unifiedPatientID, hospitalCode, visitType,
                             visitID, queryID) {
    const unifiedModelName = modelCategory+"_"+modelName+"_"+modelFunction;

    return function(dispatch, getState) {
        dispatch(fetchModelDataRequest(unifiedModelName, queryID));
        const params = {modelCategory: modelCategory, modelName: modelName, modelFunction: modelFunction,
            unifiedPatientID: unifiedPatientID, hospitalCode: hospitalCode, visitType: visitType, visitID: visitID};
        let url = RouteName.B_MACHINE_LEARNING + RouteName.B_FETCH_MACHINE_LEARNING_MODEL_DATA+queryParamsTrans(params)
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(fetchModelDataFailed(unifiedModelName, queryID))})
            .then(res => dispatch(fetchModelDataSuccess(unifiedModelName, res, queryID)))
    }
}

export function executeModel(modelCategory, modelName, modelFunction, data, queryID) {
    const unifiedModelName = modelCategory+"_"+modelName+"_"+modelFunction;
    return function (dispatch, getState) {
        dispatch(executeModelRequest(unifiedModelName, queryID));

        let url = RouteName.B_MACHINE_LEARNING + RouteName.B_EXECUTE_MODEL;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('modelName', modelName);
        formData.append('modelCategory', modelCategory);
        formData.append('modelFunction', modelFunction);
        formData.append('modelInput', data);

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(executeModelFailed(unifiedModelName, queryID))})
            .then(result => dispatch(executeModelSuccess(unifiedModelName, result, queryID)))
    }
}

function fetchModelDataRequest(unifiedModelName, queryID) {
    return {type: FETCH_MODEL_DATA_REQUEST, id: queryID, unifiedModelName: unifiedModelName}
}

function fetchModelDataSuccess(unifiedModelName, data, queryID) {
    return {type: FETCH_MODEL_DATA_SUCCESS, unifiedModelName: unifiedModelName, id: queryID, data: data}
}

function fetchModelDataFailed(unifiedModelName, queryID) {
    return {type: FETCH_MODEL_DATA_FAILED, unifiedModelName: unifiedModelName, id: queryID}
}

function executeModelRequest(unifiedModelName, queryID) {
    return {type: EXECUTE_MODEL_REQUEST, id: queryID, unifiedModelName: unifiedModelName}
}

function executeModelSuccess(unifiedModelName, result, queryID){
    return {type: EXECUTE_MODEL_SUCCESS, unifiedModelName: unifiedModelName, result: result, id:queryID}
}

function executeModelFailed(unifiedModelName, queryID){
    return {type: EXECUTE_MODEL_FAILED, unifiedModelName: unifiedModelName, id: queryID}
}

export function createNewModelQueryAndInitialize(queryID) {
    return {type: CREATE_NEW_MODEL_QUERY, id: queryID}
}

export function deleteModelQuery(queryID) {
    return {type: DELETE_QUERY, id: queryID}
}

export function deleteSelectedModel(unifiedModelName, queryID) {
    return {type: DELETE_SELECTED_MODEL, id: queryID, unifiedModelName: unifiedModelName}
}

export function addSelectedModel(unifiedModelName, queryID) {
    return {type: ADD_SELECTED_MODEL, id: queryID, unifiedModelName: unifiedModelName}
}

export function modelSetState(state) {
    return {type: MODEL_SET_STATE, state: state}
}