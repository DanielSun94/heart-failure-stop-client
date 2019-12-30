import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        maxHeight: 400,
    },  
    noData: {
        width: 'auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        width: "100%",
        paddingLeft: 8,
        paddingTop: 8,
        paddingRight: 8
    }
  });

const ExamContent = ({nameMap, dataList, selectedExam}) => {
    const classes = useStyles();

    if (dataList && nameMap && dataList.length > 0 && Object.keys(nameMap).length>0 && selectedExam !== "" &&
        nameMap[selectedExam] && nameMap[selectedExam].length>0){
        const content = dataList[nameMap[selectedExam][0]];
        if(content && content.para){
            return (
                <div className={classes.root}>  
                <Typography variant="h4" className={classes.text}>检查参数:</Typography>
                <Typography align={'justify'} className={classes.text}>{content.para}</Typography>
                <Typography variant="h4" className={classes.text}>检查描述:</Typography>
                <Typography align={'justify'} className={classes.text}>{content.description}</Typography>
                <Typography variant="h4" className={classes.text}>检查印象:</Typography>
                <Typography align={'justify'} className={classes.text}>{content.impression}</Typography>
                </div>
            );
        }   
    }

    return (
        <div className={classes.root}>       
            <div className={classes.noData}><h3>未找到相关报告</h3></div>
        </div>
    )
}





export default ExamContent