import {
    BRIEF_VISIT_INFO_REQUEST_POSTS,
    BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS,
    BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/briefVisitInfoAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: {admissionTime: "", deathFlag: "", dischargeTime: "", hospitalName: "",
    mainDiagnosis: "", symptom: ""}
}
const briefVisitInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case BRIEF_VISIT_INFO_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case BRIEF_VISIT_INFO_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case BRIEF_VISIT_INFO_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default briefVisitInfoReducer;