import {
    TRAJECTORY_REQUEST,
    TRAJECTORY_RECEIVE_SUCCESS_POSTS,
    TRAJECTORY_RECEIVE_FAILED_POSTS,
    CHANGE_TARGET_VISIT,
    DETAILED_VISIT_INFO_REQUEST_POSTS,
    DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
    DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS} 
    from '../../actions/individualAnalysisAction/trajectoryAction';

const ERROR_NO_ERROR = 'errorNoError';
const ERROR_NO_DATA = 'errorNoData';
const ERROR_UNKNOWN = 'errorUnknown';

const initStateInfo = {
    currentVisit: {
        visitNo: "",
        hospitalCode: "",
        hospitalName: "",
        visitType: "",
        visitID: ""
    },
    currentVisitInfo:{
        age: "", 
        admissionTime: "",
        dischargeTime: "", 
        mainDiagnosis: "", 
        operation: "", 
        otherDiagnosis:"", 
        deathFlag: "",
        symptom: ""
    },
    visitList: [],
    errorType: ERROR_NO_ERROR,
};


const trajectoryReducer = (state=initStateInfo, action) => {
    // 由于先前确定trajectory 更新必须在也仅在unifiedPatientID更新成功后自动触发进行
    // 因此为保证数据一致性，一旦触发新的request，就把现有数据清空，宁可不显示数据，也不显示过期数据
    switch (action.type){
        case TRAJECTORY_REQUEST: return initStateInfo;
        case TRAJECTORY_RECEIVE_SUCCESS_POSTS: {
            let validVisitList = action.content;
            if ((!validVisitList) || validVisitList === 0)
                return {...state, errorType: ERROR_NO_DATA};
            
            return {
                ...state,
                visitList: validVisitList,
                errorType: ERROR_NO_ERROR,
            }
        }
        case TRAJECTORY_RECEIVE_FAILED_POSTS: return {
            ...state, errorType: ERROR_UNKNOWN
        };
        case CHANGE_TARGET_VISIT: return {
            ...state, 
            currentVisit: {
                hospitalCode: action.hospitalCode,
                hospitalName: action.hospitalName,
                visitType: action.visitType,
                visitID: action.visitID,
                visitNo: action.visitNo,
            },
        };
        case DETAILED_VISIT_INFO_REQUEST_POSTS: return state;
        case DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS: return (
            {...state,
                currentVisitInfo:{
                    age: action.content.age,
                    admissionTime: action.content.admissionTime, 
                    dischargeTime: action.content.dischargeTime, 
                    mainDiagnosis: action.content.mainDiagnosis, 
                    operation: action.content.operation, 
                    otherDiagnosis: action.content.otherDiagnosis, 
                    deathFlag: action.content.deathFlag, 
                    symptom: action.content.symptom, 
                }
            }
            );
        case DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS: return (
            {...state, errorType: ERROR_UNKNOWN, currentVisitInfo: initStateInfo.currentVisitInfo}
            );
        default: return state;
    }
};

export default trajectoryReducer;