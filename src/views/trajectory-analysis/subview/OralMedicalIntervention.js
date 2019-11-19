import React, {useEffect} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/oralMedicalInterventionAction'

const OralMedicalIntervention = () => {
    // 获取数据
    const dispatch = useDispatch()
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchPosts(visitIndentifier))          
        }
    }, [currentVisit]);

    const content = useSelector(state => state.dashboard.trajectoryAnalysis.singleVisitFullInfo.oralMedicalIntervention.content)

    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let medicationName in content) {
            if (!content.hasOwnProperty(medicationName))
                continue;

            let interventionNo = 1;
            let interventionItems = [];
            for (let singleIntervention of content[medicationName]) {
                let dosageWithUnit = singleIntervention[ParaName.DOSAGE_WITH_UNIT];
                let endTime = singleIntervention[ParaName.END_TIME];
                let interventionName = singleIntervention[ParaName.INTERVENTION_NAME];
                let startTime = singleIntervention[ParaName.START_TIME];
                let frequency = singleIntervention[ParaName.FREQUENCY];
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
            <div id={ParaName.ORAL_INTERVENTION}>
                <h1> Oral Intervention </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={ParaName.ORAL_INTERVENTION}><h1>No Oral Intervention Data</h1></div>)
    }
}

export default OralMedicalIntervention;