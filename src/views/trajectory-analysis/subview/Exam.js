import React, {useEffect, useState, Fragment} from 'react';
import ParaName from '../../../utils/ParaName';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from '../../../actions/dashboardAction/trajectoryAnalysisAction/examAction'
import {
    Card, 
    CardHeader, 
    CardContent, 
    Divider,
    Hidden,
    TextField,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExamList from './Exam/ExamList'
import ExamContent from './Exam/Content'
import { makeStyles } from '@material-ui/styles';

const dataReconstruct = (data) => {
    let nameMap = {}
    let dataList = []
    
    let index = 0
    for(let item of data){
        const name = item.examName;
        const examTime = item.examTime;
        const para = item.examPara;
        const impression = item.impression;
        const description = item.description;

        const time = new Date(Date.parse(examTime));
        const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate()
        const month = time.getMonth()+1
        const timeStr = month + '月' + date + '日 ';
        
        nameMap[timeStr + ' '+name] = [index, time.getTime()]
        dataList.push({'para': para, 'impression': impression, 'description': description})
        index += 1
    }
    return [dataList, nameMap]
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        height: 470,
    },
    bigViewContainer: {
      padding: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
    },
    smallViewContainer:{
        padding: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    list: {
        width: 230,
        flexBasis: 230,
        flexShrink: 0,
        '@media (min-width: 864px)': {
          borderRight: `1px solid ${theme.palette.divider}`
        }
    },
    smallViewHead:{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomColor: '#f8f8f8',
        borderBottomStyle: "solid"
    },
    loading:{
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    }
  }));

const Exam = () => {
    // 获取数据
    const dispatch = useDispatch()
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    const visitIndentifier = {...currentVisit, unifiedPatientID: unifiedPatientID}
    const [selectedExam, setSelectedExam] = useState('')
    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(fetchPosts(visitIndentifier))          
            setSelectedExam("")  
        }
    },  [currentVisit]);

    const classes = useStyles()

    // 重新整理数据
    const data = useSelector(state => state.dashboard.trajectoryAnalysis.exam.content)
    const isDataFetching = useSelector(state => state.dashboard.trajectoryAnalysis.exam.isDataFetching)
    const [dataList, nameMap] = dataReconstruct(data)
    const examList = Object.entries(nameMap);

    examList.sort(function(a, b) {
      return a[1]-b[1];
    })

    const examOnChange = (event, value)=>{
        setSelectedExam(value[0])
    }
    
    return  (
        <Fragment>
        <Hidden mdDown>
            <Card id={ParaName.EXAM_PANEL} className={classes.root}>
            <CardHeader title="病人检查结果"/>
            <Divider />
            {isDataFetching ?(
                <div className={classes.loading}>
                    <CircularProgress size={25} /> 
                    <Typography style={{marginTop: 10}} variant="h5">
                        载入中
                    </Typography>
                </div>
            ):(
                <CardContent className={classes.bigViewContainer}>
                <ExamList examList={examList} selectedExam={selectedExam} setSelectedExam={setSelectedExam} 
                listClassName={classes.list}/>
                <ExamContent nameMap={nameMap} dataList={dataList} selectedExam={selectedExam} />
            </CardContent>
            )}
            </Card>
        </Hidden>
        <Hidden lgUp>
        <Card id={ParaName.EXAM_PANEL} className={classes.root}>
            {isDataFetching ?(
                <div className={classes.loading}>
                <CircularProgress size={25} /> 
                <Typography style={{marginTop: 10}} variant="h5">
                    载入中
                </Typography>
            </div>
            ):(
            <CardContent className={classes.smallViewContainer}>
                <div className={classes.smallViewHead}>
                <Typography
                    variant="h5"
                    style={{paddingLeft: 20}}
                >
                    检查结果
                </Typography>
                <Autocomplete
                    style={{ width: 250, paddingRight: 10}}
                    options={examList}
                    getOptionLabel={item => item[0]}
                    renderInput={params => (
                        <TextField {...params} label="搜索" variant="outlined" fullWidth margin="normal" />
                    )}
                    onChange={examOnChange}
                />
                </div>
                <ExamContent nameMap={nameMap} dataList={dataList} selectedExam={selectedExam} />
            </CardContent>
            )}
            
            </Card>
        </Hidden>
        </Fragment>
    );
}

export default Exam;