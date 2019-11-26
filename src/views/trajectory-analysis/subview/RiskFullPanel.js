import React from 'react';

import { makeStyles } from '@material-ui/styles';
import RiskItem from './Risk/RiskItem'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: '100%',
      paddingRight: 8,
      paddingLeft: 8
    },
  });

const RiskFullPanel = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
                <Typography className={classes.heading}>展开以显示所有预测模型的结果</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.content}>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthDeath'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthRevascular'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthRenalDisease'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthOther'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthNYHAClass1'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthNYHAClass2'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthNYHAClass3'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthNYHAClass4'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthLungDisease'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'threeMonthCancer'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearDeath'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearRevascular'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearRenalDisease'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearOther'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearNYHAClass1'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearNYHAClass2'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearNYHAClass3'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearNYHAClass4'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearLungDisease'} />
                </Grid>
                <Grid item lg={2} md={3} sm={6}xs={12} >
                    <RiskItem className={classes.item} predictionTask={'oneYearCancer'} />
                </Grid>
            </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    }
export default RiskFullPanel;