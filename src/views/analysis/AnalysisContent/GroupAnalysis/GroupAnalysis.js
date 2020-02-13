import React, {useState} from "react";
import ParaName from '../../../../utils/ParaName'
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
    },
    managementPanel: {
        width: "20%",
        minimumWidth: '280',
        maxHeight: "100%",
        overflow: 'auto',
    },
    analysisPanel: {
        width: "80%",
        height: "100%",
        overflow: 'auto',
    },
}));

const GroupAnalysis = () =>{
    document.title = ParaName.HF_STOP+"群体分析";
    const classes = useStyles();
    const {queryID} = useParams();
    const queryIDNumber = Number.parseInt(queryID);
    const selectedTab = useSelector(state=>state.group.management[queryID].selectedTab);

    const [toggleFilter, setToggleFilter] = useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.managementPanel}>
                <ManagementPanel setToggleFilter={setToggleFilter} toggleFilter={toggleFilter} queryID={queryIDNumber}/>
            </div>
            <div className={classes.analysisPanel}>
                {
                    selectedTab==='statistic'&& <StatisticPanel toggleFilter={toggleFilter} queryID={queryIDNumber}/>
                }
                {
                    selectedTab==='patientList'&& <PatientListPanel toggleFilter={toggleFilter} queryID={queryIDNumber}/>
                }
            </div>
        </div>
    )
};

export default GroupAnalysis;