import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
    platformLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    formControl: {
        minWidth: 120,
    },
}));

const PlatformSelect = ({platformList, selectedPlatform, setPlatform}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = event => {
        setPlatform(event.target.value);
    };

    return (
        <div className={classes.root}>
            <div className={classes.platformLabel}>
                <Typography variant="h5">
                    运行平台：
                </Typography>
            </div>
            <div className={classes.formControl}>
                <FormControl className={classes.formControl}>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedPlatform}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            platformList.map(item=>
                                <MenuItem
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
};

export default PlatformSelect;