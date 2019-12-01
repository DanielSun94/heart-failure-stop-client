import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        maxHeight: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },  
    noData: {
        width: 'auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableWrapper: {
        height: '100%',
        maxHeight: 400,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    chartWrapper: {
        height: '100%',
        maxHeight: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

const ExamContent = (nameMap, dataList, selectedExam) => {
    const classes = useStyles()

    const content = dataList[nameMap[selectedExam]]
    if(content && content.para){
        return (
            <div className={classes.root}>  
                {content.para}
                {content.description}
                {content.impression}
            </div>
          );
    }
    else{
        return (
            <div className={classes.root}>     
                <div className={classes.noData}><h3>未找到相关报告</h3></div>
            </div>
          );
    }

}





export default ExamContent