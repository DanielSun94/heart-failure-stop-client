import React from 'react';
import {
    Card, 
    Typography,
    colors
    } from '@material-ui/core';
import Label from '../../../../components/Label';
import gradients from '../../../../utils/gradients';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
}));

const RiskItem = ({name, value, difference, fatherClass}) => {
    const classes = useStyles()
    return (
        <Card
        className={clsx(classes.root, fatherClass)}
      >
        <div>
          <Typography
            component="h3"
            gutterBottom
            variant="overline"
          >
            {name}
          </Typography>
          <div className={classes.details}>
            <Typography variant="h3">{value}</Typography>
            <Label
              className={classes.label}
              color={colors.red[600]}
              variant="outlined"
            >
              {difference}
            </Label>
          </div>
        </div>
      </Card>
    )
}

export default RiskItem;