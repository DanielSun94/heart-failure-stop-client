import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import PlatformSelect from  './Content/PlatformSelect';
import AccessControl from  './Content/AccessControl';
import DocPreview from  './Content/DocPreview';
import ModelConfigManagement from  './Content/ModelConfigManagement';
import ModelDocumentManagement from  './Content/ModelDocumentManagement';
import ModelFileManagement from  './Content/ModelFileManagement';
import PreprocessingManagement from  './Content/PreprocessingManagement';
import {
    Typography,
    colors,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
        height: '16%',
        width: '100%',
    },
    deleteDiv: {
        height: "12%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    note: {
        height: "12%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
}));

const Content = ({selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory})=> {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    算法管理
                </Typography>
            </div>
            <div className={classes.modelModify}>
                <div className={classes.platform}>
                    <PlatformSelect/>
                </div>
                <div className={classes.modelFile}>
                    <ModelFileManagement
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
                </div>
                <div className={classes.modelConfig}>
                    <ModelConfigManagement
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
                </div>

                <div className={classes.preprocessModule}>
                    <PreprocessingManagement
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
                </div>
                <div className={classes.modelDoc}>
                    <ModelDocumentManagement
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
                </div>
                <div className={classes.accessControl}>
                    <AccessControl/>
                </div>
                <div className={classes.note}>
                    <Typography
                        style={{marginLeft:32}}
                        variant="h6"
                    >
                        注意，由于技术原因，模型文件更新后需等待约1分钟才可使用，其余修改即时生效
                    </Typography>
                </div>
                <div className={classes.deleteDiv}>
                    <Button
                        style={{marginRight:32}}
                        variant="contained"
                    >
                        删除模型
                    </Button>
                </div>
            </div>
            <div className={classes.docPreview}>
                <DocPreview/>
            </div>
        </div>
    )
};

export default Content;