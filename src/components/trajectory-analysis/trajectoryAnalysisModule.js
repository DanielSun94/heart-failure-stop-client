import React, {Suspense} from 'react';
import NormalizedName from '../../utils/ParaName';
import BasicInfo from './PatientBasicInfo';
import Trajectory from './Trajectory';
import DetailedVisitInfo from './DetailedVisitInfo';
import BriefVisitInfo from './BriefVisitInfo';
import SingleVisitFullInfo from './SingleVisitFullInfo';
import TrajectoryAnalysisModuleSelect from './TrajectoryAnalysisModuleSelect';
import { connect } from 'react-redux';
import {showDetailToggle, fetchPosts} 
from '../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAnalysisModuleAction';
import { LinearProgress } from '@material-ui/core';

const TrajectoryAnalysisModulePresentationalComponent = ({showDetail, handlePatientQuery, showDetailToggle}) => {
    return (
        <div>
            <div>
                <h2>S113412483</h2> 
                <h2>S111203266</h2>
            </div>
            <div id={NormalizedName.PATIENT_VISIT_SET_PANEL}>
                <form onSubmit={handlePatientQuery}>
                <input id={NormalizedName.INPUT_LOCAL_PATIENT_ID} type='text' defaultValue={'S113412483'}/>
                <input id={NormalizedName.PATIENT_QUERY_BUTTON} value={"查询"} type='submit'></input>
                </form>
                <button id={NormalizedName.SHOW_DETAIL_BUTTON} onClick={showDetailToggle}>{"细节"}</button>
                <TrajectoryAnalysisModuleSelect />
            </div>
            <div id={NormalizedName.DATA_PANEL}>
                <Suspense fallback={LinearProgress}>
                    <BasicInfo />
                    <Trajectory />
                    <BriefVisitInfo />
                    <DetailedVisitInfo />
                    <div>
                        {
                        //根据showDetail的值判断是否展示细节
                        showDetail &&
                        <SingleVisitFullInfo/>
                        }
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let detail = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.showDetail;
    return {showDetail: detail}
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    handlePatientQuery: (value) => dispatch(fetchPosts(value)),
    showDetailToggle: (event) => dispatch(showDetailToggle(event)),
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajectoryAnalysisModulePresentationalComponent)