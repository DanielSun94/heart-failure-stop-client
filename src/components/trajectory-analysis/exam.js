import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const LabTestResultPresentationalComponent = (content) => {
    if (content.length > 0) {
        let outputDivList = [];

        let examNo = 1;
        for (let singleExam of content) {
            let examPara = singleExam[NormalizedName.EXAM_PARA];
            let examTime = singleExam[NormalizedName.EXAM_TIME];
            let examName = singleExam[NormalizedName.EXAM_NAME];
            let description = singleExam[NormalizedName.DESCRIPTION];
            let impression = singleExam[NormalizedName.IMPRESSION];
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
    let contentDict = state.dashboardReducer.trajectoryAnalysisReducer.singleVisitFullInfoReducer.examReducer.content
    return ({content:contentDict})
    }

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabTestResultPresentationalComponent)