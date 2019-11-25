import React from 'react';
import {
    Card, 
    CardHeader,
    CardContent, 
    } from '@material-ui/core';
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
    item: {
        width: '100%',
        height: '22%'
      },
  }));

const Risk = () => {
    const classes = useStyles()
    return (
    <div id={ParaName.RISK_PANEL} className={classes.root}>
        <RiskItem fatherClass={classes.item} name={'1年内心源性再入院风险'} value={'64%'} difference={'+10%'}/>
        <RiskItem fatherClass={classes.item} name={'1年内全因再入院风险'} value={'87%'} difference={'+12%'}/>
        <RiskItem fatherClass={classes.item} name={'1年内死亡风险'} value={'31%'} difference={'+18%'}/>
        <RiskItem fatherClass={classes.item} name={'3年内死亡风险'} value={'62%'} difference={'+30%'}/>
    </div>
    )
}

export default Risk;