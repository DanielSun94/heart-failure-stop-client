import RouteName from "../../utils/RouteName";
import ParaName from "../../utils/ParaName";

export const INITIALIZE_MANAGEMENT_QUERY = "INITIALIZE_MANAGEMENT_QUERY";
export const CHANGE_QUERY_TAB = "CHANGE_QUERY_TAB";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const DELETE_QUERY = "DELETE_QUERY";
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
export const AGE_INFO_REQUEST_POST = "AGE_INFO_REQUEST_POST";
export const AGE_INFO_REQUEST_SUCCESS = "AGE_INFO_REQUEST_SUCCESS";
export const AGE_INFO_REQUEST_FAILED = "AGE_INFO_REQUEST_FAILED";
export const LAB_TEST_INFO_REQUEST_POST = "LAB_TEST_INFO_REQUEST_POST";
export const LAB_TEST_INFO_REQUEST_SUCCESS = "LAB_TEST_INFO_REQUEST_SUCCESS";
export const LAB_TEST_INFO_REQUEST_FAILED = "LAB_TEST_INFO_REQUEST_FAILED";
export const DIAGNOSIS_INFO_REQUEST_POST = "DIAGNOSIS_INFO_REQUEST_POST";
export const DIAGNOSIS_INFO_REQUEST_SUCCESS = "DIAGNOSIS_INFO_REQUEST_SUCCESS";
export const DIAGNOSIS_INFO_REQUEST_FAILED = "DIAGNOSIS_INFO_REQUEST_FAILED";
export const OPERATION_INFO_REQUEST_POST = "OPERATION_INFO_REQUEST_POST";
export const OPERATION_INFO_REQUEST_SUCCESS = "OPERATION_INFO_REQUEST_SUCCESS";
export const OPERATION_INFO_REQUEST_FAILED = "OPERATION_INFO_REQUEST_FAILED";
export const MEDICINE_INFO_REQUEST_POST = "MEDICINE_INFO_REQUEST_POST";
export const MEDICINE_INFO_REQUEST_SUCCESS = "MEDICINE_INFO_REQUEST_SUCCESS";
export const MEDICINE_INFO_REQUEST_FAILED = "MEDICINE_INFO_REQUEST_FAILED";
export const MAIN_DIAGNOSIS_INFO_REQUEST_POST = "MAIN_DIAGNOSIS_INFO_REQUEST_POST";
export const MAIN_DIAGNOSIS_INFO_REQUEST_SUCCESS = "MAIN_DIAGNOSIS_INFO_REQUEST_SUCCESS";
export const MAIN_DIAGNOSIS_INFO_REQUEST_FAILED = "MAIN_DIAGNOSIS_INFO_REQUEST_FAILED";

export function getAgeInfo(queryID) {
    return function(dispatch, getState) {
        dispatch(ageInfoRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_AGE_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(ageInfoRequestFailed(queryID))})
            .then(res => dispatch(ageInfoRequestSuccess(res, queryID)))
    }
}

export function getDiagnosisInfo(queryID) {
    return function(dispatch, getState) {
        dispatch(diagnosisRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_DIAGNOSIS_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(diagnosisRequestFailed(queryID))})
            .then(res => dispatch(diagnosisRequestSuccess(res, queryID)))
    }
}

export function getMedicine(queryID) {
    return function(dispatch, getState) {
        dispatch(medicineRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_MEDICINE_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(medicineRequestFailed(queryID))})
            .then(res => dispatch(medicineRequestSuccess(res, queryID)))
    }
}

export function getLabTestInfo(queryID) {
    return function(dispatch, getState) {
        dispatch(labTestInfoRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_LAB_TEST_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(labTestInfoRequestFailed(queryID))})
            .then(res => dispatch(labTestInfoRequestSuccess(res, queryID)))
    }
}

export function getMainDiagnosisInfo(queryID) {
    return function(dispatch, getState) {
        dispatch(mainDiagnosisRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_MAIN_DIAGNOSIS_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(mainDiagnosisRequestFailed(queryID))})
            .then(res => dispatch(mainDiagnosisRequestSuccess(res, queryID)))
    }
}

export function getOperation(queryID) {
    return function(dispatch, getState) {
        dispatch(operationRequest(queryID));
        const currentUser = getState().session.user.userName;
        const filter = getState().group.management[queryID].filter;
        // 把前端的filter转换为后端所需的形式:
        const filterList = {'filter': []};
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                filterList['filter'].push(filter[index])
            }
        }

        let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_GET_OPERATION_INFO;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};

        let formData = new FormData();
        formData.append('queryID', queryID);
        formData.append('userName', currentUser);
        formData.append('filter', JSON.stringify(filterList));

        return fetch(url, {method: ParaName.POST, headers: header, body: formData})
            .then(res => res.json(),
                error => {console.log(error); dispatch(operationRequestFailed(queryID))})
            .then(res => dispatch(operationRequestSuccess(res, queryID)))
    }
}

function ageInfoRequest(queryID){
    return {type: AGE_INFO_REQUEST_POST, queryID: queryID}
}

