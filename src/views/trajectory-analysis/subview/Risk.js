import React from 'react';
import {
    Card, 
    CardHeader,
    CardContent, 
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ParaName from '../../../utils/ParaName';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 0,
        height: 350      
    },
    content: {
        padding: 0,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
  }));

const Risk = () => {
    const classes = useStyles()
    return (
    <Card id={ParaName.RISK_PANEL} className={classes.root}>
        <CardHeader title="风险评估" />
        <CardContent className={classes.content}>
            {'No Risk'}
        </CardContent>
    </Card>
    )
}

export default Risk;