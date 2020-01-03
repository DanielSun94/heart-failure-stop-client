import React, {useState} from "react";
import {
    Typography
} from "@material-ui/core";
import {useSelector} from 'react-redux';
import {makeStyles} from "@material-ui/styles";
import {
    MODEL_FILE,
} from "../../../../actions/algorithmManagementAction"
import HintDialog from "../Components/HintDialog";
import DownloadComponent from "../Components/DownloadComponent";
import UploadComponent from "../Components/UploadComponent";
import UploadInfoComponent from "../Components/UploadInfoComponent";


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
}));



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
                    fileType={MODEL_FILE}
                    setName={setModelFileName}
                />
                <DownloadComponent
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    fileType={MODEL_FILE}
                />
                <HintDialog fileType={MODEL_FILE} />
            </div>
        </div>
    )
};

export default ModelFileManagement;