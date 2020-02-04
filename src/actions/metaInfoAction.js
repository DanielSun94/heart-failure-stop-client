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

export function setQueryContext(context, id){
    // 为individual algorithm准备，用于存储所需的一些信息（模型信息，调取模型所需输入的一些基本信息）
    // 之所以采取这种设计，是因为算法未来会有其他人开发，必须要放一个容器，存放一些用户自定义的信息
    // 最少最少，这个自定义信息要包括算法名称，使得可以根据不同的算法渲染不同的界面，包括算法当前的计算对象的基本信息
    return ({type: SET_QUERY_CONTEXT, id: id, context: context})
}

export function editQueryName(name, isNameUserDefined, id) {
    return ({type: EDIT_QUERY_NAME, id: id, name: name, isNameUserDefined: isNameUserDefined})
}

export function deleteQuery(id) {
    return ({type: DELETE_QUERY, id: id})
}