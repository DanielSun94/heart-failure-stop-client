import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const DetailedVisitInfoPresentationalComponent = (
    {patientName, sex, age, hospitalName, visitType, visitID, admissionTime, dischargeTime, mainDiagnosis,
        operation, otherDiagnosis}) => {
    return (
    <div id={NormalizedName.VISIT_DETAILED_INFO}>
        <h1> Visit Detailed Info </h1>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.PATIENT_NAME}>姓名：{patientName}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.SEX}>性别：{sex}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.AGE}>年龄：{age}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.HOSPITAL_NAME}>医院名称：{hospitalName}</li>            
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.VISIT_TYPE}>入院类型：{visitType}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.VISIT_ID}>入院ID：{visitID}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.ADMISSION_TIME}>入院时间：{admissionTime}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.DISCHARGE_TIME}>出院时间：{dischargeTime}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.MAIN_DIAGNOSIS}>主要诊断：{mainDiagnosis}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.OPERATION}>手术：{operation}</li>
        <li key={NormalizedName.DETAILED_VISIT_INFO+"_"+NormalizedName.OTHER_DIAGNOSIS}>其它诊断：{otherDiagnosis}</li>
    </div>);
}
const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.singleVisitFullInfo.detailedVisitInfo.content
    return ({
        patientName: contentDict[NormalizedName.PATIENT_NAME], 
        sex: contentDict[NormalizedName.SEX], 
        age: contentDict[NormalizedName.AGE],
        hospitalName: contentDict[NormalizedName.HOSPITAL_NAME], 
        visitType: contentDict[NormalizedName.VISIT_TYPE], 
        visitID: contentDict[NormalizedName.VISIT_ID], 
        admissionTime: contentDict[NormalizedName.ADMISSION_TIME], 
        dischargeTime: contentDict[NormalizedName.DISCHARGE_TIME], 
        mainDiagnosis: contentDict[NormalizedName.MAIN_DIAGNOSIS], 
        operation: contentDict[NormalizedName.OPERATION], 
        otherDiagnosis: contentDict[NormalizedName.OTHER_DIAGNOSIS]})
    }
  
const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedVisitInfoPresentationalComponent)