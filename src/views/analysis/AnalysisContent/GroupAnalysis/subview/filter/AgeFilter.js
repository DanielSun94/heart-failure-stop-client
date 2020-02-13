import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    TextField
} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import ParaName from "../../../../../../utils/ParaName";


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
        width: 300,
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    itemContentDetail: {
        width: 100,
    },
}));

const AgeFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = ["age", int low_threshold, int high_threshold]
    // 在添加条件时，idx应当为空，当修改时，才需要idx
    const classes = useStyles();

    const [lowThreshold, setLowThreshold] = useState("");
    const [highThreshold, setHighThreshold] = useState("");
    const [inputLegal, setInput] = useState(false);

    useEffect(()=>{
        // 检查输入是否合法
        setInput(false);
        if(lowThreshold===""&&highThreshold===""){
            setInput(false)
        }
        let reg = /^\+?[1-9][0-9]*$/;

        // 当输入是0-120的整数的时候，合法
        if(reg.test(lowThreshold)&&reg.test(highThreshold)){
            if(Number.parseInt(lowThreshold)>=0&&Number.parseInt(highThreshold)<=120){
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
            if(Number.parseInt(highThreshold)<=120){
                setInput(true)
            }
        }
    }, [lowThreshold, highThreshold]);

    return (
        <Dialog
            open={openDialog===ParaName.AGE}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                年龄区间
            </DialogTitle>
            <DialogContent dividers>
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
                        岁
                    </Typography>
                </div>
                <Typography style={{marginTop: 10}} variant="h6">
                    年龄必须是0-120之间的整数，上（下）限为空值时，代表不具体设定上（下）限，只有输入合法时才可按确认键
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            let low = lowThreshold===""?-1:Number.parseInt(lowThreshold);
                            let high = highThreshold===""?-1:Number.parseInt(highThreshold);
                            if(constraintType==="add"){
                                addConstraint([ParaName.AGE, low, high])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [ParaName.AGE, low, high])
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

export default AgeFilter;