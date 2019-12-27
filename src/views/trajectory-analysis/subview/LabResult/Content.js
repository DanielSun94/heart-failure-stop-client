import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fullTimeTrans } from '../../../../utils/queryUtilFunction';
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
    TableCell,
    Tabs ,
    Tab
} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        maxHeight: 400,
        display: 'flex',
        flexDirection: 'column'
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
    tabs:{
        height: 48,
        width: '100%',
        '@media (min-width: 864px)': {
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    }
  }));

const LabtestResultContent = ({
    singleVisitLabTestTrace, selectedLabtest, fullTraceLabTest,
    showSingleVisit, setShowSingleVisit}) => {

    const classes = useStyles();
    const [tab, setTab] = useState(showSingleVisit? 0: 1);

    let content = null;
    if(selectedLabtest === ''){
        content = <div className={classes.noData}><h3>无需要显示的数据</h3></div>
    }
    else if (showSingleVisit){
        content= organizeContent(singleVisitLabTestTrace, selectedLabtest, classes)
    }
    else {
        content = organizeContent(fullTraceLabTest, selectedLabtest, classes)
    }

    return (
    <div className={classes.root}>
        <div className={classes.tabs}>
            <Tabs
                value={tab}
                onChange={(event, newValue) => {
                    setTab(newValue); 
                    setShowSingleVisit(newValue===0 ? true: false)
                }}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="本次入院" />
                <Tab label="长期趋势" />
            </Tabs>
        </div>
        {content}
    </div>
  );
}

const organizeContent=(labTestDict, labTestName, classes) => {
    let content = <div className={classes.noData}><h3>未找到相关记录</h3></div>

    if(!(labTestDict[labTestName] && labTestDict[labTestName].length > 0))
        return content
        
    let allNull = true
    for(let labtest of labTestDict[labTestName]){
        if(labtest['result']!==null){
            allNull=false
            break
        }
    }
    if(allNull)
        return content

    let isNumber = true
    for(let labtest of labTestDict[labTestName]){
        let result = parseFloat(labtest['result'])
        if(isNaN(result) && labtest['result']!==null){
            result = labtest['result']
            isNumber = false
        }
    }

    let unit = null
    for(let labtest of labTestDict[labTestName]){
        if(labtest['unit'] && labtest['unit']!=='null'){
            unit=labtest['unit']
            break
        }
    }
    
    let resultList = []
    let index = 1
    for(let item of labTestDict[labTestName]){
        const time = Date.parse(item['testTime'])
        const timeStr = fullTimeTrans(time)
        const value = item['result']
        const visit = item['hospitalName']+"第"+item['visitID']+'次'+item['visitType']
        resultList.push({"timeStr": timeStr, "resultStr":value+' '+unit, 'time': new Date(time), 
        'index': index, 'visitInfo': visit, "result":value})
        index+=1
    }
    resultList.sort(function(a, b){return a['time']-b['time']});
    if (isNumber){
        content = buildLineChart(unit, resultList, classes)
    }
    else{
        content = buildTable(unit, resultList, classes)
    }
    return content
}

const buildTable = (unit, data, classes) =>{
    data.sort(function(a,b){return a['time']-b['time']})
    return (
        <div className={classes.tableWrapper}>  
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>
                  {'入院信息'}
                </TableCell>
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
                    {item['visitInfo']}
                </TableCell>
                <TableCell>
                    {item['timeStr']}
                </TableCell>
                <TableCell>
                    {item['result']===null?"":item['result']}
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
  const buildLineChart = (unit, data, classes) =>{
    // find biggest and smallest value to set domain bound
    let maximumValue = Number.MIN_VALUE
    let minimumValue = Number.MAX_VALUE
    for(let item of data){
        let value = item['result']
        value = parseFloat(value)
        if(value===null || isNaN(value))
            continue
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
            padding={{ left: 20, right: 20 }}
            dataKey={"index"} 
            />
            <YAxis 
            padding={{ bottom: 40 }}
            label={{value: "单位: "+unit, angle: -90, position: 'insideLeft'}} 
            type="number" domain={[Math.floor(minimumValue*0.95), Math.ceil(maximumValue*1.05)]}
            />
            <Tooltip 
                content={<CustomTooltip/>}
            />
            <Line 
            type="monotone" 
            dataKey="result" 
            stroke="#3f51b5" 
            dot={{r: 4}}
            activeDot={{r: 5}}
            animationDuration={500}
            strokeWidth={2}/>
        </LineChart>
        </ResponsiveContainer>
        </div>
    )
}

const CustomTooltip = ({type, active, payload, label}) =>{
    if (active && payload[0]) {
        return (
            <div style={{backgroundColor:'#ffffff', border: '3px solid #f8f8f8'}}>
                <div style={{padding:'10px 10px 10px 10px'}}>
                    <p>{'入院：'+payload[0].payload['visitInfo']}</p>
                    <p>{'检查时间：'+payload[0].payload['timeStr']}</p>
                    <p>{'结果：'+payload[0].payload['resultStr']}</p>
                </div>
            </div>
        );
    }
    return null;
}

export default LabtestResultContent