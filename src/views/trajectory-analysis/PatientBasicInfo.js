import React from 'react';
import NormalizedName from '../../utils/ParaName';
import { connect } from 'react-redux';

const patientBasicInfoPresentationalComponent = ({patientName, sex, ethnicGroup, birthday}) => {
    return (
    <div id= {NormalizedName.BASIC_INFO}>
        <h1> Patient Basic Info </h1>
        <h3>姓名：{patientName}</h3>
        <h3>性别：{sex}</h3>
        <h3>民族：{ethnicGroup}</h3>
        <h3>生日：{birthday}</h3>
    </div>);
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.patientBasicInfo.content;
    
    return ({
        patientName: contentDict[NormalizedName.PATIENT_NAME], 
        sex: contentDict[NormalizedName.SEX],
        ethnicGroup: contentDict[NormalizedName.ETHNIC_GROUP], 
        birthday: contentDict[NormalizedName.BIRTHDAY]})
    }
  
const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(patientBasicInfoPresentationalComponent)