import React from 'react';
import {makeStyles} from "@material-ui/styles";
import IndividualAnalysis from "./IndividualAnalysis/IndividualAnalysis";
import GroupAnalysis from "./GroupAnalysis/GroupAnalysis";
import {useSelector} from "react-redux";
import RouteName from "../../../utils/RouteName";
import {
    Switch,
    Route
} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        overflow: 'auto'
    },
}));


const AnalysisContent = () => {
    const classes = useStyles();
    const selectedQuery =  useSelector(state=>state.metaInfo.selectedQuery);
    const metaInfo = useSelector(state=>state.metaInfo.metaInfoMap)[selectedQuery];
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS;
    if(!metaInfo)
        return null;

    return (
        <div className={classes.root}>
            <Switch>
                <Route path={path+RouteName.GROUP_ANALYSIS+"/:queryID"}>
                    <GroupAnalysis />
                </Route>
                <Route path={path+RouteName.INDIVIDUAL_ANALYSIS+"/:queryID"}>
                    <IndividualAnalysis />
                </Route>
                <Route path={path+RouteName.BLANK}>
                    <h1> 未选中数据 </h1>
                </Route>
            </Switch>
        </div>
    )
};

export default AnalysisContent;