import React, {useEffect, useState} from 'react';
import pinyin from 'pinyin'
import {
    Card,
    Divider,
    Typography,
    TablePagination,
    TableCell,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    Paper,
    CircularProgress
} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    changeManagementQueryFilter, getOperation,
    initializeManagementQuery, queryDataAccordingToFilter
} from "../../../../../../actions/groupAnalysisAction/managementAction";
import {createNewQuery, editQueryName, setSelectedQuery} from "../../../../../../actions/metaInfoAction";
import ParaName from "../../../../../../utils/ParaName";
import RouteName from "../../../../../../utils/RouteName";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
    },
    count: {
        width: 100
    },
    ratio: {
        width: 100
    },
    name: {
        width: 460
    },
    head: {
        height: 60,
        display: 'flex',
        alignItems: 'center'
    }
}));

const OperationPanel =({queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const operationList = useSelector(state=>state.group.management[queryID].statistics.operation.content);
    const isDataValid = useSelector(state=>state.group.management[queryID].statistics.operation.isDataValid);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].isDataOutOfDate);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    const fatherQueryNae = useSelector(state=>state.metaInfo.metaInfoMap[queryID].queryName);
    const operationCodeMap = useSelector(state=>state.context.operationCode.map);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pinyinCode, setPinyin] = useState('输入拼音首字母过滤');
    const [operationShowList, setOperationShowList] = useState([]);
    const [namePinyinMap, cantUse4] = useState({});

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(()=>{
        const pinyinMap = {};
        for(const item of operationList){
            const firstLetterList = pinyin(operationCodeMap[item.operationCode], {style: pinyin.STYLE_FIRST_LETTER});
            let firstLetterStr = "";
            for(let strList of firstLetterList)
                firstLetterStr += strList[0];
            firstLetterStr = firstLetterStr.toLowerCase();
            pinyinMap[operationCodeMap[item.operationCode]]=firstLetterStr
        }
        cantUse4(pinyinMap);
    }, [operationList, operationCodeMap]);

    useEffect(()=>{
        // 此处filter>0的判断必须要有，因为如果删除一个查询，马上重建后，会直接触发服务器返回过时数据
        // 因此必须要重设filter后才能获取
        if((!isDataValid)&&(!isDataOutOfDate)&&Object.keys(filter).length>0){
            dispatch(getOperation(queryID))
        }
    },[isDataValid, isDataOutOfDate]);

    useEffect(()=>{
        const pinyinLowCase = pinyinCode.toLocaleLowerCase();
        const list = [];
        if(pinyinCode===''||pinyinCode==='输入拼音首字母过滤'){
            setOperationShowList(operationList)
        }
        else{
            for(const item of operationList){
                const itemPinyin = namePinyinMap[operationCodeMap[item.operationCode]];
                if(itemPinyin&&itemPinyin.includes(pinyinLowCase)){
                    list.push(item)
                }
            }
            setOperationShowList(list)
        }
        setPage(0)
    }, [pinyinCode, operationList]);

    const handleClick=(operationCode)=>{
        // 点击之后需要完成几个任务

        // 1.创建新的子查询并初始化
        dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID));
        dispatch(initializeManagementQuery(nextID));

        // 2.更改新查询的名称（改为添加的过滤器名称）
        dispatch(editQueryName(fatherQueryNae+"_"+operationCodeMap[operationCode],
            false, nextID));

        // 3.更新并提交过滤器
        let maxIdx=-1;
        const newFilter = {};
        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                newFilter[key] = [...filter[key]]
            }
        }
        for(const key in newFilter){
            if(key>=maxIdx){
                maxIdx=parseInt(key)
            }
            if(newFilter.hasOwnProperty(key)){
                newFilter[key][0] = true;
            }
        }
        newFilter[maxIdx+1]=[false, ParaName.OPERATION, operationCode];
        dispatch(changeManagementQueryFilter(newFilter, nextID));

        // 4. 发起数据请求 此处构建新状态
        dispatch(queryDataAccordingToFilter(filter, nextID, queryID, [false, ParaName.OPERATION, operationCode]));
        // 5. 实现跳转
        dispatch(setSelectedQuery(nextID));
        history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS+'/'+nextID)
    };
    return (
        <Card className={classes.root}>
            <div className={classes.head}>
                <Typography variant={'h5'} style={{paddingLeft: 20}}>手术统计</Typography>
                <input
                    style={{marginLeft: 1000, paddingTop:0, paddingBottom:0}}
                    value={pinyinCode}
                    onChange={(event)=>{
                        const newValue = event.target.value;
                        setPinyin(newValue);
                    }}
                />
            </div>
            <Divider />
            {(isDataOutOfDate||(!isDataValid))&&
            <div
                style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                {Object.keys(filter).length!==0&&<CircularProgress/>}
            </div>}
            {(!(isDataOutOfDate || (!isDataValid))) &&
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.name}>手术名称</TableCell>
                                <TableCell className={classes.count}>手术人次</TableCell>
                                <TableCell className={classes.ratio}>比例</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {operationShowList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow
                                        id={row.operationCode}
                                        key={row.operationCode}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        onClick={() => {
                                            handleClick(row.operationCode)
                                        }}
                                    >
                                        <TableCell key={'name'} className={classes.name}>
                                            {operationCodeMap[row.operationCode]}
                                        </TableCell>
                                        <TableCell key={'count'} className={classes.count}>
                                            {row.operationCount}
                                        </TableCell>
                                        <TableCell key={'ratio'} className={classes.ratio}>
                                            {(row.operationRatio * 100).toFixed(2) + "%"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={operationShowList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            }
        </Card>
    )
};

export default OperationPanel;