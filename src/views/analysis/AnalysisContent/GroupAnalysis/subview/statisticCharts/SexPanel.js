import React, {useEffect} from 'react'
import {VictoryPie} from 'victory'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {
    Card,
    CardHeader,
    Divider,
    colors,
    CircularProgress
} from '@material-ui/core'
import {getSexInfo} from "../../../../../../actions/groupAnalysisAction/managementAction";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

export const SexPanel =({queryID})=>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const male = useSelector(state=>state.group.management[queryID].statistics.sex.male);
    const female = useSelector(state=>state.group.management[queryID].statistics.sex.female);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].statistics.sex.isDataOutOfDate);
    const isDataValid = useSelector(state=>state.group.management[queryID].visitInfo.isDataValid);

    useEffect(()=>{
        if(isDataOutOfDate&&isDataValid){
            dispatch(getSexInfo(queryID))
        }
    },[isDataOutOfDate, isDataValid]);

    return (
        <Card className={classes.root}>
            <CardHeader title="性别分布"/>
            <Divider />
            <div style={{width: '90%', height: "90%"}}>
                {(isDataOutOfDate||(!isDataValid))&&
                <div
                    style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                    <CircularProgress/>
                </div>}
                {(!(isDataOutOfDate||(!isDataValid)))&&(
                    <VictoryPie
                        innerRadius={68} labelRadius={100}
                        colorScale={[colors.indigo[900], colors.red[600]]}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onClick: () => {
                                    //                onClick={()=>{
                                    //                     dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID));
                                    //                     dispatch(initializeManagementQuery(nextID));
                                    //                 }}
                                }
                            }
                        }]}
                        data={[
                            { x: "男性\n"+male+"\n人次", y: male },
                            { x: "女性\n"+female+"\n人次", y: female },
                        ]}
                        style={{labels: {  fontSize: 20, fill: "white",} }}
                    />
                )
                }
            </div>
        </Card>
    )
}