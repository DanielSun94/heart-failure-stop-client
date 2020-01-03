import React, {useState} from "react";
import {
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {MODEL_DOC} from "../../../../actions/algorithmManagementAction";
import HintDialog from "../Components/HintDialog";
import DownloadComponent from "../Components/DownloadComponent";
import {useSelector} from "react-redux";
import UploadComponent from "../Components/UploadComponent";
import UploadInfoComponent from "../Components/UploadInfoComponent";

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
}));

const ModelDocumentManagement = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;
    const [modelDocName, setModelDocName] = useState("未上传");
    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updateModelDoc[unifiedModelName]);

    return (
        <div className={classes.root}>
            <div className={classes.docLabel}>
                <Typography variant="h5">
                    模型文档：
                </Typography>
            </div>
            <div className={classes.docName}>
                <Typography variant="h6">
                    {modelDocName}
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
                    fileType={MODEL_DOC}
                    setName={setModelDocName}
                />
                <DownloadComponent
                    mainCategory={mainCategory}
                    algorithmMainCategory={algorithmMainCategory}
                    algorithmSubCategory={algorithmSubCategory}
                    fileType={MODEL_DOC}
                />
                <HintDialog fileType={MODEL_DOC} />
            </div>
        </div>
    )
};

export default ModelDocumentManagement;