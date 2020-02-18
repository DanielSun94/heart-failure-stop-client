import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent, DialogTitle, Button, Typography, TextField} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import {makeStyles} from "@material-ui/styles";
import {strToDate} from "../../../../../../utils/queryUtilFunction";

const useStyles = makeStyles((theme) => ({
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
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    itemContentDetail: {
        width: 100,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
}));

const AdmissionTimeFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                                 previousContent}) =>{
    // item = ["admissionTime", String startTime, String endTime]
    // string format: "yyyy-MM-dd", "-1" if not set.
    // 前端中，不设置-1这个值，当不设定时,默认设置为1990和2050年两个最大的值
    const classes = useStyles();
    let currentTime = new Date();
    const year = currentTime.getFullYear();
    let month = currentTime.getMonth()+1;//获取当前月份(0-11,0代表1月)
    let day = currentTime.getDate();//获取当前日(1-31)
    if (month < 10) {month ="0" + month;}
    if (day < 10) {day ="0" + day;}

    const [startTime, setStartTime] = useState(previousContent?previousContent[1]:"1990-01-01");
    const [endTime, setEndTime] = useState(previousContent?previousContent[2]:year+"-"+ month+"-"+day);
    const [inputLegal, setInput] = useState(false);

    useEffect(()=>{
        // 检查输入是否合法
        setInput(false);
        let startTimeDate = strToDate(startTime, "-");
        let endTimeDate = strToDate(endTime, "-");

        if((endTimeDate.getTime()-startTimeDate.getTime())>0){
            setInput(true)
        }
    }, [startTime, endTime]);

    return (
        <Dialog
            open={openDialog===ParaName.ADMISSION_TIME}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                入院时间区间
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.itemContent}>
                    <Typography className={classes.itemLabel} variant="h5">
                        入院时间
                    </Typography>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            type="date"
                            className={classes.textField}
                            defaultValue={startTime}
                            style={{marginLeft: 20}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>{
                                if(event.target.value!==""){
                                    setStartTime(event.target.value);
                                }
                            }}
                        />
                    </form>
                    <Typography className={classes.itemLabel} style={{marginLeft: 20}} variant="h5">
                        至
                    </Typography>
                    <form className={classes.container} noValidate>
                        <TextField
                            type="date"
                            className={classes.textField}
                            defaultValue={endTime}
                            style={{marginLeft: 20}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>{
                                if(event.target.value!==""){
                                    setEndTime(event.target.value);
                                }
                            }}
                        />
                    </form>
                </div>
                <Typography style={{marginTop: 10}} variant="h6">
                    上（下）限为空值时，代表不具体设定上（下）限，只有输入合法时才可按确认键
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            if(constraintType==="add"){
                                addConstraint([ParaName.ADMISSION_TIME, startTime, endTime])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [ParaName.ADMISSION_TIME, startTime, endTime])
                            }
                            setOpenDialog(null)
                        }}
                        disabled={!inputLegal}
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

export default AdmissionTimeFilter;