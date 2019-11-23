import React, {useEffect, useState} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/orderAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider
} from '@material-ui/core';
import OrderTable from './Order/Table'
import OrderContent from './Order/Content'
import { makeStyles } from '@material-ui/styles';

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

// 目前全部使用表格进行描述
const dataReconstruct = (data) => {
    let nameList = []
    let dataMap = {}

    for(let interventionName in data){
        nameList.push(interventionName);
        dataMap[interventionName] = []

        for(let item of data[interventionName]){
            const startTime = item['startTime']
            const endTime = item['endTime']
            const dosage = item['dosage']
            const unit = item['unit']
            const frequency = item['frequency']
            dataMap[interventionName].push({"startTime": startTime, "endTime": endTime, 
            "dosage":dosage, "unit":unit,"frequency":frequency})
        }
    }
    return [dataMap, nameList]
}

// 再平台的第一个版本中，labtest, order, vital sign和exam四个panel本质上用的是一套模板
// 之所以没有把这套模板抽象出来从而提高代码复用率，是以防未来对四个panel的显示策略提出不同的展示要求
const Order = () => {
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

    const [selectedOrder, setSelectedOrder] = useState('')
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.order.content)
    const classes = useStyles()


    const [dataMap, nameList] = dataReconstruct(data)
    if(nameList && nameList.length > 0 && selectedOrder === '')
    setSelectedOrder(nameList[0])

    const table = OrderTable(nameList, selectedOrder,setSelectedOrder)
    const content = OrderContent(dataMap, selectedOrder)
    
    return  (
        <Card id={ParaName.ORDER_PANEL} className={classes.root}>
        <CardHeader title="病人医嘱"/>
        <Divider />
        <CardContent className={classes.content}>
            {table}
            {content}
        </CardContent>
        </Card>
    );
}

export default Order;