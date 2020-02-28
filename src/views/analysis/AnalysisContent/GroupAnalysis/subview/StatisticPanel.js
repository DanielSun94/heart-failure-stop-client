import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SexPanel from "./statisticCharts/SexPanel";
import AgePanel from "./statisticCharts/AgePanel";
import OperationPanel from "./statisticCharts/OperationPanel";
import MedicinePanel from "./statisticCharts/MedicinePanel";
import DiagnosisPanel from "./statisticCharts/DiagnosisPanel";
import LabTestPanel from "./statisticCharts/LabTestPanel";
import MainDiagnosisPanel from "./statisticCharts/MainDiagnosisPanel";
import { makeStyles } from '@material-ui/core/styles'
import {queryDataAccordingToFilter} from "../../../../../actions/groupAnalysisAction/managementAction";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        overflow: 'auto',
        display: 'flex',
        flexWrap: 'wrap'
    },
    sexPanel: {
        width: 400,
        height: 400,
        marginTop: 20,
        marginLeft: 20
    },
    agePanel: {
        width: 920,
        height: 400,
        marginTop: 20,
        marginLeft: 20
    },
    operationPanel: {
        width: 1340,
        minHeight: 400,
        marginTop: 20,
        marginLeft: 20
    },
    diagnosisPanel: {
        width: 660,
        minHeight: 400,
        marginTop: 20,
        marginLeft: 20
    },
    medicinePanel: {
        width: 1340,
        minHeight: 400,
        marginTop: 20,
        marginLeft: 20
    },
    labTestPanel: {
        width: 1340,
        minHeight: 400,
        marginTop: 20,
        marginLeft: 20
    },
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
            <div className={classes.agePanel}>
                <AgePanel queryID={queryID}/>
            </div>
            <div className={classes.diagnosisPanel}>
                <DiagnosisPanel queryID={queryID}/>
            </div>
            <div className={classes.diagnosisPanel}>
                <MainDiagnosisPanel queryID={queryID}/>
            </div>
            <div className={classes.labTestPanel}>
                <LabTestPanel queryID={queryID}/>
            </div>
            <div className={classes.operationPanel}>
                <OperationPanel queryID={queryID}/>
            </div>
            <div className={classes.medicinePanel}>
                <MedicinePanel queryID={queryID}/>
            </div>
        </div>
    )
};

export default StatisticPanel;