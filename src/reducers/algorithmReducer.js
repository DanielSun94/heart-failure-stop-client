import {
    ALGORITHM_LIST_RECEIVE_FAILED_POSTS,
    ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
    ALGORITHM_LIST_REQUEST_POSTS,
    MODEL_UPDATE_INFO_INITIALIZE,
    UPDATE_MODEL_UPDATE_INFO,
    MODEL_CONFIG,
    MODEL_DOC,
    MODEL_FILE,
    MODEL_PLATFORM,
    MODEL_PREPROCESS,
    ACCESS_CONTROL,
    MODEL_FILE_UPDATE_FAILED,
    MODEL_FILE_UPDATE_SUCCESS,
    MODEL_FILE_UPDATE_REQUEST
} from "../actions/algorithmManagementAction"

const initialState = {
    algorithmList: [],
    // format; modelName: updateFlag
    updateModelFile:{},
    updateModelConfig:{},
    updateModelDoc:{},
    updatePreprocess:{},
    updateAccessControl:{},
    updatePlatForm:{},
};

const algorithmReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALGORITHM_LIST_REQUEST_POSTS: {
            return {...initialState};
        }
        case ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS: {
            return {...state, algorithmList: action.content};
        }
        case ALGORITHM_LIST_RECEIVE_FAILED_POSTS: {
            return {...initialState};
        }
        case MODEL_UPDATE_INFO_INITIALIZE: {
            return {
                ...state,
                updateModelFile: action.content.updateModelFile,
                updateModelConfig: action.content.updateModelConfig,
                updateModelDoc: action.content.updateModelDoc,
                updatePreprocess: action.content.updatePreprocess,
                updateAccessControl: action.content.updateAccessControl,
                updatePlatForm: action.content.updatePlatForm};
        }
        case UPDATE_MODEL_UPDATE_INFO: {
            if(action.infoCategory===MODEL_CONFIG){
                let newMap = {...state.updateModelConfig};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updateModelConfig: newMap};
            }
            else if(action.infoCategory===MODEL_DOC){
                let newMap = {...state.updateModelDoc};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updateModelDoc: newMap};
            }
            else if(action.infoCategory===MODEL_FILE){
                let newMap = {...state.updateModelFile};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updateModelFile: newMap};
            }
            else if(action.infoCategory===MODEL_PLATFORM){
                let newMap = {...state.updatePlatForm};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updatePlatForm: newMap};
            }
            else if(action.infoCategory===MODEL_PREPROCESS){
                let newMap = {...state.updatePreprocess};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updatePreprocess: newMap};
            }
            else if(action.infoCategory===ACCESS_CONTROL){
                let newMap = {...state.updateAccessControl};
                newMap[action.unifiedName] = [action.infoType, action.updateInfoTime];
                return {
                    ...state,
                    updateAccessControl: newMap};
            }
            else {
                return {...state};
            }
        }
        case MODEL_FILE_UPDATE_REQUEST: {
            return {...state};
        }
        case MODEL_FILE_UPDATE_FAILED: {
            return {...state};
        }
        case MODEL_FILE_UPDATE_SUCCESS: {
            return {...state};
        }
        // eslint-disable-next-line no-fallthrough
        default: {
            return {...state};
        }
    }
};

export default algorithmReducer;
