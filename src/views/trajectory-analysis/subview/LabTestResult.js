import React, {useEffect, useState} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/labTestResultAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider
} from '@material-ui/core';
import LabtestResultTable from './LabResult/Table'
import LabtestResultContent from './LabResult/Content'
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
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  }));

const LabtestResult = () => {
    // 获取数据
    const dispatch = useDispatch()
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    const [selectedLabtest, setSelectedLabtest] = useState('')

    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchPosts(visitIndentifier))        
            setSelectedLabtest("")  
        }
    }, [currentVisit]);

    const classes = useStyles()


    // 重新整理数据
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.labTestResult.content)
    const [dataMap, nameList] = dataReconstruct(data)
    if(nameList && nameList.length > 0 && selectedLabtest === '')
        setSelectedLabtest(nameList[0])

    const table = LabtestResultTable(nameList, selectedLabtest,setSelectedLabtest)
    const content = LabtestResultContent(dataMap, selectedLabtest)
    
    return  (
        <Card id={ParaName.LABTEST_RESULT_PANEL} className={classes.root}>
        <CardHeader title="实验室检查"/>
        <Divider />
        <CardContent className={classes.content}>
            {table}
            {content}
        </CardContent>
        </Card>
    );
}


export default LabtestResult;