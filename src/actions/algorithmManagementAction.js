import ParaName from '../utils/ParaName';
import RouteName from '../utils/RouteName';

export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const IN_PROGRESS = "IN_PROGRESS";
export const NOT_UPDATE = "NOT_UPDATE";
export const FILE_NAME_ERROR = "FILE_NAME_ERROR";

export const MODEL_FILE = "MODEL_FILE";
export const MODEL_CONFIG = "MODEL_CONFIG";
export const MODEL_DOC = "MODEL_DOC";
export const MODEL_PREPROCESS = "MODEL_PREPROCESS";
export const ACCESS_CONTROL = "ACCESS_CONTROL";
export const MODEL_PLATFORM = "MODEL_PLATFORM";

export const ALGORITHM_LIST_REQUEST_POSTS = 'ALGORITHM_LIST_REQUEST_POSTS';
export const ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS = 'ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS';
export const ALGORITHM_LIST_RECEIVE_FAILED_POSTS = 'ALGORITHM_LIST_RECEIVE_FAILED_POSTS';

export const MODEL_UPDATE_INFO_INITIALIZE = 'MODEL_UPDATE_INFO_INITIALIZE';
export const UPDATE_MODEL_UPDATE_INFO = "UPDATE_MODEL_UPDATE_INFO";

export const MODEL_UPDATE_REQUEST = "MODEL_FILE_UPDATE_REQUEST";
export const MODEL_UPDATE_SUCCESS = "MODEL_FILE_UPDATE_SUCCESS";
export const MODEL_UPDATE_FAILED = "MODEL_FILE_UPDATE_FAILED";


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

export function updateModelUpdateInfo(infoCategory, fileType, unifiedName, updateInfoTime){
    return {
        type: UPDATE_MODEL_UPDATE_INFO,
        infoCategory: infoCategory,
        fileType: fileType,
        unifiedName: unifiedName,
        updateInfoTime: updateInfoTime
    }
}

export function fetchModelListPosts() {
    return function(dispatch, getState) {
        dispatch(modelListRequest());
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.FETCH_MODEL_LIST;
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
                        console.log('get algorithm info succeed');

                        //初始化所有模型更新信息的状态
                        let modelUpdateInfo = {
                            updateModelFile:{},
                            updateModelConfig:{},
                            updateModelDoc:{},
                            updatePreprocess:{},
                            updateAccessControl:{},
                            updatePlatForm:{},
                        };
                        for(let item of res){
                            const unifiedName = item['mainCategory']+ "_"+item['modelEnglishName']+
                                "_"+ item['modelEnglishFunctionName'];
                            const defaultDate = new Date(1970, 1, 1, 0, 0, 0, 0);
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

export function modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, file, fileType, path){
    return function(dispatch, getState) {
        const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;

        dispatch(modelUpdateRequest(fileType));
        dispatch(updateModelUpdateInfo(fileType, IN_PROGRESS, unifiedModelName, Date.now()));

        let token = getState().session.authenticToken;
        let header = {
            'Authorization': token,
        };
        let url = RouteName.B_ALGORITHM_MANAGEMENT + path;

        let formData = new FormData();
        formData.append('file', file);
        formData.append('modelNameEnglish', algorithmMainCategory);
        formData.append('mainCategory', mainCategory);
        formData.append('modelFunctionEnglish', algorithmSubCategory);


        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(
                res => {

                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(modelUpdateFailed(fileType));
                        dispatch(updateModelUpdateInfo(fileType, FAILED, unifiedModelName, Date.now()));
                        console.log('Unknown: Error, update model failed')
                    }
                    else{
                        dispatch(modelUpdateSuccess(fileType));
                        dispatch(updateModelUpdateInfo(fileType, SUCCESS, unifiedModelName, Date.now()));
                        console.log('update model success')
                    }
                }
            )
    }
}