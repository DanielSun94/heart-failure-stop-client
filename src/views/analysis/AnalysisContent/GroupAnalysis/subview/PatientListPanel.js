import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DescriptionIcon from '@material-ui/icons/Description';
import {
    createNewQuery,
    editQueryName,
    setSelectedQuery
} from "../../../../../actions/metaInfoAction";
import ParaName from "../../../../../utils/ParaName";
import {useHistory} from 'react-router-dom';
import {fetchAndSetIndividualAnalysisInfo} from "../../../../../actions/groupAnalysisAction/contentAction";
import {unifiedIdAndBasicInfoInitialize} from "../../../../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction";
import {trajectoryInitialize} from "../../../../../actions/individualAnalysisAction/trajectoryAction";
import {orderInitialize} from "../../../../../actions/individualAnalysisAction/orderAction";
import {labTestInitialize} from "../../../../../actions/individualAnalysisAction/labtestResultAction";
import {vitalSignInitialize} from "../../../../../actions/individualAnalysisAction/vitalSignAction";
import {examInitialize} from "../../../../../actions/individualAnalysisAction/examAction";
import {createNewModelQueryAndInitialize} from "../../../../../actions/individualAnalysisAction/individualModelAction";
import RouteName from "../../../../../utils/RouteName";
import {getVisitInfo} from "../../../../../actions/groupAnalysisAction/managementAction";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const columns = [
    { id: 'localPatientID', label: '病人ID', minWidth: 100 },
    { id: 'hospitalName', label: '医院名称', minWidth: 100 },
    { id: 'visitType', label: '入院类型', minWidth: 100},
    { id: 'visitID', label: '入院ID', minWidth: 100},
    { id: 'name', label: '姓名', minWidth: 100},
    { id: 'sex', label: '性别', minWidth: 100},
    { id: 'age', label: '年龄', minWidth: 100},
    { id: 'mainDiagnosis', label: '主诊断', minWidth: 100},
    { id: 'los', label: '住院日', minWidth: 100},
    { id: 'admissionTime', label: '入院时间', minWidth: 100},
    { id: 'detail', label: '具体分析', minWidth: 100},
];


const PatientListPanel =({queryID, toggleFilter})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const queryName = useSelector(state=>state.metaInfo.metaInfoMap[queryID].queryName);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].visitInfo.isDataOutOfDate);
    const page = useSelector(state=>state.group.management[queryID].visitInfo.page);
    const pageSize = useSelector(state=>state.group.management[queryID].visitInfo.pageSize);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    const visitCount = useSelector(state=>state.group.management[queryID].visitInfo.visitCount);
    const visitInfo = useSelector(state=>state.group.management[queryID].visitInfo.data);

    useEffect(()=>{
        // isDataOutOfDate只在一种情况下为true，就是刚向服务器提交新的过滤器，服务器确认查询完毕时
        // 此时patientListPanel是过时的，自动触发更新请求
        if(isDataOutOfDate){
            const startIndex = (page-1)*pageSize;
            const endIndex = page*pageSize;
            dispatch(getVisitInfo(filter, startIndex, endIndex, queryID))
        }
    },[isDataOutOfDate]);

    const handleClickJumpIcon=(localPatientID, hospitalCode, visitType, visitID, name, queryID)=>{
        // 本函数包含如下几个功能
        // 1. 创建新query并初始化
        dispatch(createNewQuery(ParaName.INDIVIDUAL_ANALYSIS, Number.parseInt(queryID)));
        dispatch(unifiedIdAndBasicInfoInitialize(nextID));
        dispatch(trajectoryInitialize(nextID));
        dispatch(orderInitialize(nextID));
        dispatch(labTestInitialize(nextID));
        dispatch(vitalSignInitialize(nextID));
        dispatch(examInitialize(nextID));
        dispatch(createNewModelQueryAndInitialize(nextID));

        // 2. 更改名称
        dispatch(editQueryName("查询"+nextID+"_附属于"+name, nextID));

        // 3. 自动跳转
        const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.INDIVIDUAL_ANALYSIS+'/'+nextID;
        history.push(path);

        // 4. 更改选择项
        dispatch(setSelectedQuery(nextID.toString()));

        // 5. 获取新个体query的数据信息，并设置访问为目标访问
        dispatch(fetchAndSetIndividualAnalysisInfo(localPatientID, hospitalCode, visitType, visitID, nextID));
    };

    return (
        toggleFilter&&
        <Fragment>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visitInfo.map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            value?(
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>):null
                                        );
                                    })}
                                    <TableCell key={'jumpToIndividualAnalysis'}>
                                        <DescriptionIcon
                                            onClick={()=>{
                                                handleClickJumpIcon('S112395129', '1',
                                                    '住院', '9', queryName, queryID)
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={visitCount}
                rowsPerPage={pageSize}
                page={page}
                onChangePage={()=>{}}
                onChangeRowsPerPage={()=>{}}
            />
        </Fragment>
    );
};

export default PatientListPanel;