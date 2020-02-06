import ParaName from '../utils/ParaName';
import RouteName from '../utils/RouteName';
import {queryParamsTrans} from "../utils/queryUtilFunction";
import fetch from "cross-fetch";

export const RESET = "RESET";
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const IN_PROGRESS = "IN_PROGRESS";
export const NOT_UPDATE = "NOT_UPDATE";
export const FILE_NAME_ERROR = "FILE_NAME_ERROR";
export const NOT_UPLOAD = "NOT_UPLOAD";

export const MODEL_FILE = "MODEL_FILE";
export const MODEL_DOC = "MODEL_DOC";
export const MODEL_PREPROCESS = "MODEL_PREPROCESS";
export const ACCESS_CONTROL = "ACCESS_CONTROL";
export const MODEL_PLATFORM = "MODEL_PLATFORM";

export const ALGORITHM_LIST_REQUEST_POSTS = 'ALGORITHM_LIST_REQUEST_POSTS';
export const ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS = 'ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS';
export const ALGORITHM_LIST_RECEIVE_FAILED_POSTS = 'ALGORITHM_LIST_RECEIVE_FAILED_POSTS';

export const MODEL_UPDATE_INFO_INITIALIZE = 'MODEL_UPDATE_INFO_INITIALIZE';
export const UPDATE_MODEL_UPDATE_INFO = "UPDATE_MODEL_UPDATE_INFO";

export const MODEL_UPDATE_REQUEST = "MODEL_UPDATE_REQUEST";
export const MODEL_UPDATE_SUCCESS = "MODEL_UPDATE_SUCCESS";
export const MODEL_UPDATE_FAILED = "MODEL_UPDATE_FAILED";

export const MODEL_DELETE_REQUEST = "MODEL_DELETE_REQUEST";
export const MODEL_DELETE_SUCCESS = "MODEL_DELETE_SUCCESS";
export const MODEL_DELETE_FAILED = "MODEL_DELETE_FAILED";

export const GET_MODEL_INFO_REQUEST = "GET_MODEL_INFO_REQUEST";
export const GET_MODEL_INFO_SUCCESS = "GET_MODEL_INFO_SUCCESS";
export const GET_MODEL_INFO_FAILED = "GET_MODEL_INFO_FAILED";

export const CREATE_NEW_MODEL_REQUEST = "CREATE_NEW_MODEL_REQUEST";
export const CREATE_NEW_MODEL_SUCCESS = "CREATE_NEW_MODEL_SUCCESS";
export const CREATE_NEW_MODEL_FAILED = "CREATE_NEW_MODEL_FAILED";

function createNewModelRequest() {
    return ({type: CREATE_NEW_MODEL_REQUEST})
}


function createNewModelSuccess() {
    return ({
        type: CREATE_NEW_MODEL_SUCCESS,
    })
}

function createNewModelFailed() {
    return {type: CREATE_NEW_MODEL_FAILED,}
}

export function createNewModel(modelNameMap, modelFileMap, accessControl){
    return function(dispatch, getState) {

        dispatch(createNewModelRequest());

        let token = getState().session.authenticToken;
        const currentUser = getState().session.user.userName;
        let header = {
            'Authorization': token,
        };
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.B_CREATE_NEW_MODEL;

        let formData = new FormData();
        formData.append('modelNameChinese', modelNameMap['modelChineseName']);
        formData.append('modelNameEnglish', modelNameMap['modelEnglishName']);
        formData.append('platform', modelNameMap['platform']);
        formData.append('accessControl', accessControl);
        formData.append('mainCategory', modelNameMap['modelCategory']);
        formData.append('modelFunctionChinese', modelNameMap['modelChineseFunction']);
        formData.append('modelFunctionEnglish', modelNameMap['modelEnglishFunction']);
        formData.append('modelFile', modelFileMap['modelFile']);
        formData.append('modelPreprocess', modelFileMap['modelPreprocess']);
        formData.append('modelDoc', modelFileMap['modelDoc']);
        formData.append('userName', currentUser);

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(createNewModelFailed())})
            .then((res) => {
                dispatch(createNewModelSuccess());
                return res
            })
            // 重新初始化所有模型列表信息
            .then(()=>dispatch(reset()))
            .then(()=>dispatch(fetchModelListPosts()))
    }
}

function getModelInfoRequest() {
    return ({type: GET_MODEL_INFO_REQUEST})
}


function getModelInfoSuccess(res) {
    return ({
        type: GET_MODEL_INFO_SUCCESS,
        content: res
    })
}

function getModelInfoFailed() {
    return {type: GET_MODEL_INFO_FAILED,}
}

export function getModelInfo(mainCategory, algorithmMainCategory, algorithmSubCategory){
    return function(dispatch, getState) {

        dispatch(getModelInfoRequest());

        let token = getState().session.authenticToken;
        let header = {
            'Authorization': token,
        };
        const param = {
            'modelNameEnglish': algorithmMainCategory,
            'mainCategory': mainCategory,
            'modelFunctionEnglish': algorithmSubCategory
        };
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.B_MODEL_INFO+queryParamsTrans(param);

        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json())
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(getModelInfoFailed());
                        console.log('Unknown: Error, get model info failed')
                    }
                    else{
                        dispatch(getModelInfoSuccess(res));
                        console.log('get model info success')
                    }
                }
            )
    }
}

