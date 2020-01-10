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
import OrderListItem from './OrderListItem';
import {pinYinFilter} from '../../../../../../utils/queryUtilFunction'

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

const defaultValue = "搜索（拼音首字母）";

// 此处我们遇到了
const OrderList = ({orders, selectedOrder, setSelectedOrder, listClassName}) => {

  const classes = useStyles();

  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(()=>{
    setFilteredOrders(pinYinFilter(orders, searchText, defaultValue))
  } , [searchText]);

  useEffect(()=>{
    const orderList = pinYinFilter(orders, searchText, defaultValue);
    setFilteredOrders(orderList)
  }, [orders]);
  

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

export default OrderList;
