import React, {useEffect} from 'react';
import {
    Card,
    CardHeader,
    Divider,
    CircularProgress,
    colors
} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {useHistory} from 'react-router-dom'
import {
    changeManagementQueryFilter,
    getAgeInfo,
    initializeManagementQuery, queryDataAccordingToFilter
} from "../../../../../../actions/groupAnalysisAction/managementAction";
import {createNewQuery, editQueryName, setSelectedQuery} from "../../../../../../actions/metaInfoAction";
import ParaName from "../../../../../../utils/ParaName";
import RouteName from "../../../../../../utils/RouteName";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from 'recharts'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const AgePanel =({queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const ageList = useSelector(state=>state.group.management[queryID].statistics.age.content);
    const isDataValid = useSelector(state=>state.group.management[queryID].statistics.age.isDataValid);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].isDataOutOfDate);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    const fatherQueryNae = useSelector(state=>state.metaInfo.metaInfoMap[queryID].queryName);

    useEffect(()=>{
        // 此处filter>0的判断必须要有，因为如果删除一个查询，马上重建后，会直接触发服务器返回过时数据
        // 因此必须要重设filter后才能获取
        if((!isDataValid)&&(!isDataOutOfDate)&&Object.keys(filter).length>0){
            dispatch(getAgeInfo(queryID))
        }
    },[isDataValid, isDataOutOfDate]);

    const handleClick=(event)=>{
        const activeIndex = event.activeTooltipIndex;
        // 点击之后需要完成几个任务

        // 1.创建新的子查询并初始化
        dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID));
        dispatch(initializeManagementQuery(nextID));

        // 2.更改新查询的名称（改为添加的过滤器名称）
        dispatch(editQueryName(fatherQueryNae+"_"+(activeIndex*10)+"-"+(activeIndex*10+9)+"岁",
            false, nextID));

        // 3.更新并提交过滤器
        let maxIdx=-1;
        const newFilter = {};
        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                newFilter[key] = [...filter[key]]
            }
        }
        for(const key in newFilter){
            if(key>=maxIdx){
                maxIdx=parseInt(key)
            }
            if(newFilter.hasOwnProperty(key)){
                newFilter[key][0] = true;
            }
        }
        newFilter[maxIdx+1]=[false, ParaName.AGE, activeIndex*10, activeIndex*10+9];
        dispatch(changeManagementQueryFilter(newFilter, nextID));

        // 4. 发起数据请求 此处构建新状态
        dispatch(queryDataAccordingToFilter(filter, nextID, queryID, [false, ParaName.AGE, activeIndex*10, activeIndex*10+9]));
        // 5. 实现跳转
        dispatch(setSelectedQuery(nextID));
        history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS+'/'+nextID)
    };

    const data = [
        {
            "name": "0-9",
            "age": ageList['zeroToNine'],
        },
        {
            "name": "10-19",
            "age": ageList['tenToNineteen'],
        },
        {
            "name": "20-29",
            "age": ageList['twentyToTwentyNine'],
        },
        {
            "name": "30-39",
            "age": ageList['thirtyToThirtyNine'],
        },
        {
            "name": "40-49",
            "age": ageList['fortyToFortyNine'],
        },
        {
            "name": "50-59",
            "age": ageList['fiftyToFiftyNine'],
        },
        {
            "name": "60-69",
            "age": ageList['sixtyToSixtyNine'],
        },
        {
            "name": "70-79",
            "age": ageList['seventyToSeventyNine'],
        },
        {
            "name": "80-89",
            "age": ageList['eightyToEightyNine'],
        },
        {
            "name": "90-99",
            "age": ageList['ninetyToNinetyNine'],
        },
        {
            "name": "100+",
            "age": ageList['largerThanOneHundred'],
        },
    ];

    return (
        <Card className={classes.root}>
            <CardHeader title="年龄分布"/>
            <Divider />
            <div style={{width: '90%', height: "90%"}}>
                {(isDataOutOfDate||(!isDataValid))&&
                <div
                    style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                    {Object.keys(filter).length!==0&&<CircularProgress/>}
                </div>}
                <BarChart
                    width={800}
                    height={340}
                    data={data}
                    onClick={handleClick}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="age" fill={colors.indigo[600]} />
                </BarChart>
            </div>
        </Card>
    )
};

const CustomTooltip = ({ active, payload, label}) => {
    if (active) {
        return (
            <div style={{backgroundColor:'#ffffff', border: '3px solid #f8f8f8'}}>
                <div style={{padding:'10px 10px 10px 10px'}}>
                    <p className="label">{"年龄： "+label+" 岁"}</p>
                    <p className="desc">{"数量： "+payload[0].value+" 人次"}</p>
                </div>
            </div>
        );
    }
    return null;
};

export default AgePanel;