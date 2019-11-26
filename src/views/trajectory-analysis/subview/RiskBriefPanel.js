import React from 'react';

import { makeStyles } from '@material-ui/styles';
import ParaName from '../../../utils/ParaName';
import RiskItem from './Risk/RiskItem'

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 0,
        height: 350,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
  }));

const RiskBriefPanel = () => {
    const classes = useStyles()
    return (
    <div id={ParaName.RISK_PANEL} className={classes.root}>
        <RiskItem predictionTask={'threeMonthDeath'} />
        <RiskItem predictionTask={'oneYearDeath'} />
        <RiskItem predictionTask={'threeMonthRevascular'} />
        <RiskItem predictionTask={'oneYearRevascular'} />
    </div>
    )
}



export default RiskBriefPanel;