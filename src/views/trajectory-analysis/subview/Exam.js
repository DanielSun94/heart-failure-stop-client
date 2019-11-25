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
    let nameMap = {}
    let dataList = []
    
    let index = 0
    for(let item of data){
        const name = item.examName;
        const examTime = item.examTime;
        const para = item.examPara;
        const impression = item.impression;
        const description = item.description;

        const time = new Date(Date.parse(examTime));
        const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate()
        const month = time.getMonth()+1
        const timeStr = month + '月' + date + '日 ';
        
        nameMap[timeStr + ' '+name] = index
        dataList.push({'para': para, 'impression': impression, 'description': description})
        index += 1
    }
    return [dataList, nameMap]
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
    const [dataList, nameMap] = dataReconstruct(data)
    if(dataList && dataList.length > 0 && selectedExam === '')
        setSelectedExam(Object.keys(nameMap)[0])

    const table = ExamTable(nameMap, selectedExam, setSelectedExam)
    const content = ExamContent(nameMap, dataList, selectedExam)
    
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