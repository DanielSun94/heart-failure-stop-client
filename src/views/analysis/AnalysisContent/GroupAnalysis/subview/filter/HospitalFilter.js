import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    FormControlLabel,
    FormControl,
    FormGroup,
    Checkbox,
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

const validHospitalMap = {
    "1": "解放军总医院"
};

const HospitalFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                            previousContent}) =>{
    const classes = useStyles();

    // item = [isInherit, "hospital", [hospitalCode, hospitalName], ...]
    const [inputLegal, setInput] = useState(false);
    const [hospitalMap, setHospitalMap] = useState({});

    useEffect(()=>{
        if(constraintType==='edit'){
            const map = {};
            for(let i=2; i<previousContent.length; i++){
                map[previousContent[i][0]] = previousContent[i][1]
            }
            setInput(map)
        }
    },[]);

    useEffect(()=>{
        // 检查输入是否合法
        setInput(false);
        // 最后检查examType
        if(Object.keys(hospitalMap).length>0){
            setInput(true)
        }
    }, [hospitalMap]);

    const handleChange =event => {
        const hospitalCode = event.target.value;
        const checked = event.target.checked;
        if(checked){
            const map = {...hospitalMap};
            map[hospitalCode]=validHospitalMap[hospitalCode];
            setHospitalMap(map)
        }
        else {
            const map = {...hospitalMap};
            delete map[hospitalCode];
            setHospitalMap(map)
        }
    };

    return (
        <Dialog
            open={openDialog===ParaName.HOSPITAL}
            maxWidth={'sm'}
            disableBackdropClick={true}
        >
            <DialogTitle>
                医院筛选器
            </DialogTitle>
            <DialogContent dividers>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">医院名称</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={handleChange} value={"1"} />}
                            label="解放军总医院"
                        />
                    </FormGroup>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'}
                        onClick={()=> {
                            const list = [];
                            for(const key in hospitalMap){
                                if(hospitalMap.hasOwnProperty(key)){
                                    list.push(hospitalMap[key])
                                }
                            }
                            if(constraintType==="add"){
                                addConstraint([false, ParaName.HOSPITAL, ...list])
                            }
                            else if(constraintType==="edit"){
                                editConstraint(index, [false, ParaName.HOSPITAL, ...list])
                            }
                            setOpenDialog(null)
                        }}
                        disabled={!inputLegal}
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

export default HospitalFilter;