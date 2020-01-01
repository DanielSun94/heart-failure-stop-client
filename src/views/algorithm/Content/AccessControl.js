import React from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
    },
    accessControlLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
}));

const AccessControl = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState('me');

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <div className={classes.accessControlLabel}>
                <Typography variant="h5">
                    访问权限：
                </Typography>
            </div>
            <div>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="public" control={<Radio />} label="所有用户可用" />
                    <FormControlLabel
                        value="private"
                        control={
                            <Radio
                                color={'primary'}
                            />}
                        label="仅本人可用"
                    />
                    <FormControlLabel
                        value="close"
                        control={
                            <Radio
                                color={'primary'}
                            />}
                        label="关闭"
                    />
                </RadioGroup>
            </div>

        </div>
    )
};

export default AccessControl;