import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";

const LabTestFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = ["labTest", [featureCode, dataType, value1, value2], [....], ....]
    // dataType = {category, numerical}
    return (
        <Dialog
            open={openDialog===ParaName.LAB_TEST}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                实验室检查过滤器
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

export default LabTestFilter;