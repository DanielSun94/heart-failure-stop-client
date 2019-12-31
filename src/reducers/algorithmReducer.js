import {
    ALGORITHM_LIST_RECEIVE_FAILED_POSTS,
    ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
    ALGORITHM_LIST_REQUEST_POSTS
} from "../actions/algorithmManagementAction"

const initialState = {
    algorithmList: []
};

const algorithmReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALGORITHM_LIST_REQUEST_POSTS: {
            return initialState
        }
        case ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS: {
            return {...state, algorithmList: action.content};
        }
        case ALGORITHM_LIST_RECEIVE_FAILED_POSTS: {
            return initialState;
        }
        default: {
            return {...state};
        }
    }
};

export default algorithmReducer;
