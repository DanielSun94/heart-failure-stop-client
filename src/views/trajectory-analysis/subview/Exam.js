import React, {useEffect} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/examAction'

const Exam = () => {
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

    const content = useSelector(state => state.dashboard.trajectoryAnalysis.singleVisitFullInfo.exam.content)
    if (Object.keys(content).length > 0) {
        let outputDivList = [];

        let examNo = 1;
        for (let singleExamNo in content) {
            let examPara = content[singleExamNo][ParaName.EXAM_PARA];
            let examTime = content[singleExamNo][ParaName.EXAM_TIME];
            let examName = content[singleExamNo][ParaName.EXAM_NAME];
            let description = content[singleExamNo][ParaName.DESCRIPTION];
            let impression = content[singleExamNo][ParaName.IMPRESSION];
            outputDivList.push({
                id: examName + "_" + examNo, content: "检查编号: " + examNo + ", 检查名称: " + examName + 
                ", 检查时间: " + examTime + ", 检查参数: " + examPara
                + ", 描述: " + description + ", 印象:" + impression});
            examNo += 1;
        }
        return(
            <div id={ParaName.EXAM}>
                <h1> Exam </h1>
                {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
            </div>);
    }
    else{
        return (<div id={ParaName.EXAM}><h1>No Exam Data</h1></div>)
    }
}

export default Exam;