import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import BasicInfo from './patientBasicInfo';
import Trajectory from './trajectory';
import DetailedVisitInfo from './detailedVisitInfo';
import BriefVisitInfo from './briefVisitInfo';
import SingleVisitFullInfo from './singleVisitFullInfo';
import * from './trajectoryAnalysisModuleSelect'
import { connect } from 'react-redux';
import {showDetailToggle, fetchPosts} 
from '../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAnalysisModuleAction';

const trajectoryAnalysisModulePresentationalComponent = ({showDetail, handlePatientQuery, showDetailedInfo}) => {
    return (
        <div>
            <div>
                <h2>S113412483</h2> 
                <h2>S111203266</h2>
            </div>
            <div id={NormalizedName.PATIENT_VISIT_SET_PANEL}>
                <form action={handlePatientQuery}>
                    <input id={NormalizedName.INPUT_LOCAL_PATIENT_ID} type='text' value={'S113412483'}/>
                    <input id={NormalizedName.PATIENT_QUERY_BUTTON} type='submit'>{"查询"}</input>
                </form>
                <button id={NormalizedName.SHOW_DETAIL_BUTTON} onClick={showDetailedInfo}>{"细节"}</button>
                <SelectVisitDiv />
            </div>
            <div id={NormalizedName.DATA_PANEL}>
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
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {}
const mapDispatchToProps = (dispatch, ownProps) => ({
    handlePatientQuery: (value) => dispatch(fetchPosts(value, this.context)),
    showDetailedInfo: (event) => dispatch(showDetailToggle(event)),
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(trajectoryAnalysisModulePresentationalComponent)