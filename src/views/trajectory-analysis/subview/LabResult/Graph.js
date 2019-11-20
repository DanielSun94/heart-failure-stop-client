import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts';

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        maxWidth: 600
    },
  });

const LabtestResultGraph = (dataMap, selectedLabtest) => {
    const classes = useStyles()

    let graph = <h1> No Data</h1>
    if(dataMap && Object.keys(dataMap).length > 0 && selectedLabtest && selectedLabtest !== '' && dataMap[selectedLabtest]){
        const isNumber = dataMap[selectedLabtest].isNumber
        
        const unit = dataMap[selectedLabtest].unit
        const result = dataMap[selectedLabtest].resultList
        if(result.length > 1)
            console.log(result)
        let resultList = []
        
        if (isNumber){
            for(let item of result){
                const time = new Date(item[1])
                const month = time.getMonth()+1
                const timeStr = month + '月' + time.getDate() + '日 ' +time.getHours()+':'+time.getMinutes()
                const value = item[0]
                resultList.push({"日期": timeStr, "检测结果":value, 'time': time.getTime()})
            }
            resultList.sort(function(a, b){return a['time']-b['time']});

            graph = buildLineChart(unit, resultList)
        }
    }

    return (
    <div className={classes.root}>  
        {graph}
    </div>
  );
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
        <LineChart width={600} height={340} data={data}
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
    )
}

export default LabtestResultGraph