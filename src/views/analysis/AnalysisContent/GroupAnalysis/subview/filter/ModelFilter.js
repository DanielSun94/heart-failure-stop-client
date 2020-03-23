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
} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import {useSelector} from 'react-redux';
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

const ModelFilter  = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                          previousContent}) =>{
    // modelFilter目前仅支持对风险评估模型的筛选（在modelListConvert函数中实现），如果以后有其它类型模型的需求，则到时候再做
    // item = [isInherit, "machineLearning", unifiedModelName, platform, lowThreshold, highThreshold, name]
    const classes = useStyles();
    const allModels = useSelector(state=>state.algorithm.algorithmList);
    const user = useSelector(state=>state.session.user.userName);
    const modelInfoList = modelListConvert(allModels, user);
    const [selectedModel, setSelectedModel] = useState(constraintType==='edit'?previousContent[2]:"");
    const [modelChineseName, setModelChineseName] = useState(constraintType==='edit'?previousContent[6]:"");
    const [lowThreshold, setLowThreshold] = useState(constraintType==='edit'?previousContent[4]:"");
    const [highThreshold, setHighThreshold] = useState(constraintType==='edit'?previousContent[5]:"");
    const [platform, setPlatform] = useState(constraintType==='edit'?previousContent[3]:"");
    const [canConfirm, setConfirm] = useState(false);

    useEffect(()=>{
        if(modelInfoList&&modelInfoList.length>0){
            setModelChineseName(modelInfoList[0][1]);
            setSelectedModel(modelInfoList[0][0]);
            setPlatform(modelInfoList[0][2])
        }
    }, [modelInfoList]);

    const handleConfirm=()=>{
        if(constraintType==="add"){
            addConstraint([false, ParaName.MACHINE_LEARNING, selectedModel, platform, lowThreshold, highThreshold,
                modelChineseName])
        }
        else if(constraintType==="edit"){
            editConstraint(index, [false, ParaName.MACHINE_LEARNING, selectedModel, platform, lowThreshold, highThreshold,
                modelChineseName])
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
        setConfirm(valueStatus&&selectedModel!=="")
    }, [lowThreshold, highThreshold, selectedModel]);

    const handleChange = (event)=>{
        const index = event.target.value;
        setModelChineseName(modelInfoList[index][1]);
        setSelectedModel(modelInfoList[index][0]);
        setPlatform(modelInfoList[index][2])
    };

    return (
        <Dialog
            open={openDialog===ParaName.MACHINE_LEARNING}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                模型过滤器
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.itemContent}>
                    <Typography>模型:</Typography>
                    <FormControl style={{marginLeft: 20, width:300}}>
                        <Select
                            native
                            onChange={handleChange}
                            value={modelChineseName}
                        >
                            {modelInfoList.map((item, index)=>
                                <option key={index} value={index}>{item[1]}</option>)}
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
                        %
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

const modelListConvert =(modelList, user)=>{
    const modelInfoList = [];
    for(const model of modelList){
        const createUser = model.createUser;
        const accessControl = model.accessControl;
        if(accessControl==='close'){
            continue
        }
        if(accessControl==='private'&&user!==createUser){
            continue
        }
        if(model.mainCategory!=="riskAssessment"){
            continue
        }
        const unifiedModelName = model.mainCategory+"_"+model.modelEnglishName+"_"+model.modelEnglishFunctionName;
        const modelChineseName = "风险评估 "+model.modelChineseName+" "+model.modelChineseFunctionName;
        modelInfoList.push([unifiedModelName, modelChineseName, model.platform])
    }
    return modelInfoList
};

export default ModelFilter;