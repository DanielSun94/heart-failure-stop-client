export const CREATE_NEW_QUERY = 'CREATE_NEW_QUERY';
export const EDIT_QUERY_NAME = 'EDIT_QUERY_NAME';
export const DELETE_QUERY = 'DELETE_QUERY';

export function createNewQuery(metaInfo) {
    return ({type: CREATE_NEW_QUERY, metaInfo: metaInfo})
}

export function editQueryName(id, name) {
    return ({type: EDIT_QUERY_NAME, id: id, name: name})
}

export function deleteQuery(id) {
    return ({type: DELETE_QUERY, id: id})
}