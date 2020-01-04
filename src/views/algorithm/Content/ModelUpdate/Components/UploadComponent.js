import {useDispatch} from "react-redux";
import {
    FILE_NAME_ERROR, MODEL_CONFIG, MODEL_DOC,
    MODEL_FILE, MODEL_PREPROCESS,
    modelUpdatePost,
    updateModelUpdateInfo
} from "../../../../../actions/algorithmManagementAction";
import {IconButton, Tooltip} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import RouteName from "../../../../../utils/RouteName";

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    }
}));

const uploadInfoMap = {
    updateModelFile: {toolTipTitle: "上传模型", uploadPath: RouteName.UPLOAD_MODEL_FILE, fileName: 'model.zip'},
    updateDataConfig: {toolTipTitle: "上传配置", uploadPath: RouteName.UPLOAD_MODEL_CONFIG, fileName: 'config.yml'},
    updateModelDoc: {toolTipTitle: "上传文档", uploadPath: RouteName.UPLOAD_MODEL_CONFIG, fileName: 'doc.md'},
    updateModelPreprocess: {toolTipTitle: "上传预处理文件", uploadPath: RouteName.UPLOAD_PREPROCESSING_MODULE, fileName: 'preprocess.zip'},
};

const UploadComponent = ({mainCategory, algorithmMainCategory, algorithmSubCategory, fileType}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;

    let content;
    switch (fileType) {
        case MODEL_FILE: content=uploadInfoMap.updateModelFile; break;
        case MODEL_PREPROCESS: content=uploadInfoMap.updateModelPreprocess; break;
        case MODEL_DOC: content=uploadInfoMap.updateModelDoc; break;
        case MODEL_CONFIG: content=uploadInfoMap.updateDataConfig; break;
        default: content="NO DATA";
    }

    const uploadModel = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        if(fileName===content.fileName){
            const path = content.uploadPath;
            dispatch(modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, file, fileType, path));
        }
        else{
            dispatch(updateModelUpdateInfo(fileType, FILE_NAME_ERROR, unifiedModelName, Date.now()));
        }
    };

    // 下面那个value置空是为了每次上传完文件后都重设value，不然onChange函数不会第二次响应同样名称的文件上传请求
    return (
        <div>
            <input
                id={"upload-"+unifiedModelName+"_"+fileType}
                className={classes.input}
                type="file"
                value={''}
                onChange={uploadModel}
            />
            <Tooltip title={content.toolTipTitle}>
                <label htmlFor={"upload-"+unifiedModelName+"_"+fileType}>
                    <IconButton color="primary" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                </label>
            </Tooltip>
        </div>
    )
};

export default UploadComponent