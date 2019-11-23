import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 410,
    width: 296,
    overflow: 'auto',
  },
});

const OrderTable = (nameList, selectedOrder, setSelectedOrder) => {
  // 注意，不可以在条件语句中使用Hooks
  const classes = useStyles();
  return (
    <div className={classes.tableWrapper}>  
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>
                  {'医嘱名称'}
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameList.map(name => (
              name === selectedOrder ? (
                <TableRow key={name} selected>
                    <TableCell>
                        {name}
                    </TableCell>
                </TableRow>
              ):
              (
                <TableRow key={name} hover onClick={()=>setSelectedOrder(name)}>
                <TableCell>
                    {name}
                </TableCell>
            </TableRow>
              )
              )
            )}
          </TableBody>
        </Table>
    </div>
  );
}

export default OrderTable