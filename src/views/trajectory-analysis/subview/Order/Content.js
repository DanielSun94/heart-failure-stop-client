import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
} from 'recharts';
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
        width: 623,
        height: 400
    },  
    tableWrapper: {
        maxHeight: 400,
        width: 623,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    chartWrapper: {
        height: 400,
        width: 600,
        display: 'flex',
        alignItems: 'center',
    },
  });

const OrderContent = (dataMap, selectedOrder) => {
    const classes = useStyles()

    const buildTable = (data) =>{
        data.sort(function(a,b){return a['time']-b['time']})
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
                {data.map(item => (
                <TableRow key={item.time}>
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
      }
      

    let content = <h1> No Data</h1>
    if(dataMap && Object.keys(dataMap).length > 0 && selectedOrder && selectedOrder !== '' && dataMap[selectedOrder]){

        const result = dataMap[selectedOrder]
        if(result.length > 1)
            console.log(result)
        let resultList = []

        for(let item of result){
            const startTime = new Date(item['startTime'])
            const startDate = startTime.getDate() >= 10 ? startTime.getDate() :'0'+startTime.getDate()
            const startHour = startTime.getHours() >= 10 ? startTime.getHours() :'0'+startTime.getHours()
            const startMinute = startTime.getMinutes() >= 10 ? startTime.getMinutes() :'0'+startTime.getMinutes()
            const startMonth = startTime.getMonth()+1
            const startTimeStr = startMonth + '月' + startDate + '日 ' + startHour +':'+startMinute
            const endTime = new Date(item['endTime'])
            const endDate = endTime.getDate() >= 10 ? endTime.getDate() :'0'+endTime.getDate()
            const endHour = endTime.getHours() >= 10 ? endTime.getHours() :'0'+endTime.getHours()
            const endMinute = endTime.getMinutes() >= 10 ? endTime.getMinutes() :'0'+endTime.getMinutes()
            const endMonth = endTime.getMonth()+1
            const endTimeStr = endMonth + '月' + endDate + '日 ' + endHour +':'+endMinute

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
}


export default OrderContent