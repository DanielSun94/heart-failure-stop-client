import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../../actions/individualAnalysisAction/vitalSignAction'
import VitalSignList from './VitalSign/VitalSignList'
import Content from './VitalSign/Content'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider,
    Hidden,
    TextField,
    Typography,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';

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
    const isDataFetching = useSelector(state => state.dashboard.trajectoryAnalysis.vitalSign.isDataFetching)
    const [dataMap, nameList] = dataReconstruct(data)
    const vitalSignOnChange = (event, value)=>{
        setSelectedVitalSign(value)
    }

    return  (
        <Fragment>
        <Hidden mdDown>
            <Card id={ParaName.VITAL_SIGN_PANEL} className={classes.root}>
            <CardHeader title="病人主要生理指标"/>
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
                <VitalSignList vitalSigns={nameList} selectedVitalSign={selectedVitalSign} setSelectedVitalSign={setSelectedVitalSign} 
                listClassName={classes.list}/>
                <Content dataMap={dataMap} selectedVitalSign={selectedVitalSign} />
                </CardContent>
            )}

            </Card>
        </Hidden>
        <Hidden lgUp>
        <Card id={ParaName.VITAL_SIGN_PANEL} className={classes.root}>
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
                    主要生理指标
                </Typography>
                <Autocomplete
                    style={{ width: 250, paddingRight: 10}}
                    options={nameList}
                    getOptionLabel={item => item}
                    renderInput={params => (
                        <TextField {...params} label="搜索" variant="outlined" fullWidth margin="normal" />
                    )}
                    onChange={vitalSignOnChange}
                />
                </div>
                <Content dataMap={dataMap} selectedVitalSign={selectedVitalSign} />
            </CardContent>
            )}
            
            </Card>
        </Hidden>
        </Fragment>
    );
}

export default VitalSign;