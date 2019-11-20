import React, {useEffect} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/vitalSignAction'

const VitalSign = () => {
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

    const content = useSelector(state => state.dashboard.trajectoryAnalysis.vitalSign.content)

    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let vitalSignItem in content) {
            if (!content.hasOwnProperty(vitalSignItem))
                continue;

            let vitalSignRecordNo = 1;
            let vitalSignList = [];
            for (let singleVitalSign of content[vitalSignItem]) {
                let vitalSignName = singleVitalSign[ParaName.VITAL_SIGN_NAME];
                let result = singleVitalSign[ParaName.RESULT];
                let unit = singleVitalSign[ParaName.UNIT];
                let recordTime = singleVitalSign[ParaName.RECORD_TIME];
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
            <div id={ParaName.VITAL_SIGN}>
                <h1> Vital Sign </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={ParaName.VITAL_SIGN}><h1>No Vital Sign Data</h1></div>)
    }
}

export default VitalSign;