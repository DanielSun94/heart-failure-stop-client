import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Tabs, Tab, AppBar} from "@material-ui/core";
import IndividualAnalysis from "./IndividualAnalysis/TrajectoryAnalysis";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        overflow: 'scroll'
    },
}));


const AnalysisContent = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    style={{backgroundColor:"white", boxShadow: 0}}
                >
                    <Tab label="查询1"  />
                    <Tab label="查询2"  />
                    <Tab label="查询3"/>
                    <Tab label="查询4"/>
                </Tabs>
            </AppBar>
            {
                // <IndividualAnalysis/>
            }
        </div>
    )
};

export default AnalysisContent;