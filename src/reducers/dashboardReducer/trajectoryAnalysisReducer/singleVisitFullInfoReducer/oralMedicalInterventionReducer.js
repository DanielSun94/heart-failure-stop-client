import {
    ORAL_MEDICAL_INTERVENTION_REQUEST,
    ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS,
    ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS} 
    from '../../../../actions/dashboardAction/trajectoryAnalysisAction/oralMedicalInterventionAction';


const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: []
}

const oralMedicalInterventionReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case ORAL_MEDICAL_INTERVENTION_REQUEST: return (
            {...state, isDataFetching: true,
            isDataValid: false});
        case ORAL_MEDICAL_INTERVENTION_RECEIVE_SUCCESS_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: true,
            content: action.content}
            );
        case ORAL_MEDICAL_INTERVENTION_RECEIVE_FAILED_POSTS: return (
            {...state, isDataFetching: false,
            isDataValid: false}
            );
        default: return state;
    }
}

export default oralMedicalInterventionReducer;