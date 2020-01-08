import React from 'react';
import {
    Card,
    Typography,
    colors,
} from '@material-ui/core';
import Label from '../../../../../../components/Label';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {predictTaskName} from '../../../../../../utils/predictTask'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: "22%",
        minHeight: 77
    },
    content: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        alignContent: "flex-start"
    },
    currentRisk: {
        display: 'flex',
        alignItems: 'center',
        width: "30%",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
    },
    label: {
        marginLeft: theme.spacing(1)
    },

    otherInfo: {
        marginLeft: theme.spacing(3),
    },

    comparePrevious: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "flex-start",
    },
}));

const RiskItemEmergency = ({predictionTask, currentRisk, difference}) => {

    let currentRiskColor;
    if (currentRisk>0.7)
        currentRiskColor = colors.red[700];
    else
        currentRiskColor = "#000000";

    let labelColor;
    let labelNumber = null;
    if (difference>0){
        labelColor = colors.red[700];
        labelNumber = "+"+Number(difference*100).toFixed(2)+'%'
    }
    else{
        labelColor = colors.green[700];
        labelNumber = Number(difference*100).toFixed(2)+'%'
    }

    const classes = useStyles();
    return (
        <Card className={clsx(classes.root)}>
            <div className={classes.content}>
                <div className={classes.currentRisk}>
                    <Typography variant="h3" style={{"color": currentRiskColor}}>{Number(currentRisk*100).toFixed(2)+'%'}</Typography>
                </div>
                <div className={classes.otherInfo}>
                    <Typography
                        gutterBottom
                        variant="body1"
                    >
                        {predictionTask}
                    </Typography>

                    <div className={classes.comparePrevious}>
                        <Typography variant="body1" style={{"flexShrink": 0, "flexBasis": 70}}>{"风险较上次"}</Typography>
                        <Label
                            className={classes.label}
                            color={labelColor}
                            variant="outlined"
                            style={{"flexShrink": 0, "flexBasis": 53}}
                        >
                            {labelNumber}
                        </Label>
                    </div>

                </div>
            </div>
        </Card>
    )
}

export default RiskItemEmergency;