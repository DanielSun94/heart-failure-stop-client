import React, {useEffect} from 'react';
import {
    Card, 
    Typography,
    colors
    } from '@material-ui/core';
import Label from '../../../../components/Label';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPosts} from '../../../../actions/dashboardAction/trajectoryAnalysisAction/riskAction'
import {predictTaskName} from '../../../../utils/predictTask'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
}));

const RiskItem = ({predictionTask, parentClass}) => {
  const dispatch = useDispatch()

  // 获取入院相关信息
  const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
  
  const trajectory = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory)
  const currentVisitID = trajectory.currentVisit.visitID
  const currentHospitalCode = trajectory.currentVisit.hospitalCode
  const currentVisitType = trajectory.currentVisit.visitType
  const currentVisit = {visitID: currentVisitID, unifiedPatientID: unifiedPatientID, visitType: currentVisitType, hospitalCode: currentHospitalCode}

  const currentVisitNo = parseInt(trajectory.currentVisit.visitNo)
  let previousVisit = currentVisit
  if(currentVisitNo > 0){
    const previousHospitalCode = trajectory.visitList[currentVisitNo-1].hospitalCode
    const previousVisitType = trajectory.visitList[currentVisitNo-1].visitType
    const previousVisitID = trajectory.visitList[currentVisitNo-1].visitID
    previousVisit = {visitID: previousVisitID, unifiedPatientID: unifiedPatientID, visitType: previousVisitType, hospitalCode: previousHospitalCode}
  }

  // 设定更新时机
  useEffect(()=>{
    if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
        dispatch(fetchPosts(currentVisit, predictionTask, true))
        dispatch(fetchPosts(previousVisit, predictionTask, false))
    }
  }, [useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)]); 

  const content = useSelector(state=>state.dashboard.trajectoryAnalysis.risk.content)
  let currentRisk = 0;
  let previousRisk = 0
  if(predictionTask in content && 'current' in content[predictionTask] && 'previous' in content[predictionTask]){
    currentRisk = parseFloat(content[predictionTask]['current'])
    previousRisk = parseFloat(content[predictionTask]['previous'])
  }
  
  const difference = currentRisk-previousRisk;


  const classes = useStyles()
  return (
    <Card className={clsx(classes.root)}>
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          {predictTaskName[predictionTask]}
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{Number(currentRisk*100).toFixed(2)+'%'}</Typography>
          <Label
            className={classes.label}
            color={colors.red[600]}
            variant="outlined"
          >
            {Number(difference*100).toFixed(2)+'%'}
          </Label>
        </div>
      </div>
    </Card>
    )
}

export default RiskItem;