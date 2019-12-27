import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {
    reset,
    fetchSingleVisitLabTestResult,
    fetchFullTraceLabTestResult,
    fetchLabTestList
} from '../../../actions/dashboardAction/trajectoryAnalysisAction/labtestResultAction'
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
import {filter} from '../../../utils/queryUtilFunction'

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

const LabtestResult = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const singleVisitLabTestTrace = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.singleVisitLabTestTrace)
    const fullTraceLabTest = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.labTestFullTrace)
    const labTestList = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.labTestList)
    const isDataFetching = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.isDataFetching)

    const [selectedLabtest, setSelectedLabtest] = useState('')
    const [showSingleVisit, setShowSingleVisit] = useState(true)
    const [filterStr, setFilterStr] = useState("")

    // 载入LabTestList
    useEffect(()=>{
        dispatch(fetchLabTestList(dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit))
    }, [])

    // 切换visit时重置所有数据
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(reset())
            fetchLabTest(dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit)
        }
    }, [unifiedPatientID, currentVisit.hospitalCode, currentVisit.visitType, currentVisit.visitID]);

    // 当Labtest或者其余信息改变时获取相关信息
    useEffect(()=>{
        fetchLabTest(dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit)
    }, [unifiedPatientID, currentVisit.hospitalCode, currentVisit.visitType, currentVisit.visitID, 
        selectedLabtest, showSingleVisit]);

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
}

const fetchLabTest = (dispatch, currentVisit, unifiedPatientID, selectedLabtest, showSingleVisit)=>{
    const singleParam = {...currentVisit, unifiedPatientID: unifiedPatientID, itemName: selectedLabtest}
    if(showSingleVisit && selectedLabtest!==""){
        dispatch(fetchSingleVisitLabTestResult(singleParam))        
    }

    const traceParam = {unifiedPatientID: unifiedPatientID, itemName: selectedLabtest}
    if(!showSingleVisit && selectedLabtest!==""){
        dispatch(fetchFullTraceLabTestResult(traceParam))
    }
}

export default LabtestResult;