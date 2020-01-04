import React from "react";
import {
    Typography,
} from "@material-ui/core";
import {SUCCESS, FILE_NAME_ERROR, NOT_UPLOAD} from "../../../../../actions/algorithmManagementAction";


const UploadInfoComponent = ({status}) => {

    if(status===NOT_UPLOAD){
        return (
            <div>
                <Typography variant="overline">
                    未上传
                </Typography>
            </div>
        )
    }
    else if(status===SUCCESS){
        return (
            <div>
                <Typography variant="overline">
                    选择成功，等待上传
                </Typography>
            </div>
        )
    }
    else if(status===FILE_NAME_ERROR){
        return (
            <div>
                <Typography variant="overline">
                    文件名错误
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

export default UploadInfoComponent;