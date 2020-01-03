import React, { Fragment, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ParaName from '../../../utils/ParaName';
import {
    requestUnifiedPatientID,
    changeLocalPatientID,
    requestPatientBasicInfo
} from '../../../actions/dashboardAction/trajectoryAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction';
import {
    ERROR_NO_ERROR,
    ERROR_NOT_FOUND,
    ERROR_UNKNOWN
}
from '../../../reducers/dashboardReducer/trajectoryAnalysisReducer/unifiedPatientIDAndPatientBasicInfoReducer';
import SearchBar from '../../../components/SearchBar';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    TableBody,
    TableCell,
    TableRow,
    Table,
    Divider
} from "@material-ui/core"

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 0,
        height: 350
    },
    content: {
      padding: 0
    },
  }));

const UnifiedPatientIDAndPatientBasicInfoPanel = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // query part
    const handlePatientQuery = (value) => dispatch(requestUnifiedPatientID(value));
    const handleLocalPatientIDChange = (event) => dispatch(changeLocalPatientID(event.target.value));
    const defaultLLocalPatientID = useSelector(
        state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.localPatientID);
    const errorType = useSelector(
        state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.errorType);
    let errorTag;
    switch(errorType){
        case ERROR_NOT_FOUND: errorTag= <h5> 该ID无法匹配到患者 </h5>; break;
        case ERROR_UNKNOWN: errorTag= <h5> 由于未知原因的匹配失败 </h5>; break;
    default: errorTag=<h5 dangerouslySetInnerHTML={{__html: '&nbsp;' }} />; break;
    }

    const query = (
        <Fragment>
            <SearchBar id = {ParaName.DIV_PATIENT_QUERY}
                onSearch={handlePatientQuery}
                onChange={handleLocalPatientIDChange} 
                defaultValue={defaultLLocalPatientID}/>
            {errorTag}
        </Fragment>
    );

    // patient basic info part
    // 监听unifiedPatientID，当unifiedPatientID变化时自动触发更新
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID);
    useEffect(()=>{
        if (unifiedPatientID!=="")
            dispatch(requestPatientBasicInfo({unifiedPatientID: unifiedPatientID}))
    }, [unifiedPatientID]);

    const patientBasicInfoDict = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.patientBasicInfo);
    const errorFlag = useSelector(
        state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.patientBasicInfo.errorType);
    const basicInfo = (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>姓名：</TableCell>
                    <TableCell>{errorFlag!==ERROR_NO_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.PATIENT_NAME]}</TableCell>
                </TableRow>
                <TableRow selected>
                    <TableCell>性别：</TableCell>
                    <TableCell>{errorFlag!==ERROR_NO_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.SEX]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>民族：</TableCell>
                    <TableCell>{errorFlag!==ERROR_NO_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.ETHNIC_GROUP]}</TableCell>
                </TableRow>
                <TableRow selected>
                    <TableCell>生日：</TableCell>
                    <TableCell>{errorFlag!==ERROR_NO_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.BIRTHDAY]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );

    return (
        <div className={classes.root}>
            {query}
            <Card id={ParaName.QUERY_AND_BASIC_INFO_PANEL} >
                <CardHeader title="病人基本信息"/>
                <Divider />
                <CardContent className={classes.content}>
                    {basicInfo}
                </CardContent>
            </Card>
        </div>
    );
};

export default UnifiedPatientIDAndPatientBasicInfoPanel;