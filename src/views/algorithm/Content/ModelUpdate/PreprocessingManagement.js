import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {MODEL_PREPROCESS} from "../../../../actions/algorithmManagementAction";
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

const PreprocessingManagement = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;
    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updatePreprocess[unifiedModelName]);

    return (
        <div className={classes.root}>
            <div className={classes.preprocessingLabel}>
                <Typography variant="h5">
                    预处理文件：
                </Typography>
            </div>
            <div className={classes.preprocessingName}>
                <Typography variant="h6">
                    preprocessing.zip
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
                    fileType={MODEL_PREPROCESS}
                />
                <DownloadComponent
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    fileType={MODEL_PREPROCESS}
                />
                <HintDialog fileType={MODEL_PREPROCESS} />
            </div>
        </div>
    )
};

export default PreprocessingManagement;