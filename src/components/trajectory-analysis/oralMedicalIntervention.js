import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';


const oralMedicalInterventionPresentationalComponent = (content) => {

    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let medicationName in content) {
            if (!content.hasOwnProperty(medicationName))
                continue;

            let interventionNo = 1;
            let interventionItems = [];
            for (let singleIntervention of content[medicationName]) {
                let dosageWithUnit = singleIntervention[NormalizedName.DOSAGE_WITH_UNIT];
                let endTime = singleIntervention[NormalizedName.END_TIME];
                let interventionName = singleIntervention[NormalizedName.INTERVENTION_NAME];
                let startTime = singleIntervention[NormalizedName.START_TIME];
                let frequency = singleIntervention[NormalizedName.FREQUENCY];
                interventionItems.push({id: medicationName + "_" + interventionNo,
                    content: "干预编号: " + interventionNo + ", 干预名称: " + interventionName +
                        ", 干预剂量: " + dosageWithUnit + ", 频率: " + frequency + ", 开始时间: " + startTime +
                        ", 结束时间:" + endTime});
                interventionNo += 1;
            }
            divDict[medicationName] = interventionItems.map((item) => <h5 key={item.id}>{item.content}</h5>);
        }

        let outputDivList = [];
        for (let key in divDict) {
            if (!divDict.hasOwnProperty(key))
                continue;
            outputDivList.push({id: key, content: divDict[key]});
        }
        return(
            <div id={NormalizedName.ORAL_INTERVENTION}>
                <h1> Oral Intervention </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={NormalizedName.ORAL_INTERVENTION}><h1>No Oral Intervention Data</h1></div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardReducer.trajectoryAnalysisReducer.singleVisitFullInfoReducer.oralInterventionReducer.content
    return ({content:contentDict})
    }

const mapDispatchToProps = (dispatch, ownProps) => ({})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(oralMedicalInterventionPresentationalComponent)