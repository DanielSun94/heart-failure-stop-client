import {
    RISK_REQUEST,
    REQUEST_RECEIVE_SUCCESS_POST,
    REQUEST_RECEIVE_FAILED_POST} 
    from '../../actions/individualAnalysisAction/riskAction';

const initStateInfo = {};

const riskReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case RISK_REQUEST: {
            let taskMap = {"current": -1, "previous": -1, "fetchStatus": "isFetching"} 
            let newMap = {...state};
            newMap[action.predictionTask] = taskMap;
            return newMap
        }
        case REQUEST_RECEIVE_SUCCESS_POST: {
            const currentOrPrevious = action.currentOrPrevious;
            const result= action.result.outputs[0][0];
            let newMap = {...state};
            let taskMap = {...state[action.predictTask]};

            if(currentOrPrevious === "current"){
                taskMap['current'] = result
            }
            else if (currentOrPrevious === "previous"){
                taskMap['previous'] = result
            }

            if(taskMap['previous']!==-1 && taskMap['current']!== -1)
                taskMap["fetchStatus"] = "success";

            newMap[action.predictTask] = taskMap;

            return newMap
        }
        case REQUEST_RECEIVE_FAILED_POST: {
            let newMap = {...state};
            let taskMap = {...state[action.predictTask]};
            taskMap["fetchStatus"] = "failed";
            newMap[action.predictTask] = taskMap;
            return newMap
        }
        default: return state;
    }
};

export default riskReducer;