function ageInfoRequestSuccess(result, queryID) {
    return {type: AGE_INFO_REQUEST_SUCCESS, result: result, queryID: queryID}
}

function ageInfoRequestFailed(queryID) {
    return {type: AGE_INFO_REQUEST_FAILED, queryID: queryID}
}

function labTestInfoRequest(queryID) {
    return {type: LAB_TEST_INFO_REQUEST_POST, queryID: queryID}
}

function labTestInfoRequestSuccess(result, queryID) {
    return {type: LAB_TEST_INFO_REQUEST_SUCCESS, result: result, queryID: queryID}
}

function labTestInfoRequestFailed(queryID){
    return {type: LAB_TEST_INFO_REQUEST_FAILED, queryID: queryID}
}

function operationRequest(queryID) {
    return {type: OPERATION_INFO_REQUEST_POST, queryID: queryID}
}

function operationRequestSuccess(result, queryID) {
    return {type: OPERATION_INFO_REQUEST_SUCCESS, queryID: queryID, result: result}
}

function operationRequestFailed(queryID) {
    return {type: OPERATION_INFO_REQUEST_FAILED, queryID: queryID}
}

function medicineRequest(queryID){
    return {type: MEDICINE_INFO_REQUEST_POST, queryID: queryID}
}

function medicineRequestSuccess(result, queryID) {
    return {type: MEDICINE_INFO_REQUEST_SUCCESS, queryID: queryID, result: result}
}

function medicineRequestFailed(queryID) {
    return {type: MEDICINE_INFO_REQUEST_FAILED, queryID: queryID}
}

function diagnosisRequest(queryID) {
    return {type: DIAGNOSIS_INFO_REQUEST_POST, queryID: queryID}
}

function diagnosisRequestSuccess(result, queryID) {
    return {type: DIAGNOSIS_INFO_REQUEST_SUCCESS, queryID: queryID, result: result}
}

function diagnosisRequestFailed(queryID) {
    return {type: DIAGNOSIS_INFO_REQUEST_FAILED, queryID: queryID}
}

function mainDiagnosisRequest(queryID) {
    return {type: MAIN_DIAGNOSIS_INFO_REQUEST_POST, queryID: queryID}
}

function mainDiagnosisRequestSuccess(result,queryID) {
    return {type: MAIN_DIAGNOSIS_INFO_REQUEST_SUCCESS, result: result, queryID: queryID}
}

function mainDiagnosisRequestFailed(queryID) {
    return {type: MAIN_DIAGNOSIS_INFO_REQUEST_FAILED, queryID: queryID}
}

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

export function queryDataAccordingToFilter(filter, queryID, fatherQueryID=null, newCondition=null) {
    // 如果没有定义父查询，则直接进行查询，如果定义了，请求父查询的结果
    if(fatherQueryID===null) {
        return function (dispatch, getState) {
            const currentUser = getState().session.user.userName;
            dispatch(queryDataPost(queryID));
            let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_QUERY_WITH_FILTER;
            let token = getState().session.authenticToken;
            let header = {'Authorization': token};

            // 把前端的filter转换为后端所需的形式:
            const filterStr = {'filter': []};
            for (const index in filter) {
                if (filter.hasOwnProperty(index)) {
                    filterStr['filter'].push(filter[index])
                }
            }
            let formData = new FormData();
            formData.append('queryID', queryID);
            formData.append('userName', currentUser);
            formData.append('filter', JSON.stringify(filterStr));

            return fetch(url, {method: ParaName.POST, headers: header, body: formData})
                .then(res => res.json(),
                    error => {
                        console.log(error);
                        dispatch(queryDataFailed(queryID))
                    })
                .then(res => dispatch(queryDataSuccess(res['response'], queryID)))
        }
    }
    else{
        // 如果定义了，需要根据父查询的结果进行查询，根据当前设计，这需要放入父节点的过滤器
        return function (dispatch, getState) {
            const currentUser = getState().session.user.userName;
            dispatch(queryDataPost(queryID));
            let url = RouteName.B_GROUP_ANALYSIS_DATA + RouteName.B_QUERY_WITH_FATHER_QUERY_AND_NEW_CONDITION;
            let token = getState().session.authenticToken;
            let header = {'Authorization': token};

            // 把前端的filter转换为后端所需的形式:
            const filterStr = {'filter': []};
            for (const index in filter) {
                if (filter.hasOwnProperty(index)) {
                    filterStr['filter'].push(filter[index])
                }
            }
            let formData = new FormData();
            formData.append('queryID', queryID);
            formData.append('fatherQueryID', fatherQueryID);
            formData.append('userName', currentUser);
            formData.append('filter', JSON.stringify(filterStr));
            formData.append("newCondition", JSON.stringify({'filter': [newCondition]}));

            return fetch(url, {method: ParaName.POST, headers: header, body: formData})
                .then(res => res.json(),
                    error => {
                        console.log(error);
                        dispatch(queryDataFailed(queryID))
                    })
                .then(res => dispatch(queryDataSuccess(res['response'], queryID)))
        }
    }
}

export function deleteGroupAnalysisQuery(queryID) {
    return {type: DELETE_QUERY, queryID: queryID}
}