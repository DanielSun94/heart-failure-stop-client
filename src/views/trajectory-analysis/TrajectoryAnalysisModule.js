import React from 'react';
import UnifiedPatientIDAndPatientBasicInfoPanel from './UnifiedPatientIDAndPatientBasicInfoPanel'
import Trajectory from './Trajectory';
import DetailedVisitInfo from './DetailedVisitInfo';
import BriefVisitInfo from './BriefVisitInfo';
import SingleVisitFullInfo from './SingleVisitFullInfo';
import Risk from './Risk'
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

const TrajectoryAnalysisModule = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    document.title = ParaName.HF_STOP+TRAJECTORY_ANALYSIS
    dispatch(changeFrontPage(TRAJECTORY_ANALYSIS))

    return (
        <div className={classes.root}>
            <Grid
            container
            spacing={3}
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
                    <BriefVisitInfo />
                </Grid>
                <Grid
                item
                lg={3}
                md={4}
                xs={12}
                >
                    <Risk />
                </Grid>
                
                <DetailedVisitInfo />
                <SingleVisitFullInfo/>
            </Grid>
        </div>
    )
}

export default TrajectoryAnalysisModule