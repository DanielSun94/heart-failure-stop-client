import {fetchUnifiedPatientID} from "../individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction";
import {changeTargetVisit, getValidVisitAndSetDefaultVisit} from "../individualAnalysisAction/trajectoryAction";

export function fetchAndSetIndividualAnalysisInfo(localPatientID, hospitalCode, visitType, visitID, queryID) {
    return (dispatch, getState) => {
        return dispatch(fetchUnifiedPatientID(localPatientID, hospitalCode, queryID))
            .then(() => {
                const unifiedPatientID = getState().individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID;
                const params={unifiedPatientID: unifiedPatientID};
                return dispatch(getValidVisitAndSetDefaultVisit(params, queryID))
            })
            .then(()=>{
                const visitList = getState().individual.trajectory[queryID].visitList;
                for(const item of visitList){
                    const currentVisitID = item['visitID'];
                    const currentVisitType = item['visitType'];
                    const currentHospitalCode = item['hospitalCode'];
                    if(hospitalCode===currentHospitalCode&&visitID===currentVisitID&&visitType===currentVisitType){
                        dispatch(changeTargetVisit(item, queryID))
                    }
                }
            })
    }
}