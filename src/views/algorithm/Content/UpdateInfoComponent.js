import React, {useState} from "react";
import {
    Typography,
    CircularProgress
} from "@material-ui/core";
import {SUCCESS, NOT_UPDATE, FILE_NAME_ERROR, IN_PROGRESS, FAILED} from "../../../actions/algorithmManagementAction"


const UpdateInfoComponent = ({updateTime, status}) => {
    if(status===NOT_UPDATE){
        return (
            <div>
                <Typography variant="overline">
                    未更新
                </Typography>
            </div>
        )
    }
    else if(status===FILE_NAME_ERROR){
        return (
            <div>
                <Typography
                    variant="overline"
                    color={'red'}
                >
                    文件名错误
                </Typography>
            </div>
        )
    }
    else if(status===SUCCESS){
        return (
            <div>
                <Typography variant="overline">
                    更新成功，本次上传时间
                </Typography>
                <Typography variant="h6">
                    2019-12-30 10:58:20
                </Typography>
            </div>
        )
    }
    else if(status===IN_PROGRESS){
        return (
            <div>
                <CircularProgress />
                <Typography variant="h6">
                    更新中
                </Typography>
            </div>
        )
    }
    else if(status===FAILED){
        return (
            <div>
                <Typography variant="overline">
                    更新失败，请重试
                </Typography>
            </div>
        )
    }
    else{
        return (
            <div>
                <Typography variant="overline">
                    状态错误
                </Typography>
            </div>
        )
    }
};

export default UpdateInfoComponent;