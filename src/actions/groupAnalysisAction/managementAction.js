export const INITIALIZE_MANAGEMENT_QUERY = "INITIALIZE_MANAGEMENT_QUERY";
export const CHANGE_QUERY_TAB = "CHANGE_QUERY_TAB";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const MANAGEMENT_SET_STATE = "MANAGEMENT_SET_STATE";

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