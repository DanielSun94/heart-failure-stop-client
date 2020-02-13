import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";

const OperationFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = [type, operationCode1, operationCode2, ...]
    // code follows ICD-9-CM3 procedure coding standard (default using first four digits)
    return (
        <Dialog
            open={openDialog===ParaName.OPERATION}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                手术过滤器
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

export default OperationFilter;