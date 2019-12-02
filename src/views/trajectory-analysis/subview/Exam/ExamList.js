import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  List,
} from '@material-ui/core';
import ExamListItem from './ExamListItem';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  },
  list: {
    overflow: 'auto',
    height: 417,
    maxHeight: 417,
  }
}));


const ExamList = ({examList, selectedExam, setSelectedExam, listClassName}) => {

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, listClassName)}
    >
      <div className={classes.list}>
        <List disablePadding >
          {examList.map(exam => (
            <ExamListItem
              active={exam[0] === selectedExam}
              examName={exam[0]}
              setSelectedExam = {setSelectedExam}
              key={exam[0]}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default ExamList;
