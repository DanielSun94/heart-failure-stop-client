import React, {useEffect, useState} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/examAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider
} from '@material-ui/core';
import ExamTable from './Exam/Table'
import ExamContent from './Exam/Content'
import { makeStyles } from '@material-ui/styles';

const dataReconstruct = (data) => {
    let nameList = []
    let dataMap = {}
    
    for(let labTestName in data){
        nameList.push(labTestName);
        dataMap[labTestName] = {'resultList': [], 'unit': data[labTestName][0].unit, 'isNumber': true}
        for(let labTest of data[labTestName]){
            let result = parseFloat(labTest['result'])
            if(isNaN(result)){
                result = labTest['result']
                dataMap[labTestName]['isNumber'] = false
            }
            const testTime = Date.parse(labTest['testTime'])
            dataMap[labTestName]['resultList'].push([result, testTime])
        }
    }
    return [dataMap, nameList]
}

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 0,
        height: 470,
    },
    content: {
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  }));

const Exam = () => {
    // 获取数据
    const dispatch = useDispatch()
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    const [selectedExam, setSelectedExam] = useState('')
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchPosts(visitIndentifier))          
            setSelectedExam("")  
        }
    }, [currentVisit]);

    const classes = useStyles()


    // 重新整理数据
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.exam.content)
    const [dataMap, nameList] = dataReconstruct(data)
    if(nameList && nameList.length > 0 && selectedExam === '')
        setSelectedExam(nameList[0])

    const table = ExamTable(nameList, selectedExam, setSelectedExam)
    const content = ExamContent(dataMap, selectedExam)
    
    return  (
        <Card id={ParaName.EXAM_PANEL} className={classes.root}>
        <CardHeader title="病人检查结果"/>
        <Divider />
        <CardContent className={classes.content}>
            {table}
            {content}
        </CardContent>
        </Card>
    );
}

export default Exam;