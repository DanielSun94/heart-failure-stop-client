export const CREATE_NEW_QUERY = 'CREATE_NEW_QUERY';
export const EDIT_QUERY_NAME = 'EDIT_QUERY_NAME';
export const DELETE_QUERY = 'DELETE_QUERY';
export const META_INFO_SET_STATE = "META_INFO_SET_STATE";
export const SET_EXPANDED = "SET_EXPANDED";
export const SET_SELECTED_QUERY = "SET_SELECTED_QUERY";
export const SET_QUERY_CONTEXT = "SET_QUERY_CONTEXT";

export function setExpandedQueryList(expandedQueryList) {
    return ({type: SET_EXPANDED, expandedQueryList: expandedQueryList})
}

export function setSelectedQuery(selectedQuery) {
    return ({type: SET_SELECTED_QUERY, selectedQuery: selectedQuery})
}

export function metaInfoSetState(newState) {
    return ({type: META_INFO_SET_STATE, newState: newState})
}

export function createNewQuery(queryType, affiliatedTo=null) {
    return ({type: CREATE_NEW_QUERY, queryType: queryType, affiliatedTo: affiliatedTo})
}
export function editQueryName(name, isNameUserDefined, id) {
    return ({type: EDIT_QUERY_NAME, id: id, name: name, isNameUserDefined: isNameUserDefined})
}

export function deleteQuery(id) {
    return ({type: DELETE_QUERY, id: id})
}