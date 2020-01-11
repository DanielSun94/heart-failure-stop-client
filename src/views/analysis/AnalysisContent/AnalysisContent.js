import React from 'react';
import {makeStyles} from "@material-ui/styles";
import IndividualAnalysis from "./IndividualAnalysis/IndividualAnalysis";
import GroupAnalysis from "./GroupAnalysis/GroupAnalysis";
import {useSelector} from "react-redux";
import ParaName from "../../../utils/ParaName";

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
    const selectedQuery =  useSelector(state=>state.metaInfo.selectedQuery);
    const metaInfo = useSelector(state=>state.metaInfo.metaInfoMap)[selectedQuery];
    if(!metaInfo)
        return null;

    const queryType = metaInfo['queryType'];

    return (
        <div className={classes.root}>
            {
                queryType === ParaName.GROUP_ANALYSIS ?
                    <GroupAnalysis
                        selectedQueryID={selectedQuery}
                    />
                    :
                    <IndividualAnalysis selectedQueryID={selectedQuery}/>
            }
        </div>
    )
};

export default AnalysisContent;