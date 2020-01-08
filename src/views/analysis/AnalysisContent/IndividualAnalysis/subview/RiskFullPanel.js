import React, {useState}from 'react';
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid } from '@material-ui/core';
import RiskItemEmergency from "./Risk/RiskItemEmergency";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingRight: 0,
        paddingLeft: 0,
        paddingTop: 4
    },
    expansionSummary: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
    }
});

const RiskFullPanel = () => {
    const classes = useStyles();
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className={classes.root}>
            <ExpansionPanel
                onChange={(event, expanded)=>setIsExpand(expanded)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <div className={classes.expansionSummary}>
                        <Typography className={classes.heading}>展开以显示所有预测模型的结果</Typography>
                        <SettingsIcon/>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    {isExpand && (
                        <Grid container spacing={2} className={classes.detail}>
                            <Grid item xs={12} >
                            </Grid>
                            <Grid item xl={3} lg={4} md={6} sm={6} xs={12} >
                                <RiskItemEmergency className={classes.item} predictionTask={'三月内死亡'} currentRisk={0.4841} difference={0.2634}/>
                            </Grid>
                            <Grid item xl={3} lg={4} md={6} sm={6} xs={12} >
                                <RiskItemEmergency className={classes.item} predictionTask={'一年内再入院'} currentRisk={0.8325} difference={0.1255}/>
                            </Grid>

                            {

                                //<Grid item xl={2} lg={3} md={4} sm={6} xs={12} >
                                //    <RiskItem className={classes.item} predictionTask={'threeMonthDeath'} />
                                //</Grid>
                            }
                        </Grid>
                    )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};
export default RiskFullPanel;