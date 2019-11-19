import React, {useEffect} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/labTestResultAction'

const LabtestResult = () => {
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

    const content = useSelector(state => state.dashboard.trajectoryAnalysis.singleVisitFullInfo.labTestResult.content)
    if (Object.keys(content).length > 0) {
        let divDict = {};
        for (let labTestName in content) {
            if (!content.hasOwnProperty(labTestName))
                continue;

            let test_no = 1;
            let labItem = [];
            for (let singleLabTest of content[labTestName]) {
                let labTestName = singleLabTest[ParaName.LAB_TEST_NAME];
                let result = singleLabTest[ParaName.RESULT];
                let unit = singleLabTest[ParaName.UNIT];
                let testTime = singleLabTest[ParaName.TEST_TIME];
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
            <div id={ParaName.LAB_TEST_RESULT}>
                <h1> Lab Test Result </h1>
                <ul>
                    {outputDivList.map((item) => <li key={item.id}>{item.content}</li>)}
                </ul>
            </div>);
    }
    else{
        return (<div id={ParaName.LAB_TEST_RESULT}><h1>No Lab Test Result</h1></div>)
    }
}

export default LabtestResult;