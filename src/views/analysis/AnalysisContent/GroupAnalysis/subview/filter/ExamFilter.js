import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    TextField,
    FormControl
} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import Select from '@material-ui/core/Select';
import {makeStyles} from "@material-ui/styles";


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
        width: 700,
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    itemContentDetail: {
        width: 100,
    },
}));

const ExamFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                        previousContent}) =>{
    const classes = useStyles();
    // item = [isInherit, "exam", "type", int low_threshold, int high_threshold]
    // 目前Exam Filter只支持对超声心动图的查询，等待后期数据能支持了，再加入其他的
    const [examType, setExamType] = useState("");
    const [lowThreshold, setLowThreshold] = useState("");
    const [highThreshold, setHighThreshold] = useState("");
    const [inputLegal, setInput] = useState(false);

    useEffect(()=>{
        if(constraintType==='edit'){
            setExamType(previousContent[2]);
            setLowThreshold(previousContent[3].toString());
            setHighThreshold(previousContent[4].toString());
        }
    },[]);

    useEffect(()=>{
        // 检查输入是否合法
        setInput(false);
        if(lowThreshold===""&&highThreshold===""){
            setInput(false)
        }
        let reg = /^\+?[1-9][0-9]*$/;

        // 当输入是0-100的整数的时候，合法
        if(reg.test(lowThreshold)&&reg.test(highThreshold)){
            if(Number.parseInt(lowThreshold)>=0&&Number.parseInt(highThreshold)<=100){
                if(Number.parseInt(lowThreshold)<Number.parseInt(highThreshold)){
                    setInput(true)
                }
            }
        }
        if(reg.test(lowThreshold)&&highThreshold===""){
            if(Number.parseInt(lowThreshold)>=0){
                setInput(true)
            }
        }
        if(lowThreshold===""&&reg.test(highThreshold)){
            if(Number.parseInt(highThreshold)<=100){
                setInput(true)
            }
        }

        // 最后检查examType
        if(examType===""){
            setInput(false)
        }
    }, [lowThreshold, highThreshold, examType]);

    const handleChange = event => {
        const name = event.target.value;
        setExamType(name)
    };

    return (
        <Dialog
            open={openDialog===ParaName.EXAM}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                检查过滤器
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.itemContent}>
                    <Typography>检查类型</Typography>
                    <FormControl style={{marginLeft: 20}}>
                        <Select
                            native
                            value={examType}
                            onChange={handleChange}
                        >
                            <option value={""}>/</option>
                            <option value={"射血分数"}>射血分数</option>
                        </Select>
                    </FormControl>
                    <Typography style={{marginLeft: 20}}>值区间</Typography>
                    <TextField className={classes.itemContentDetail}
                               label={""}
                               style={{marginLeft: 20}}
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
                        onClick={()=> {
                            let low = lowThreshold===""?-1:Number.parseInt(lowThreshold);
                            let high = highThreshold===""?-1:Number.parseInt(highThreshold);
                            if(constraintType==="add"){
                                addConstraint([false, ParaName.EXAM, examType, low, high])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [false, ParaName.EXAM, examType, low, high])
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

export default ExamFilter;