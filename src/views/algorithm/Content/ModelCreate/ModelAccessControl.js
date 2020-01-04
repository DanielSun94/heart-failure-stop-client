import React from "react";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexWrap: 'wrap'
    },
    accessControlLabel: {
        marginTop: theme.spacing(4),
        width: "15%",
    },
    radioGroup: {
        marginTop: theme.spacing(3),
        width: "35%",
    },
    buttonGroup: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const ModelAccessControl = ({handleBack, setAccessControl, accessControl, submit})=>{
    const classes = useStyles();

    let disabled=false;
    if(accessControl==="")
        disabled=true;

    return (
        <div className={classes.root}>
            <div className={classes.accessControlLabel}>
                <Typography variant="h5">访问权限：</Typography>
            </div>
            <div className={classes.radioGroup}>
                <RadioGroup onChange={(event)=>setAccessControl(event.target.value)}>
                    <FormControlLabel value="public" control={<Radio checked={"public"===accessControl} color={'primary'}/>} label="所有用户可用" />
                    <FormControlLabel value="private" control={<Radio checked={"private"===accessControl} color={'primary'}/>} label="仅本人可用"/>
                    <FormControlLabel value="close" control={<Radio checked={"close"===accessControl} color={'primary'}/>} label="关闭"/>
                </RadioGroup>
            </div>
            <div className={classes.buttonGroup}>
                <Button
                    variant="outlined"
                    color="default"
                    onClick={handleBack}
                >
                    上一步
                </Button>
                <Button
                    style={{marginLeft: 16}}
                    variant="outlined"
                    color="primary"
                    onClick={submit}
                    disabled={disabled}
                >
                    提交
                </Button>
            </div>
        </div>
    )
};

export default ModelAccessControl;