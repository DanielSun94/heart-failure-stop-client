import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        maxHeight: 400
    },  
    tableWrapper: {
        maxHeight: 400,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    chartWrapper: {
        maxHeight: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
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
            {'No data'}
            </div>
          );
    }

}





export default ExamContent