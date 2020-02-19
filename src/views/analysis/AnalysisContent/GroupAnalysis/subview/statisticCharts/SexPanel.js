import React, {useEffect} from 'react'
import {VictoryPie} from 'victory'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import ParaName from "../../../../../../utils/ParaName";
import {
    Card,
    CardHeader,
    Divider,
    colors,
    CircularProgress
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {
    getSexInfo,
    getVisitInfo,
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

export const SexPanel =({queryID})=>{
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

    const handleClick=(sex)=>{
        // 点击之后需要完成几个任务，
        // 4.跳转

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
                {(!(isDataOutOfDate||(!isDataValid)))&&(
                    <VictoryPie
                        innerRadius={60} labelRadius={80}
                        colorScale={[colors.indigo[900], colors.red[600]]}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onClick: (event, value) => {
                                    const sexIndex = value.index;
                                    let sex;
                                    if(sexIndex===1){sex="female"}
                                    else {sex="male"}
                                    handleClick(sex);
                                }
                            }
                        }]}
                        data={[
                            { x: "男性\n"+male+"\n人次", y: male },
                            { x: "女性\n"+female+"\n人次", y: female },
                        ]}
                        style={{labels: {  fontSize: 20, fill: "white",} }}
                    />
                )
                }
            </div>
        </Card>
    )
}