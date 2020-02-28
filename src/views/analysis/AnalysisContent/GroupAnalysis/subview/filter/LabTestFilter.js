import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Radio, Typography} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import { makeStyles } from '@material-ui/core/styles'
import {labTestJson, representativeLabTestJson} from "../../../../../../utils/labTestMap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {filter} from "../../../../../../utils/queryUtilFunction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 1200,
        height: 600,
        display:'flex',
    },
    paperWidthSm: {maxWidth: 1200},
    item: {
        width: '100%',
        height: "7%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: theme.spacing(3)
    },
    itemLabel: {
        height: "100%",
    },
    itemContent: {
        width: 400,
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    itemContentDetail: {
        width: 100,
    },
}));

const LabTestFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                           previousContent}) =>{
    // item = [isInherit, "labTest", code, numerical, value1, value2, name, unit] or
    // item = [isInherit, "labTest", code, categorical, value, name, unit]
    // dataType = {categorical, numerical}
    // 目前只支持数值型实验室检查，也就是dataType必须是numerical

    const classes = useStyles();

    const [radio, setRadio] = useState('all');
    // autocomplete指具体的检查名称
    const [autocompleteValue, setAutocomplete] = useState("");
    const [representativeLabTestList, cantUse1] = useState([]);
    const [labTestList, cantUse2] = useState([]);
    const [legalLabTestList, setLegalLabTestList] = useState([]);
    const [selectedLabTest, setSelectedLabTest] = useState("");
    const [selectedLabTestType, setSelectedLabTestType] = useState("");
    const [selectedLabTestUnit, setSelectedLabTestUnit] = useState("");
    const [lowThreshold, setLowThreshold] = useState("");
    const [highThreshold, setHighThreshold] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [canConfirm, setCanConfirm] = useState("");

    useEffect(()=>{
        if(radio==='all'){
            setLegalLabTestList(labTestList)
        }
        if(radio==='representative'){
            setLegalLabTestList(representativeLabTestList)
        }
    },[radio]);

    useEffect(()=>{
        // 载入数据其实并不是时间瓶颈
        cantUse1(JSON.parse(representativeLabTestJson()));
        const list = JSON.parse(labTestJson());
        cantUse2(list);
        setLegalLabTestList(list);

        if(constraintType==='edit'){
            if(previousContent&&previousContent[3]==='categorical'){
                setAutocomplete(previousContent[5]);
                setSelectedLabTest(previousContent[2]);
                setSelectedLabTestType(previousContent[3]);
                setCategoryValue(previousContent[4]);
                setSelectedLabTestUnit(previousContent[6])
            }
            if(previousContent&&previousContent[3]==='numerical'){
                setAutocomplete(previousContent[6]);
                setSelectedLabTest(previousContent[2]);
                setSelectedLabTestType(previousContent[3]);
                setLowThreshold(previousContent[4]);
                setHighThreshold(previousContent[5]);
                setSelectedLabTestUnit(previousContent[7])
            }
        }
    }, []);

    const handleConfirm=()=>{
        if(constraintType==="add"){
            if(selectedLabTestType==='categorical'){
                addConstraint([false, ParaName.LAB_TEST, selectedLabTest, selectedLabTestType, categoryValue,
                    autocompleteValue, selectedLabTestUnit])
            }
            if(selectedLabTestType==='numerical') {
                addConstraint([false, ParaName.LAB_TEST, selectedLabTest, selectedLabTestType, lowThreshold, highThreshold,
                    autocompleteValue, selectedLabTestUnit])
            }
        }
        else if(constraintType==="edit"){
            if(selectedLabTestType==='categorical'){
                editConstraint(index, [false, ParaName.LAB_TEST, selectedLabTest, selectedLabTestType, categoryValue,
                    autocompleteValue, selectedLabTestUnit])
            }
            if(selectedLabTestType==='numerical') {
                editConstraint(index, [false, ParaName.LAB_TEST, selectedLabTest, selectedLabTestType, lowThreshold, highThreshold,
                    autocompleteValue, selectedLabTestUnit])
            }
        }
        setOpenDialog(null)
    };

    const handleRadioChange = event => {
        setRadio(event.target.value);
    };

    useEffect(()=>{
        // 校验输入是否合法
        const labTestInfo = !((autocompleteValue==="")||(selectedLabTest==="")||(selectedLabTestUnit==="")||
            (selectedLabTestType===""));
        let valueStatus = false;
        if(selectedLabTestType==='categorical'){
            if(categoryValue!==""){
                valueStatus=true
            }
        }
        if(selectedLabTestType==='numerical'){
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
        }
        setCanConfirm(valueStatus&&labTestInfo)
    }, [lowThreshold, highThreshold, categoryValue]);

    return (
        <Dialog
            open={openDialog===ParaName.LAB_TEST}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                实验室检查过滤器
            </DialogTitle>
            <DialogContent dividers style={{width: 400}}>
                <div style={{display: 'flex', marginTop: 25, alignItems: 'center'}}>
                    <Typography>常用检查</Typography>
                    <Radio
                        style={{marginLeft: 20}}
                        checked={radio === 'representative'}
                        onChange={handleRadioChange}
                        value="representative"
                    />
                    <Typography style={{marginLeft: 20}}>所有检查</Typography>
                    <Radio
                        style={{marginLeft: 20}}
                        checked={radio === 'all'}
                        onChange={handleRadioChange}
                        value="all"
                    />
                </div>
                <div style={{display: 'flex', marginTop: 25, alignItems: 'start'}}>
                    <Autocomplete
                        options={legalLabTestList}
                        getOptionLabel={option => option[1]}
                        style={{ width: 300 }}
                        renderInput={params => (
                            <TextField {...params}
                                       label="检查名称"
                                       variant="outlined"
                                       fullWidth />
                        )}
                        filterOptions={(options, {inputValue}) =>
                            filter(options, inputValue, "", true, false)}
                        onChange={(event, value)=>{
                            if(value!==null){
                                setAutocomplete(value[1]);
                                setSelectedLabTest(value[0]);
                                setSelectedLabTestType(value[2]);
                                setSelectedLabTestUnit(value[3])
                            }
                        }}
                    />
                </div>
                <div style={{display: 'flex', marginTop: 25, alignItems: 'start'}}>
                    {
                        selectedLabTestType==='numerical'&&
                        <div className={classes.itemContent}>
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
                            <Typography className={classes.itemLabel} style={{marginLeft: 20}} variant="h5">
                                {selectedLabTestUnit}
                            </Typography>
                        </div>
                    }
                    {
                        selectedLabTestType==='categorical'&&
                        <div className={classes.itemContent}>
                            <Typography className={classes.itemLabel} variant="h5">
                                定性结果
                            </Typography>
                            <TextField
                                className={classes.itemContentDetail}
                                label={""}
                                style={{marginLeft: 20}}
                                value={categoryValue}
                                onChange={(event)=>{
                                    setCategoryValue(event.target.value)
                                }}
                            />
                        </div>
                    }
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
    )
};

export default LabTestFilter;