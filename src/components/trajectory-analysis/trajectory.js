import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const trajectoryPresentationalComponent = (content) => {
    if (content.length>0) {
        let divList = [];

        for (let singleVisitInfo of this.state.trajectoryInfo) {
            let hospitalCode = singleVisitInfo[NormalizedName.HOSPITAL_CODE];
            let admissionTime = singleVisitInfo[NormalizedName.HOSPITAL_CODE];
            let visitType = singleVisitInfo[NormalizedName.VISIT_TYPE];
            let visitID = singleVisitInfo[NormalizedName.VISIT_ID];
            divList.push(
                {id: visitType+"_"+visitID,
                content: <h4> 医院编码： {hospitalCode}, 入院时间： {admissionTime}, 入院类型：{visitType}, 入院编号：{visitID}</h4>})
        }
        return (
            <div id={NormalizedName.TRAJECTORY}>
                <h1> Trajectory </h1>
                {divList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>
        )}
    else
        return <div id={NormalizedName.TRAJECTORY} ><h1>No Trajectory Data</h1></div>;
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.singleVisitFullInfo.oralMedicalIntervention.content
    return ({content:contentDict})
    }

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(trajectoryPresentationalComponent)