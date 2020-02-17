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

const SexFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                       previousContent}) =>{
    const classes = useStyles();

    // item = ["sex", "male"/"female"]
    const [sex, setSex] = useState('male');

    useEffect(()=>{
        if(constraintType==='edit'){
            setSex(previousContent[1])
        }
    },[]);

    const handleChange = event => {
        setSex(event.target.value);
    };

    return (
        <Dialog
            open={openDialog===ParaName.SEX}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                性别筛选器
            </DialogTitle>
            <DialogContent dividers>
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    handleChange={handleChange}
                >
                    <FormLabel component="legend">性别选择</FormLabel>
                    <RadioGroup value={sex} style={{marginTop: 20}} onChange={handleChange}>
                        <FormControlLabel
                            value="female"
                            control={<Radio color="primary" />}
                            label="女性"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio color="primary" />}
                            label="男性"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            if(constraintType==="add"){
                                addConstraint([ParaName.SEX, sex])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [ParaName.SEX, sex])
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

export default SexFilter;