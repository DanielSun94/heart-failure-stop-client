import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";

const MainDiagnosisFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType}) =>{
    // item = [type, diagnosisCode1, diagnosisCode2, ...]
    // type = {"mainDiagnosis", "diagnosis"}
    return (
        <Dialog
            open={openDialog===ParaName.MAIN_DIAGNOSIS}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                主要诊断过滤器
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

export default MainDiagnosisFilter;