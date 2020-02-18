import RouteName from "../../utils/RouteName";
import ParaName from "../../utils/ParaName";

export const INITIALIZE_MANAGEMENT_QUERY = "INITIALIZE_MANAGEMENT_QUERY";
export const CHANGE_QUERY_TAB = "CHANGE_QUERY_TAB";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const MANAGEMENT_SET_STATE = "MANAGEMENT_SET_STATE";
export const QUERY_DATA_POST = "QUERY_DATA_POST";
export const QUERY_DATA_SUCCESS = "QUERY_DATA_SUCCESS";
export const QUERY_DATA_FAILED = "QUERY_DATA_FAILED";
export const GET_VISIT_INFO_POST = "GET_VISIT_INFO_POST";
export const GET_VISIT_INFO_SUCCESS = "GET_VISIT_INFO_SUCCESS";
export const GET_VISIT_INFO_FAILED = "GET_VISIT_INFO_FAILED";
export const SET_PAGE = "SET_PAGE";
export const SEX_INFO_REQUEST_POST = "SEX_INFO_REQUEST_POST";
export const SEX_INFO_REQUEST_SUCCESS = "SEX_INFO_REQUEST_SUCCESS";
export const SEX_INFO_REQUEST_FAILED = "SEX_INFO_REQUEST_FAILED";

function sexInfoRequest(queryID) {
    return {type: SEX_INFO_REQUEST_POST, queryID: queryID}
}

function sexInfoRequestSuccess(result, queryID) {
    return {type: SEX_INFO_REQUEST_SUCCESS, result: result, queryID: queryID}
}

function sexInfoRequestFailed(queryID) {
    return {type: SEX_INFO_REQUEST_FAILED, queryID: queryID}
}

export function getSexInfo(queryID) {
    return function(dispatch, getState) {
        dispatch(sexInfoRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_SEX_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(sexInfoRequestFailed(queryID))})
            .then(res => dispatch(sexInfoRequestSuccess(res, queryID)))
    }
}

export function setPage(page, queryID){
    return {type: SET_PAGE, page: page, queryID: queryID}
}

function getVisitInfoPost(queryID){
    return {type: GET_VISIT_INFO_POST, queryID: queryID}
}

function getVisitInfoSuccess(result, queryID){
    return {type: GET_VISIT_INFO_SUCCESS, result: result, queryID:queryID}
}

function getVisitInfoFailed(result, queryID) {
    return {type: GET_VISIT_INFO_FAILED, queryID:queryID}
}

export function getVisitInfo(startIndex, endIndex, queryID) {
    return function(dispatch, getState) {
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        dispatch(getVisitInfoPost(queryID));
        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_VISIT_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }
        let formData = new FormData();
        formData.append('startIndex', startIndex);
        formData.append('endIndex', endIndex);
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(getVisitInfoFailed(queryID))})
            .then(res => dispatch(getVisitInfoSuccess(res, queryID)))
    }
}

export function managementSetState(newState, queryID) {
    return ({type: MANAGEMENT_SET_STATE, newState: newState, queryID: queryID})
}

export function initializeManagementQuery(queryID) {
    return ({type: INITIALIZE_MANAGEMENT_QUERY, queryID: queryID})
}

export function changeManagementQueryTab(selectedTab, queryID){
    return ({type: CHANGE_QUERY_TAB, queryID: queryID, selectedTab: selectedTab})
}

export function changeManagementQueryFilter(newFilter, queryID){
    return ({type: CHANGE_FILTER, queryID: queryID, newFilter: newFilter})
}

function queryDataPost(queryID){
    return {type: QUERY_DATA_POST, queryID: queryID}
}

function queryDataSuccess(result, queryID){
    return {type: QUERY_DATA_SUCCESS, queryID: queryID, result: result}
}

function queryDataFailed(queryID){
    return {type: QUERY_DATA_FAILED, queryID: queryID}
}

export function queryDataAccordingToFilter(newFilter, queryID) {
    return function(dispatch, getState) {
        const currentUser = getState().session.user.userName;
        dispatch(queryDataPost(queryID));
        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_QUERY_WITH_FILTER;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        // 把前端的filter转换为后端所需的形式:
        const filter = {'filter': []};
        for(const index in newFilter){
            if(newFilter.hasOwnProperty(index)){
                filter['filter'].push(newFilter[index])
            }
        }
        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filter));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(queryDataFailed(queryID))})
            .then(res => dispatch(queryDataSuccess(res['response'], queryID)))
    }
}