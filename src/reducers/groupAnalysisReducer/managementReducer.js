import {
    INITIALIZE_MANAGEMENT_QUERY,
    CHANGE_FILTER,
    CHANGE_QUERY_TAB,
    MANAGEMENT_SET_STATE
} from "../../actions/groupAnalysisAction/managementAction";

const initStateInfo = {};
const managementReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case MANAGEMENT_SET_STATE: return managementSetState(action.newState);
        case INITIALIZE_MANAGEMENT_QUERY: return initialize(state, action.queryID);
        case CHANGE_FILTER: return changeFilter(state, action.newFilter, action.queryID);
        case CHANGE_QUERY_TAB: return changeQueryTab(state, action.selectedTab, action.queryID);
        default: return {...state};
    }
};

function managementSetState(newState){
    return {...newState}
}

function initialize(state, queryID){
    state[queryID] = {
        selectedTab: 'statistic',
        filter: []
    };
    return {...state}
}

function changeQueryTab(state, selectedTab, queryID){
    state[queryID] = {
        ...state[queryID],
        selectedTab: selectedTab,
    };
    return {...state}
}

function changeFilter(state, newFilter, queryID){
    state[queryID] = {
        ...state[queryID],
        filter: newFilter,
    };
    return {...state}
}

export default managementReducer;