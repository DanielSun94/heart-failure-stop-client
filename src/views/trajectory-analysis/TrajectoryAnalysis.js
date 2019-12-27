import React from 'react';
import UnifiedPatientIDAndPatientBasicInfoPanel from './subview/UnifiedPatientIDAndPatientBasicInfoPanel'
import Trajectory from './subview/Trajectory';
import LabtestResult from './subview/LabtestResult';
import Order from './subview/Order';
import Exam from './subview/Exam';
import VitalSign from './subview/VitalSign';
import RiskBriefPanel from './subview/RiskBriefPanel'
import RiskFullPanel from './subview/RiskFullPanel'
import {TRAJECTORY_ANALYSIS, changeFrontPage} from '../../actions/frontPageAction'
import {useDispatch} from 'react-redux';
import ParaName from '../../utils/ParaName'
import { makeStyles } from '@material-ui/styles';
import { colors, Grid, Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2)
    },
    divider: {
      backgroundColor: colors.grey[300]
    },
  }));

const TrajectoryAnalysis = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    document.title = ParaName.HF_STOP+TRAJECTORY_ANALYSIS;
    dispatch(changeFrontPage(TRAJECTORY_ANALYSIS));

    return (
        <div className={classes.root}>
            <Grid
            container
            spacing={2}
            >
                <Grid
                item
                lg={2}
                sm={6}
                xs={12}
                >
                    <UnifiedPatientIDAndPatientBasicInfoPanel />
                </Grid>
                <Hidden lgUp>
                <Grid
                item
                sm={6}
                xs={12}
                >
                    <RiskBriefPanel />
                </Grid>
                </Hidden>
                <Grid
                item
                xl={8}
                lg={7}
                md={12}
                xs={12}
                >
                    <Trajectory />
                </Grid>
                <Hidden mdDown>
                <Grid
                item
                xl={2}
                lg={3}
                >
                    <RiskBriefPanel />
                </Grid>
                </Hidden>
                <Grid
                item
                xs={12}
                >  
                    <RiskFullPanel />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <LabtestResult />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <VitalSign />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <Order />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <Exam />
                </Grid>
            </Grid>
        </div>
    )
}

export default TrajectoryAnalysis