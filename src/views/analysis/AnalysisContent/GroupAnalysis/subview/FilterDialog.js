import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    colors,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Card,
    Popover,
    IconButton,
    Typography
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import AgeFilter from "./filter/AgeFilter";
import AdmissionTimeFilter from "./filter/AdmissionTimeFilter";
import BirthdayFilter from "./filter/BirthdayFilter";
import DiagnosisFilter from "./filter/DiagnosisFilter";
import ExamFilter from "./filter/ExamFilter";
import HospitalFilter from "./filter/HospitalFilter";
import LabTestFilter from "./filter/LabTestFilter";
import LengthOfStayFilter from "./filter/LengthOfStayFilter";
import MedicineFilter from "./filter/MedicineFilter";
import ModelFilter from "./filter/ModelFilter";
import OperationFilter from "./filter/OperationFilter";
import SexFilter from "./filter/SexFilter";
import VitalSignFilter from "./filter/VitalSignFilter";
import ParaName from "../../../../../utils/ParaName";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {diagnosisJson} from "../../../../../utils/diagnosisMap";
import {medicineJson} from "../../../../../utils/medicineMap";
import {operationJson} from "../../../../../utils/operationMap";
import VisitTypeFilter from "./filter/VisitTypeFilter";
import {changeManagementQueryFilter,
queryDataAccordingToFilter} from "../../../../../actions/groupAnalysisAction/managementAction";

const useStyles = makeStyles(() => ({
    root: {
        width: 1200,
        height: 600,
        overflow: 'auto',
    },
    paperWidthSm: {maxWidth: 1200},
    listItem: {
        "&:hover": {backgroundColor: colors.grey[200]}
    },
    filterItem: {
        marginTop: 20,
        width: 1100,
        minHeight: 50,
        display: 'flex',
    },
}));

const diagnosisList = JSON.parse(diagnosisJson());
const diagnosisMap = {};
for(const item of diagnosisList){
    diagnosisMap[item[0]] = item[1]
}
const medicineList = JSON.parse(medicineJson());
const medicineMap = {};
for(const item of medicineList){
    medicineMap[item[0]] = item[1]
}
const operationList = JSON.parse(operationJson());
const operationMap = {};
for(const item of operationList){
    operationMap[item[0]] = item[1]
}

const codeMap = {
    [ParaName.MACHINE_LEARNING]: "模型",
    [ParaName.ADMISSION_TIME]: "入院时间",
    [ParaName.DIAGNOSIS]: "诊断",
    [ParaName.MAIN_DIAGNOSIS]: '主诊断',
    [ParaName.BIRTHDAY]: "生日",
    [ParaName.VITAL_SIGN]: "生理指标",
    [ParaName.VISIT_TYPE]: "入院类型",
    [ParaName.OPERATION]: "手术",
    [ParaName.MEDICINE]: "药物",
    [ParaName.EXAM]: "检查",
    [ParaName.LAB_TEST]: "检验",
    [ParaName.HOSPITAL]: "医院",
    [ParaName.AGE]: "年龄",
    [ParaName.LOS]: "住院日",
    [ParaName.SEX]: "性别"
};

