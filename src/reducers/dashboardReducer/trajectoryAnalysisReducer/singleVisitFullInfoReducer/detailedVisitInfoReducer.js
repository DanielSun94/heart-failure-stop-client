import {
    DETAILED_VISIT_INFO_REQUEST_POSTS,
    DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
    DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS} 
    from '../../../../actions/dashboardAction/trajectoryAnalysisAction/detailedVisitInfoAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: {patientName: "", sex: "",  age: "", hospitalName: "", admissionTime: "",
    dischargeTime: "", mainDiagnosis: "", operation: "", otherDiagnosis:"", visitType: '', visitID: ''}
}
const detailedVisitInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case DETAILED_VISIT_INFO_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case DETAILED_VISIT_INFO_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case DETAILED_VISIT_INFO_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default detailedVisitInfoReducer;