import React, {useEffect} from 'react';
import PlatformSelect from './PlatformSelect';
import AccessControl from './AccessControl';
import ModelDocumentManagement from './ModelDocumentManagement';
import ModelFileManagement from './ModelFileManagement';
import PreprocessingManagement from './PreprocessingManagement';
import {getModelInfo} from '../../../../actions/algorithmManagementAction'
import {
    Typography,
    colors
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteModel from "./DeleteModel";
import ModelInfo from "./ModelInfo";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

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

const UpdateModelContent = ({setMainCategory, setAlgorithmMainCategory, setAlgorithmSubCategory})=> {
    const {modelCategory, modelName, modelFunction} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const modelInfo = useSelector(state=>state.algorithm.modelInfo);
    useEffect(()=>{
        dispatch(getModelInfo(modelCategory, modelName, modelFunction))
        }, [modelFunction, modelName, modelCategory]);

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
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
                    />
                </div>
                <div className={classes.modelFile}>
                    <ModelFileManagement
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
                    />
                </div>
                <div className={classes.preprocessModule}>
                    <PreprocessingManagement
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
                    />
                </div>
                <div className={classes.modelDoc}>
                    <ModelDocumentManagement
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
                    />
                </div>
                <div className={classes.accessControl}>
                    <AccessControl
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
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
                        mainCategory={modelCategory}
                        algorithmSubCategory={modelFunction}
                        algorithmMainCategory={modelName}
                        setMainCategory={setMainCategory}
                        setAlgorithmMainCategory={setAlgorithmMainCategory}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                    />
                </div>
            </div>
        </div>
    )
};

export default UpdateModelContent;