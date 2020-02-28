import {
    INITIALIZE_MANAGEMENT_QUERY,
    CHANGE_FILTER,
    CHANGE_QUERY_TAB,
    MANAGEMENT_SET_STATE,
    QUERY_DATA_POST,
    DELETE_QUERY,
    QUERY_DATA_SUCCESS,
    QUERY_DATA_FAILED,
    GET_VISIT_INFO_POST,
    GET_VISIT_INFO_SUCCESS,
    GET_VISIT_INFO_FAILED,
    SET_PAGE,
    SEX_INFO_REQUEST_SUCCESS,
    SEX_INFO_REQUEST_FAILED,
    SEX_INFO_REQUEST_POST,
    AGE_INFO_REQUEST_POST,
    AGE_INFO_REQUEST_FAILED,
    AGE_INFO_REQUEST_SUCCESS,
    LAB_TEST_INFO_REQUEST_FAILED,
    LAB_TEST_INFO_REQUEST_SUCCESS,
    LAB_TEST_INFO_REQUEST_POST,
    MEDICINE_INFO_REQUEST_FAILED,
    MAIN_DIAGNOSIS_INFO_REQUEST_SUCCESS,
    MAIN_DIAGNOSIS_INFO_REQUEST_POST,
    OPERATION_INFO_REQUEST_FAILED,
    OPERATION_INFO_REQUEST_SUCCESS,
    OPERATION_INFO_REQUEST_POST,
    MEDICINE_INFO_REQUEST_SUCCESS,
    MEDICINE_INFO_REQUEST_POST,
    MAIN_DIAGNOSIS_INFO_REQUEST_FAILED,
    DIAGNOSIS_INFO_REQUEST_FAILED,
    DIAGNOSIS_INFO_REQUEST_SUCCESS,
    DIAGNOSIS_INFO_REQUEST_POST
} from "../../actions/groupAnalysisAction/managementAction";

const initStateInfo = {};
const managementReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case AGE_INFO_REQUEST_POST: return ageInfoRequestPost(state, action.queryID);
        case AGE_INFO_REQUEST_FAILED: return ageInfoRequestFailed(state, action.queryID);
        case AGE_INFO_REQUEST_SUCCESS: return ageInfoRequestSuccess(state, action.result, action.queryID);
        case LAB_TEST_INFO_REQUEST_FAILED: return labTestInfoRequestFailed(state, action.queryID);
        case LAB_TEST_INFO_REQUEST_SUCCESS: return labTestInfoRequestSuccess(state, action.result, action.queryID);
        case LAB_TEST_INFO_REQUEST_POST: return labTestInfoRequestPost(state, action.queryID);
        case MAIN_DIAGNOSIS_INFO_REQUEST_FAILED: return mainDiagnosisInfoRequestFailed(state, action.queryID);
        case MAIN_DIAGNOSIS_INFO_REQUEST_SUCCESS: return mainDiagnosisInfoRequestSuccess(state, action.result, action.queryID);
        case MAIN_DIAGNOSIS_INFO_REQUEST_POST: return mainDiagnosisInfoRequestPost(state, action.queryID);
        case OPERATION_INFO_REQUEST_FAILED: return operationInfoRequestFailed(state, action.queryID);
        case OPERATION_INFO_REQUEST_SUCCESS: return operationInfoRequestSuccess(state, action.result, action.queryID);
        case OPERATION_INFO_REQUEST_POST: return operationInfoRequestPost(state, action.queryID);
        case MEDICINE_INFO_REQUEST_SUCCESS: return medicineInfoRequestSuccess(state, action.result, action.queryID);
        case MEDICINE_INFO_REQUEST_POST: return medicineInfoRequestPost(state, action.queryID);
        case MEDICINE_INFO_REQUEST_FAILED: return medicineInfoRequestFailed(state, action.queryID);
        case DIAGNOSIS_INFO_REQUEST_FAILED: return diagnosisInfoRequestPost(state, action.queryID);
        case DIAGNOSIS_INFO_REQUEST_SUCCESS: return diagnosisInfoRequestSuccess(state, action.result, action.queryID);
        case DIAGNOSIS_INFO_REQUEST_POST: return diagnosisInfoRequestFailed(state, action.queryID);
        case DELETE_QUERY: return deleteQuery(state, action.queryID);
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

function deleteQuery(state, queryID) {
    delete state[queryID];
    return {...state}
}

