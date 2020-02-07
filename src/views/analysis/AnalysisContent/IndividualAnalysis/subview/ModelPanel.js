import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import ParaName from "../../../../../utils/ParaName";
import {
    Card,
    CardHeader,
    Divider,
    CardContent
} from '@material-ui/core';
import ModelList from "./ModelPanel/ModelList";
import ModelContent from "./ModelPanel/ModelContent";
import {
    getModelDataAndExecuteModel,
    setVisit
} from "../../../../../actions/individualAnalysisAction/individualModelAction";
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 497,
    },
    container: {
        width: '100%',
        height: 497,
        display: 'flex',
        padding: '0px 0px 0px 0px'
    },
    list: {
        width: "25%",
        height: 444
    },
    content: {
        width: "75%",
        height: 444
    }
});

const ModelPanel = ({queryID}) => {
    // model list负责承担判断现在选中的模型和相关模型的调用请求任务
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedModelInfo = useSelector(state=>state.individual.model[queryID]['model']);
    const selectedModelList = Object.keys(selectedModelInfo);

    // 此处的stateUnifiedPatientID指存在modelReducer的数据所对应的Panel
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const visitID = currentVisit.visitID;
    const visitType = currentVisit.visitType;
    const hospitalCode = currentVisit.hospitalCode;
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
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
    return (
        <Card id={ParaName.MODEL_PANEL} className={classes.root}>
            <CardHeader title="模型面板"/>
            <Divider />
            <CardContent className={classes.container}>
                <div className={classes.list}>
                    <ModelList queryID={queryID}/>
                </div>
                <div className={classes.content}>
                    <ModelContent queryID={queryID}/>
                </div>
            </CardContent>
        </Card>
    );
};
export default ModelPanel;