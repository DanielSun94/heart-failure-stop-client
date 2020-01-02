import React, {useState} from "react";
import {
    IconButton,
    Tooltip,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import {useSelector, useDispatch} from 'react-redux';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import UpdateInfoComponent from "./UpdateInfoComponent";
import {makeStyles} from "@material-ui/styles";
import {
    FILE_NAME_ERROR,
    MODEL_FILE,
    modelUpdatePost, updateModelUpdateInfo
} from "../../../actions/algorithmManagementAction"
import RouteName from "../../../utils/RouteName";
import {queryParamsTrans} from "../../../utils/queryUtilFunction";


const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
    },
    modelLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    modelName: {
        width: "35%",
        overflow: "hidden"
    },
    updateTime: {
        width: "20%",
    },
    buttonGroup: {
        width: "20%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
        display: 'none',
    }
}));

const UploadModel = ({mainCategory, algorithmMainCategory, algorithmSubCategory, setModelFileName}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;
    
    const uploadModel = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        if(fileName==="model.zip"){
            setModelFileName(fileName);
            dispatch(modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, file));
        }
        else{
            dispatch(updateModelUpdateInfo(MODEL_FILE, FILE_NAME_ERROR, unifiedModelName, Date.now()));
        }
    };

    return (
        <div>
            <input
                accept=".zip"
                className={classes.input}
                id="upload-model"
                type="file"
                onChange={uploadModel}
            />
            <Tooltip title="上传模型">
                <label htmlFor="upload-model">
                    <IconButton color="primary" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                </label>
            </Tooltip>
        </div>
    )
};

const Question = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Tooltip title="帮助">
            <div>
                <IconButton color="primary" component="span">
                    <HelpOutlineIcon
                        onClick={handleClickOpen}
                    />
                </IconButton>
                <Dialog
                    open={open}
                    fullScreen={false}
                    onClose={handleClose}
                >
                    <DialogTitle>{"上传模型文件须知"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            模型文件名必须为model.zip。模型文件结构必须符合各平台标准结构（具体细节之后补充）
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Tooltip>
    )
};

const DownloadModel = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    // 由于下载模型不涉及改变React APP状态，所以就不用Redux管理了，直接在这里写下载代码
    const param = {mainCategory: mainCategory, modelNameEnglish: algorithmMainCategory,
        modelFunctionEnglish: algorithmSubCategory};
    let url = RouteName.B_ALGORITHM_MANAGEMENT + RouteName.DOWNLOAD_MODEL_FILE+queryParamsTrans(param);
    let token = useSelector(state=>state.session.authenticToken);

    const downloadModel = ()=>{

        let header = {
            'Authorization': token,
        };
        fetch(url, {headers:header})
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'model.zip';
                    a.click();
                });
            });
    };
    return (
        <Tooltip title="下载模型">
            <label
                htmlFor="download-model"
            >
                <IconButton
                    color="primary"
                    component="Link"
                    onClick={downloadModel}
                >
                    <CloudDownloadIcon />
                </IconButton>
            </label>
        </Tooltip>
    )
};

const ModelFileManagement = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;

    const [modelFileName, setModelFileName] = useState("未上传");
    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updateModelFile[unifiedModelName]);

    return (
        <div className={classes.root}>
            <div className={classes.modelLabel}>
                <Typography variant="h5">
                    模型文件：
                </Typography>
            </div>
            <div className={classes.modelName}>
                <Typography variant="h6">
                    {modelFileName}
                </Typography>
            </div>
            <div className={classes.updateTime}>
                <UpdateInfoComponent
                    status={updateStatus}
                    updateTime={updateTime}
                />
            </div>
            <div className={classes.buttonGroup}>
                <UploadModel
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    setModelFileName={setModelFileName}
                />
                <DownloadModel
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                />
                <Question />
            </div>
        </div>
    )
};

export default ModelFileManagement;