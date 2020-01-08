import React, {useEffect, Fragment} from 'react';
import ParaName from '../../../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {vitalSignFetchPost, setNewVitalSign} from '../../../../../actions/individualAnalysisAction/vitalSignAction';
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
import useStyles from "./sharedLayout";


const dataReconstruct = (data) => {
    let nameList = [];
    let dataMap = {};

    for(let vitalSignName in data){
        if(!data.hasOwnProperty(vitalSignName))
            continue;

        nameList.push(vitalSignName);
        dataMap[vitalSignName] = {'resultList': [], 'unit': data[vitalSignName][0].unit, 'isNumber': true};
        for(let item of data[vitalSignName]){
            let result = parseFloat(item[ParaName.RESULT]);
            if(isNaN(result)){
                result = item[ParaName.RESULT];
                dataMap[vitalSignName]['isNumber'] = false
            }
            const recordTime = Date.parse(item[ParaName.RECORD_TIME]);
            dataMap[vitalSignName]['resultList'].push([result, recordTime])
        }
    }
    return [dataMap, nameList]
};

const VitalSign = ({queryID}) => {
    // 获取数据
    const dispatch = useDispatch();

    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};

    const selectedVitalSign = useSelector(state => state.individual.vitalSign[queryID].selectedVitalSign);

    const setSelectedVitalSign = (value)=> {dispatch(setNewVitalSign(value, queryID))};

    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(vitalSignFetchPost(visitIdentifier, queryID));
            setSelectedVitalSign("")
        }
    }, [queryID, visitIdentifier.visitNo, visitIdentifier.hospitalCode, visitIdentifier.hospitalName,
        visitIdentifier.visitType, visitIdentifier.visitID, visitIdentifier.unifiedPatientID]);

    const classes = useStyles();

    // 重新整理数据
    const data = useSelector(state => state.individual.vitalSign[queryID].content);
    const isDataFetching = useSelector(state => state.individual.vitalSign[queryID].isFetchingData);
    const [dataMap, nameList] = dataReconstruct(data);
    const vitalSignOnChange = (event, value)=>{
        setSelectedVitalSign(value)
    };

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
};

export default VitalSign;