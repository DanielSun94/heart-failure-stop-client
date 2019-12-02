import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/orderAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Typography,
    Hidden,
    TextField,
    Divider,
    CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import OrderList from './Order/OrderList'
import OrderContent from './Order/Content'
import { makeStyles } from '@material-ui/styles';
import {pinyinSort, pinYinFilter} from '../../../utils/queryUtilFunction'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        height: 470,
    },
    bigViewContainer: {
      padding: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
    },
    smallViewContainer:{
        padding: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    list: {
        width: 230,
        flexBasis: 230,
        flexShrink: 0,
        '@media (min-width: 864px)': {
          borderRight: `1px solid ${theme.palette.divider}`
        }
    },
    smallViewHead:{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomColor: '#f8f8f8',
        borderBottomStyle: "solid"
    },
    loading:{
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    }
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
    const isDataFetching = useSelector(state => state.dashboard.trajectoryAnalysis.order.isDataFetching)

    const classes = useStyles()

    const [dataMap, orders] = dataReconstruct(data)
    pinyinSort(orders)
    const listClassName = classes.list
    
    const filterFunc = (options, {inputValue}) => pinYinFilter(options, inputValue)
    const orderOnChange = (event, value)=>{
        setSelectedOrder(value)
    }
    return  (
        <Fragment>
        <Hidden mdDown>
            <Card id={ParaName.ORDER_PANEL} className={classes.root}>
            <CardHeader title="病人医嘱"/>
            <Divider />
            {isDataFetching ?(
                <div className={classes.loading}>
                    <CircularProgress size={25} /> 
                    <Typography style={{marginTop: 10}} variant="h5">
                        载入中
                    </Typography>
                </div>
            ):(
                <CardContent className={classes.bigViewContainer}>
                <OrderList orders={orders} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} 
                listClassName={listClassName}/>
                <OrderContent dataMap={dataMap} selectedOrder={selectedOrder}/>
                </CardContent>
            )}

            </Card>
            </Hidden>
        <Hidden lgUp>
            <Card id={ParaName.ORDER_PANEL} className={classes.root}>
            {isDataFetching ?(
                <div className={classes.loading}>
                <CircularProgress size={25} /> 
                <Typography style={{marginTop: 10}} variant="h5">
                    载入中
                </Typography>
            </div>
            ):(
            <CardContent className={classes.smallViewContainer}>
                <div className={classes.smallViewHead}>
                <Typography
                    variant="h5"
                    style={{paddingLeft: 20}}
                >
                    医嘱
                </Typography>
                <Autocomplete
                    style={{ width: 250, paddingRight: 10}}
                    options={orders}
                    getOptionLabel={item => item}
                    renderInput={params => (
                        <TextField {...params} label="搜索" variant="outlined" fullWidth margin="normal" />
                    )}
                    onChange={orderOnChange}
                    filterOptions={filterFunc}
                />
                </div>
                <OrderContent dataMap={dataMap} selectedOrder={selectedOrder}/>
            </CardContent>
            )}
            </Card>
        </Hidden>
        </Fragment>
    );
}

export default Order;