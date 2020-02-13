import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";

const LengthOfStayFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = ["los", int low_threshold, int high_threshold]
    return (
        <Dialog
            open={openDialog===ParaName.LOS}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                住院时长过滤器
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

export default LengthOfStayFilter;