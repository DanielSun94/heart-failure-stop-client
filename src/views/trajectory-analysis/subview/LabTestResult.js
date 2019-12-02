import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/labtestResultAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider,
    Hidden,
    TextField,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LabtestList from './LabResult/LabtestList'
import Content from './LabResult/Content'
import { makeStyles } from '@material-ui/styles';
import {pinyinSort, pinYinFilter} from '../../../utils/queryUtilFunction'

const dataReconstruct = (data) => {
    let nameList = []
    let dataMap = {}
    
    for(let labtestName in data){
        nameList.push(labtestName);
        dataMap[labtestName] = {'resultList': [], 'unit': data[labtestName][0].unit, 'isNumber': true}
        for(let labtest of data[labtestName]){
            let result = parseFloat(labtest['result'])
            if(isNaN(result)){
                result = labtest['result']
                dataMap[labtestName]['isNumber'] = false
            }
            const testTime = Date.parse(labtest['testTime'])
            dataMap[labtestName]['resultList'].push([result, testTime])
        }
    }
    return [dataMap, nameList]
}

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
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.content)
    const isDataFetching = useSelector(state => state.dashboard.trajectoryAnalysis.labtestResult.isDataFetching)
    const [dataMap, nameList] = dataReconstruct(data)
    pinyinSort(nameList)
    
    const listClassName = classes.list

    const filterFunc = (options, {inputValue}) => pinYinFilter(options, inputValue)
    const labTestOnChange = (event, value)=>{
        setSelectedLabtest(value)
    }
    return  (
        <Fragment>
        <Hidden mdDown>
            <Card id={ParaName.LABTEST_RESULT_PANEL} className={classes.root}>
            <CardHeader title="实验室检查"/>
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
                <LabtestList labtests={nameList} selectedLabtest={selectedLabtest} setLabtest={setSelectedLabtest} 
                listClassName={listClassName}/>
                <Content dataMap={dataMap} selectedLabtest={selectedLabtest} />
                </CardContent>
            )}

            </Card>
        </Hidden>
        <Hidden lgUp>
            <Card id={ParaName.LABTEST_RESULT_PANEL} className={classes.root}>
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
                    实验室检查
                </Typography>
                <Autocomplete
                    style={{ width: 250, paddingRight: 10}}
                    options={nameList}
                    getOptionLabel={item => item}
                    renderInput={params => (
                        <TextField {...params} label="搜索" variant="outlined" fullWidth margin="normal" />
                    )}
                    filterOptions={filterFunc}
                    onChange={labTestOnChange}
                />
                </div>
                <Content dataMap={dataMap} selectedLabtest={selectedLabtest} />
            </CardContent>
            )}

            </Card>
        </Hidden>
        </Fragment>
    );
}


export default LabtestResult;