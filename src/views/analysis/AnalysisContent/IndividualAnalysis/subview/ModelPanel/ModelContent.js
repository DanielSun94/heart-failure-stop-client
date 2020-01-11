import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { modelFetchPost} from "../../../../../../actions/individualAnalysisAction/modelAction";
import {
    Card,
    CircularProgress,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        overflow: 'scroll',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: "flex-start",
        flexWrap: 'wrap'
    },
    singleCard: {
        height: '25%',
        width: '31%',
        marginLeft: 16,
        marginTop: 16
    },
    itemCard: {
        height: '100%',
        width: '100%',
        padding: 0
    },
    itemRoot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
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

const ModelContent = ({queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const allModels = useSelector(state=>state.algorithm.algorithmList);
    const modelDetail = useSelector(state=>state.individual.model[queryID].modelDetail);
    const selectedModelList = useSelector(state=>state.individual.model[queryID].selectedModelList);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};

    // 将所有模型列表的数据结构进行重建，方便后期找中文名
    let allModelMap = {};
    for(let item of allModels){
        const unifiedModelName = item.mainCategory+"_"+item.modelEnglishName+"_"+item.modelEnglishFunctionName;
        allModelMap[unifiedModelName] = {
            modelCategory: item.mainCategory,
            modelChineseName:item.modelChineseName,
            modelChineseFunctionName:item.modelChineseFunctionName,
        }
    }

    // 检查是不是在没有进行任何查询时提交的调用模型申请
    let checkFlag = false;
    if(unifiedPatientID&&unifiedPatientID.length>0&&currentVisit.visitID&&currentVisit.visitID.length>0
        &&currentVisit.visitType&&currentVisit.visitType.length>0&&currentVisit.hospitalCode&&currentVisit.hospitalCode.length>0
    )
        checkFlag=true;

    // 获取计算结果
    for(let unifiedModelName of selectedModelList){
        const splitModelNameList = unifiedModelName.split('_');
        if((!modelDetail[unifiedModelName])&&checkFlag){
            dispatch(modelFetchPost(
                visitIdentifier,
                splitModelNameList[0],
                splitModelNameList[1],
                splitModelNameList[2],
                queryID
            ))
        }
    }

    // 将需要显示的模型信息筛选出来
    let resultList = [];
    for(let item in modelDetail){
        if(!modelDetail.hasOwnProperty(item)||!selectedModelList.includes(item))
            continue;
        const modelCategory = allModelMap[item].modelCategory;
        const modelChineseFunctionName = allModelMap[item].modelChineseFunctionName;
        const modelChineseName = allModelMap[item].modelChineseName;
        const result = modelDetail[item].result;
        const isDataValid = modelDetail[item].isDataValid;
        const isFetchingData = modelDetail[item].isFetchingData;
        resultList.push({
            modelCategory: modelCategory, modelChineseFunctionName: modelChineseFunctionName,
            modelChineseName: modelChineseName, result: result, isDataValid: isDataValid, isFetchingData: isFetchingData
        })
    }

    return (
        <div className={classes.root}>
            {resultList.map((item, index)=>(
                    <div className={classes.singleCard} key={index}>
                        <ModelItem displayInfo={item}/>
                    </div>)
            )}
        </div>
    )
};


const ModelItem = ({displayInfo}) => {
    const classes = useStyles();

    const modelCategory = displayInfo.modelCategory;
    const modelChineseFunctionName = displayInfo.modelChineseFunctionName;
    const modelChineseName = displayInfo.modelChineseName;
    const result = Number(displayInfo.result*100);
    const isDataValid = displayInfo.isDataValid;
    const isFetchingData = displayInfo.isFetchingData;
    const modelColor = result > 60?'red':'black';

    const categoryMapping = {
        'riskAssessment': "风险预警",
        'progressionAnalysis': "演变过程",
        'survivalAnalysis': "生存分析",
        'treatmentRecommendation': "干预推荐",
        'treatmentComparison': "干预比较",
        'dataImputation': "数据插补",
    };
    const modelCategoryChinese = categoryMapping[modelCategory];

    return (
        <Card className={classes.itemCard}>
            <div className={classes.itemRoot}>
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
                        {modelCategoryChinese}
                    </Typography>
                </div>
            </div>
        </Card>
    )
};


export default ModelContent;

