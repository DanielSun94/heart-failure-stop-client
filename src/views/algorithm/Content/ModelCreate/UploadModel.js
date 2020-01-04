import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/styles";
import UploadComponent from "./Component/UploadComponent";
import {MODEL_CONFIG, MODEL_DOC, MODEL_FILE, MODEL_PREPROCESS} from "../../../../actions/algorithmManagementAction";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
    },
    item: {
        height: '8%',
        width: '100%',
    },
    buttonGroup: {
        marginTop: 40,
        height: '10%',
        width: '46%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
}));

const UploadModelFile = ({handleNext, handleBack, setModelFileMap, modelMap})=>{
    const classes = useStyles();

    const [nextStepStatus, setNextStepStatus] = useState(null);
    const [modelFile, setModelFile] = useState(modelMap['modelFile']);
    const [modelDoc, setModelDoc] = useState(modelMap['modelDoc']);
    const [modelConfig, setModelConfig] = useState(modelMap['modelConfig']);
    const [modelPreprocess, setModelPreprocess] = useState(modelMap['modelPreprocess']);


     useEffect(()=>{
            setModelFileMap({
                modelFile: modelFile,
                modelDoc: modelDoc,
                modelConfig: modelConfig,
                modelPreprocess: modelPreprocess
            });

            if(modelFile&&modelDoc&&modelConfig&&modelPreprocess)
                setNextStepStatus(true);
            else
                setNextStepStatus(false);
        }, [modelFile, modelDoc, modelConfig, modelPreprocess]);


    return (
        <div className={classes.root}>
            <div className={classes.item} style={{marginTop: 16}}>
                <UploadComponent
                    fileType={MODEL_FILE}
                    setFile={setModelFile}
                    file={modelFile}
                />
            </div>
            <div className={classes.item}>
                <UploadComponent
                    fileType={MODEL_CONFIG}
                    setFile={setModelConfig}
                    file={modelConfig}
                />
            </div>
            <div className={classes.item}>
                <UploadComponent
                    fileType={MODEL_PREPROCESS}
                    setFile={setModelPreprocess}
                    file={modelPreprocess}
                />
            </div>
            <div className={classes.item}>
                <UploadComponent
                    fileType={MODEL_DOC}
                    setFile={setModelDoc}
                    file={modelDoc}
                />
            </div>
            <div className={classes.buttonGroup}>
                <Button
                    variant="outlined"
                    color="default"
                    onClick={handleBack}
                >
                    上一步
                </Button>
                <Button
                    style={{marginLeft: 16}}
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    disabled={!nextStepStatus}
                >
                    下一步
                </Button>
            </div>
        </div>
    )
};

export default UploadModelFile;