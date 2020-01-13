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

    document.title = ParaName.HF_STOP+"个体分析";

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item lg={3} sm={4} xs={12}>
                    <UnifiedPatientIDAndPatientBasicInfoPanel queryID={queryID} />
                </Grid>
                <Grid item xl={9} lg={8} md={12} xs={12}>
                    <Trajectory queryID={queryID}/>
                </Grid>
                <Grid item xs={12}>
                    <ModelPanel queryID={queryID}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <LabtestResult queryID={queryID}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <VitalSign queryID={queryID}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Order queryID={queryID}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Exam queryID={queryID}/>
                </Grid>
            </Grid>
        </div>
    )
};

export default IndividualAnalysis