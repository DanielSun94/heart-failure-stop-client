import React from 'react';
import UnifiedPatientIDAndPatientBasicInfoPanel from './subview/UnifiedPatientIDAndPatientBasicInfoPanel'
import Trajectory from './subview/Trajectory';
import LabTestResult from './subview/LabTestResult';
import OralMedicalIntervention from './subview/OralMedicalIntervention';
import Exam from './subview/Exam';
import VitalSign from './subview/VitalSign';
import Risk from './subview/Risk'
import {TRAJECTORY_ANALYSIS, changeFrontPage} from '../../actions/frontPageAction'
import {useDispatch} from 'react-redux';
import ParaName from '../../utils/ParaName'
import { makeStyles } from '@material-ui/styles';
import { colors, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    divider: {
      backgroundColor: colors.grey[300]
    },
  }));

const TrajectoryAnalysis = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    document.title = ParaName.HF_STOP+TRAJECTORY_ANALYSIS
    dispatch(changeFrontPage(TRAJECTORY_ANALYSIS))

    return (
        <div className={classes.root}>
            <Grid
            container
            spacing={2}
            >
                <Grid
                item
                lg={2}
                md={12}
                xs={12}
                >
                    <UnifiedPatientIDAndPatientBasicInfoPanel />
                </Grid>
                <Grid
                item
                lg={7}
                md={8}
                xs={12}
                >
                    <Trajectory />
                </Grid>
                <Grid
                item
                lg={3}
                md={4}
                xs={12}
                >
                    <Risk />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <LabTestResult />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <OralMedicalIntervention />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <Exam />
                </Grid>
                <Grid
                item
                lg={6}
                md={12}
                xs={12}
                >
                    <VitalSign />
                </Grid>
            </Grid>
        </div>
    )
}

export default TrajectoryAnalysis