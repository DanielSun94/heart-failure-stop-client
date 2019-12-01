import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  Input,
  IconButton,
  Tooltip,
  List,
  Divider
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import OrderListItem from './OrderListItem';
import pinyin from 'pinyin'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  },
  list: {
    overflow: 'auto',
    height: 361,
    maxHeight: 361,
    
  }
}));

const defaultValue = "搜索（拼音首字母）"

// 此处我们遇到了
const OrderList = ({orders, selectedOrder, setSelectedOrder, listClassName}) => {

  const classes = useStyles();

  const [searchText, setSearchText] = useState("")
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(()=>{
    setFilteredOrders(filterOrder(orders, searchText))
  } , [searchText]);

  useEffect(()=>{
    const orderList = filterOrder(orders, searchText)
    setFilteredOrders(orderList)
  }, [orders])
  

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
        <Tooltip title="Search">
          <IconButton edge="end">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <div className={classes.list}>
        <List disablePadding >
          {filteredOrders.map(orderName => (
            <OrderListItem
              active={orderName === selectedOrder}
              orderName={orderName}
              setSelectedOrder = {setSelectedOrder}
              key={orderName}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

const filterOrder = (ordersWaitFilter, text) => {

  if(text==="" || text===defaultValue)
    return ordersWaitFilter

  let filteredList = []
  const lowCaseText = text.toLowerCase()

  for(let item of ordersWaitFilter){
    const firstLetterList = pinyin(item, {style: pinyin.STYLE_FIRST_LETTER})
    let firstLetterStr = ""
    for(let strList of firstLetterList)
      firstLetterStr += strList[0]
    firstLetterStr = firstLetterStr.toLowerCase()

    if(firstLetterStr.includes(lowCaseText))
      filteredList.push(item)
  }
  return filteredList
}

export default OrderList;
