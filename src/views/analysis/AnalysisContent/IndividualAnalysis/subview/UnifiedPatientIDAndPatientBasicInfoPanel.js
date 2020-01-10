import React, { Fragment, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ParaName from '../../../../../utils/ParaName';
import {
    fetchPatientBasicInfo,
    fetchUnifiedPatientID,
    changeLocalPatientID,
} from '../../../../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction';
import {
    FAILED_ERROR,
    FAILED_NOT_FOUND,

}
    from '../../../../../reducers/individualAnalysisReducer/unifiedPatientIDAndPatientBasicInfoReducer';
import SearchBar from '../../../../../components/SearchBar';
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

const UnifiedPatientIDAndPatientBasicInfoPanel = ({queryID}) => {
    const dispatch = useDispatch();

    const classes = useStyles();

    // 由于目前只有301的数据，所以将HospitalCode锁定为1，以后有其它医院的数据了，再添加医院code选择功能
    const hospitalCode = '1';

    // query part
    const handlePatientQuery = (event) => {
        dispatch(fetchUnifiedPatientID(event, hospitalCode, queryID))
    };
    const handleLocalPatientIDChange = (event) => dispatch(changeLocalPatientID(event.target.value, queryID));
    const localPatientID = useSelector(
        state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].localPatientID);
    const errorType = useSelector(
        state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].dataStatus);
    let errorTag;
    switch(errorType){
        case FAILED_NOT_FOUND: errorTag= <h5> 该ID无法匹配到患者 </h5>; break;
        case FAILED_ERROR: errorTag= <h5> 由于未知原因的匹配失败 </h5>; break;
        default: errorTag=<h5 dangerouslySetInnerHTML={{__html: '&nbsp;' }} />; break;
    }

    const query = (
        <Fragment>
            <SearchBar id = {ParaName.DIV_PATIENT_QUERY}
                       queryID={queryID}
                       onSearch={handlePatientQuery}
                       onChange={handleLocalPatientIDChange}
                       value={localPatientID}/>
            {errorTag}
        </Fragment>
    );

    // patient basic info part
    // 监听unifiedPatientID，当unifiedPatientID变化时自动触发更新
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    useEffect(()=>{
        if (unifiedPatientID!=="")
            dispatch(fetchPatientBasicInfo({unifiedPatientID: unifiedPatientID}, queryID))
    }, [queryID, unifiedPatientID]);

    const patientBasicInfoDict = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].patientBasicInfo);
    const errorFlag = useSelector(
        state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].patientBasicInfo.dataStatus);
    const basicInfo = (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>姓名：</TableCell>
                    <TableCell>{errorFlag===FAILED_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.PATIENT_NAME]}</TableCell>
                </TableRow>
                <TableRow selected>
                    <TableCell>性别：</TableCell>
                    <TableCell>{errorFlag===FAILED_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.SEX]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>民族：</TableCell>
                    <TableCell>{errorFlag===FAILED_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.ETHNIC_GROUP]}</TableCell>
                </TableRow>
                <TableRow selected>
                    <TableCell>生日：</TableCell>
                    <TableCell>{errorFlag===FAILED_ERROR ? "发生错误" : patientBasicInfoDict[ParaName.BIRTHDAY]}</TableCell>
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