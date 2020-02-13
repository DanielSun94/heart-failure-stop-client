import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";

const ModelFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = ["machineLearning", unifiedModelName, platform, lowThreshold, highThreshold]
    return (
        <Dialog
            open={openDialog===ParaName.MODEL}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                机器学习算法过滤器
            </DialogTitle>
            <DialogContent dividers>
                <h1>FilterDialog</h1>

            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {}}
                        color="primary">
                    确认
                </Button>
                <Button variant={'outlined'} onClick={()=>setOpenDialog(null)}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ModelFilter;