import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/styles';
import {useSelector, useDispatch} from 'react-redux';
import {
    Typography,
    Checkbox,
    FormControlLabel,
    colors
} from '@material-ui/core';
import {
    ExpansionPanelSummaryExpandNotSwell,
    ExpansionPanel,
    ExpansionPanelDetails
} from "../../../../../../components/ExpansionPanel/ExpansionPanel";
import {
    addSelectedModel,
    deleteSelectedModel,
    getModelDataAndExecuteModel,
    setVisit
} from "../../../../../../actions/individualAnalysisAction/individualModelAction";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        overflow: 'auto',
        height: "100%",
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    summaryContent: {
        display: 'flex',
        alignItems: 'center'
    },
    itemTuple:{
        height: 60,
        display: 'flex',
        width: '100%',
        alignmentItems: 'center',
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    form:{
        paddingLeft: 16,
        display: 'flex',
        alignItems: 'center',
        marginRight: -8,
    },
    modelName: {
        paddingLeft: 8,
        display: 'flex',
        alignItems: 'center'
    }
}));

const ModelList = ({queryID}) =>{
    // model list负责承担判断现在选中的模型和相关模型的调用请求任务
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedModelInfo = useSelector(state=>state.individual.model[queryID]['model']);
    const selectedModelList = Object.keys(selectedModelInfo);
    const allModels = useSelector(state=>state.algorithm.algorithmList);

    // 此处的stateUnifiedPatientID指存在modelReducer的数据所对应的Panel
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const visitID = currentVisit.visitID;
    const visitType = currentVisit.visitType;
    const hospitalCode = currentVisit.hospitalCode;
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const stateUnifiedPatientID = useSelector(state=>state.individual.model[queryID].unifiedPatientID);
    const stateHospitalCode = useSelector(state=>state.individual.model[queryID].hospitalCode);
    const stateVisitID = useSelector(state=>state.individual.model[queryID].visitID);
    const stateVisitType = useSelector(state=>state.individual.model[queryID].visitType);

    useEffect(()=>{
        // 如果visitChangeFlag发生了变化，说明该query的下已经选中的所有model值均已经过时，需要重新获取
        // 这样可以避免仅仅是queryID变化导致的页面切换，导致的不必要的模型数据的重新获取
        // 如果selectedModelList发生了变化，说明有模型被新增或者取消了。取消不会有影响，新增的模型的isDataValid是false
        // 当仅仅是queryID变化时，不会导致模型数据的重新获取
        const visitChangeFlag = !(hospitalCode===stateHospitalCode&&
            visitID===stateVisitID&&visitType===stateVisitType);
        const emptyVisit = visitID===""&&unifiedPatientID===""&&visitType===""&&hospitalCode;

        if(emptyVisit){
            // 如果是空访问，则什么都不做
        }
        else if(visitChangeFlag){
            for(const unifiedModelName of selectedModelList){
                const splitName = unifiedModelName.split("_");
                const modelCategory = splitName[0];
                const modelName = splitName[1];
                const modelFunction = splitName[2];
                dispatch(getModelDataAndExecuteModel(modelCategory, modelName, modelFunction,
                    unifiedPatientID, hospitalCode, visitType, visitID, queryID));
                dispatch(setVisit(unifiedPatientID, hospitalCode, visitType, visitID, queryID))
            }
        }
        else{
            // 跳这个分支，说明visit合法且没变化，只可能是selectedModel变了
            for(const unifiedModelName of selectedModelList){
                const isFetching = selectedModelInfo[unifiedModelName].isFetchingInputs;
                const isDataValid = selectedModelInfo[unifiedModelName].isInputsValid;
                const splitName = unifiedModelName.split("_");
                const modelCategory = splitName[0];
                const modelName = splitName[1];
                const modelFunction = splitName[2];
                if((!isDataValid)&&(!isFetching)){
                    dispatch(getModelDataAndExecuteModel(modelCategory, modelName, modelFunction,
                        unifiedPatientID, hospitalCode, visitType, visitID, queryID))
                }
            }
        }
    }, [unifiedPatientID, hospitalCode, visitType, visitID, selectedModelList]);


    const chineseCategoryName = ['风险预警', '演变过程', '生存分析', '干预推荐', '干预比较'];
    const englishCategoryName = ['riskAssessment', 'progressionAnalysis', 'survivalAnalysis',
        'treatmentRecommendation', 'treatmentComparison'];
    // filter
    const splitList = {
        'riskAssessment': [],
        'progressionAnalysis': [],
        'survivalAnalysis': [],
        'treatmentRecommendation': [],
        'treatmentComparison': [],
    };
    for(let item of allModels){
        splitList[item['mainCategory']].push(item)
    }

    // ExpansionPanel 默认全部开启
    return (
        <div className={classes.root}>
            {
                chineseCategoryName.map((item, index)=>(
                <ExpansionPanel square expanded={true} key={index}>
                    <ExpansionPanelSummaryExpandNotSwell id={englishCategoryName[index]}>
                        <Typography className={classes.summaryContent}>{chineseCategoryName[index]}</Typography>
                    </ExpansionPanelSummaryExpandNotSwell>
                    <ExpansionPanelDetails>
                        <ModelListSingleCategory
                            selectedModelList={selectedModelList}
                            modelList={splitList[englishCategoryName[index]]}
                            modelCategory={englishCategoryName[index]}
                            queryID={queryID}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
};

const ModelListSingleCategory = ({selectedModelList, modelList, modelCategory, queryID})=>{
    return (
        <div style={{width: '100%'}}>
            {
                modelList.map((item, index)=>(
                    <ModelListItem
                        key={index}
                        selectedModelList={selectedModelList}
                        modelCategory={modelCategory}
                        modelChineseFunction={item.modelChineseFunctionName}
                        modelChineseName={item.modelChineseName}
                        modelEnglishFunction={item.modelEnglishFunctionName}
                        modelEnglishName={item.modelEnglishName}
                        queryID={queryID}
                        createUser={item.createUser}
                        accessControl={item.accessControl}
                    />
                ))}
        </div>
    )
};

const ModelListItem = ({selectedModelList, modelChineseName, modelEnglishName, modelChineseFunction, createUser,
                           modelEnglishFunction, modelCategory, queryID, accessControl}) =>{
    const classes = useStyles();
    const dispatch=useDispatch();
    const currentUser = useSelector(state=>state.session.user.userName);

    let hiddenFlag=false;
    if(accessControl==='close')
        hiddenFlag=true;
    if(accessControl==='private' && currentUser!==createUser)
        hiddenFlag=true;

    const unifiedModelName = modelCategory+"_"+modelEnglishName+"_"+modelEnglishFunction;
    let selectedFlag = false;
    for(const item of selectedModelList){
        if(item===unifiedModelName)
            selectedFlag=true
    }

    const handleChange =(event)=>{
        if(event.target.checked){
            dispatch(addSelectedModel(unifiedModelName, queryID));
        }
        else{
            dispatch(deleteSelectedModel(unifiedModelName, queryID))
        }
    };

    return (
        hiddenFlag?null:
        <div className={classes.itemTuple}>
            <FormControlLabel
                className={classes.form}
                label={null}
                control={
                    <Checkbox
                        value={unifiedModelName}
                        checked={selectedFlag}
                        onChange={handleChange}
                        color={'primary'}
                    />}
             />
             <div className={classes.modelName}>
                 <div>
                     <Typography variant={"h6"}>
                         {modelChineseFunction}
                     </Typography>
                     <Typography variant={"caption"}>
                         {modelChineseName}
                     </Typography>
                 </div>
             </div>
        </div>
    );
};

export default ModelList;