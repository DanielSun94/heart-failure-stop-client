import React, {useEffect} from 'react';
import PlatformSelect from './Content/ModelUpdate/PlatformSelect';
import AccessControl from './Content/ModelUpdate/AccessControl';
import ModelConfigManagement from './Content/ModelUpdate/ModelConfigManagement';
import ModelDocumentManagement from './Content/ModelUpdate/ModelDocumentManagement';
import ModelFileManagement from './Content/ModelUpdate/ModelFileManagement';
import PreprocessingManagement from './Content/ModelUpdate/PreprocessingManagement';
import {getModelInfo} from '../../actions/algorithmManagementAction'
import {
    Typography,
    colors
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteModel from "./Content/ModelUpdate/DeleteModel";
import ModelInfo from "./Content/ModelUpdate/ModelInfo";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(() => ({
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
        width: '60%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'start',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    modelInfo: {
        height: '96%',
        width: '40%',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
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

const Content = ({selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory,
                     setMainCategory, setAlgorithmMainCategory, setAlgorithmSubCategory})=> {
    const classes = useStyles();
    const dispatch = useDispatch();
    const modelInfo = useSelector(state=>state.algorithm.modelInfo);
    useEffect(()=>{
        dispatch(getModelInfo(selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory))
        }, [selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory]);

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    算法管理
                </Typography>
            </div>
            <div className={classes.modelInfo}>
                <ModelInfo modelInfo={modelInfo}/>
            </div>
            <div className={classes.modelModify}>
                <div className={classes.platform}>
                    <PlatformSelect
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
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
                    <AccessControl
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                    />
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
                    <DeleteModel
                        mainCategory={selectedMainCategory}
                        algorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmMainCategory={selectedAlgorithmMainCategory}
                        setMainCategory={setMainCategory}
                        setAlgorithmMainCategory={setAlgorithmMainCategory}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                    />
                </div>
            </div>
        </div>
    )
};

export default Content;