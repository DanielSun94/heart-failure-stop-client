import {
    INITIALIZE_MANAGEMENT_QUERY,
    CHANGE_FILTER,
    CHANGE_QUERY_TAB,
    MANAGEMENT_SET_STATE,
    QUERY_DATA_POST,
    QUERY_DATA_SUCCESS,
    QUERY_DATA_FAILED,
    GET_VISIT_INFO_POST,
    GET_VISIT_INFO_SUCCESS,
    GET_VISIT_INFO_FAILED
} from "../../actions/groupAnalysisAction/managementAction";

const initStateInfo = {};
const managementReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case MANAGEMENT_SET_STATE: return managementSetState(action.newState);
        case INITIALIZE_MANAGEMENT_QUERY: return initialize(state, action.queryID);
        case CHANGE_FILTER: return changeFilter(state, action.newFilter, action.queryID);
        case CHANGE_QUERY_TAB: return changeQueryTab(state, action.selectedTab, action.queryID);
        case QUERY_DATA_POST: return queryDataPost(state, action.queryID);
        case QUERY_DATA_SUCCESS: return queryDataSuccess(state, action.result, action.queryID);
        case QUERY_DATA_FAILED: return queryDataFailed(state, action.queryID);
        case GET_VISIT_INFO_POST: return getVisitInfoPost(state, action.queryID);
        case GET_VISIT_INFO_FAILED: return getVisitInfoFailed(state, action.queryID);
        case GET_VISIT_INFO_SUCCESS: return getVisitInfoSuccess(state, action.result, action.queryID);
        default: return {...state};
    }
};

function getVisitInfoPost(state, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: true,
    };
    return {...state}
}

function getVisitInfoSuccess(state, result, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: false,
        isDataValid: true,
        data: result
    };
    return {...state}
}

function getVisitInfoFailed(state, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: false,
    };
    return {...state}
}

function queryDataPost(state, queryID){
    state[queryID].statistics={
        isFetchingData: false,
        isDataValid: false,
        isDataOutOfDate: false,
        data: {}
    };
    state[queryID].visitInfo={
        visitCount: -1,
        page: 1,
        pageSize: 20,
        isFetchingData: false,
        isDataValid: false,
        isDataOutOfDate: false,
        data: []
    };
    return {...state}
}

function queryDataSuccess(state, result, queryID){
    state[queryID].statistics={
        ...state[queryID].statistics,
        isDataOutOfDate: true,
    };
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isDataOutOfDate: true,
        visitCount: parseInt(result)
    };
    return {...state}
}

function queryDataFailed(state){
    return {...state}
}

function managementSetState(newState){
    return {...newState}
}

function initialize(state, queryID){
    state[queryID] = {
        selectedTab: 'statistic',
        filter: {},
        statistics: {
            isFetchingData: false,
            isDataValid: false,
            isDataOutOfDate: false,
            data: {}
        },
        visitInfo: {
            visitCount: -1,
            page: 1,
            pageSize: 20,
            isFetchingData: false,
            isDataValid: false,
            isDataOutOfDate: false,
            data: []
        }
    };
    return {...state}
}

function changeQueryTab(state, selectedTab, queryID){
    state[queryID] = {
        ...state[queryID],
        selectedTab: selectedTab,
    };
    return {...state}
}

function changeFilter(state, newFilter, queryID){
    state[queryID] = {
        ...state[queryID],
        filter: newFilter,
    };
    return {...state}
}

export default managementReducer;