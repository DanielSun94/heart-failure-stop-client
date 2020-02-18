import React, {useState} from "react";
import ParaName from '../../../../utils/ParaName'
import {colors} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import StatisticPanel from "./subview/StatisticPanel";
import PatientListPanel from "./subview/PatientListPanel";
import ManagementPanel from "./subview/ManagementPanel";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: '100%',
        display:'flex',
        overflow: 'auto',
        flexDirection: "column"
    },
    managementPanel: {
        width: "100%",
        height: 85,
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    analysisPanel: {
        width: "100%",
        height: "calc(100%-85px)",
        overflow: 'auto'
    },
}));

const GroupAnalysis = () =>{
    document.title = ParaName.HF_STOP+"群体分析";
    const classes = useStyles();
    const {queryID} = useParams();
    const queryIDNumber = Number.parseInt(queryID);
    const selectedTab = useSelector(state=>state.group.management[queryID].selectedTab);

    return (
        <div className={classes.root}>
            <div className={classes.managementPanel}>
                <ManagementPanel queryID={queryIDNumber}/>
            </div>
            <div className={classes.analysisPanel}>
                {
                    selectedTab==='statistic'&& <StatisticPanel queryID={queryIDNumber}/>
                }
                {
                    selectedTab==='patientList'&& <PatientListPanel queryID={queryIDNumber}/>
                }
            </div>
        </div>
    )
};

export default GroupAnalysis;