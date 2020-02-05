import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {deleteModel} from '../../../../actions/algorithmManagementAction'
import RouteName from "../../../../utils/RouteName";


const DeleteModel = ({mainCategory, algorithmMainCategory, algorithmSubCategory, setMainCategory,
                         setAlgorithmMainCategory, setAlgorithmSubCategory})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteAndClose = () => {
        setMainCategory("NotSelected");
        setAlgorithmMainCategory("NotSelected");
        setAlgorithmSubCategory("NotSelected");
        dispatch(deleteModel(mainCategory, algorithmMainCategory, algorithmSubCategory));
        setOpen(false);
        history.push(RouteName.MAIN_PAGE+RouteName.ALGORITHM_MANAGEMENT)
    };

    return (
        <div>
            <Button
                style={{marginRight:32}}
                variant="contained"
                onClick={handleClickOpen}
            >
                删除模型
            </Button>
            <Dialog
                open={open}
                fullScreen={false}
                onClose={handleClose}
            >
                <DialogTitle>{"删除确认"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"是否确认删除模型"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteAndClose} autoFocus>
                        确认
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default DeleteModel