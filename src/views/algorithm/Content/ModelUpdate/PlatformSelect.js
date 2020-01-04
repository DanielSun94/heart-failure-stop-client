import React, {useState} from "react";
import {FormControl, MenuItem, Select, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useSelector, useDispatch} from "react-redux";
import UploadInfoComponent from "./Components/UploadInfoComponent";
import {MODEL_PLATFORM, modelUpdatePost} from "../../../../actions/algorithmManagementAction";
import RouteName from "../../../../utils/RouteName";

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
    selector: {
        width: "35%",
    },
    formControl: {
        minWidth: 120,
    },
}));

const PlatformSelect = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState('None');
    const platformList = ['Tensorflow', "Pytorch", 'Sklearn'];

    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;

    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updatePlatForm[unifiedModelName]);


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = event => {
        const newPlatform = event.target.value;
        setSelectedPlatform(newPlatform);
        const path = RouteName.UPDATE_PLATFORM;
        dispatch(modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, newPlatform, MODEL_PLATFORM, path));
    };

    return (
        <div className={classes.root}>
            <div className={classes.platformLabel}>
                <Typography variant="h5">
                    运行平台：
                </Typography>
            </div>
            <div className={classes.selector}>
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
            <div className={classes.updateTime}>
                <UploadInfoComponent
                    status={updateStatus}
                    updateTime={updateTime}
                />
            </div>
        </div>
    )
};

export default PlatformSelect;