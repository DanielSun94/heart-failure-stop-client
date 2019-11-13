import React from 'react';
import NormalizedName from '../../utils/ParaName';
import { connect } from 'react-redux';

const BriefVisitInfoPresentationalComponent = ({hospitalName, admissionTime, dischargeTime, mainDiagnosis, deathFlag, symptom}) => {
        return (<div id={NormalizedName.VISIT_BRIEF_INFO}>
            <h1> Patient Visit Brief Info </h1>
            <h4>入院时间： {admissionTime}</h4>
            <h4>是否死亡： {deathFlag}</h4>
            <h4>出院时间：{dischargeTime}</h4>
            <h4>医院名称：{hospitalName}</h4>
            <h4>主诊断：{mainDiagnosis}</h4>
            <h4>主要症状：{symptom}</h4>
        </div>);
    
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboard.trajectoryAnalysis.briefVisitInfo.content
    return ({
        hospitalName: contentDict[NormalizedName.HOSPITAL_NAME], 
        deathFlag: contentDict[NormalizedName.DEATH_FLAG], 
        admissionTime: contentDict[NormalizedName.ADMISSION_TIME], 
        dischargeTime: contentDict[NormalizedName.DISCHARGE_TIME], 
        mainDiagnosis: contentDict[NormalizedName.MAIN_DIAGNOSIS],
        symptom: contentDict[NormalizedName.SYMPTOM],
     })
    }
  
const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BriefVisitInfoPresentationalComponent);