import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import ParaName from "../../../../../../utils/ParaName";
import {
    Card,
    CardHeader,
    Divider,
    colors,
    CircularProgress,
    Typography
} from '@material-ui/core'
import {
    PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import {useHistory} from 'react-router-dom'
import {
    getSexInfo,
    queryDataAccordingToFilter
} from "../../../../../../actions/groupAnalysisAction/managementAction";
import {createNewQuery, editQueryName, setSelectedQuery} from "../../../../../../actions/metaInfoAction";
import {initializeManagementQuery,
    changeManagementQueryFilter} from "../../../../../../actions/groupAnalysisAction/managementAction";
import RouteName from "../../../../../../utils/RouteName";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const SexPanel =({queryID})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const nextID = useSelector(state=>state.metaInfo.nextID);
    const male = useSelector(state=>state.group.management[queryID].statistics.sex.male);
    const female = useSelector(state=>state.group.management[queryID].statistics.sex.female);
    const isDataValid = useSelector(state=>state.group.management[queryID].statistics.sex.isDataValid);
    const isDataOutOfDate = useSelector(state=>state.group.management[queryID].isDataOutOfDate);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    const fatherQueryNae = useSelector(state=>state.metaInfo.metaInfoMap[queryID].queryName);

    useEffect(()=>{
        // 此处filter>0的判断必须要有，因为如果删除一个查询，马上重建后，会直接触发服务器返回过时数据
        // 因此必须要重设filter后才能获取
        if((!isDataValid)&&(!isDataOutOfDate)&&Object.keys(filter).length>0){
            dispatch(getSexInfo(queryID))
        }
    },[isDataValid, isDataOutOfDate]);

    const handleClick=(event)=>{
        const sex = event.name==="男性"?"male":"female";
        // 点击之后需要完成几个任务，

        // 1.创建新的子查询并初始化
        dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID));
        dispatch(initializeManagementQuery(nextID));

        // 2.更改新查询的名称（改为添加的过滤器名称）
        dispatch(editQueryName(fatherQueryNae+"_"+((sex==='male')?"男性":"女性"), false, nextID));

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
        newFilter[maxIdx+1]=[false, ParaName.SEX, sex];
        dispatch(changeManagementQueryFilter(newFilter, nextID));

        // 4. 发起数据请求 此处构建新状态
        dispatch(queryDataAccordingToFilter(filter, nextID, queryID, [false, 'sex', sex]));
        // 5. 实现跳转
        dispatch(setSelectedQuery(nextID));
        history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS+'/'+nextID)
    };

    const data = [
        { name: '男性', value: male },
        { name: '女性', value: female },
    ];

    const COLORS = [colors.indigo[600], colors.red[600]];

    return (
        <Card className={classes.root}>
            <CardHeader title="性别分布"/>
            <Divider />
            <div style={{width: '90%', height: "90%"}}>
                {(isDataOutOfDate||(!isDataValid))&&
                <div
                    style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                    {Object.keys(filter).length!==0&&<CircularProgress/>}
                </div>}
                {(male===0&&female===0)&&
                <div
                    style={{width: "100%", height: "100%", display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                    <Typography>无数据符合条件</Typography>
                </div>}
                {(!(isDataOutOfDate||(!isDataValid)))&&(
                    <PieChart
                        width={350}
                        height={350}
                    >
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={true}
                            onClick={handleClick}
                        >
                            {
                                data.map((entry, index) =>
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Legend verticalAlign="top" height={36}/>
                        <Tooltip />
                    </PieChart>
                )
                }
            </div>
        </Card>
    )
};

export default SexPanel;