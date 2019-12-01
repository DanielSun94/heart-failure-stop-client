import React, {useEffect, useState} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/vitalSignAction'
import VitalSignTable from './VitalSign/Table'
import VitalSignContent from './VitalSign/Content'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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


const dataReconstruct = (data) => {
    let nameList = []
    let dataMap = {}
    
    for(let vitalSignName in data){
        nameList.push(vitalSignName);
        dataMap[vitalSignName] = {'resultList': [], 'unit': data[vitalSignName][0].unit, 'isNumber': true}
        for(let item of data[vitalSignName]){
            let result = parseFloat(item[ParaName.RESULT])
            if(isNaN(result)){
                result = item[ParaName.RESULT]
                dataMap[vitalSignName]['isNumber'] = false
            }
            const recordTime = Date.parse(item[ParaName.RECORD_TIME])
            dataMap[vitalSignName]['resultList'].push([result, recordTime])
        }
    }
    return [dataMap, nameList]
}

const VitalSign = () => {
    // 获取数据
    const dispatch = useDispatch()
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    const [selectedVitalSign, setSelectedVitalSign] = useState('')

    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchPosts(visitIndentifier))
            setSelectedVitalSign("")      
        }
    }, [currentVisit]);

    const classes = useStyles()

    // 重新整理数据
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.vitalSign.content)
    const [dataMap, nameList] = dataReconstruct(data)
    if(nameList && nameList.length > 0 && selectedVitalSign === '')
    setSelectedVitalSign(nameList[0])

    const table = VitalSignTable(nameList, selectedVitalSign,setSelectedVitalSign)
    const content = VitalSignContent(dataMap, selectedVitalSign)
        
    return  (
        <Card id={ParaName.VITAL_SIGN_PANEL} className={classes.root}>
        <CardHeader title="病人关键生理指标"/>
        <Divider />
        <CardContent className={classes.content}>
            {table}
            {content}
        </CardContent>
        </Card>
    );
}

export default VitalSign;