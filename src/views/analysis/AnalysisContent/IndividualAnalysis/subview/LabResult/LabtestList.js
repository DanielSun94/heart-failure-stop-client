import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Input,
  List,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LabtestListItem from './LabtestListItem';
import {filter} from '../../../../../../utils/queryUtilFunction'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1,
    paddingLeft: 25
  },
  list: {
    overflow: 'auto',
    height: 353,
    maxHeight: 353,
  },
  toolBar:{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
    '@media (min-width: 864px)': {
      borderBottom: `1px solid ${theme.palette.divider}`
  }
  }
}));

const defaultValue = "搜索（拼音首字母）";

const LabtestList = ({labtests, selectedLabtest, setLabtest, filterStr, setFilterStr}) => {

  const classes = useStyles();

  const [filteredLabtest, setFilteredLabtest] = useState([]);

  useEffect(()=>{
    setFilteredLabtest(filter(labtests, filterStr, defaultValue))
  } , [filterStr]);

  useEffect(()=>{
    const filteredList = filter(labtests, filterStr, defaultValue);
    setFilteredLabtest(filteredList)
  }, [labtests]);
  

  return (
    <div
      className={clsx(classes.root)}
    >
      <div className={classes.toolBar}>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder={defaultValue}
          onChange={(event)=>setFilterStr(event.target.value)}
        />
        <SearchIcon style={{marginRight: '20'}}/>
      </div>
      <div className={classes.list}>
        <List disablePadding >
          {filteredLabtest.map(labtestName => (
            <LabtestListItem
              active={labtestName[0] === selectedLabtest}
              labtestName={labtestName[0]}
              setSelectedLabtest = {setLabtest}
              key={labtestName[0]}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default LabtestList;
