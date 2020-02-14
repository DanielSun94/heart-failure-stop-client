import React, {useState, Fragment, useEffect} from 'react';
import {
    colors,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Checkbox
} from '@material-ui/core';
import {diagnosisJson, mainDiagnosisJson} from "./diagnosisMap";
import ParaName from "../../../../../../utils/ParaName";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: 1200,
        height: 600,
        display:'flex',
    },
    paperWidthSm: {maxWidth: 1200},
}));

const DiagnosisFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                         diagnosisType, previousContent}) =>{
    // item = [type, diagnosisCode1, diagnosisCode2, ...]
    // type = {"mainDiagnosis", "diagnosis"}
    const classes = useStyles();

    const [mainDiagnosisList, cantUse1] = useState([]);
    const [diagnosisList, cantUse2] = useState([]);
    const [codeNameMap, cantUse3] = useState({});
    const [selectedDiagnosisList, setSelectedDiagnosisList] = useState(
        previousContent?previousContent.slice(1):[]
    );

    useEffect(()=>{
        // 载入数据其实并不是时间瓶颈
        cantUse1(JSON.parse(mainDiagnosisJson()));
        const list = JSON.parse(diagnosisJson());
        cantUse2(list);
        const map = {};
        for(const item of list){
            map[item[0]] = item[1]
        }
        cantUse3(map);
    }, []);

    const handleConfirm=()=>{
        if(constraintType==="add"){
            addConstraint([diagnosisType, ...selectedDiagnosisList])
        }
        else if(constraintType==="edit"){
            editConstraint(index, [diagnosisType, ...selectedDiagnosisList])
        }
        setOpenDialog(null)
    };

    return (
        <Dialog
            open={openDialog===diagnosisType}
            maxWidth={'sm'}
            classes={{paperWidthSm: classes.paperWidthSm}}
            disableBackdropClick={true}
        >
            <DialogTitle>
                {diagnosisType===ParaName.DIAGNOSIS&&"诊断过滤器"}
                {diagnosisType===ParaName.MAIN_DIAGNOSIS&&"主要诊断过滤器"}
            </DialogTitle>
            <DialogContent
                className={classes.root}
            >
                <div style={{width: 400}}>
                    <Typography variant={'h5'} style={{marginBottom: 10}}>病人诊断</Typography>
                    {selectedDiagnosisList.map((item, index)=>{
                        const name = codeNameMap[item];
                        return (
                            <Fragment>
                                {index!==0?<Typography>或</Typography>:null}
                                <Typography>{name}</Typography>
                            </Fragment>
                        )
                    })}
                </div>
                <div style={{
                    width: 400,
                    borderRightColor: colors.grey[200],
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    overflow: 'auto'}}>
                    <Typography variant={'h5'}>本数据库中的高频诊断</Typography>
                    {mainDiagnosisList.map(item=>
                        <Item
                            id={item[0]}
                            icdCode={item[0]}
                            name={item[1]}
                            setDiagnosisList={setSelectedDiagnosisList}
                            selectedDiagnosisList={selectedDiagnosisList}
                        />)}
                </div>
                <div style={{width: 400, overflow: 'auto'}}>
                    <Typography variant={'h5'}>全诊断清单</Typography>
                    {diagnosisList.map(item=>
                        <Item
                            id={item[0]}
                            icdCode={item[0]}
                            name={item[1]}
                            setDiagnosisList={setSelectedDiagnosisList}
                            selectedDiagnosisList={selectedDiagnosisList}
                        />)}
                </div>
            </DialogContent>
            <DialogActions>
                <div style={{width: "86%"}}>
                <Typography>
                    本筛选器的诊断与ICD-10编码大类（ICD-10编码前三位）一一对应。使用本筛选器会造成用ICD-9编码的诊断无法被筛选
                </Typography>
                </div>
                <Button variant={'outlined'}
                        onClick={handleConfirm}
                        color="primary">
                    确认
                </Button>
                <Button variant={'outlined'} onClick={()=>setOpenDialog(null)}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const Item=({icdCode, name, selectedDiagnosisList, setDiagnosisList})=>{
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        setChecked(false);
        for(const item of selectedDiagnosisList){
            if(item===icdCode){
                setChecked(true)
            }
        }
    }, [selectedDiagnosisList]);

    const handleAdd=()=>{
        const temp = [...selectedDiagnosisList];
        temp.push(icdCode);
        setDiagnosisList(temp)
    };

    const handleDelete=()=>{
        const temp = [];
        for(const item of selectedDiagnosisList){
            if(item!==icdCode){
                temp.push(item)
            }
        }
        setDiagnosisList(temp)
    };

    return(
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Checkbox
                value="secondary"
                color="primary"
                checked={checked}
                onChange={(event)=>{
                    const checkStatus = event.target.checked;
                    if(checkStatus){
                        handleAdd()
                    }
                    else{
                        handleDelete()
                    }
                }}
            />
            <Typography>{name}</Typography>
        </div>
    )
};


export default DiagnosisFilter;