const FilterDialog =({queryID, openDialog, setDialogVisible}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState({});
    const [filterType, setFilterType] = useState("");
    const [canConfirm, setCanConfirm] = useState(false);
    const metaInfoMap = useSelector(state=>state.metaInfo.metaInfoMap);
    const management = useSelector(state=>state.group.management);
    const previousFilter = management[queryID].filter;

    useEffect(()=>{
        setFilter(previousFilter);
        let maxId=-1;
        for(const key in previousFilter){
            if(previousFilter.hasOwnProperty(key)){
                if(key>=maxId){
                    maxId=parseInt(key)
                }
            }
        }
        setIndex(maxId+1)
    }, [queryID, previousFilter]);

    useEffect(()=>{
        // 当过滤器为空时，禁止提交
        if(Object.keys(filter).length===0){
            setCanConfirm(false)
        }
        else {
            setCanConfirm(true)
        }
    },[filter]);

    const addConstraint = (newConstraint) =>{
        const temp = {...filter};
        temp[index] = newConstraint;
        setIndex(index+1);
        setFilter({...temp})
    };

    const deleteConstraint = (index) =>{
        const temp = {...filter};
        delete temp[index];
        setFilter({...temp})
    };

    const editConstraint =(index, newConstraint)=>{
        const temp = {...filter};
        temp[index] = newConstraint;
        setFilter({...temp})
    };

    const handleConfirm =()=>{
        // 不仅要对本级进行重设，也要对下级进行重设，下级按照排列，必然是子查询index大于父查询
        // 寻找列表
        const indexList = [queryID];
        const sortedIndexList = Object.keys(metaInfoMap).map(item=>parseInt((item))).sort((a,b)=>a-b);
        for(const item of sortedIndexList){
            if(metaInfoMap[item].queryType===ParaName.GROUP_ANALYSIS){
                if(parseInt(item)<=parseInt(queryID)){continue}
                for(const query of indexList){
                    if(query===metaInfoMap[item].affiliated){indexList.push(parseInt(item));}
                }
            }
        }
        // 链式传递筛选器
        const filterMap = {};
        for(const index in indexList){
            if(!indexList.hasOwnProperty(index)){
                continue
            }
            const intIndex = parseInt(index);
            if(intIndex===0){
                filterMap[indexList[intIndex]] = filter;
            }
            else{
                const previousQueryID = metaInfoMap[indexList[intIndex]].affiliated;
                const previousFilter = filterMap[previousQueryID];
                const currentFilter = management[indexList[intIndex]].filter;
                // 将上一级的filter完整复制到下一级，并把所有isInherited改为true
                // 此处为了防止问题，需要进行一次对象复制
                const newFilter = {...previousFilter};
                let nextIndex = -1;
                for(const key in newFilter){
                    if(newFilter.hasOwnProperty(key)){
                        const tuple =[...newFilter[key]];
                        tuple[0]=true;
                        newFilter[key]=tuple;
                        if(parseInt(key)>=nextIndex){nextIndex=parseInt(key)+1}
                    }
                }
                // 复制下一级的非inherited 条件，注意index冲突
                for(const key in currentFilter){
                    if(currentFilter.hasOwnProperty(key)){
                        if(currentFilter[key][0]===false){
                            newFilter[nextIndex] = currentFilter[key];
                            nextIndex+=1
                        }
                    }
                }
                filterMap[indexList[intIndex]]=newFilter
            }
        }
        setDialogVisible(false);
        for(const key in filterMap) {
            dispatch(changeManagementQueryFilter(filterMap[key], key));
        }
    };

    const filterKeys = Object.keys(filter);

    return (
        <Dialog
            open={openDialog}
            maxWidth={'sm'}
            classes={{paperWidthSm: classes.paperWidthSm}}
            disableBackdropClick={true}
            onClose={()=>setDialogVisible(false)}
        >
            <DialogTitle>
                数据过滤器
            </DialogTitle>
            <DialogContent dividers className={classes.root}>
                <AddFilter
                    setFilterType={setFilterType}
                />
                {
                    filterKeys.map(idx=>
                        <FilterTuple
                            key={idx}
                            idx={idx}
                            content={filter[idx]}
                            editFunc={editConstraint}
                            deleteFunc={deleteConstraint}
                        />
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        color="primary">
                    确认
                </Button>
                <Button variant={'outlined'} onClick={()=>setDialogVisible(false)}>
                    取消
                </Button>
            </DialogActions>
            <SpecificFilterSelector
                setFilterType={setFilterType}
                filterType={filterType}
                addConstraint={addConstraint}
                constraintType={'add'}
            />
        </Dialog>
    )
};

const FilterTuple =({idx, content, editFunc, deleteFunc})=>{
    const classes = useStyles();
    const type = content[1];
    const isInherit = content[0];
    const [dialogType, setDialogType] = useState(null);
    const contentString = filterContentToString(content);
    return (
        <Card className={classes.filterItem}>
            <div style={{marginLeft: 10, width: 290, display: 'flex', alignItems: "center"}}>
                <Typography>{"过滤器类型: "+codeMap[type]}</Typography>
            </div>
            <div style={{width: 680, display: 'flex', alignItems: "center"}}>
                {contentString}
            </div>
            <div style={{marginLeft: 10, width: 50, height:50, display: 'flex', alignItems: "center"}}>
                <IconButton
                    disabled={isInherit}
                >
                    <EditIcon
                        fontSize={"inherit"}
                        onClick={()=>setDialogType(type)}
                    />
                </IconButton>
            </div>
            <div style={{marginLeft: 10, width: 50, height:50, display: 'flex', alignItems: "center"}}>
                <IconButton
                    disabled={isInherit}
                >
                    <CloseIcon
                        fontSize={"inherit"}
                        onClick={()=>deleteFunc(idx)}
                    />
                </IconButton>
            </div>
            <SpecificFilterSelector
                filterType={dialogType}
                setFilterType={setDialogType}
                content={content}
                index={idx}
                editConstraint={editFunc}
                constraintType={'edit'}
            />
        </Card>
    )
};

export const filterContentToString =(content)=>{
    let contentString='';
    switch (content[1]) {
        case ParaName.MAIN_DIAGNOSIS: {
            contentString += "主诊断包括:";
            for (let i = 2; i < content.length; i++) {
                contentString += diagnosisMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.DIAGNOSIS: {
            contentString+="诊断包括:";
            for(let i=2; i<content.length; i++) {
                contentString += diagnosisMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.ADMISSION_TIME: {
            contentString+= "入院时间";
            if(content[2]!=="-1"&&content[3]!=="-1"){
                contentString+="在"+content[2]+"至"+content[3]+"之间";
            }
            else if(content[2]!=="-1"){
                contentString+="在"+content[3]+"之后";
            }
            else if(content[3]!=="-1"){
                contentString+="再"+content[4]+"之前";
            }
            break;
        }
        case ParaName.AGE:{
            contentString+= "年龄";
            if(content[2]!==-1&&content[3]!==-1){
                contentString+="在"+content[2]+"至"+content[3]+"岁间";
            }
            else if(content[2]!==-1){
                contentString+="大于"+content[2]+"岁";
            }
            else if(content[3]!==-1){
                contentString+="小于"+content[3]+"岁";
            }
            break;
        }
        case ParaName.BIRTHDAY: {
            contentString+= "生日";
            if(content[2]!=="-1"&&content[3]!=="-1"){
                contentString+="在"+content[2]+"至"+content[3]+"之间";
            }
            else if(content[2]!=="-1"){
                contentString+="在"+content[2]+"之后";
            }
            else if(content[3]!=="-1"){
                contentString+="再"+content[3]+"之前";
            }
            break;
        }
        case ParaName.EXAM: {
            contentString+= content[2];
            if(content[3]!==-1&&content[4]!==-1){
                contentString+="在"+content[3]+"至"+content[4]+"间";
            }
            else if(content[3]!==-1){
                contentString+="大于"+content[3];
            }
            else if(content[4]!==-1){
                contentString+="小于"+content[4];
            }
            break;
        }
        case ParaName.HOSPITAL: {
            contentString += "医院: ";
            for(let i=1; i<content.length; i++) {
                contentString += content[i][1];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.LAB_TEST:{
            contentString += "实验室检查: ";
            if(content[3]==='numerical'){
                contentString+=content[6]+": "+content[4]+' 至 '+content[5]+' '+content[7]
            }
            if(content[3]==='categorical'){
                contentString+=content[5]+" "+content[4]
            }
            break;
        }
        case ParaName.LOS:{
            contentString+= "住院日";
            if(content[2]!==-1&&content[3]!==-1){
                contentString+="在"+content[2]+"至"+content[3]+"天间";
            }
            else if(content[2]!==-1){
                contentString+="大于"+content[2]+"天";
            }
            else if(content[3]!==-1){
                contentString+="小于"+content[3]+"天";
            }
            break;
        }
        case ParaName.MEDICINE:{
            contentString+= "使用药物: ";
            for(let i=2; i<content.length; i++) {
                contentString += medicineMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.OPERATION:{
            contentString+= "手术: ";
            for(let i=2; i<content.length; i++) {
                contentString += operationMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.SEX:{
            contentString+= "性别: "+((content[2]==='male')?"男":"女");
            break;
        }
        case ParaName.VISIT_TYPE:{
            contentString+= "入院类型: "+content[2];
            break;
        }
        case ParaName.VITAL_SIGN:{
            contentString+= "主要生理指标: "+content[5];
            if(content[3]!==-1&&content[4]!==-1){
                contentString+="在"+content[3]+"至"+content[4]+content[6]+"间";
            }
            else if(content[3]!==-1){
                contentString+="大于"+content[3]+content[6];
            }
            else if(content[4]!==-1){
                contentString+="小于"+content[4]+content[6];
            }
            break;
        }
        case ParaName.MACHINE_LEARNING:{
            contentString+= "模型: "+content[6];
            if(content[4]!==-1&&content[5]!==-1){
                contentString+="风险在"+content[4]+"%至"+content[5]+"%间";
            }
            else if(content[4]!==-1){
                contentString+="风险大于"+content[4]+"%";
            }
            else if(content[5]!==-1){
                contentString+="风险小于"+content[5]+"%"
            }
            break;
        }
        default: break;
    }
    return contentString;
};

const AddFilter =({setFilterType})=>{
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color="primary"
                variant={'outlined'}
                onClick={handleClick}
            >
                添加过滤器
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List dense={true}>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.ADMISSION_TIME);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.ADMISSION_TIME]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.AGE);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.AGE]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.BIRTHDAY);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.BIRTHDAY]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.DIAGNOSIS);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.DIAGNOSIS]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.EXAM);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.EXAM]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.HOSPITAL);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.HOSPITAL]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.LAB_TEST);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.LAB_TEST]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.LOS);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.LOS]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.MAIN_DIAGNOSIS);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.MAIN_DIAGNOSIS]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.MACHINE_LEARNING);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.MACHINE_LEARNING]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.OPERATION);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.OPERATION]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.SEX);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.SEX]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.VITAL_SIGN);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.VITAL_SIGN]+"过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>{
                        setFilterType(ParaName.VISIT_TYPE);
                        handleClose()
                    }}>
                        <ListItemText primary={codeMap[ParaName.VISIT_TYPE]+"过滤器"}/>
                    </ListItem>
                </List>
            </Popover>
        </div>
    )
};

const SpecificFilterSelector=({filterType, setFilterType, content, addConstraint, editConstraint, constraintType, index})=>{
    return (
        <div>
            {ParaName.AGE===filterType&&
            <AgeFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                previousContent={content}
                index={index}
            />}
            {ParaName.ADMISSION_TIME===filterType&&
            <AdmissionTimeFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                previousContent={content}
                index={index}
            />}
            {ParaName.BIRTHDAY===filterType&&
            <BirthdayFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                previousContent={content}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
            />}
            {ParaName.DIAGNOSIS===filterType&&
            <DiagnosisFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                previousContent={content}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
                diagnosisType={ParaName.DIAGNOSIS}
            />
            }
            {ParaName.EXAM===filterType&&
            <ExamFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                previousContent={content}
                index={index}
            />
            }
            {ParaName.HOSPITAL===filterType&&
            <HospitalFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                previousContent={content}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
            />
            }
            {ParaName.LAB_TEST===filterType&&
            <LabTestFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                previousContent={content}
                constraintType={constraintType}
                index={index}
            />
            }
            {ParaName.LOS===filterType&&
            <LengthOfStayFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                previousContent={content}
                constraintType={constraintType}
                index={index}
            />
            }
            {ParaName.MAIN_DIAGNOSIS===filterType&&
            <DiagnosisFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                previousContent={content}
                editConstraint={editConstraint}
                constraintType={constraintType}
                diagnosisType={ParaName.MAIN_DIAGNOSIS}
                index={index}
            />
            }
            {ParaName.MEDICINE===filterType&&
            <MedicineFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                previousContent={content}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
            />
            }
            {ParaName.MACHINE_LEARNING===filterType&&
            <ModelFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
                previousContent={content}
            />
            }
            {ParaName.OPERATION===filterType&&
            <OperationFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                previousContent={content}
                constraintType={constraintType}
                index={index}
            />
            }
            {ParaName.SEX===filterType&&
            <SexFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
                previousContent={content}
            />
            }
            {ParaName.VITAL_SIGN === filterType &&
            <VitalSignFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
                previousContent={content}
            />
            }
            {ParaName.VISIT_TYPE===filterType&&
                <VisitTypeFilter
                openDialog={filterType}
                setOpenDialog={setFilterType}
                addConstraint={addConstraint}
                editConstraint={editConstraint}
                constraintType={constraintType}
                index={index}
                previousContent={content}
                />
            }
        </div>
    )
};

export default FilterDialog;