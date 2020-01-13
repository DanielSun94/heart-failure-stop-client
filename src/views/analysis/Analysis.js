import React from 'react';
import AnalysisContent from "./AnalysisContent/AnalysisContent";
import AnalysisManagement from "./AnalysisManagement/AnalysisManagement";
import {makeStyles} from "@material-ui/styles";
import {colors} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    management:{
        width: "20%",
        minWidth: 250,
        height: "100%",
        backgroundColor: 'white',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    content:{
        width: "80%",
        height: "100%",
        backgroundColor: 'white'
    },
}));

const Analysis = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.management}>
                <AnalysisManagement/>
            </div>
            <div className={classes.content}>
                <AnalysisContent/>
            </div>
        </div>
    )
};

export default Analysis