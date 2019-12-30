import React from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {makeStyles} from "@material-ui/styles";
import DocPreview from "./DocPreview";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
    },
    preprocessingLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    preprocessingName: {
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

const UploadPreprocessing = () => {
    const classes = useStyles();

    const uploadPreprocessing = (event) => {
        console.log(event.target)
    };

    return (
        <div>
            <input
                accept=".zip"
                className={classes.input}
                id="upload-preprocessing"
                type="file"
                onChange={uploadPreprocessing}
            />
            <Tooltip title="上传预处理文件">
                <label htmlFor="upload-preprocessing">
                    <IconButton color="primary" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                </label>
            </Tooltip>
        </div>
    )
};

const Question = () => {
    return (
        <Tooltip title="帮助">
            <IconButton color="primary" component="span">
                <HelpOutlineIcon />
            </IconButton>
        </Tooltip>
    )
};

const DownloadPreprocessing = () => {
    const downloadPreprocessing = ()=>{
        console.log('Download Preprocessing');
        fetch('http://localhost:8080/employees/download')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'employees.json';
                    a.click();
                });
                //window.location.href = response.url;
            });
    };
    return (
        <Tooltip title="下载预处理文件">
            <label
                htmlFor="download-preprocessing"
            >
                <IconButton
                    color="primary"
                    component="Link"
                    onClick={downloadPreprocessing}
                >
                    <CloudDownloadIcon />
                </IconButton>
            </label>
        </Tooltip>
    )
};

const PreprocessingManagement = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.preprocessingLabel}>
                <Typography variant="h5">
                    预处理文件：
                </Typography>
            </div>
            <div className={classes.preprocessingName}>
                <Typography variant="h6">
                    HawkesRNNPreprocessing.zip
                </Typography>
            </div>
            <div className={classes.updateTime}>
                <Typography variant="overline">
                    上传成功，本次上传时间
                </Typography>
                <Typography variant="h6">
                    2019-12-30 10:58:20
                </Typography>
            </div>
            <div className={classes.buttonGroup}>
                <UploadPreprocessing/>
                <DownloadPreprocessing/>
                <Question />
            </div>
        </div>
    )
};

export default PreprocessingManagement;