import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const LabTestResultPresentationalComponent = (content) => {
    if (Object.keys(content).length > 0) {
        let outputDivList = [];

        let examNo = 1;
        for (let singleExamNo in content) {
            let examPara = content[singleExamNo][NormalizedName.EXAM_PARA];
            let examTime = content[singleExamNo][NormalizedName.EXAM_TIME];
            let examName = content[singleExamNo][NormalizedName.EXAM_NAME];
            let description = content[singleExamNo][NormalizedName.DESCRIPTION];
            let impression = content[singleExamNo][NormalizedName.IMPRESSION];
            outputDivList.push({
                id: examName + "_" + examNo, content: "检查编号: " + examNo + ", 检查名称: " + examName + 
                ", 检查时间: " + examTime + ", 检查参数: " + examPara
                + ", 描述: " + description + ", 印象:" + impression});
            examNo += 1;
        }
        return(
            <div id={NormalizedName.EXAM}>
                <h1> Exam </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={NormalizedName.EXAM}><h1>No Exam Data</h1></div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.singleVisitFullInfo.exam.content
    return contentDict
    }

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabTestResultPresentationalComponent)