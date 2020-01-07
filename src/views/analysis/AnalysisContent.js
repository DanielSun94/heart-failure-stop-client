import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Tabs, Tab, AppBar} from "@material-ui/core";
import IndividualAnalysis from "./IndividualAnalysis/IndividualAnalysis";
import GroupAnalysis from "./GroupAnalysis/GroupAnalysis";
import {useSelector} from "react-redux";
import ParaName from "../../utils/ParaName";

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


const AnalysisContent = ({selectedQueryID}) => {
    const classes = useStyles();

    const metaInfo = useSelector(state=>state.individual.metaInfo.metaInfoMap)[selectedQueryID];
    if(!metaInfo)
        return null;

    const queryType = metaInfo['queryType'];

    return (
        <div className={classes.root}>
            {
                queryType === ParaName.GROUP_ANALYSIS ?
                    <GroupAnalysis
                        selectedQueryID={selectedQueryID}
                    />
                    : <div>个体分析</div>
                    //<IndividualAnalysis
                // selectedQueryID={selectedQueryID}
                // />
            }
        </div>
    )
};

export default AnalysisContent;