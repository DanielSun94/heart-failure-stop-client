import {
    TRAJECTORY_REQUEST,
    TRAJECTORY_RECEIVE_SUCCESS_POSTS,
    TRAJECTORY_RECEIVE_FAILED_POSTS,
    CHANGE_TARGET_VISIT} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAction';

const ERROR_NO_ERROR = 'errorNoError'
const ERROR_NO_DATA = 'errorNoData'
const ERROR_UNKOWN = 'errorUnkown'

const initStateInfo = {
    currentVisit: {
        hospitalCode: "",
        hospitalName: "",
        visitType: "",
        visitID: ""
    },
    visitList: [],
    errorType: ERROR_NO_ERROR,
}

const trajectoryReducer = (state=initStateInfo, action) => {
    // 由于先前确定trajectory 更新必须在也仅在unifiedPatientID更新成功后自动触发进行
    // 因此为保证数据一致性，一旦触发新的request，就把现有数据清空，宁可不显示数据，也不显示过期数据
    switch (action.type){
        case TRAJECTORY_REQUEST: return initStateInfo;
        case TRAJECTORY_RECEIVE_SUCCESS_POSTS: {
            let validVisitList = action.content
            if ((!validVisitList) || validVisitList === 0)
                return {...state, errorType: ERROR_NO_DATA}
            
            let visitType = validVisitList[0].visitType
            let hospitalName = validVisitList[0].hospitalName
            let visitID = validVisitList[0].visitID
            let hospitalCode = validVisitList[0].hospitalCode
            return {
                currentVisit: {
                    hospitalCode: hospitalCode,
                    hospitalName: hospitalName,
                    visitType: visitType,
                    visitID: visitID
                },
                visitList: validVisitList,
                errorType: ERROR_NO_ERROR,
            }
        };
        case TRAJECTORY_RECEIVE_FAILED_POSTS: return {
            ...state, errorType: ERROR_UNKOWN
        };
        case CHANGE_TARGET_VISIT: return {
            ...state, 
            currentVisit: {
                hospitalCode: action.hospitalCode,
                hospitalName: action.hospitalName,
                visitType: action.visitType,
                visitID: action.visitID,
            },
        };
        default: return state;
    }
}

export default trajectoryReducer;