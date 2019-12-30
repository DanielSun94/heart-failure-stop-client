import React from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
    },
    docLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    docName: {
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

const UploadDoc = () => {
    const classes = useStyles();

    const uploadDoc = (event) => {
        console.log(event.target)
    };

    return (
        <div>
            <input
                accept=".zip"
                className={classes.input}
                id="upload-doc"
                type="file"
                onChange={uploadDoc}
            />
            <Tooltip title="上传文档">
                <label htmlFor="upload-doc">
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

const DownloadDoc = () => {
    const downloadDoc = ()=>{
        console.log('Download Doc');
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
        <Tooltip title="下载文档">
            <label
                htmlFor="download-doc"
            >
                <IconButton
                    color="primary"
                    component="Link"
                    onClick={downloadDoc}
                >
                    <CloudDownloadIcon />
                </IconButton>
            </label>
        </Tooltip>
    )
};

const ModelDocumentManagement = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.docLabel}>
                <Typography variant="h5">
                    模型文档：
                </Typography>
            </div>
            <div className={classes.docName}>
                <Typography variant="h6">
                    HawkesRNNDoc.md
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
                <UploadDoc/>
                <DownloadDoc/>
                <Question />
            </div>
        </div>
    )
};

export default ModelDocumentManagement;