function medicineInfoRequestFailed(state, queryID) {
    state[queryID].statistics.medicine={
        ...state[queryID].statistics.medicine,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function medicineInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.medicine={
        ...state[queryID].statistics.medicine,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function medicineInfoRequestPost(state, queryID) {
    state[queryID].statistics.medicine={
        ...state[queryID].statistics.medicine,
        isFetchingData: true,
    };
    return {...state}
}

function operationInfoRequestFailed(state, queryID) {
    state[queryID].statistics.operation={
        ...state[queryID].statistics.operation,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function operationInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.operation={
        ...state[queryID].statistics.operation,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function operationInfoRequestPost(state, queryID) {
    state[queryID].statistics.operation={
        ...state[queryID].statistics.operation,
        isFetchingData: true,
    };
    return {...state}
}

function labTestInfoRequestFailed(state, queryID) {
    state[queryID].statistics.labTest={
        ...state[queryID].statistics.labTest,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function labTestInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.labTest={
        ...state[queryID].statistics.labTest,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function labTestInfoRequestPost(state, queryID) {
    state[queryID].statistics.labTest={
        ...state[queryID].statistics.labTest,
        isFetchingData: true,
    };
    return {...state}
}

function mainDiagnosisInfoRequestFailed(state, queryID) {
    state[queryID].statistics.mainDiagnosis={
        ...state[queryID].statistics.mainDiagnosis,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function mainDiagnosisInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.mainDiagnosis={
        ...state[queryID].statistics.mainDiagnosis,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function mainDiagnosisInfoRequestPost(state, queryID) {
    state[queryID].statistics.mainDiagnosis={
        ...state[queryID].statistics.mainDiagnosis,
        isFetchingData: true,
    };
    return {...state}
}

function diagnosisInfoRequestFailed(state, queryID) {
    state[queryID].statistics.diagnosis={
        ...state[queryID].statistics.diagnosis,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function diagnosisInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.diagnosis={
        ...state[queryID].statistics.diagnosis,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function diagnosisInfoRequestPost(state, queryID) {
    state[queryID].statistics.diagnosis={
        ...state[queryID].statistics.diagnosis,
        isFetchingData: true,
    };
    return {...state}
}

function ageInfoRequestFailed(state, queryID) {
    state[queryID].statistics.age={
        ...state[queryID].statistics.age,
        isFetchingData: false,
        isDataValid: false,
    };
    return {...state}
}

function ageInfoRequestSuccess(state, result, queryID) {
    state[queryID].statistics.age={
        ...state[queryID].statistics.age,
        isFetchingData: false,
        isDataValid: true,
        content: result
    };
    return {...state}
}

function ageInfoRequestPost(state, queryID) {
    state[queryID].statistics.age={
        ...state[queryID].statistics.age,
        isFetchingData: true,
    };
    return {...state}
}

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
        isDataValid: false
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
        isDataValid: false,
    };
    return {...state}
}

function queryDataPost(state){
    return {...state}
}

function queryDataSuccess(state, result, queryID){
    state[queryID].isDataOutOfDate=false;
    state[queryID].visitCount = parseInt(result);
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
        filter: {
            // 每个filter应当是一个数组，第一位用于指明该filter是否继承于父查询
        },
        // isDataOutOfDate代表服务器端数据是否过时，当改变filter时自动为true，在新filter被解析完毕后置false
        isDataOutOfDate: false,
        visitCount: -1,
        statistics: {
            // 此处的三个标识符
            // isFetching代表是否在获取数据
            // isDataValid则服务器是否返回了正确的统计结果
            sex:{
                isFetchingData: false,
                isDataValid: false,
                male: 0,
                female: 0
            },
            mainDiagnosis:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
            diagnosis:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
            operation:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
            labTest:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
            medicine:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
            age:{
                isFetchingData: false,
                isDataValid: false,
                content: []
            },
        },
        visitInfo: {
            // 此处的三个标识符
            // isFetching代表是否在获取数据
            // isDataValid则代表当前服务器端是否准备完毕所需的查询结果
            page: 0,
            pageSize: 20,
            isFetchingData: false,
            isDataValid: false,
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
    state[queryID].isDataOutOfDate=true;
    state[queryID].statistics={
        sex:{
            ...state[queryID].statistics.sex,
            isFetchingData: false,
            isDataValid: false,
        },
        mainDiagnosis:{
            ...state[queryID].statistics.mainDiagnosis,
            isFetchingData: false,
            isDataValid: false,
        },
        diagnosis:{
            ...state[queryID].statistics.diagnosis,
            isFetchingData: false,
            isDataValid: false,
        },
        operation:{
            ...state[queryID].statistics.operation,
            isFetchingData: false,
            isDataValid: false,
        },
        labTest:{
            ...state[queryID].statistics.labTest,
            isFetchingData: false,
            isDataValid: false,
        },
        medicine:{
            ...state[queryID].statistics.medicine,
            isFetchingData: false,
            isDataValid: false,
        },
        age:{
            ...state[queryID].statistics.age,
            isFetchingData: false,
            isDataValid: false,
        },
    };
    state[queryID].visitInfo={
        ...state[queryID].visitInfo,
        isFetchingData: false,
        isDataValid: false,
        page: 0
    };
    return {...state}
}

export default managementReducer;