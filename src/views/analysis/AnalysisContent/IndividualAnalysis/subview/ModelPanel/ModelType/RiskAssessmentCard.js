import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { modelFetchPost} from "../../../../../../../actions/individualAnalysisAction/modelAction";
import {
    Card,
    CircularProgress,
    Typography,
    Button
} from '@material-ui/core'
import {setQueryContext, setSelectedQuery} from "../../../../../../../actions/metaInfoAction";
import {editQueryName} from "../../../../../../../actions/metaInfoAction";
import {createNewQuery} from "../../../../../../../actions/metaInfoAction";
import ParaName from "../../../../../../../utils/ParaName";
import RouteName from "../../../../../../../utils/RouteName";

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        height: 100,
        width: 330,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: "center",
    },
    itemCard: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        marginRight: 5,
        height: '90%',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
    },
    result: {
        height: '100%',
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelInfo: {
        height: '100%',
        width: '60%',
    }
});

const RiskAssessmentCard = ({unifiedModelName, queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const metaInfoMap = useSelector(state=>state.metaInfo.metaInfoMap);
    const newQueryID =  useSelector(state=>state.metaInfo.nextID);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};

    // 检查是不是在没有进行任何查询时提交的调用模型申请
    let checkFlag = false;
    if(unifiedPatientID&&unifiedPatientID.length>0&&currentVisit.visitID&&currentVisit.visitID.length>0
        &&currentVisit.visitType&&currentVisit.visitType.length>0&&currentVisit.hospitalCode&&currentVisit.hospitalCode.length>0
    )
        checkFlag=true;

    // 获取计算结果
    // unifiedModelName由模型大类，模型名称，模型功能三部分组成，每部分中间使用下划线表明
    const splitModelNameList = unifiedModelName.split('_');
    useEffect(()=>{
        if(checkFlag){
            dispatch(modelFetchPost(
                visitIdentifier,
                splitModelNameList[0],
                splitModelNameList[1],
                splitModelNameList[2],
                queryID
            ))
        }
    }, [queryID, currentVisit]);

    // 当模型数据获取完毕时更新
    let result = 0;
    let isDataValid = false;
    let isFetchingData = false;
    let modelColor = 'black';
    let modelDetail = useSelector(state=>state.individual.model[queryID].modelDetail[unifiedModelName]);
    if(modelDetail!==undefined){
        result = modelDetail.result[0]*100;
        isDataValid = modelDetail.isDataValid;
        isFetchingData = modelDetail.isFetchingData;
        modelColor = result > 60?'red':'black';
    }

    // 获取该模型的显示（中文）名称
    const allModels = useSelector(state=>state.algorithm.algorithmList);
    let modelChineseFunctionName = "";
    let modelChineseName = "";
    for(const item of allModels){
        if(item.mainCategory+'_'+item.modelEnglishName+"_"+item.modelEnglishFunctionName===unifiedModelName){
            modelChineseFunctionName=item.modelChineseFunctionName;
            modelChineseName=item.modelChineseName;
            break;
        }
    }

    // 模型上下文信息，正常情况下，上下文信息应当只包括unifiedModelName
    // 用于告诉page到底应该渲染什么页面
    // 其余的信息都从queryID直接查看state的内容得到
    const context = {
        unifiedModelName: unifiedModelName,
    };

    const createIndividualAlgorithmPage=()=>{
        // 当细节page没有被创建过时，创建并跳转。如果已经创建过了，则直接跳转
        let isCreatedAlready = -1;
        for(const key in metaInfoMap){
            if(!metaInfoMap.hasOwnProperty(key))
                continue;
            if(metaInfoMap[key].affiliated===queryID&&metaInfoMap[key].context.unifiedModelName===unifiedModelName)
                isCreatedAlready=key;
        }
        if(isCreatedAlready>0){
            history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+
                RouteName.INDIVIDUAL_ALGORITHM_DETAIL+"/"+isCreatedAlready);
            dispatch(setSelectedQuery(Number.parseInt(isCreatedAlready)));
        }
        else{
            dispatch(createNewQuery(ParaName.INDIVIDUAL_ALGORITHM, queryID));
            dispatch(setQueryContext(context, newQueryID));
            dispatch(editQueryName(
                modelChineseName+' '+modelChineseFunctionName, false, newQueryID));
            history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS+
                RouteName.INDIVIDUAL_ALGORITHM_DETAIL+"/"+newQueryID)
            dispatch(setSelectedQuery(Number.parseInt(newQueryID)));
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.itemCard}>
                <Button
                    style={{
                        height:'100%', width: '100%', textAlign: 'left'
                    }}
                    onClick={createIndividualAlgorithmPage}
                >
                    {((!isFetchingData)&&isDataValid) ? (
                        <div className={classes.result}>
                            <Typography variant="h3" style={{"color": modelColor}}>
                                {result.toFixed(2)+'%'}
                            </Typography>
                        </div>
                    ): (
                        <div className={classes.result}>
                            <CircularProgress size={40} />
                        </div>
                    )}
                    <div className={classes.modelInfo}>
                        <Typography style={{paddingTop:8, textTransform: "none"}} variant="h5">
                            {modelChineseFunctionName}
                        </Typography>
                        <Typography variant="h6" style={{paddingTop:6, textTransform: "none"}}>
                            {modelChineseName}
                        </Typography>
                        <Typography variant="caption">
                            风险预警
                        </Typography>
                    </div>
                </Button>
            </Card>
        </div>
    )
};

export default RiskAssessmentCard;

