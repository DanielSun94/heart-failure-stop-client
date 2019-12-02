import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { monthAndDateAndTimeTrans } from '../../../../utils/queryUtilFunction';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer
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

const LabtestResultContent = ({dataMap, selectedLabtest}) => {
    const classes = useStyles()

    const buildTable = (unit, data) =>{
        data.sort(function(a,b){return a['time']-b['time']})
        return (
            <div className={classes.tableWrapper}>  
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                    <TableCell>
                      {'日期'}
                    </TableCell>
                    <TableCell>
                      {'检测结果'}
                    </TableCell>
                    <TableCell>
                      {'单位'}
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => (
                <TableRow key={item.time}>
                    <TableCell>
                        {item['日期']}
                    </TableCell>
                    <TableCell>
                        {item['检测结果']}
                    </TableCell>
                    <TableCell>
                        {unit}
                    </TableCell>
                </TableRow>  
                ))}
              </TableBody>
            </Table>
        </div>
        )
      }
      const buildLineChart = (unit, data) =>{
        // find biggest and smallest value to set domain bound
        let maximumValue = Number.MIN_VALUE
        let minimumValue = Number.MAX_VALUE
        for(let item of data){
            const value = item['检测结果']
            if (value > maximumValue)
                maximumValue = value
            if (value < minimumValue)
                minimumValue = value
        }
    
        return (
            <div className={classes.chartWrapper}>
            <ResponsiveContainer width={'90%'} height={"90%"}>
            <LineChart  data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                padding={{ left: 40 }}
                dataKey={"日期"} 
                />
                <YAxis 
                padding={{ bottom: 40 }}
                label={{value: "单位: "+unit, angle: -90, position: 'insideLeft'}} 
                type="number" domain={[Math.floor(minimumValue*0.95), Math.ceil(maximumValue*1.05)]}
                />
                <Tooltip />
                <Line 
                type="monotone" 
                dataKey="检测结果" 
                stroke="#3f51b5" 
                dot={{r: 4}}
                activeDot={{r: 8}}
                animationDuration={500}
                strokeWidth={2}/>
            </LineChart>
            </ResponsiveContainer>
            </div>
        )
      }

    let content = <div className={classes.noData}><h3>无可显示的数据</h3></div>
    if(dataMap && Object.keys(dataMap).length > 0 && selectedLabtest && selectedLabtest !== '' && dataMap[selectedLabtest]){
        const isNumber = dataMap[selectedLabtest].isNumber
        
        const unit = dataMap[selectedLabtest].unit
        const result = dataMap[selectedLabtest].resultList
        if(result.length > 1)
            console.log(result)
        let resultList = []
        
        if (isNumber){
            for(let item of result){
                const timeStr = monthAndDateAndTimeTrans(item[1])
                const value = item[0]
                resultList.push({"日期": timeStr, "检测结果":value, 'time': new Date(item[1])})
            }
            resultList.sort(function(a, b){return a['time']-b['time']});

            content = buildLineChart(unit, resultList)
        }
        else{
            for(let item of result){
                const timeStr = monthAndDateAndTimeTrans(item[1])
                const value = item[0]
                resultList.push({"日期": timeStr, "检测结果":value, 'time': new Date(item[1])})
            }
            resultList.sort(function(a, b){return a['time']-b['time']});

            content = buildTable(unit, resultList)
        }
    }

    return (
    <div className={classes.root}>  
        {content}
    </div>
  );
}





export default LabtestResultContent