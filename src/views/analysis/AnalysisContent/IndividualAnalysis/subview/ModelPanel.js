import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ParaName from "../../../../../utils/ParaName";
import {
    Card,
    CardHeader,
    Divider,
    CardContent
} from '@material-ui/core';
import ModelList from "./ModelPanel/ModelList";
import ModelContent from "./ModelPanel/ModelContent";

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 497,
    },
    container: {
        width: '100%',
        height: 497,
        display: 'flex',
        padding: '0px 0px 0px 0px'
    },
    list: {
        width: "25%",
        height: 444
    },
    content: {
        width: "75%",
        height: 444
    }
});

const ModelPanel = ({queryID}) => {
    const classes = useStyles();


    return (
        <Card id={ParaName.MODEL_PANEL} className={classes.root}>
            <CardHeader title="模型面板"/>
            <Divider />
            <CardContent className={classes.container}>
                <div className={classes.list}>
                    <ModelList queryID={queryID}/>
                </div>
                <div className={classes.content}>
                    <ModelContent queryID={queryID}/>
                </div>
            </CardContent>
        </Card>
    );
};
export default ModelPanel;