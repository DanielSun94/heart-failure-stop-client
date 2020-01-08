import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {orderFetchPost, setNewSelectedOrder} from '../../../../../actions/individualAnalysisAction/orderAction'
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
import {pinyinSort, pinYinFilter} from '../../../../../utils/queryUtilFunction'
import useStyles from "./sharedLayout";


// 目前全部使用表格进行描述
const dataReconstruct = (data) => {
    let nameList = [];
    let dataMap = {};

    for(let interventionName in data){
        if(!data.hasOwnProperty(interventionName))
            continue;

        nameList.push(interventionName);
        dataMap[interventionName] = [];

        for(let item of data[interventionName]){
            const startTime = item['startTime'];
            const endTime = item['endTime'];
            const dosage = item['dosage'];
            const unit = item['unit'];
            const frequency = item['frequency'];
            dataMap[interventionName].push({"startTime": startTime, "endTime": endTime,
                "dosage":dosage, "unit":unit,"frequency":frequency})
        }
    }
    return [dataMap, nameList]
};

const Order = ({queryID}) => {
    const classes = useStyles();

    // 获取数据
    const dispatch = useDispatch();

    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const data = useSelector(state => state.individual.order[queryID].content);
    const isDataFetching = useSelector(state => state.individual.order[queryID].isFetchingData);
    const selectedOrder = useSelector(state => state.individual.order[queryID].selectedOrder);
    const setSelectedOrder = (value) => {setNewSelectedOrder(value, queryID)};

    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(orderFetchPost(visitIdentifier, queryID))
        }
    },  [queryID, visitIdentifier.visitNo, visitIdentifier.hospitalCode, visitIdentifier.hospitalName,
        visitIdentifier.visitType, visitIdentifier.visitID, visitIdentifier.unifiedPatientID]);


    const [dataMap, orders] = dataReconstruct(data);
    pinyinSort(orders);
    const listClassName = classes.list;

    const filterFunc = (options, {inputValue}) => pinYinFilter(options, inputValue);
    const orderOnChange = (event, value)=>{
        setSelectedOrder(value)
    };
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
};

export default Order;