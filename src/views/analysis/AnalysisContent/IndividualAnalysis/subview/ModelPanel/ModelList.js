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
    const selectedModelInfo = useSelector(state=>state.individual.model[queryID]['model']);
    const selectedModelList = Object.keys(selectedModelInfo);
    const allModels = useSelector(state=>state.algorithm.algorithmList);

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