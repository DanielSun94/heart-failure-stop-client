import {
    PATIENT_BASIC_INFO_REQUEST_POSTS,
    PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS,
    PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/patientBasicInfoAction';

const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: {
    patientName: "",
    sex: "",
    birthday: "",
    ethnicGroup: ""}
}

const patientBasicInfoReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case PATIENT_BASIC_INFO_REQUEST_POSTS: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case PATIENT_BASIC_INFO_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case PATIENT_BASIC_INFO_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default patientBasicInfoReducer;