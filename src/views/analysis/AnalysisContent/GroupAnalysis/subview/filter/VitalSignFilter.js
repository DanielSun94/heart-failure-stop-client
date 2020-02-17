import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    FormControl,
    Select,
    TextField,
    Typography,
    MenuItem
} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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

const VitalSignFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                             previousContent}) =>{
    // item = ["vitalSign", vitalSignType, low_threshold, high_threshold, vitalSignName, unit]
    const classes = useStyles();
    const [vitalSign, setVitalSign] = useState('');
    const [lowThreshold, setLowThreshold] = useState("");
    const [highThreshold, setHighThreshold] = useState("");
    const [unit, setUnit] = useState("");
    const [canConfirm, setConfirm] = useState(false);

    useEffect(()=>{
        if(constraintType==='edit'){
            setVitalSign(previousContent[1]);
            setLowThreshold(previousContent[2]);
            setHighThreshold(previousContent[3]);
            setUnit(previousContent[5])
        }
    }, []);


    const handleChange = event => {
        setVitalSign(event.target.value);
        if(event.target.value==='systolicBloodPressure'||event.target.value==='diastolicBloodPressure'){
            setUnit('mmHg');
        }
        if(event.target.value==='bmi'){
            setUnit("kg/m^2")
        }
    };

    const handleConfirm=()=>{
        let name="";
        if(vitalSign==='systolicBloodPressure'){
            name="收缩压";
        }
        else if(vitalSign==='bmi'){
            name="bmi";
        }
        else if(vitalSign==='diastolicBloodPressure'){
            name="舒张压"
        }

        if(constraintType==="add"){
            addConstraint([ParaName.VITAL_SIGN, vitalSign, lowThreshold, highThreshold,
                name, unit])
        }
        else if(constraintType==="edit"){
            editConstraint(index, [ParaName.VITAL_SIGN, vitalSign, lowThreshold, highThreshold,
                name, unit])
        }
        setOpenDialog(null)
    };

    useEffect(()=>{
        // 校验输入是否合法
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
        setConfirm(valueStatus&&vitalSign!=="")
    }, [lowThreshold, highThreshold, vitalSign]);

    return (
        <Dialog
            open={openDialog===ParaName.VITAL_SIGN}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                关键生理指标过滤器
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.itemContent}>
                    <Typography>检查类型:</Typography>
                    <FormControl style={{marginLeft: 20}}>
                        <Select
                            style={{width:100}}
                            onChange={handleChange}
                        >
                            <MenuItem value={"systolicBloodPressure"}>收缩压</MenuItem>
                            <MenuItem value={"diastolicBloodPressure"}>舒张压</MenuItem>
                            <MenuItem value={"bmi"}>BMI</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.itemContent} style={{marginTop: 20}}>
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
                        {unit}
                    </Typography>
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

export default VitalSignFilter;