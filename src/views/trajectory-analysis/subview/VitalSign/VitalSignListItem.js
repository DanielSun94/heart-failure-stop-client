import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemText,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  active: {
    boxShadow: `inset 4px 0px 0px ${theme.palette.primary.main}`,
    backgroundColor: colors.grey[50]
  },
  avatar: {
    height: 40,
    width: 40
  },
  details: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
}));

const VitalSignListItem = props => {
  const { active, vitalSignName, setSelectedVitalSign, divider,...rest } = props;

  const classes = useStyles();

  return (
    <ListItem
      {...rest}
      button
      className={clsx(
        {
          [classes.active]: active
        },
      )}
      onClick = {() => setSelectedVitalSign(vitalSignName)}
    >
      <ListItemText
        primary={vitalSignName}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6'
        }}
      />
    </ListItem>
  );
};

export default VitalSignListItem;
