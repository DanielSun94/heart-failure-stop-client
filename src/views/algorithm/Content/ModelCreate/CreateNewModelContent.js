import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import ModelBasicInfo from "./ModelBasicInfo";
import UploadModelFile from "./UploadModel";
import ModelAccessControl from "./ModelAccessControl";
import {useDispatch, useSelector} from "react-redux";
import {createNewModel} from "../../../../actions/algorithmManagementAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%"
    },
    content:{
        width: "100%",
        height: 600,
        marginBottom: theme.spacing(2),
    },
    waitDialog: {
        display:"flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitDiv: {
        width: "32%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));


const CreateNewModel = ({changeToUpdatePage, setBlockAlgorithmChange})=>{
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [modelNameMap, setModelNameMap] = useState({
        'platform': "",
        'modelCategory': "",
        'modelChineseName': "",
        'modelEnglishName': "",
        'modelEnglishFunction': "",
        'modelChineseFunction': "",
    });
    const [modelFileMap, setModelFileMap] = useState({});
    const [accessControl, setAccessControl] = useState("close");

    const [confirmDialog, setConfirmDialog]=useState(false);
    const [waitDialog, setWaitDialog]=useState(false);
    const [exitDialog, setExitDialog]=useState(false);

    const submit = () =>{
        // submit 中需要完成1.向后台提交创建命令，2.接触对Main Category和Sub category的锁定
        // 3.重新获取Algorithm List
        setConfirmDialog(true);
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical">
                <Step key={"setModelName"}>
                    <StepLabel>{"模型名称设定"}</StepLabel>
                    <StepContent>
                        <div className={classes.content}>
                            <ModelBasicInfo
                                jumpNext={handleNext}
                                setModelNameMap={setModelNameMap}
                                modelNameMap={modelNameMap}
                            />
                        </div>
                    </StepContent>
                </Step>
                <Step key={"uploadModel"}>
                    <StepLabel>{"上传模型文件"}</StepLabel>
                    <StepContent>
                        <div className={classes.content}>
                            <UploadModelFile
                                handleBack={handleBack}
                                handleNext={handleNext}
                                setModelFileMap={setModelFileMap}
                                modelMap={modelFileMap}
                            />
                        </div>
                    </StepContent>
                </Step>
                <Step key={"accessControl"}>
                    <StepLabel>{"访问权限控制"}</StepLabel>
                    <StepContent>
                        <div className={classes.content}>
                            <ModelAccessControl
                                handleBack={handleBack}
                                setAccessControl={setAccessControl}
                                submit={submit}
                                accessControl={accessControl}
                            />
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
            <div className={classes.exitDiv}>
                <Button onClick={()=>{setExitDialog(true)}} color="primary" autoFocus>
                    退出设置
                </Button>
            </div>
           <ConfirmDialog
               confirmDialog={confirmDialog}
               setConfirmDialog={setConfirmDialog}
               setWaitDialog={setWaitDialog}
               modelNameMap={modelNameMap}
               modelFileMap={modelFileMap}
               accessControl={accessControl}
               setBlockAlgorithmChange={setBlockAlgorithmChange}
           />
           <WaitDialog
               waitDialog={waitDialog}
               changeToUpdatePage={changeToUpdatePage}
               setWaitDialog={setWaitDialog}
           />
            <ExitDialog
                exitDialog={exitDialog}
                setExitDialog={setExitDialog}
                changeToUpdatePage={changeToUpdatePage}
            />
        </div>
    );
};

const ConfirmDialog = ({confirmDialog, setConfirmDialog, setWaitDialog, modelNameMap, modelFileMap, accessControl,
                           setBlockAlgorithmChange}) => {
    const dispatch = useDispatch();
    const handleClose = ()=>{
        setConfirmDialog(false);
    };
    const confirmSubmit = () =>{
        dispatch(createNewModel(modelNameMap, modelFileMap, accessControl));
        setConfirmDialog(false);
        setWaitDialog(true);
        setBlockAlgorithmChange(false)
    };
    return(
        <Dialog
            open={confirmDialog}
            fullScreen={false}
            onClose={handleClose}
        >
            <DialogTitle>{"提交确认"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"是否提交保存"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmSubmit} color="primary" autoFocus>
                    确认
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const ExitDialog = ({changeToUpdatePage, exitDialog, setExitDialog}) => {
    return(
        <Dialog
            open={exitDialog}
            fullScreen={false}
            onClose={()=>setExitDialog(false)}
        >
            <DialogTitle>{"退出确认"}</DialogTitle>
            <DialogContent>
                注意，退出后会丢失当前界面中未保存的信息
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setExitDialog(false); changeToUpdatePage()}} color="primary" autoFocus>
                    确认
                </Button>
                <Button onClick={()=>{setExitDialog(false)}} color="primary" autoFocus>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const WaitDialog = ({waitDialog, setWaitDialog, changeToUpdatePage}) => {
    const updateStatus = useSelector(state=>state.algorithm.createStatus);
    const classes = useStyles();

    let content;
    if(updateStatus==="complete"){
        content = (
            <div >
                <Typography variant="h6">
                    上传成功
                </Typography>
            </div>
        )
    }
    else if(updateStatus==="inProgress"){
        content = (
            <div >
                <CircularProgress size={25} />
                <Typography variant="h6">
                    上传中
                </Typography>
            </div>
        )
    }
    else{
        content = (
            <div >
                <Typography variant="h6">
                    上传失败
                </Typography>
            </div>
        )
    }

    return(
        <Dialog
            className={classes.waitDialog}
            open={waitDialog}
            fullScreen={false}
            onClose={()=>setWaitDialog(false)}
        >
            <DialogTitle>{"上传等待"}</DialogTitle>
            <DialogContent>
                    {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setWaitDialog(false); changeToUpdatePage()}} color="primary" autoFocus>
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    )
};


export default CreateNewModel;
