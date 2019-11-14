import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    getValidVisitAndSetDefaultVisit, 
    changeTargetVisit,
    fetchDetailedVisitInfoPosts} from '../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAction';
// Horizontal Timeline的源代码来源于Github https://github.com/sherubthakur/react-horizontal-timeline
import HorizontalTimeline  from '../../components/HorizontalTimeLine/HorizontalTimeline'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import ParaName from '../../utils/ParaName';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 10,      
    },
    content: {
      padding: 0,
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    timeline:{
        backgroundColor: '#f4f6f8',
        height: "107px",
        width: "100%",
        padding: "0% 5% 0% 5%",
        margin: "5px"
    }
  }));


function formatTransform(visitList){
    let hospitalCodeList = []
    let hospitalNameList = []
    let visitIDList = []
    let visitTypeList = []
    let admissionTimeList = []
    for(let index in visitList){
        admissionTimeList.push(visitList[index].admissionTime.replace(/\//g, '-'))
        hospitalNameList.push(visitList[index].hospitalName)
        visitIDList.push(visitList[index].visitID)
        visitTypeList.push(visitList[index].visitType)
        hospitalCodeList.push(visitList[index].hospitalCode)
    }
    return {
        hospitalCodeList: hospitalCodeList, 
        hospitalNameList: hospitalNameList,
        visitIDList: visitIDList, 
        visitTypeList: visitTypeList, 
        admissionTimeList: admissionTimeList}
}

const Trajectory = () => {
    // 我们希望Trajectory能够监听unifiedPatientID的变化，从而完成合适的响应
    const dispatch = useDispatch();
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    useEffect(()=>{
        if(unifiedPatientID!==""){
            dispatch(getValidVisitAndSetDefaultVisit({unifiedPatientID: unifiedPatientID}))          
        }
    }, [unifiedPatientID]);
    const classes = useStyles()

    // 以下是水平时间线的view组装
    const visitList = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.visitList)
    const transformedVisit = formatTransform(visitList);
    const hospitalNameList = transformedVisit.hospitalNameList
    const visitIDList = transformedVisit.visitIDList
    const visitTypeList = transformedVisit.visitTypeList
    const admissionTimeList = transformedVisit.admissionTimeList

    
    const handleClick = (index) => {
        dispatch(changeTargetVisit(visitList[index]))
    }

    const getLabel = (value) => {
        const index = admissionTimeList.indexOf(value)
        const hospitalName = hospitalNameList[index];
        const visitType = visitTypeList[index];
        const visitID = visitIDList[index];
        const label = hospitalName+'\n'+'第'+visitID+'次'+visitType+'\n'+value
        return label
    }

    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const visitIndex = parseInt(currentVisit.visitNo)
    let horizontalTimeline = <h3>  </h3>
    if(visitList.length > 0 && currentVisit.visitNo !== "")
        horizontalTimeline = (
            <HorizontalTimeline
            index={visitIndex}
            indexClick={handleClick}
            getLabel={getLabel}
            values={admissionTimeList}
            minEventPadding={40}
            labelWidth={170}/>
        )


    // 以下是detailed visit info的组装部分
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchDetailedVisitInfoPosts(visitIndentifier))          
        }
    }, [currentVisit]);

    const detailedVisitInfo = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisitInfo)
    const table = (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell size={"small"}>出院时间</TableCell>
                    <TableCell size={"small"}>{detailedVisitInfo[ParaName.DISCHARGE_TIME]}</TableCell>
                    
                    <TableCell>主要诊断</TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}</TableCell>
                    <TableCell>症状</TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.SYMPTOM]}</TableCell>
                </TableRow>
                <TableRow selected>
                    <TableCell>症状</TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.SYMPTOM]}</TableCell>
                    <TableCell>手术</TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.OPERATION]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
    
    return (
    <Card id={ParaName.TRAJECTORY_PANEL} className={classes.root}>
        <CardHeader title="病人入院轨迹"/>
        <CardContent className={classes.content}>
            <Divider />
            <div className={classes.timeline}>
                {horizontalTimeline}
            </div>
            <Divider />
            {table}
        </CardContent>
    </Card>)
}

export default Trajectory;