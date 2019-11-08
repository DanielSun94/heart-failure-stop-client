import React from 'react';
import NormalizedName from '../../utils/ParaName';
import { connect } from 'react-redux';


const vitalSignPresentationalComponent = (content) => {
    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let vitalSignItem in content) {
            if (!content.hasOwnProperty(vitalSignItem))
                continue;

            let vitalSignRecordNo = 1;
            let vitalSignList = [];
            for (let singleVitalSign of content[vitalSignItem]) {
                let vitalSignName = singleVitalSign[NormalizedName.VITAL_SIGN_NAME];
                let result = singleVitalSign[NormalizedName.RESULT];
                let unit = singleVitalSign[NormalizedName.UNIT];
                let recordTime = singleVitalSign[NormalizedName.RECORD_TIME];
                vitalSignList.push({
                    id: vitalSignName + "_" + vitalSignRecordNo,
                    content: "指标编号: " + vitalSignRecordNo + ", 指标名称: " + vitalSignName + ", 结果: " + result
                    + ", 单位: " + unit + ", 记录时间: " + recordTime});
                    vitalSignRecordNo += 1;
            }
            divDict[vitalSignItem] = vitalSignList.map((item) => <h5 key={item.id}>{item.content}</h5>);
        }
        let outputDivList = [];
        for (let key in divDict) {
            if (!divDict.hasOwnProperty(key))
                continue;
            outputDivList.push({id: key, content: divDict[key]});
        }
        return(
            <div id={NormalizedName.VITAL_SIGN}>
                <h1> Vital Sign </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={NormalizedName.VITAL_SIGN}><h1>No Vital Sign Data</h1></div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.singleVisitFullInfo.vitalSign.content
    return contentDict;
    }

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(vitalSignPresentationalComponent)