import React from 'react';
import {
  ListItem,
  ListItemText,
} from '@material-ui/core';


const VitalSignListItem = props => {
  const { selected, vitalSignName, setSelectedVitalSign, divider,...rest } = props;

  return (
      <ListItem
          {...rest}
          button
          onClick = {() => setSelectedVitalSign(vitalSignName)}
          selected={selected}
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
