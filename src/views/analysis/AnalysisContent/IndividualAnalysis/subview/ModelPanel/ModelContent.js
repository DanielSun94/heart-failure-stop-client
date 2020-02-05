import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import RiskAssessmentCard from "./ModelType/RiskAssessmentCard";
import TreatmentComparisonCard from "./ModelType/TreatmentComparisonCard";
import TreatmentRecommendationCard from "./ModelType/TreatmentRecommendationCard";
import SurvivalAnalysisCard from "./ModelType/SurvivalAnalysisCard";
import ProgressionAnalysisCard from "./ModelType/ProgressionAnalysisCard";

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: "flex-start",
        flexWrap: 'wrap'
    }
});

const ModelContent = ({queryID}) =>{
    const classes = useStyles();

    const allModels = useSelector(state=>state.algorithm.algorithmList);
    const selectedModelList = useSelector(state=>state.individual.model[queryID].selectedModelList);

    // 将所有模型与其相应的category建立映射
    let modelCategoryMap = {};
    for(let item of allModels){
        const unifiedModelName = item.mainCategory+"_"+item.modelEnglishName+"_"+item.modelEnglishFunctionName;
        modelCategoryMap[unifiedModelName] = item.mainCategory
    }

    // 将需要显示的模型信息筛选出来
    let resultList = [];
    for(let unifiedModelName of selectedModelList){
        resultList.push(unifiedModelName)
    }

    return(
        <div className={classes.root}>
            {resultList.map((item)=> {
                    if (modelCategoryMap[item] === 'riskAssessment') {
                        return <RiskAssessmentCard
                            queryID={queryID}
                            unifiedModelName={item}
                        />
                    }
                    else if (modelCategoryMap[item] === 'progressionAnalysis') {
                        return <ProgressionAnalysisCard/>
                    }
                    else if (modelCategoryMap[item] === 'survivalAnalysis') {
                        return <SurvivalAnalysisCard/>
                    }
                    else if (modelCategoryMap[item] === 'treatmentRecommendation') {
                        return <TreatmentRecommendationCard/>
                    }
                    else if (modelCategoryMap[item] === 'treatmentComparison') {
                        return <TreatmentComparisonCard/>
                    }
                    else
                        return null
                }
            )}
        </div>
    )
};

export default ModelContent;

