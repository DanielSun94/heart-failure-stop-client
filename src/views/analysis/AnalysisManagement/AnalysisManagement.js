import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {colors, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import QueryTreeView from "./QueryTreeView";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
    },
    createNewQuery:{
        height: 85,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
    },
    content:{
        maxHeight: 850,
        backgroundColor: 'white'
    },
    createNewQueryButton: {
        marginBottom:  theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}));

const AnalysisManagement = ({queryIndex}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.createNewQuery}>
                <RoundedButton
                    className={classes.createNewQueryButton}
                    color="primary"
                    variant="contained"
                    size={'large'}
                    startIcon={<AddIcon size='large'/>}>
                    <Typography variant={'h5'} style={{paddingTop: 6, paddingBottom:6, paddingLeft: 12, paddingRight: 12, color: "white"}}>
                        添加新查询
                    </Typography>
                </RoundedButton >
            </div>
            <div className={classes.content}>
                <QueryTreeView />
            </div>
        </div>
    )
};

const RoundedButton = withStyles({
    root: {
        borderRadius: 15
    },
})(Button);

export default AnalysisManagement;