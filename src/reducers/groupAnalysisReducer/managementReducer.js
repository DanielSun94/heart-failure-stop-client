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
    GET_VISIT_INFO_FAILED,
    SET_PAGE,
    SEX_INFO_REQUEST_SUCCESS,
    SEX_INFO_REQUEST_FAILED,
    SEX_INFO_REQUEST_POST
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
        case SET_PAGE: return setPage(state, action.queryID, action.page);
        case SEX_INFO_REQUEST_POST: return sexInfoRequestPost(state, action.queryID);
        case SEX_INFO_REQUEST_SUCCESS: return sexInfoRequestSuccess(state, action.result, action.queryID);
        case SEX_INFO_REQUEST_FAILED: return sexInfoRequestFailed(state, action.queryID);
        default: return {...state};
    }
};

function sexInfoRequestFailed(state, queryID) {
    state[queryID].statistics.sex={
        ...state[queryID].statistics.sex,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function sexInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.sex={
        ...state[queryID].statistics.sex,
        isFetchingData: false,
        isDataOutOfDate: false,
        isDataValid: true,
        male: result['male'],
        female: result['female']
    };
    return {...state}
}

function sexInfoRequestPost(state, queryID) {
    state[queryID].statistics.sex={
        ...state[queryID].statistics.sex,
        isFetchingData: true,
        male: 0,
        female: 0
    };
    return {...state}
}

function setPage(state, queryID, page) {
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        page: page
    };
    return {...state}
}

function getVisitInfoPost(state, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: true,
        isDataOutOfDate: true
    };
    return {...state}
}

function getVisitInfoSuccess(state, result, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: false,
        isDataOutOfDate: false,
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
        sex:{
            ...state[queryID].statistics.sex,
            isDataOutOfDate: true,
        }
    };
    state[queryID].visitInfo={
        visitCount: -1,
        page: 0,
        pageSize: 20,
        isFetchingData: true,
        isDataValid: false,
        isDataOutOfDate: true,
        data: []
    };
    return {...state}
}

function queryDataSuccess(state, result, queryID){
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isDataValid: true,
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
        selectedTab: 'patientList',
        filter: {},
        statistics: {
            // 此处的三个标识符
            // isFetching代表是否在获取数据
            // isDataOutOfDate代表当前列表是否过时
            // isDataValid则服务器是否返回了正确的统计结果
            sex:{
                isFetchingData: false,
                isDataValid: false,
                isDataOutOfDate: false,
                male: 0,
                female: 0
            }
        },
        visitInfo: {
            // 此处的三个标识符
            // isFetching代表是否在获取数据
            // isDataOutOfDate代表当前列表是否过时
            // isDataValid则代表当前服务器端是否准备完毕
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