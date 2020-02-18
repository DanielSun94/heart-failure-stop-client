import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SexPanel} from "./statisticCharts/SexPanel";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        minHeight: 950,
        overflow: 'auto',
        display: 'flex'
    },
    sexPanel: {
        width: 400,
        height: 400,
        marginTop: 20,
        marginLeft: 20
    }
}));

const StatisticPanel =({queryID})=>{
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.sexPanel}>
                <SexPanel queryID={queryID}/>
            </div>
        </div>
    )
};

export default StatisticPanel;