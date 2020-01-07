import {
    TRAJECTORY_DELETE,
    CHANGE_TARGET_VISIT,
    DETAILED_VISIT_INFO_RECEIVE_FAILED_RESULT,
    DETAILED_VISIT_INFO_RECEIVE_SUCCESS_RESULT,
    DETAILED_VISIT_INFO_REQUEST_POST,
    TRAJECTORY_INITIALIZE,
    TRAJECTORY_RECEIVE_FAILED_RESULT,
    TRAJECTORY_RECEIVE_SUCCESS_RESULT,
    TRAJECTORY_REQUEST_POST
} from '../../actions/individualAnalysisAction/trajectoryAction';

export const FAILED_ERROR = 'failedError';
export const FAILED_NO_DATA = 'failedNoData';
export const IS_FETCHING = 'isFetching';
export const SUCCESS = 'complete';
export const NO_ACTION = 'noAction';

const initStateInfo = {};


const trajectoryReducer = (state=initStateInfo, action) => {
    // 由于先前确定trajectory 更新必须在也仅在unifiedPatientID更新成功后自动触发进行
    // 因此为保证数据一致性，一旦触发新的request，就把现有数据清空，宁可不显示数据，也不显示过期数据
    switch (action.type){
        case TRAJECTORY_INITIALIZE: return trajectoryInitialize(state, action.queryID);

        case TRAJECTORY_DELETE: return trajectoryDelete(state, action.queryID);

        case TRAJECTORY_REQUEST_POST: return trajectoryRequestPost(state, action.queryID);

        case TRAJECTORY_RECEIVE_SUCCESS_RESULT: return trajectoryReceiveSuccessResult(state, action.content, action.queryID);

        case TRAJECTORY_RECEIVE_FAILED_RESULT: return trajectoryReceiveFailedResult(state, action.queryID);

        case CHANGE_TARGET_VISIT: return changeTargetVisit(state, action.hospitalCode,
            action.hospitalName,action.visitType,action.visitID,action.visitNo,action.queryID);

        case DETAILED_VISIT_INFO_REQUEST_POST: return detailedVisitInfoRequestPost(state, action.queryID);

        case DETAILED_VISIT_INFO_RECEIVE_SUCCESS_RESULT:
            return detailedVisitInfoReceiveSuccessResult(state, action.content, action.queryID);

        case DETAILED_VISIT_INFO_RECEIVE_FAILED_RESULT:
            return detailedVisitInfoReceiveFailedResult(state, action.queryID);
        default: return state;
    }
};

function detailedVisitInfoRequestPost(state, queryID){
    state[queryID] = {...state[queryID], currentVisitInfoDataStatus: IS_FETCHING};
    return {...state}
}

function detailedVisitInfoReceiveFailedResult(state, queryID){
    state[queryID] = {...state[queryID], currentVisitInfoDataStatus: FAILED_ERROR};
    return {...state}
}

function detailedVisitInfoReceiveSuccessResult(state, content, queryID){
    state[queryID] = {...state[queryID], currentVisitInfoDataStatus: SUCCESS, currentVisitInfo:
            {
                age: content.age,
                admissionTime: content.admissionTime,
                dischargeTime: content.dischargeTime,
                mainDiagnosis: content.mainDiagnosis,
                operation: content.operation,
                otherDiagnosis: content.otherDiagnosis,
                deathFlag: content.deathFlag,
                symptom: content.symptom,
                sex: content.sex,
                patientName: content.patientName,
                hospitalName: content.hospitalName
            }};
    return {...state}
}

function changeTargetVisit(state, hCode, hName, vType, vID, vNo, queryID) {
    state[queryID] = {...state[queryID],
        currentVisit: {
            visitNo: vNo,
            hospitalCode: hCode,
            hospitalName: hName,
            visitType: vType,
            visitID: vID
        }};
    return {...state}
}

function trajectoryRequestPost(state, queryID){
    state[queryID] = {...state[queryID], visitListDataStatus: IS_FETCHING};
    return {...state}
}

function trajectoryReceiveSuccessResult(state, visitList, queryID){
    if ((!visitList) || visitList === 0){
        state[queryID] = {...state[queryID], visitListDataStatus: FAILED_NO_DATA};
        return {...state}
    }

    state[queryID] = {...state[queryID], visitListDataStatus: SUCCESS, visitList:visitList};
    return {...state}
}

function trajectoryReceiveFailedResult(state, queryID){
    state[queryID] = {...state[queryID], visitListDataStatus: FAILED_ERROR};
    return {...state}
}

function trajectoryInitialize(state, queryID){
    state[queryID] = {
        currentVisit: {
            visitNo: "",
            hospitalCode: "",
            hospitalName: "",
            visitType: "",
            visitID: ""
        },
        currentVisitInfo: {
            age: "",
            admissionTime: "",
            dischargeTime: "",
            mainDiagnosis: "",
            operation: "",
            otherDiagnosis: "",
            deathFlag: "",
            symptom: "",
            sex: "",
            patientName: "",
            hospitalName: "",
        },
        visitList: [],
        currentVisitInfoDataStatus: NO_ACTION,
        visitListDataStatus: NO_ACTION,
    };
    return {...state}
}

function trajectoryDelete(state, queryID){
    delete state[queryID];
    return {...state};
}



export default trajectoryReducer;