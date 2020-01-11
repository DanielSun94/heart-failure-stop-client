import React from 'react';
import clsx from 'clsx';
import {
    ListItem,
    ListItemText,
    colors
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    const { active, selected, vitalSignName, setSelectedVitalSign, divider,...rest } = props;
    const classes = useStyles();

    return (
        <ListItem
            {...rest}
            className={clsx(
                {
                    [classes.active]: active
                },
            )}
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
