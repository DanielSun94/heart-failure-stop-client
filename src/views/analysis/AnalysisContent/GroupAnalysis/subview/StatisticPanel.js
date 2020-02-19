import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SexPanel} from "./statisticCharts/SexPanel";
import { makeStyles } from '@material-ui/core/styles'
import {queryDataAccordingToFilter} from "../../../../../actions/groupAnalysisAction/managementAction";

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
    const dispatch = useDispatch();
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].isDataOutOfDate);
    const filter = useSelector(state=>state.group.management[queryID].filter);

    useEffect(()=>{
        if(isDataOutOfDate){
            dispatch(queryDataAccordingToFilter(filter, queryID))
        }
    },[isDataOutOfDate]);
    return (
        <div className={classes.root}>
            <div className={classes.sexPanel}>
                <SexPanel queryID={queryID}/>
            </div>
        </div>
    )
};

export default StatisticPanel;