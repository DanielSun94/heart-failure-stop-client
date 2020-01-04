import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
    MODEL_FILE,
    MODEL_DOC,
    MODEL_CONFIG,
    MODEL_PREPROCESS
} from "../../../../../actions/algorithmManagementAction"

const infoMap = {
    updateModelFile: "模型文件名必须为model.zip。模型文件结构必须符合各平台标准结构（具体细节之后补充）",
    updateModelDoc: "模型文件名必须为doc.md，具体规范细节之后补充",
    updateModelPreprocess: "模型文件名必须为preprocess.zip。目录下必须有data_convert.py文件，具体规范细节之后补充",
    updateDataConfig: "数据配置文件名必须为config.yml，具体规范细节之后补充",
};

const HintDialog = ({fileType}) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let content;
    switch (fileType) {
        case MODEL_FILE: content=infoMap.updateModelFile; break;
        case MODEL_PREPROCESS: content=infoMap.updateModelPreprocess; break;
        case MODEL_DOC: content=infoMap.updateModelDoc; break;
        case MODEL_CONFIG: content=infoMap.updateDataConfig; break;
        default: content="NO DATA";
    }

    return (
        <Tooltip title="帮助">
            <div>
                <IconButton color="primary" component="span">
                    <HelpOutlineIcon
                        onClick={handleClickOpen}
                    />
                </IconButton>
                <Dialog
                    open={open}
                    fullScreen={false}
                    onClose={handleClose}
                >
                    <DialogTitle>{"上传须知"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Tooltip>
    )
};

export default HintDialog;