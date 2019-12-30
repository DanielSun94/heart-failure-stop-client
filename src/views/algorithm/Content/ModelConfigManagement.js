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
    configLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    configName: {
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

const UploadConfig = () => {
    const classes = useStyles();

    const uploadConfig = (event) => {
        console.log(event.target)
    };

    return (
        <div>
            <input
                accept=".zip"
                className={classes.input}
                id="upload-config"
                type="file"
                onChange={uploadConfig}
            />
            <Tooltip title="上传配置">
                <label htmlFor="upload-config">
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

const DownloadConfig = () => {
    const downloadConfig = ()=>{
        console.log('Download Config');
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
                htmlFor="download-config"
            >
                <IconButton
                    color="primary"
                    component="Link"
                    onClick={downloadConfig}
                >
                    <CloudDownloadIcon />
                </IconButton>
            </label>
        </Tooltip>
    )
};

const ModelConfigManagement = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.configLabel}>
                <Typography variant="h5">
                    配置文件：
                </Typography>
            </div>
            <div className={classes.configName}>
                <Typography variant="h6">
                    HawkesRNNConfig.yml
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
                <UploadConfig/>
                <DownloadConfig/>
                <Question />
            </div>
        </div>
    )
};

export default ModelConfigManagement;