import React from 'react';
import UnifiedPatientIDAndPatientBasicInfoPanel from './subview/UnifiedPatientIDAndPatientBasicInfoPanel'
import Trajectory from './subview/Trajectory';
import LabtestResult from './subview/LabtestResult';
import Order from './subview/Order';
import Exam from './subview/Exam';
import VitalSign from './subview/VitalSign';
import ModelPanel from "./subview/ModelPanel";
import ParaName from '../../../../utils/ParaName'
import { makeStyles } from '@material-ui/styles';
import { colors, Grid } from '@material-ui/core';
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    divider: {
        backgroundColor: colors.grey[300]
    },
}));

const IndividualAnalysis = () => {
    const classes = useStyles();
    const {queryID} = useParams();
    const queryIDNumber = Number.parseInt(queryID);

    document.title = ParaName.HF_STOP+"个体分析";

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item lg={3} sm={4} xs={12}>
                    <UnifiedPatientIDAndPatientBasicInfoPanel queryID={queryIDNumber} />
                </Grid>
                <Grid item xl={9} lg={8} md={12} xs={12}>
                    <Trajectory queryID={queryIDNumber}/>
                </Grid>
                <Grid item xs={12}>
                    <ModelPanel queryID={queryIDNumber}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <LabtestResult queryID={queryIDNumber}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <VitalSign queryID={queryIDNumber}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Order queryID={queryIDNumber}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Exam queryID={queryIDNumber}/>
                </Grid>
            </Grid>
        </div>
    )
};

export default IndividualAnalysis