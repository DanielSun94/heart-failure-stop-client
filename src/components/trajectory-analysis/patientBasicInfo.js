import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const patientBasicInfoPresentationalComponent = ({localPatientID, name, sex, ethnicGroup, birthday}) => {
    return (
    <div id= {NormalizedName.BASIC_INFO}>
        <h1> Patient Basic Info </h1>
        <h3>id: {localPatientID}</h3>
        <h3>姓名：{name}</h3>
        <h3>性别：{sex}</h3>
        <h3>民族：{ethnicGroup}</h3>
        <h3>生日：{birthday}</h3>
    </div>);
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardReducer.trajectoryAnalysisReducer.patientBasicInfoReducer.content
    return ({
        localPatientID: state.dashboardReducer.trajectoryAnalysisReducer.trajectoryAnalysisGeneralInfoReducer.localPatientID,
        name: contentDict[NormalizedName.PATIENT_NAME], 
        sex: contentDict[NormalizedName.SEX],
        ethnicGroup: contentDict[NormalizedName.ETHNIC_GROUP], 
        birthday: contentDict[NormalizedName.BIRTHDAY]})
    }
  
const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(patientBasicInfoPresentationalComponent)