import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { modelFetchPost} from "../../../../../../../actions/individualAnalysisAction/modelAction";
import {
    Card,
    CircularProgress,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        height: '100',
        width: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
    },
    itemCard: {
        marginTop: 5,
        marginLeft: 5,
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
    }, [splitModelNameList[0], splitModelNameList[1], splitModelNameList[2], queryID,
        visitIdentifier.hospitalCode, visitIdentifier.visitType, visitIdentifier.visitID,
        visitIdentifier.unifiedPatientID]);

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

    // 模型上下文信息，用于通知附属的tab页以必要的信息
    const context = {
        unifiedModelName: unifiedModelName,
        unifiedPatientID: unifiedPatientID,
        visitID: visitIdentifier.visitID,
        visitType: visitIdentifier.visitType,
        hospitalCode: visitIdentifier.hospitalCode,
    };


    // onClick={()=>{
    // dispatch(createNewQuery(ParaName.INDIVIDUAL_ALGORITHM, queryID));
    // dispatch(setQueryContext(context, newQueryID));}}

    return (
        <div className={classes.root}>
            <Card className={classes.itemCard}>
                {((!isFetchingData)&&isDataValid) ? (
                    <div className={classes.result}>
                        <Typography variant="h3" style={{"color": modelColor}}>{result.toFixed(2)+'%'}</Typography>
                    </div>
                ): (
                    <div className={classes.result}>
                        <CircularProgress size={40} />
                    </div>
                )}
                <div className={classes.modelInfo}>
                    <Typography style={{paddingTop:8}} variant="h5">
                        {modelChineseFunctionName}
                    </Typography>
                    <Typography variant="h6" style={{paddingTop:6}}>
                        {modelChineseName}
                    </Typography>
                    <Typography variant="caption">
                        风险预警
                    </Typography>
                </div>
            </Card>
        </div>
    )
};

export default RiskAssessmentCard;

