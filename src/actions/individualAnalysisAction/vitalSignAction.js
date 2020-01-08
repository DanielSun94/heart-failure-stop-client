import fetch from 'cross-fetch';
import {queryParamsTrans} from '../../utils/queryUtilFunction';
import NormalizedName from '../../utils/ParaName';
import RouteName from '../../utils/RouteName';

export const VITAL_SIGN_SET_VITAL_SIGN = "VITAL_SIGN_SET_VITAL_SIGN";
export const VITAL_SIGN_DELETE = "VITAL_SIGN_DELETE";
export const VITAL_SIGN_INITIALIZE = "VITAL_SIGN_INITIALIZE";
export const VITAL_SIGN_REQUEST_POST = 'VITAL_SIGN_REQUEST_POST';
export const VITAL_SIGN_RECEIVE_SUCCESS_RESULT = 'VITAL_SIGN_RECEIVE_SUCCESS_RESULT';
export const VITAL_SIGN_RECEIVE_FAILED_RESULT = 'VITAL_SIGN_RECEIVE_FAILED_RESULT';

export function setNewVitalSign(selectedVitalSign, queryID) {
    return ({type: VITAL_SIGN_SET_VITAL_SIGN, queryID: queryID, selectedVitalSign: selectedVitalSign})
}

function vitalSignRequestPost(queryID) {
    return ({type: VITAL_SIGN_REQUEST_POST, queryID: queryID})
}

export function vitalSignInitialize(queryID) {
    return ({type: VITAL_SIGN_INITIALIZE, queryID: queryID})
}

export function vitalSignDelete(queryID) {
    return ({type: VITAL_SIGN_DELETE, queryID: queryID})
}


export function vitalSignReceiveSuccessResult(res, queryID) {
    return ({
        type: VITAL_SIGN_RECEIVE_SUCCESS_RESULT,
        content: res,
        queryID: queryID
    })
}


export function vitalSignReceiveFailedResult(queryID) {
    return {type: VITAL_SIGN_RECEIVE_FAILED_RESULT, queryID: queryID}
}

export function vitalSignFetchPost(params, queryID) {
    return function(dispatch, getState) {
        dispatch(vitalSignRequestPost(queryID));
        let url = RouteName.B_INDIVIDUAL_ANALYSIS_DATA_ROOT + RouteName.B_INDIVIDUAL_ANALYSIS_VITAL_SIGN + queryParamsTrans(params);
        let token = getState().session.authenticToken;
        let header = {'Authorization': token};
        return fetch(url, {method: NormalizedName.GET, headers: header})
            .then(res => res.json(),
                error => {console.log(error); dispatch(vitalSignReceiveFailedResult(queryID))})
            .then(res => dispatch(vitalSignReceiveSuccessResult(res, queryID)));
    }
}
