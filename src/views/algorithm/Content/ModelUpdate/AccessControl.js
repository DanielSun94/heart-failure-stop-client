import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import {useSelector} from "react-redux";
import UploadInfoComponent from "./Components/UploadInfoComponent";
import RouteName from "../../../../utils/RouteName";
import {ACCESS_CONTROL, modelUpdatePost} from "../../../../actions/algorithmManagementAction";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
    },
    accessControlLabel: {
        marginLeft: theme.spacing(4),
        width: "15%",
    },
    radioGroup: {
        width: "35%",
    },
}));

const AccessControl = ({mainCategory, algorithmMainCategory, algorithmSubCategory}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const unifiedModelName = mainCategory+"_"+algorithmMainCategory+"_"+algorithmSubCategory;
    const [value, setValue] = useState('close');
    const [updateStatus, updateTime] = useSelector(state=>state.algorithm.updateAccessControl[unifiedModelName]);

    const handleChange = event => {
        const access = event.target.value;
        setValue(access);
        const path = RouteName.B_UPDATE_ACCESS_CONTROL;
        dispatch(modelUpdatePost(mainCategory, algorithmMainCategory, algorithmSubCategory, access, ACCESS_CONTROL, path));
    };

    return (
        <div className={classes.root}>
            <div className={classes.accessControlLabel}>
                <Typography variant="h5">访问权限：</Typography>
            </div>
            <div className={classes.radioGroup}>
                <RadioGroup  value={value} onChange={handleChange}>
                    <FormControlLabel value="public" control={<Radio color={'primary'}/>} label="所有用户可用" />
                    <FormControlLabel value="private" control={<Radio color={'primary'}/>} label="仅本人可用"/>
                    <FormControlLabel value="close" control={<Radio color={'primary'}/>} label="关闭"/>
                </RadioGroup>
            </div>
            <UploadInfoComponent
                status={updateStatus}
                updateTime={updateTime}
            />
        </div>
    )
};

export default AccessControl;