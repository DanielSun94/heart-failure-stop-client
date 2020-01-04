import RouteName from "../../../../../utils/RouteName";
import {queryParamsTrans} from "../../../../../utils/queryUtilFunction";
import {useSelector} from "react-redux";
import {IconButton, Tooltip} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React from "react";
import {MODEL_CONFIG, MODEL_DOC, MODEL_FILE, MODEL_PREPROCESS} from "../../../../../actions/algorithmManagementAction";

const downloadInfoMap = {
    updateModelFile: {toolTipTitle: "下载模型", downloadPath: RouteName.DOWNLOAD_MODEL_FILE, fileName: 'model.zip'},
    updateDataConfig: {toolTipTitle: "下载配置", downloadPath: RouteName.DOWNLOAD_MODEL_CONFIG, fileName: 'config.yml'},
    updateModelDoc: {toolTipTitle: "下载文档", downloadPath: RouteName.DOWNLOAD_MODEL_DOCUMENT, fileName: 'doc.md'},
    updateModelPreprocess: {toolTipTitle: "下载预处理文件", downloadPath: RouteName.DOWNLOAD_PREPROCESSING_MODULE, fileName: 'preprocess.zip'},
};

const DownloadComponent = ({mainCategory, algorithmMainCategory, algorithmSubCategory, fileType}) => {
    // 由于下载模型不涉及改变React APP状态，所以就不用Redux管理了，直接在这里写下载代码
    const param = {mainCategory: mainCategory, modelNameEnglish: algorithmMainCategory,
        modelFunctionEnglish: algorithmSubCategory};

    let content;
    switch (fileType) {
        case MODEL_FILE: content=downloadInfoMap.updateModelFile; break;
        case MODEL_PREPROCESS: content=downloadInfoMap.updateModelPreprocess; break;
        case MODEL_DOC: content=downloadInfoMap.updateModelDoc; break;
        case MODEL_CONFIG: content=downloadInfoMap.updateDataConfig; break;
        default: content="NO DATA";
    }

    let url = RouteName.B_ALGORITHM_MANAGEMENT +content.downloadPath +queryParamsTrans(param);
    let token = useSelector(state=>state.session.authenticToken);

    const download = ()=>{

        let header = {
            'Authorization': token,
        };
        fetch(url, {headers:header})
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = content.fileName;
                    a.click();
                });
            });
    };
    return (
        <Tooltip title={content.toolTipTitle}>
            <label
                htmlFor="download-model"
            >
                <IconButton
                    color="primary"
                    component="Link"
                    onClick={download}
                >
                    <CloudDownloadIcon />
                </IconButton>
            </label>
        </Tooltip>
    )
};

export default DownloadComponent;