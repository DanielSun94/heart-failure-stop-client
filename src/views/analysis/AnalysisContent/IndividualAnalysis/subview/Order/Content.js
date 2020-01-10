import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { monthAndDateAndTimeTrans } from '../../../../../../utils/queryUtilFunction';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core'

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

const OrderContent = ({dataMap, selectedOrder}) => {
    const classes = useStyles();

    const buildTable = (data) =>{
        data.sort(function(a,b){return a['time']-b['time']});
        return (
            <div className={classes.tableWrapper}>  
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                    <TableCell>
                      {'开始时间'}
                    </TableCell>
                    <TableCell>
                      {'结束时间'}
                    </TableCell>
                    <TableCell>
                      {'剂量'}
                    </TableCell>
                    <TableCell>
                      {'单位'}
                    </TableCell>
                    <TableCell>
                      {'频率'}
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>
                        {item['startTime']}
                    </TableCell>
                    <TableCell>
                        {item['endTime']}
                    </TableCell>
                    <TableCell>
                        {item['dosage']}
                    </TableCell>
                    <TableCell>
                        {item['unit']}
                    </TableCell>
                    <TableCell>
                        {item['frequency']}
                    </TableCell>
                </TableRow>  
                ))}
              </TableBody>
            </Table>
        </div>
        )
      };
      

    let content = <div className={classes.noData}><h3>无可显示的数据</h3></div>;
    if(dataMap && Object.keys(dataMap).length > 0 && selectedOrder && selectedOrder !== '' && dataMap[selectedOrder]){

        const result = dataMap[selectedOrder];
        if(result.length > 1)
            console.log(result);
        let resultList = [];

        for(let item of result){
            const startTimeStr = monthAndDateAndTimeTrans(item['startTime']);
            const endTimeStr = monthAndDateAndTimeTrans(item['endTime']);
            
            resultList.push({"startTime": startTimeStr, "endTime": endTimeStr, 
            "dosage":item['dosage'], "unit":item['unit'],"frequency":item['frequency'],})
        }
        resultList.sort(function(a, b){return a['startTime']-b['startTime']});

        content = buildTable(resultList)
    }

    return (
    <div className={classes.root}>  
        {content}
    </div>
  );
};


export default OrderContent