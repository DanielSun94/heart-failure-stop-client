import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import HintDialog from "./HintDialog";
import UploadInfoComponent from "./UploadInfoComponent";
import {
    MODEL_PREPROCESS,
    MODEL_DOC,
    MODEL_FILE,
    FILE_NAME_ERROR,
    SUCCESS,
    NOT_UPLOAD
} from "../../../../../actions/algorithmManagementAction";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
    label:{
        width: "10%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
    fileName:{
        width: "15%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
    uploadStatus:{
        width: "15%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
    upload:{
        width: "15%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
    }
}));

const uploadInfoMap = {
    updateModelFile: {toolTipTitle: "上传模型", fileName: 'model.zip', label: "模型文件："},
    updateDataConfig: {toolTipTitle: "上传配置", fileName: 'config.yml', label: "模型配置："},
    updateModelDoc: {toolTipTitle: "上传文档", fileName: 'doc.md', label: "模型文档："},
    updateModelPreprocess: {toolTipTitle: "上传预处理文件", fileName: 'preprocess.zip', label: "预处理模块："},
};

const UploadComponent = ({fileType, setFile, file}) => {
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState(file?SUCCESS:NOT_UPLOAD);

    let content;
    switch (fileType) {
        case MODEL_FILE: content=uploadInfoMap.updateModelFile; break;
        case MODEL_PREPROCESS: content=uploadInfoMap.updateModelPreprocess; break;
        case MODEL_DOC: content=uploadInfoMap.updateModelDoc; break;
        default: content="NO DATA";
    }

    const uploadModel = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        if(fileName===content.fileName){
            setFile(file);
            setUploadStatus(SUCCESS)
        }
        else{
            setUploadStatus(FILE_NAME_ERROR);
            setFile(null);
        }
    };

    // 下面那个value置空是为了每次上传完文件后都重设value，不然onChange函数不会第二次响应同样名称的文件上传请求
    return (
        <div className={classes.root}>
            <input
                id={"upload-"+fileType}
                className={classes.input}
                type="file"
                value={''}
                onChange={uploadModel}
            />
            <div className={classes.label}>
                <Typography variant="h5">
                    {content.label}
                </Typography>
            </div>
            <div className={classes.fileName}>
                <Typography variant="h6">
                    {content.fileName}
                </Typography>
            </div>
            <div className={classes.uploadStatus}>
                <UploadInfoComponent
                    status={uploadStatus}

                />
            </div>
            <div className={classes.upload}>
                <Tooltip title={content.toolTipTitle}>
                    <label htmlFor={"upload-"+fileType}>
                        <IconButton color="primary" component="span">
                            <CloudUploadIcon />
                        </IconButton>
                    </label>
                </Tooltip>
                <HintDialog
                    fileType={fileType}
                />
            </div>
        </div>
    )
};

export default UploadComponent