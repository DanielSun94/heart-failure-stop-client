import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {
    labTestFetchFullTraceLabTestResult,
    labTestFetchSingleVisitLabTestResult,
    fetchLabTestList,
    labTestFilterStr,
    labTestSetSelectedLabTest,
    labTestShowingSingle
} from '../../../../../actions/individualAnalysisAction/labtestResultAction'
import {
    Card,
    CardContent,
    Hidden,
    TextField,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LabtestList from './LabResult/LabtestList'
import Content from './LabResult/Content'
import { makeStyles } from '@material-ui/styles';
import {filter} from '../../../../../utils/queryUtilFunction'

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
        flexWrap: 'wrap',
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
    head:{
        minWidth: '100%',
        minHeight: 52,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        '@media (min-width: 864px)': {
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    },
    loading:{
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    },
    content: {
        display: 'flex',
        width: "100%",
        maxHeight: 418,
    },
    list: {
        minWidth: 230,
        width: "25%",
        '@media (min-width: 864px)': {
            borderRight: `1px solid ${theme.palette.divider}`
        }
    },
    barAndChart: {
        width: "75%"
    },
}));

const LabtestResult = ({queryID}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // 初始化，载入LabTestList
    useEffect(()=>{
        dispatch(fetchLabTestList(queryID))
    }, [queryID]);

    const labTestList = useSelector(state => state.individual.labtestResult.labTestNameList[queryID].labTestNameList);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const singleVisitLabTestTrace = useSelector(state => state.individual.labtestResult.singleVisitLabTestTrace[queryID].trace);
    const fullTraceLabTest = useSelector(state => state.individual.labtestResult.labTestFullTrace[queryID].trace);

    const fullTraceFetchingData = useSelector(state => state.individual.labtestResult.labTestFullTrace[queryID].isFetchingData);
    const singleTraceFetchingData = useSelector(state => state.individual.labtestResult.singleVisitLabTestTrace[queryID].isFetchingData);
    const isFetchingList = useSelector(state => state.individual.labtestResult.labTestNameList[queryID].isFetchingData);
    const isDataFetching = singleTraceFetchingData || fullTraceFetchingData || isFetchingList;

    const selectedLabtest = useSelector(state => state.individual.labtestResult.selectedLabtest[queryID]);
    const showSingleVisit = useSelector(state => state.individual.labtestResult.showSingleVisit[queryID]);
    const filterStr = useSelector(state => state.individual.labtestResult.filterStr[queryID]);
    const setSelectedLabtest = (value) =>dispatch(labTestSetSelectedLabTest(value, queryID));
    const setShowSingleVisit = (value) =>dispatch(labTestShowingSingle(value, queryID));
    const setFilterStr = (value) =>dispatch(labTestFilterStr(value, queryID));


    // 当Labtest或者其余信息改变时获取相关信息
    useEffect(()=>{
        fetchLabTest(dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit, queryID)
    }, [unifiedPatientID, currentVisit.hospitalCode, currentVisit.visitType, currentVisit.visitID,
        selectedLabtest, showSingleVisit, queryID]);

    return  (
        <Fragment>
            <Hidden mdDown>
                <Card id={ParaName.LABTEST_RESULT_PANEL} className={classes.root}>
                    <CardContent className={classes.bigViewContainer}>
                        <div className={classes.head}>
                            <Typography
                                variant="h5"
                                style={{paddingLeft: 20}}
                            >
                                实验室检查
                            </Typography>
                        </div>
                        {isDataFetching ?(
                            <div className={classes.loading}>
                                <CircularProgress size={25} />
                                <Typography style={{marginTop: 10}} variant="h5">
                                    载入中
                                </Typography>
                            </div>
                        ):(
                            <div className={classes.content}>
                                <div className={classes.list}>
                                    <LabtestList labtests={labTestList} selectedLabtest={selectedLabtest} setLabtest={setSelectedLabtest}
                                                 filterStr={filterStr} setFilterStr={setFilterStr}/>
                                </div>
                                <div className={classes.barAndChart}>
                                    <Content
                                        singleVisitLabTestTrace={singleVisitLabTestTrace}
                                        selectedLabtest={selectedLabtest}
                                        fullTraceLabTest={fullTraceLabTest}
                                        showSingleVisit={showSingleVisit}
                                        setShowSingleVisit={setShowSingleVisit} />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Hidden>
            <Hidden lgUp>
                <Card id={ParaName.LABTEST_RESULT_PANEL} className={classes.root}>
                    <CardContent className={classes.smallViewContainer}>
                        <div className={classes.head}>
                            <Typography
                                variant="h5"
                                style={{paddingLeft: 20}}
                            >
                                实验室检查
                            </Typography>
                            <Autocomplete
                                style={{ width: 250, paddingRight: 10}}
                                options={labTestList}
                                getOptionLabel={item => item[0]}
                                renderInput={params => (
                                    <TextField {...params} label="搜索" variant="outlined" fullWidth margin="normal" />
                                )}
                                filterOptions={(options, {inputValue}) => filter(options, inputValue, "", false)}
                                onChange={(event, value)=>{setSelectedLabtest(value[0])}}
                            />
                        </div>
                        {isDataFetching ?(
                            <div className={classes.loading}>
                                <CircularProgress size={25} />
                                <Typography style={{marginTop: 10}} variant="h5">载入中</Typography>
                            </div>
                        ):(
                            <Content
                                singleVisitLabTestTrace={singleVisitLabTestTrace}
                                selectedLabtest={selectedLabtest}
                                fullTraceLabTest={fullTraceLabTest}
                                showSingleVisit={showSingleVisit}
                                setShowSingleVisit={setShowSingleVisit} />
                        )}
                    </CardContent>
                </Card>
            </Hidden>
        </Fragment>
    );
};

const fetchLabTest = (dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit, queryID)=>{
    const singleParam = {...currentVisit, unifiedPatientID: unifiedPatientID, itemName: selectedLabtest};
    if(showSingleVisit && selectedLabtest!==""){
        dispatch(labTestFetchSingleVisitLabTestResult(singleParam, queryID))
    }

    const traceParam = {unifiedPatientID: unifiedPatientID, itemName: selectedLabtest};
    if(!showSingleVisit && selectedLabtest!==""){
        dispatch(labTestFetchFullTraceLabTestResult(traceParam, queryID))
    }
};

export default LabtestResult;