import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';


const LabTestResultPresentationalComponent = (content) => {
    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let labTestName in content) {
            if (!content.hasOwnProperty(labTestName))
                continue;

            let test_no = 1;
            let labItem = [];
            for (let singleLabTest of content[labTestName]) {
                let labTestName = singleLabTest[NormalizedName.LAB_TEST_NAME];
                let result = singleLabTest[NormalizedName.RESULT];
                let unit = singleLabTest[NormalizedName.UNIT];
                let testTime = singleLabTest[NormalizedName.TEST_TIME];
                labItem.push({
                    id: labTestName + "_" + test_no,
                    content: "检验编号: " + test_no + ", 检查名称: " + labTestName + ", 结果: " + result + ", 单位: " + unit + ", 测试时间: " + testTime
                });
                test_no += 1;
            }
            divDict[labTestName] = labItem.map((item) => <h5 key={item.id}>{item.content}</h5>);
        }

        let outputDivList = [];
        for (let key in divDict) {
            if (!divDict.hasOwnProperty(key))
                continue;
            outputDivList.push({id: key, content: divDict[key]})
        }
        return(
            <div id={NormalizedName.LAB_TEST_RESULT}>
                <h1> Lab Test Result </h1>
                <ul>
                    {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
                </ul>
            </div>);
    }
    else{
        return (<div id={NormalizedName.LAB_TEST_RESULT}><h1>No Lab Test Result</h1></div>)
    }
}
const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.singleVisitFullInfo.labTestResult.content
    return contentDict;
}

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabTestResultPresentationalComponent)