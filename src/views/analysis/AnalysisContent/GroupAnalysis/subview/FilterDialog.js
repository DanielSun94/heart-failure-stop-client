import React, {useState} from 'react';
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
    Popover} from '@material-ui/core';
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
import {diagnosisJson} from "./filter/diagnosisMap";

const useStyles = makeStyles(() => ({
    root: {
        width: 1200,
        height: 600,
        overflow: 'auto',
        display:'flex',
    },
    paperWidthSm: {maxWidth: 1200},
    listItem: {
        "&:hover": {backgroundColor: colors.grey[200]}
    }
}));

const list = JSON.parse(diagnosisJson());
const diagnosisMap = {};
for(const item of list){
    diagnosisMap[item[0]] = item[1]
}

const FilterDialog =({queryID, openDialog, setDialogVisible}) =>{
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState({});
    const [filterType, setFilterType] = useState("");

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

    const submitFilterAndGetData = () =>{
        // dispatch(...)
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
                            type={filter[idx][0]}
                            content={filter[idx]}
                            editFunc={editConstraint}
                            deleteFunc={deleteConstraint}
                        />
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            setDialogVisible(false);
                            submitFilterAndGetData();
                        }}
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

const FilterTuple =({idx, type, content, editFunc, deleteFunc})=>{
    const [dialogType, setDialogType] = useState(null);

    let contentString='';
    switch (type) {
        case ParaName.MAIN_DIAGNOSIS: {
            contentString += "主诊断包括:";
            for (let i = 1; i < content.length; i++) {
                contentString += diagnosisMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        case ParaName.DIAGNOSIS: {
            contentString+="诊断包括:";
            for(let i=1; i<content.length; i++) {
                contentString += diagnosisMap[content[i]];
                if (i !== content.length - 1) {
                    contentString += " 或 "
                }
            }
            break;
        }
        default: break;
    }
    return (
        <div>
            <div>{idx}</div>
            <div>{type}</div>
            <div>{contentString}</div>
            <EditIcon
                onClick={()=>setDialogType(type)}
            />
            <CloseIcon
                onClick={()=>deleteFunc(idx)}
            />
            <SpecificFilterSelector
                filterType={dialogType}
                setFilterType={setDialogType}
                content={content}
                index={idx}
                editConstraint={editFunc}
                constraintType={'edit'}
            />
        </div>
    )
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
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.ADMISSION_TIME)}>
                        <ListItemText primary={"入院时间过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.AGE)}>
                        <ListItemText primary={"年龄过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.BIRTHDAY)}>
                        <ListItemText primary={"生日过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.DIAGNOSIS)}>
                        <ListItemText primary={"诊断过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.EXAM)}>
                        <ListItemText primary={"检查过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.HOSPITAL)}>
                        <ListItemText primary={"医院过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.LAB_TEST)}>
                        <ListItemText primary={"实验室检查过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.MAIN_DIAGNOSIS)}>
                        <ListItemText primary={"主诊断过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.MEDICINE)}>
                        <ListItemText primary={"药物过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.MODEL)}>
                        <ListItemText primary={"模型过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.OPERATION)}>
                        <ListItemText primary={"手术过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.SEX)}>
                        <ListItemText primary={"性别过滤器"}/>
                    </ListItem>
                    <ListItem className={classes.listItem} onClick={()=>setFilterType(ParaName.VITAL_SIGN)}>
                        <ListItemText primary={"生理指标过滤器"}/>
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
            {ParaName.MODEL===filterType&&
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
            {ParaName.VITAL_SIGN===filterType&&
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
        </div>
    )
};

export default FilterDialog;