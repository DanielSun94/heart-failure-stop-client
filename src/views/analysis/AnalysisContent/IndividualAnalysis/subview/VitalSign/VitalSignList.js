import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  List,
} from '@material-ui/core';
import VitalSignListItem from './VitalSignListItem';
import {pinyinSort} from '../../../../../../utils/queryUtilFunction'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  },
  list: {
    overflow: 'auto',
    height: 417,
    maxHeight: 417,
  }
}));


const VitalSignList = ({vitalSigns, selectedVitalSign, setSelectedVitalSign, listClassName}) => {

  const classes = useStyles();
  pinyinSort(vitalSigns);

  return (
      <div
          className={clsx(classes.root, listClassName)}
      >
        <div className={classes.list}>
          <List disablePadding >
            {vitalSigns.map(vitalSign => (
                <VitalSignListItem
                    selected={vitalSign === selectedVitalSign}
                    vitalSignName={vitalSign}
                    setSelectedVitalSign = {setSelectedVitalSign}
                    key={vitalSign}
                />
            ))}
          </List>
        </div>
      </div>
  );
};

export default VitalSignList;
