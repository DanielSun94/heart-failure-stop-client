import React, {useEffect, Fragment} from 'react'
import ParaName from '../../../../../utils/ParaName'
import { useSelector, useDispatch } from 'react-redux'
import {examFetchPosts, setNewSelectedExam} from '../../../../../actions/individualAnalysisAction/examAction'
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
import Autocomplete from '@material-ui/lab/Autocomplete'
import ExamList from './Exam/ExamList'
import ExamContent from './Exam/Content'
import useStyles from './sharedLayout'

const dataReconstruct = (data) => {
    let nameMap = {};
    let dataList = [];

    let index = 0;
    for(let item of data){
        const name = item['examName'];
        const examTime = item['examTime'];
        const para = item['examPara'];
        const impression = item.impression;
        const description = item.description;

        const time = new Date(Date.parse(examTime));
        const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate();
        const month = time.getMonth()+1;
        const timeStr = month + '月' + date + '日 ';

        nameMap[timeStr + ' '+name] = [index, time.getTime()];
        dataList.push({'para': para, 'impression': impression, 'description': description});
        index += 1
    }
    return [dataList, nameMap]
};


const Exam = ({queryID}) => {
    const classes = useStyles();

    // 获取数据
    const dispatch = useDispatch();

    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};

    useEffect(()=>{
        if(unifiedPatientID!=="" && currentVisit.visitID !== ""){
            dispatch(examFetchPosts(visitIdentifier, queryID));
        }

    },  [queryID, visitIdentifier.visitNo, visitIdentifier.hospitalCode, visitIdentifier.hospitalName,
        visitIdentifier.visitType, visitIdentifier.visitID, visitIdentifier.unifiedPatientID]);



    // 重新整理数据
    const selectedExam = useSelector(state => state.individual.exam[queryID].selectedExam);
    const data = useSelector(state => state.individual.exam[queryID].content);
    const isDataFetching = useSelector(state => state.individual.exam[queryID].isFetchingData);
    const [dataList, nameMap] = dataReconstruct(data);
    const examList = Object.entries(nameMap);

    examList.sort(function(a, b) {
        return a[1]-b[1];
    });

    const examOnChange = (event, value)=>{
        dispatch(setNewSelectedExam(value[0]));
    };

    const setSelectedExam = (value)=>{
        dispatch(setNewSelectedExam(value));
    };

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
};

export default Exam;