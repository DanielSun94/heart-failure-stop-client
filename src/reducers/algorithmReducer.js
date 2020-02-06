import {
    ACCESS_CONTROL,
    ALGORITHM_LIST_RECEIVE_FAILED_POSTS,
    ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
    ALGORITHM_LIST_REQUEST_POSTS,
    CREATE_NEW_MODEL_FAILED,
    CREATE_NEW_MODEL_REQUEST,
    CREATE_NEW_MODEL_SUCCESS,
    RESET,
    MODEL_UPDATE_SUCCESS,
    MODEL_UPDATE_FAILED,
    MODEL_UPDATE_REQUEST,
    UPDATE_MODEL_UPDATE_INFO,
    GET_MODEL_INFO_FAILED,
    GET_MODEL_INFO_REQUEST,
    GET_MODEL_INFO_SUCCESS,
    MODEL_UPDATE_INFO_INITIALIZE,
    MODEL_DOC,
    MODEL_FILE,
    MODEL_PLATFORM,
    MODEL_PREPROCESS
} from "../actions/algorithmManagementAction"

const initialState = {
    algorithmList: [],
    // format; modelName: updateFlag
    modelInfo: {},
    updateModelFile:{},
    updateModelDoc:{},
    updatePreprocess:{},
    updateAccessControl:{},
    updatePlatForm:{},
    modelCreateUser: {},
    createStatus: 'complete'
};

const algorithmReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALGORITHM_LIST_REQUEST_POSTS: {
            return {...initialState};
        }
        case RESET: {
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
                modelCreateUser: action.content.modelCreateUser,
                updateModelFile: action.content.updateModelFile,
                updateModelConfig: action.content.updateModelConfig,
                updateModelDoc: action.content.updateModelDoc,
                updatePreprocess: action.content.updatePreprocess,
                updateAccessControl: action.content.updateAccessControl,
                updatePlatForm: action.content.updatePlatForm};
        }
        case UPDATE_MODEL_UPDATE_INFO: {
            if(action.infoCategory===MODEL_DOC){
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
        case MODEL_UPDATE_REQUEST: {
            return {...state};
        }
        case MODEL_UPDATE_FAILED: {
            return {...state};
        }
        case MODEL_UPDATE_SUCCESS: {
            return {...state};
        }
        case GET_MODEL_INFO_REQUEST: {
            return {...state};
        }
        case GET_MODEL_INFO_SUCCESS: {
            return {...state, modelInfo: action.content};
        }
        case GET_MODEL_INFO_FAILED: {
            return {...state};
        }
        case CREATE_NEW_MODEL_SUCCESS: {
            return {...state, createStatus:"complete"};
        }
        case CREATE_NEW_MODEL_REQUEST: {
            return {...state, createStatus: 'inProgress'};
        }
        case CREATE_NEW_MODEL_FAILED: {
            return {...state, createStatus: 'failed'};
        }
        // eslint-disable-next-line no-fallthrough
        default: {
            return {...state};
        }
    }
};

export default algorithmReducer;
