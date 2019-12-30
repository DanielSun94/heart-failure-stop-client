import React from "react";
import {makeStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    accessControlLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
}));

const SubmitPanel = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
            >
                删除
            </Button>
            <Button
                style={{marginLeft: 30, marginRight: 30}}
                variant="contained"
                color="primary">
                更新
            </Button>
        </div>
    )
};

export default SubmitPanel;