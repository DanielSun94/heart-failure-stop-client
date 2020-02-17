import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel
} from '@material-ui/core';
import ParaName from "../../../../../../utils/ParaName";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const VisitTypeFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                             previousContent}) =>{
    const classes = useStyles();

    // item = ["visitType", "住院"/"非住院"]
    const [visitType, setVisitType] = useState('住院');

    useEffect(()=>{
        if(constraintType==='edit'){
            setVisitType(previousContent[1])
        }
    },[]);

    const handleChange = event => {
        setVisitType(event.target.value);
    };

    return (
        <Dialog
            open={openDialog===ParaName.VISIT_TYPE}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                入院类型筛选器
            </DialogTitle>
            <DialogContent dividers>
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    handleChange={handleChange}
                >
                    <FormLabel component="legend">入院类型选择</FormLabel>
                    <RadioGroup value={visitType} style={{marginTop: 20}} onChange={handleChange}>
                        <FormControlLabel
                            value="住院"
                            control={<Radio color="primary" />}
                            label="住院"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="非住院"
                            control={<Radio color="primary" />}
                            label="非住院"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            if(constraintType==="add"){
                                addConstraint([ParaName.VISIT_TYPE, visitType])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [ParaName.VISIT_TYPE, visitType])
                            }
                            setOpenDialog(null)
                        }}
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

export default VisitTypeFilter;