function reset(){
    return ({type: RESET})
}


function modelListRequest() {
    return ({type: ALGORITHM_LIST_REQUEST_POSTS})
}


function receiveModelListSuccessResult(res) {
    return ({
        type: ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
        content: res
    })
}

function receiveModelListFailedResult() {
    return {type: ALGORITHM_LIST_RECEIVE_FAILED_POSTS,}
}

export function initializeModelUpdateInfo(res){
    return {type: MODEL_UPDATE_INFO_INITIALIZE, content: res}
}

export function updateModelUpdateInfo(infoCategory, infoType, unifiedName, updateInfoTime){
    return {
        type: UPDATE_MODEL_UPDATE_INFO,
        infoCategory: infoCategory,
        infoType: infoType,
        unifiedName: unifiedName,
        updateInfoTime: updateInfoTime
    }
}

function modelDeleteRequest() {
    return ({type: MODEL_DELETE_REQUEST})
}


function receiveModelDeleteSuccess() {
    return ({type: MODEL_DELETE_SUCCESS})
}

function receiveModelDeleteFailed() {
    return {type: MODEL_DELETE_FAILED,}
}

export function deleteModel(mainCategory, algorithmMainCategory, algorithmSubCategory){
    return function(dispatch, getState) {
        dispatch(modelDeleteRequest());
        let token = getState().session.authenticToken;
        let header = {
            'Authorization': token,
        };
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.B_DELETE_EXIST_MODEL;

        let formData = new FormData();
        formData.append('modelNameEnglish', algorithmMainCategory);
        formData.append('mainCategory', mainCategory);
        formData.append('modelFunctionEnglish', algorithmSubCategory);

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(receiveModelDeleteFailed());
                        console.log('Unknown: Error, delete model failed')
                    }
                    else{
                        dispatch(receiveModelDeleteSuccess());
                        console.log('delete model success')
                    }
                }
            )
            // 删除成功后重设List
            .then(()=>dispatch(reset()))
            .then(()=>dispatch(fetchModelListPosts()))
    }
}

export function fetchModelListPosts() {
    return function(dispatch, getState) {
        dispatch(modelListRequest());
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.B_FETCH_MODEL_LIST;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: ParaName.GET, headers: header})
            .then(res => res.json())
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(receiveModelListFailedResult());
                        console.log('Unknown: Error, get algorithm info failed')
                    }
                    else{
                        dispatch(receiveModelListSuccessResult(res));

                        //初始化所有模型更新信息的状态
                        let modelUpdateInfo = {
                            updateModelFile:{},
                            updateModelConfig:{},
                            updateModelDoc:{},
                            updatePreprocess:{},
                            updateAccessControl:{},
                            updatePlatForm:{},
                            modelCreateUser:{}
                        };
                        for(let item of res){
                            const unifiedName = item['mainCategory']+ "_"+item['modelEnglishName']+
                                "_"+ item['modelEnglishFunctionName'];
                            const createUser = item['createUser'];
                            const defaultDate = new Date(1970, 1, 1, 0, 0, 0, 0);
                            modelUpdateInfo.modelCreateUser[unifiedName]=createUser;
                            modelUpdateInfo.updateModelFile[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateModelConfig[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateModelDoc[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updatePreprocess[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updateAccessControl[unifiedName]=[NOT_UPDATE, defaultDate];
                            modelUpdateInfo.updatePlatForm[unifiedName]=[NOT_UPDATE, defaultDate];
                        }
                        dispatch(initializeModelUpdateInfo(modelUpdateInfo))
                    }
                }
            );
    }
}

function modelUpdateRequest() {
    return ({type: MODEL_UPDATE_REQUEST})
}


function modelUpdateSuccess() {
    return ({
        type: MODEL_UPDATE_SUCCESS
    })
}

function modelUpdateFailed() {
    return {type: MODEL_UPDATE_FAILED}
}

export function modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, fileOrMessage, infoType, path){
    return function(dispatch, getState) {
        const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;

        dispatch(modelUpdateRequest(infoType));
        dispatch(updateModelUpdateInfo(infoType, IN_PROGRESS, unifiedModelName, Date.now()));

        let token = getState().session.authenticToken;
        let header = {
            'Authorization': token,
        };
        let url = RouteName.B_ALGORITHM_MANAGEMENT + path;

        let formData = new FormData();
        formData.append('fileOrMessage', fileOrMessage);
        formData.append('modelNameEnglish', algorithmMainCategory);
        formData.append('mainCategory', mainCategory);
        formData.append('modelFunctionEnglish', algorithmSubCategory);


        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(
                res => {

                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(modelUpdateFailed(infoType));
                        dispatch(updateModelUpdateInfo(infoType, FAILED, unifiedModelName, Date.now()));
                        console.log('Unknown: Error, update model failed')
                    }
                    else{
                        dispatch(modelUpdateSuccess(infoType));
                        dispatch(updateModelUpdateInfo(infoType, SUCCESS, unifiedModelName, Date.now()));
                        console.log('update model success')
                    }
                }
            )
    }
}