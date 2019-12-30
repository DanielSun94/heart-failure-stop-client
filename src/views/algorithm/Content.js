import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import PlatformSelect from  './Content/PlatformSelect';
import AccessControl from  './Content/AccessControl';
import DocPreview from  './Content/DocPreview';
import ModelConfigManagement from  './Content/ModelConfigManagement';
import ModelDocumentManagement from  './Content/ModelDocumentManagement';
import ModelFileManagement from  './Content/ModelFileManagement';
import PreprocessingManagement from  './Content/PreprocessingManagement';
import SubmitPanel from  './Content/SubmitPanel';
import {
    Typography,
    colors,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        height: "4%",
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    modelModify: {
        height: '96%',
        width: '50%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'start',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    docPreview: {
        height: '96%',
        width: '50%',
    },
    platform: {
        height: '8%',
        width: '100%',
    },
    modelFile: {
        height: '8%',
        width: '100%',
    },
    modelConfig: {
        height: '8%',
        width: '100%',
    },
    preprocessModule: {
        height: '8%',
        width: '100%',
    },
    modelDoc: {
        height: '8%',
        width: '100%',
    },
    accessControl: {
        height: '12%',
        width: '100%',
    },
    submitPanel: {
        height: '8%',
        width: '100%',
    },
}));

const Content = ({selectedMainCateGory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory})=> {
    const classes = useStyles();
    const [selectedPlatform, setPlatform] = useState('');
    const platFormList = ['Tensorflow', "Pytorch", 'Sklearn'];

    const [isUpdated, setIsUpdate] = useState(false);
    const [modelFile, setModelFile] = useState('notUpdate');
    const [modelConfig, setModelConfig] = useState('notUpdate');
    const [preprocessModule, setPreprocessModule] = useState('notUpdate');
    const [modelDoc, setModelDoc] = useState('notUpdate');
    const [accessControl, setAccessControl] = useState('notUpdate');

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    算法管理
                </Typography>
            </div>
            <div className={classes.modelModify}>
                <div className={classes.platform}>
                    <PlatformSelect platformList={platFormList} selectedPlatform={selectedPlatform} setPlatform={setPlatform}/>
                </div>
                <div className={classes.modelFile}>
                    <ModelFileManagement/>
                </div>
                <div className={classes.modelConfig}>
                    <ModelConfigManagement/>
                </div>

                <div className={classes.preprocessModule}>
                    <PreprocessingManagement/>
                </div>
                <div className={classes.modelDoc}>
                    <ModelDocumentManagement/>
                </div>
                <div className={classes.accessControl}>
                    <AccessControl/>
                </div>
                <div className={classes.submitPanel}>
                    <SubmitPanel/>
                </div>
            </div>
            <div className={classes.docPreview}>
                <DocPreview/>
            </div>
        </div>
    )
};

export default Content;