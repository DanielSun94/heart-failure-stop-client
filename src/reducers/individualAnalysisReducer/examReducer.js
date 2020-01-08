import {
    EXAM_SELECTED_EXAM,
    EXAM_RECEIVE_FAILED_RESULT,
    EXAM_RECEIVE_SUCCESS_RESULT,
    EXAM_REQUEST_POST,
    EXAM_INITIALIZE,
    EXAM_DELETE
} from '../../actions/individualAnalysisAction/examAction';

const initStateInfo = {};
const examReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case EXAM_SELECTED_EXAM: return setNewSelectedExam(state, action.newSelectedExam, action.queryID);
        case EXAM_INITIALIZE: return examInitialize(state, action.queryID);
        case EXAM_DELETE: return examDelete(state, action.queryID);
        case EXAM_REQUEST_POST: return examRequestPost(state, action.queryID);
        case EXAM_RECEIVE_SUCCESS_RESULT: return examReceiveSuccessResult(state, action.content, action.queryID);
        case EXAM_RECEIVE_FAILED_RESULT: return examReceiveFailedResult(state, action.queryID);
        default: return {...state};
    }
};

function setNewSelectedExam(state, newSelectedExam, queryID){
    state[queryID] = {...state[queryID], selectedExam: newSelectedExam};
    return {...state}
}

function examInitialize(state, queryID){
    if(!state[queryID])
        state[queryID] = ({
            isFetchingData: false,
            isDataValid: false,
            content: []
        });

    return {...state}
}

function examDelete(state, queryID){
    delete state[queryID];
    return {...state}
}


function examRequestPost(state, queryID){
    state[queryID] = {...state[queryID], isFetchingData: true};
    return {...state}
}

function examReceiveSuccessResult(state, content, queryID){
    state[queryID] = ({
        isFetchingData: false,
        isDataValid: true,
        content: content,
        selectedExam: ""
    });
    return {...state}
}

function examReceiveFailedResult(state, queryID){
    state[queryID] = {...state[queryID], isFetchingData: false, isDataValid: false};
    return {...state}
}

export default examReducer;