import NormalizedName from '../utils/ParaName';
import RouteName from '../utils/RouteName';

export const ALGORITHM_LIST_REQUEST_POSTS = 'ALGORITHM_LIST_REQUEST_POSTS';
export const ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS = 'ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS';
export const ALGORITHM_LIST_RECEIVE_FAILED_POSTS = 'ALGORITHM_LIST_RECEIVE_FAILED_POSTS';

export function requestPosts() {
    return ({type: ALGORITHM_LIST_REQUEST_POSTS})
}


export function receiveSuccessResult(res) {
    return ({
        type: ALGORITHM_LIST_RECEIVE_SUCCESS_POSTS,
        content: res
    })
}

export function receiveFailedResult() {
    return {type: ALGORITHM_LIST_RECEIVE_FAILED_POSTS,}
}

export function fetchPosts() {
    return function(dispatch, getState) {
        dispatch(requestPosts());
        let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.FETCH_MODEL_LIST;
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json())
            .then(
                res => {
                    if(res.status && !(res.status === '200' || res.status === 200)){
                        dispatch(receiveFailedResult());
                        console.log('Unknown: Error, get algorithm info failed')
                    }
                    else{
                        dispatch(receiveSuccessResult(res));
                        console.log('get algorithm info succeed')
                    }
                }
            );
    }
}
