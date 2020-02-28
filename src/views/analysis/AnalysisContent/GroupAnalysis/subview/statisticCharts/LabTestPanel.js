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
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    changeManagementQueryFilter, getLabTestInfo,
    initializeManagementQuery, queryDataAccordingToFilter
} from "../../../../../../actions/groupAnalysisAction/managementAction";
import {createNewQuery, editQueryName, setSelectedQuery} from "../../../../../../actions/metaInfoAction";
import ParaName from "../../../../../../utils/ParaName";
import RouteName from "../../../../../../utils/RouteName";
import {filter} from "../../../../../../utils/queryUtilFunction";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
    },
    avg: {
        width: 100
    },
    ratio: {
        width: 100
    },
    std: {
        width: 100
    },
    missingRate: {
        width: 100
    },
    unit: {
        width: 100
    },
    name: {
        width: 600
    },
    head: {
        height: 60,
        display: 'flex',
        alignItems: 'center'
    }
}));

const LabTestPanel =({queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const labTestList = useSelector(state=>state.group.management[queryID].statistics.labTest.content);
    const isDataValid = useSelector(state=>state.group.management[queryID].statistics.labTest.isDataValid);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].isDataOutOfDate);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    const fatherQueryNae = useSelector(state=>state.metaInfo.metaInfoMap[queryID].queryName);
    const labTestCodeMap = useSelector(state=>state.context.labTestCode.map);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pinyinCode, setPinyin] = useState('输入拼音首字母过滤');
    const [labTestShowList, setLabTestShowList] = useState([]);
    const [namePinyinMap, cantUse4] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedLabTestCode, setLabTestCode] = useState("");
    const [lowThreshold, setLowThreshold] = useState('');
    const [highThreshold, setHighThreshold] = useState('');
    const [canConfirm, setCanConfirm] = useState("");

    useEffect(()=>{
        let valueStatus = false;
        // 上下限必须是浮点数，上限比下限大，未设置时自动设为-1
        const reg = /^(-?\d+)(\.\d+)?$/
        if(reg.test(lowThreshold)&&reg.test(highThreshold)){
            if(parseFloat(lowThreshold)<parseFloat(highThreshold)) {
                valueStatus = true
            }
        }
        if(reg.test(lowThreshold)&&highThreshold===""){
            valueStatus=true
        }
        if(lowThreshold===""&&reg.test(highThreshold)){
            valueStatus=true
        }
        setCanConfirm(valueStatus)
    }, [lowThreshold, highThreshold]);

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(()=>{
        const pinyinMap = {};
        for(const item of labTestList){
            const firstLetterList = pinyin(labTestCodeMap[item.code][1], {style: pinyin.STYLE_FIRST_LETTER});
            let firstLetterStr = "";
            for(let strList of firstLetterList)
                firstLetterStr += strList[0];
            firstLetterStr = firstLetterStr.toLowerCase();
            pinyinMap[labTestCodeMap[item.code][1]]=firstLetterStr
        }
        cantUse4(pinyinMap);
    }, [labTestList, labTestCodeMap]);

    useEffect(()=>{
        // 此处filter>0的判断必须要有，因为如果删除一个查询，马上重建后，会直接触发服务器返回过时数据
        // 因此必须要重设filter后才能获取
        if((!isDataValid)&&(!isDataOutOfDate)&&Object.keys(filter).length>0){
            dispatch(getLabTestInfo(queryID))
        }
    },[isDataValid, isDataOutOfDate]);

    useEffect(()=>{
        const pinyinLowCase = pinyinCode.toLocaleLowerCase();
        const list = [];
        if(pinyinCode===''||pinyinCode==='输入拼音首字母过滤'){
            setLabTestShowList(labTestList)
        }
        else{
            for(const item of labTestList){
                const itemPinyin = namePinyinMap[labTestCodeMap[item.code][1]];
                if(itemPinyin&&itemPinyin.includes(pinyinLowCase)){
                    list.push(item)
                }
            }
            setLabTestShowList(list)
        }
        setPage(0)
    }, [pinyinCode, labTestList]);

    const handleConfirm=()=>{
        // 点击之后需要完成几个任务
        const labTestName = labTestCodeMap[selectedLabTestCode][1];
        const unit = labTestCodeMap[selectedLabTestCode][3];

        // 1.创建新的子查询并初始化
        dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID));
        dispatch(initializeManagementQuery(nextID));

        // 2.更改新查询的名称（改为添加的过滤器名称）
        dispatch(editQueryName(fatherQueryNae+"_"+labTestName+"查询",
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

        let lowFloat;
        if(lowThreshold===''){lowFloat=-1}
        else{lowFloat=parseFloat(lowThreshold)}
        let highFloat;
        if(highThreshold===''){highFloat=-1}
        else{highFloat=parseFloat(highThreshold)}

        newFilter[maxIdx+1]=[false, ParaName.LAB_TEST, selectedLabTestCode, 'numerical', lowFloat,
            highFloat, labTestName, unit];
        dispatch(changeManagementQueryFilter(newFilter, nextID));

        // 4. 发起数据请求 此处构建新状态
        dispatch(queryDataAccordingToFilter(filter, nextID, queryID,
            [false, ParaName.LAB_TEST, selectedLabTestCode, 'numerical', lowFloat,
                highFloat, labTestName, unit]));
        // 5. 实现跳转
        dispatch(setSelectedQuery(nextID));
        history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS+'/'+nextID)
    };
    return (
        <Card className={classes.root}>
            <div className={classes.head}>
                <Typography variant={'h5'} style={{paddingLeft: 20}}>实验室检查统计</Typography>
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
                                <TableCell className={classes.name}>检查名称</TableCell>
                                <TableCell className={classes.avg}>平均值</TableCell>
                                <TableCell className={classes.std}>标准差</TableCell>
                                <TableCell className={classes.missingRate}>缺失率</TableCell>
                                <TableCell className={classes.unit}>单位</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {labTestShowList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow
                                        id={row.code}
                                        key={row.code}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        onClick={() => {
                                            setLabTestCode(row.code);
                                            setOpenDialog(true)
                                        }}
                                    >
                                        <TableCell key={'name'} className={classes.name}>
                                            {labTestCodeMap[row.code][1]}
                                        </TableCell>
                                        <TableCell key={'avg'} className={classes.avg}>
                                            {row.avgValue.toFixed(2)}
                                        </TableCell>
                                        <TableCell key={'std'} className={classes.std}>
                                            {(row.std).toFixed(4)}
                                        </TableCell>
                                        <TableCell key={'missingRate'} className={classes.missingRate}>
                                            {(row.missingRate*100).toFixed(2)+"%"}
                                        </TableCell>
                                        <TableCell key={'unit'} className={classes.unit}>
                                            {labTestCodeMap[row.code][3]}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography style={{paddingLeft: 20}}>目前仅支持结果为数值型的实验室检查查询，若某项值做过多次检查，以第一次为准</Typography>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={labTestShowList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
            }
            <Dialog
                open={openDialog===true}
                maxWidth={'sm'}
                disableBackdropClick={true}
            >
                <DialogTitle>
                    实验室检查过滤器
                </DialogTitle>
                <DialogContent dividers style={{width: 600}}>
                    <div style={{display: 'flex', marginTop: 25, alignItems: 'start'}}>
                        <TextField className={classes.itemContentDetail}
                                   label={""}
                                   value={lowThreshold}
                                   onChange={(event)=>{
                                       setLowThreshold(event.target.value)
                                   }}/>
                        <Typography className={classes.itemLabel} style={{marginLeft: 20}} variant="h5">
                            至
                        </Typography>
                        <TextField className={classes.itemContentDetail}
                                   style={{marginLeft: 20}}
                                   label={""}
                                   value={highThreshold} onChange={(event)=>{
                            setHighThreshold(event.target.value)
                        }}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'}
                            disabled={!canConfirm}
                            onClick={handleConfirm}
                            color="primary">
                        确认
                    </Button>
                    <Button variant={'outlined'} onClick={()=>setOpenDialog(null)}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
};

export default LabTestPanel;