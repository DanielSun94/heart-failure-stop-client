import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  Input,
  List,
  Divider
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LabtestListItem from './LabtestListItem';
import {pinYinFilter} from '../../../../utils/queryUtilFunction'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  },
  list: {
    overflow: 'auto',
    height: 353,
    maxHeight: 353,
  }
}));

const defaultValue = "搜索（拼音首字母）"

// 此处我们遇到了
const LabtestList = ({labtests, selectedLabtest, setLabtest, listClassName}) => {

  const classes = useStyles();

  const [searchText, setSearchText] = useState("")
  const [filteredLabtest, setFilteredLabtest] = useState([])

  useEffect(()=>{
    setFilteredLabtest(pinYinFilter(labtests, searchText, defaultValue))
  } , [searchText]);

  useEffect(()=>{
    const filteredList = pinYinFilter(labtests, searchText, defaultValue)
    setFilteredLabtest(filteredList)
  }, [labtests])
  

  return (
    <div
      className={clsx(classes.root, listClassName)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder={defaultValue}
          onChange={(event)=>setSearchText(event.target.value)}
        />
        <SearchIcon />
      </Toolbar>
      <Divider />
      <div className={classes.list}>
        <List disablePadding >
          {filteredLabtest.map(labtestName => (
            <LabtestListItem
              active={labtestName === selectedLabtest}
              labtestName={labtestName}
              setSelectedLabtest = {setLabtest}
              key={labtestName}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default LabtestList;
