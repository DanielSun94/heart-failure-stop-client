import React from 'react';
import UnifiedPatientIDAndPatientBasicInfoPanel from './subview/UnifiedPatientIDAndPatientBasicInfoPanel'
import Trajectory from './subview/Trajectory';
import LabtestResult from './subview/LabtestResult';
import Order from './subview/Order';
import Exam from './subview/Exam';
import VitalSign from './subview/VitalSign';
import RiskFullPanel from './subview/RiskFullPanel'
import ParaName from '../../../utils/ParaName'
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

const IndividualAnalysis = ({selectedQueryID}) => {
    const classes = useStyles();

    document.title = ParaName.HF_STOP+"个体分析";

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    lg={3}
                    sm={4}
                    xs={12}
                >
                    <UnifiedPatientIDAndPatientBasicInfoPanel />
                </Grid>
                <Hidden lgUp>
                </Hidden>
                <Grid
                    item
                    xl={9}
                    lg={8}
                    md={12}
                    xs={12}
                >
                    <Trajectory />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <RiskFullPanel />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <LabtestResult />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <VitalSign />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <Order />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <Exam />
                </Grid>
            </Grid>
        </div>
    )
};

export default IndividualAnalysis