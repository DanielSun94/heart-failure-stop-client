import React, {useState} from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {makeStyles} from "@material-ui/styles";
import {MODEL_CONFIG} from "../../../actions/algorithmManagementAction";
import HintDialog from "./Components/HintDialog";
import DownloadComponent from "./Components/DownloadComponent";
import {useSelector} from "react-redux";
import UploadComponent from "./Components/UploadComponent";
import UploadInfoComponent from "./Components/UploadInfoComponent";

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
}));

const ModelConfigManagement = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;
    const [modelConfigName, setModelConfigName] = useState("未上传");
    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updateModelConfig[unifiedModelName]);

    return (
        <div className={classes.root}>
            <div className={classes.configLabel}>
                <Typography variant="h5">
                    配置文件：
                </Typography>
            </div>
            <div className={classes.configName}>
                <Typography variant="h6">
                    {modelConfigName}
                </Typography>
            </div>
            <div className={classes.updateTime}>
                <UploadInfoComponent
                    status={updateStatus}
                    updateTime={updateTime}
                />
            </div>
            <div className={classes.buttonGroup}>
                <UploadComponent
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    fileType={MODEL_CONFIG}
                    setName={setModelConfigName}
                />
                <DownloadComponent
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    fileType={MODEL_CONFIG}
                />
                <HintDialog fileType={MODEL_CONFIG} />
            </div>
        </div>
    )
};

export default ModelConfigManagement;