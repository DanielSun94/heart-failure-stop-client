import React, {useEffect, Fragment} from 'react';
import {
    Card, 
    Typography,
    colors,
    CircularProgress
    } from '@material-ui/core';
import Label from '../../../../components/Label';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchPosts} 
  from '../../../../actions/dashboardAction/trajectoryAnalysisAction/riskAction'
import {predictTaskName} from '../../../../utils/predictTask'

const FETCH_SUCCESS = "success"
const IS_FETCHING = "isFetching"
const FETCH_FAILED = "failed"

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

const RiskItem = ({predictionTask}) => {
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
        dispatch(fetchPosts(currentVisit, predictionTask, "current"))
        dispatch(fetchPosts(previousVisit, predictionTask, "previous"))
    }
  }, [useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)]); 

  const content = useSelector(state=>state.dashboard.trajectoryAnalysis.risk)
  let currentRisk = 0;
  let previousRisk = 0;
  let fetchStatus = FETCH_SUCCESS

  if(predictionTask in content){
    if (content[predictionTask]["fetchStatus"] == FETCH_SUCCESS){
      currentRisk = parseFloat(content[predictionTask]['current'])
      previousRisk = parseFloat(content[predictionTask]['previous'])
      fetchStatus = FETCH_SUCCESS
    }
    else if (content[predictionTask]["fetchStatus"] == IS_FETCHING){
      fetchStatus = IS_FETCHING
    }
    else if (content[predictionTask]["fetchStatus"] == FETCH_FAILED){
      fetchStatus = FETCH_FAILED
    }
  }
  
  const difference = currentRisk-previousRisk;
  let currentRiskColor = null
  if (currentRisk>0.7)
    currentRiskColor = colors.red[700]
  else
    currentRiskColor = "#000000"

  let labelColor = null
  let labelNumber = null
  if (difference>0){
    labelColor = colors.red[700]
    labelNumber = "+"+Number(difference*100).toFixed(2)+'%'
  }
  else{
    labelColor = colors.green[700]
    labelNumber = Number(difference*100).toFixed(2)+'%'
  }

  const classes = useStyles()
  return (
    <Card className={clsx(classes.root)}>
      <div className={classes.content}>
        {fetchStatus === IS_FETCHING ? (
        <div className={classes.currentRisk}>
          <CircularProgress size={25} /> 
        </div>
        ): (
        <div className={classes.currentRisk}>
          <Typography variant="h3" style={{"color": currentRiskColor}}>{Number(currentRisk*100).toFixed(2)+'%'}</Typography>
        </div>
        )}
        <div className={classes.otherInfo}>
          <Typography
            gutterBottom
            variant="body1"
          >
            {predictTaskName[predictionTask]}
          </Typography>
          {fetchStatus === IS_FETCHING ? (
            <div className={classes.comparePrevious}>
              <Typography variant="body1" style={{"flexShrink": 0, "flexBasis": 84}}>
                {"正在计算风险"}
              </Typography>
            </div>
          ): (
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
          )}
        </div>
      </div>
    </Card>
    )
}

export default RiskItem;