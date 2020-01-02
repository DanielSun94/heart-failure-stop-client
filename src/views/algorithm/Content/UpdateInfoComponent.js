import React from "react";
import {
    Typography,
    CircularProgress
} from "@material-ui/core";
import {SUCCESS, NOT_UPDATE, IN_PROGRESS, FAILED, FILE_NAME_ERROR} from "../../../actions/algorithmManagementAction";
import {monthAndDateAndTimeTrans} from "../../../utils/queryUtilFunction";


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
    else if(status===SUCCESS){
        return (
            <div>
                <Typography variant="overline">
                    更新成功，本次上传时间
                </Typography>
                <Typography variant="h6">
                    {monthAndDateAndTimeTrans(updateTime)}
                </Typography>
            </div>
        )
    }
    else if(status===IN_PROGRESS){
        return (
            <div >
                <CircularProgress size={25} />
                <Typography variant="h6">
                    更新中
                </Typography>
            </div>
        )
    }
    else if(status===FILE_NAME_ERROR){
        return (
            <div>
                <Typography variant="overline">
                    文件名错误，请修改后上传
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