import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    getValidVisitAndSetDefaultVisit, 
    changeTargetVisit,
    fetchDetailedVisitInfoPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAction';
// Horizontal Timeline的源代码来源于Github https://github.com/sherubthakur/react-horizontal-timeline
import HorizontalTimeline  from '../../../components/HorizontalTimeLine/HorizontalTimeline'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Tooltip,
    Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import ParaName from '../../../utils/ParaName';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 0,
        width: '100%'
    },
    content: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    // timeline 的marginTop 7px，height 106px均是为了和病人基本信息对齐
    timeline:{
        backgroundColor: '#f4f6f8',
        height: "106px",
        width: "100%",
        padding: "0% 5% 0% 5%",
        marginTop: "7px"
    },
    table:{
        width: "100%",
        maxWidth: '100%'
    },
    row: {
        height: '53px'
    },
    longCell: {
        maxWidth: '100',
    },
    shortCell: {
        minWidth: '90px',
        maxWidth: '120px',
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
    const admissionTime = new Date(detailedVisitInfo[ParaName.ADMISSION_TIME].replace(/\//g, '-'))
    const dischargeTime = new Date(detailedVisitInfo[ParaName.DISCHARGE_TIME].replace(/\//g, '-'))
    let los = Math.ceil((dischargeTime.getTime()-admissionTime.getTime())/3600/24/1000)
    if(isNaN(los))
        los=''
    const table = (
        <Fragment>
        <Hidden lgDown>
        <Table>
            <TableBody className={classes.table}>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>入院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.ADMISSION_TIME]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>年龄:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.AGE]}</TableCell>

                    <TableCell className={classes.shortCell}>
                        <Typography>手术:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OPERATION]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OPERATION].length > 20 ?
                            detailedVisitInfo[ParaName.OPERATION].substr(0, 20)+'...' :
                            detailedVisitInfo[ParaName.OPERATION]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>出院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.DISCHARGE_TIME]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>是否死亡:</Typography>
                    </TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.DEATH_FLAG]}</TableCell>

                    <TableCell className={classes.shortCell}>
                        <Typography>主要诊断:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].length > 20 ?
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].substr(0, 20)+'...' :
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>住院日:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{los}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>症状:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                        <Tooltip title={detailedVisitInfo[ParaName.SYMPTOM]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.SYMPTOM].length > 20 ?
                            detailedVisitInfo[ParaName.SYMPTOM].substr(0, 20)+'...' :
                            detailedVisitInfo[ParaName.SYMPTOM]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                            <Typography>其它诊断:</Typography>                      
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].length > 20 ?
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].substr(0, 20)+'...' :
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>

                </TableRow>
            </TableBody>
        </Table>
        </Hidden>
        <Hidden xlUp smDown>
        <Table>
            <TableBody className={classes.table}>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>入院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.ADMISSION_TIME]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>年龄:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.AGE]}</TableCell>

                    <TableCell className={classes.shortCell}>
                        <Typography>手术:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OPERATION]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OPERATION].length > 10 ?
                            detailedVisitInfo[ParaName.OPERATION].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.OPERATION]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>出院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.DISCHARGE_TIME]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>是否死亡:</Typography>
                    </TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.DEATH_FLAG]}</TableCell>

                    <TableCell className={classes.shortCell}>
                        <Typography>主要诊断:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].length > 10 ?
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>住院日:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{los}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>症状:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                    <Tooltip title={detailedVisitInfo[ParaName.SYMPTOM]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.SYMPTOM].length > 10 ?
                            detailedVisitInfo[ParaName.SYMPTOM].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.SYMPTOM]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                            <Typography>其它诊断:</Typography>                      
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].length > 10 ?
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </Hidden>
        <Hidden mdUp xsDown>
        <Table>
            <TableBody className={classes.table}>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>入院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.ADMISSION_TIME]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>出院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.DISCHARGE_TIME]}</TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>年龄:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.AGE]}</TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>住院日:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{los}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>手术:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OPERATION]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OPERATION].length > 7 ?
                            detailedVisitInfo[ParaName.OPERATION].substr(0, 7)+'...' :
                            detailedVisitInfo[ParaName.OPERATION]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                        <Typography>症状:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                    <Tooltip title={detailedVisitInfo[ParaName.SYMPTOM]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.SYMPTOM].length > 7 ?
                            detailedVisitInfo[ParaName.SYMPTOM].substr(0, 7)+'...' :
                            detailedVisitInfo[ParaName.SYMPTOM]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
            
                    <TableCell className={classes.shortCell}>
                        <Typography>是否死亡:</Typography>
                    </TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.DEATH_FLAG]}</TableCell>

                    <TableCell className={classes.shortCell}>
                        <Typography>主要诊断:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].length > 7 ?
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].substr(0, 7)+'...' :
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                            <Typography>其它诊断:</Typography>                      
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].length > 7 ?
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].substr(0, 7)+'...' :
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </Hidden>
        <Hidden smUp>
        <Table>
            <TableBody className={classes.table}>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>入院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.ADMISSION_TIME]}</TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>年龄:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.AGE]}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>手术:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OPERATION]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OPERATION].length > 10 ?
                            detailedVisitInfo[ParaName.OPERATION].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.OPERATION]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>出院时间:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{detailedVisitInfo[ParaName.DISCHARGE_TIME]}</TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>是否死亡:</Typography>
                    </TableCell>
                    <TableCell>{detailedVisitInfo[ParaName.DEATH_FLAG]}</TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>主要诊断:</Typography>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].length > 10 ?
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.MAIN_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                        <Typography>住院日:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>{los}</TableCell>
                </TableRow>
                <TableRow className={classes.row} selected>
                    <TableCell className={classes.shortCell}>
                        <Typography>症状:</Typography>
                    </TableCell>
                    <TableCell className={classes.shortCell}>
                    <Tooltip title={detailedVisitInfo[ParaName.SYMPTOM]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.SYMPTOM].length > 10 ?
                            detailedVisitInfo[ParaName.SYMPTOM].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.SYMPTOM]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.row}>
                    <TableCell className={classes.shortCell}>
                            <Typography>其它诊断:</Typography>                      
                    </TableCell>
                    <TableCell>
                        <Tooltip title={detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}>
                            <Typography>
                            {detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].length > 10 ?
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS].substr(0, 10)+'...' :
                            detailedVisitInfo[ParaName.OTHER_DIAGNOSIS]}
                            </Typography>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </Hidden>
        </Fragment>
    )
    
    return (
    <Card id={ParaName.TRAJECTORY_PANEL} className={classes.root}>
        <CardHeader title="病人入院轨迹"/>
        <CardContent className={classes.content}>
            <div className={classes.timeline}>
                {horizontalTimeline}
            </div>
            {table}
        </CardContent>
    </Card>)
}

export default Trajectory;