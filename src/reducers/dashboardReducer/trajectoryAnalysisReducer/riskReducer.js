import {
    RISK_RESET,
    RISK_REQUEST,
    REQUEST_RECEIVE_SUCCESS_POST,
    REQUEST_RECEIVE_FAILED_POST} 
    from '../../../actions/dashboardAction/trajectoryAnalysisAction/riskAction';

const initStateInfo = {
    content: {}
}

const riskReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case RISK_RESET: return initStateInfo;
        case RISK_REQUEST: return state;
        case REQUEST_RECEIVE_SUCCESS_POST: {
            const isCurrent = action.isCurrent
            const result= action.result.outputs[0][0]
            let content = {...state.content}
            let taskMap = {...state.content[action.predictTask]}
            if(isCurrent){
                taskMap['current'] = result
            }
            else{
                taskMap['previous'] = result
            }
            content[action.predictTask] = taskMap
            return (
            {...state, content: content}
            )
        };
        case REQUEST_RECEIVE_FAILED_POST: return state;
        default: return state;
    }
}

export default riskReducer;