import React, {useState, Fragment, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getModelChineseName, queryParamsTrans} from "../../../../../utils/queryUtilFunction";
import {eventMeaning, featureMeaning} from './info'
import { makeStyles } from '@material-ui/core/styles';
import {setExpandedQueryList} from "../../../../../actions/metaInfoAction";
import {TreeView, TreeItem} from "@material-ui/lab";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {colors, Typography, Tooltip, Input, Button, CircularProgress} from '@material-ui/core'
import {editInputs, executeModel} from "../../../../../actions/individualAnalysisAction/individualModelAction";
import RouteName from "../../../../../utils/RouteName";
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    selectionPanel: {
        width: '20%',
        height: "100%",
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    treeItem:{
        backgroundColor: colors.grey[400],
    },
    itemContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 6
    },
    result:{
        height: '100%',
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:25,
        marginBottom: 25
    }
});


// 本文件为与具体模型相关，由模型设计者自行写出
const HawkesRNNDetail =({queryID, unifiedModelName})=>{
    const dispatch = useDispatch();
    const classes = useStyles();

    // 获取该页面所需的所有信息
    // originInputs指预处理模块返回的，已经经过插补的数据
    // imputeStatus指预处理模块返回的数据中，各项是真实的还是插补的
    // inputToFeedModel指用于传到模型的，在不对插补数据做任何修改时，该项和originInputs应当相同
    const modelInfo = useSelector(state=>state.individual.model[queryID]);

    const modelDetail = modelInfo['model'][unifiedModelName];
    const result = modelDetail.output[0]*100;
    const isDataValid = modelDetail.isInputsValid&&modelDetail.isOutputValid;
    const isFetchingData = modelDetail.isFetchingInputs||modelDetail.isFetchingOutput;
    const modelColor = result > 60?'red':'black';
    const inputToFeedModel = modelInfo['model'][unifiedModelName]['inputs'];
    const inputImputeStatus = modelInfo['model'][unifiedModelName]['otherInputsInfo']['impute_status'];
    const originInputs = modelInfo['model'][unifiedModelName]['otherInputsInfo']['originInputs'];
    const allModels = useSelector(state=>state.algorithm.algorithmList);
    const [modelChineseCategory, modelChineseName, modelChineseFunction] = getModelChineseName(allModels, unifiedModelName);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const visitList = useSelector(state=>state.individual.trajectory[queryID].visitList);
    const patientName = useSelector(state=>state.individual
        .unifiedPatientIDAndPatientBasicInfo[queryID].patientBasicInfo.patientName);
    const featureInfo = featureMeaning();
    const eventInfo = eventMeaning();
    const [modelCategory, modelName, modelFunction] = unifiedModelName.split('_');

    // 依据信息做处理
    const visitNameMappingList = constructTreeItemContentMappingList(visitList, currentVisit);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState('modelDoc');
    const hasNullValue = isInputHasNullValue(inputToFeedModel);
    const missingRate = getMissingRate(inputImputeStatus);

    const setInputs=(type, selectedIndex, featureIndex)=>{
        return (event)=> {
            let value = event.target.value;
            if(value===0||value===1||value==='0'||value==='1'||value==="") {
                if(value!==""){
                    inputToFeedModel[type][selectedIndex][0][featureIndex] = Number.parseInt(event.target.value);
                }
                else{
                    inputToFeedModel[type][selectedIndex][0][featureIndex] = "";
                }
                dispatch(editInputs(unifiedModelName, inputToFeedModel, queryID))
            }
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.selectionPanel}>
                <BriefResult
                    modelChineseName={modelChineseName}
                    modelChineseFunction={modelChineseFunction}
                    modelChineseCategory={modelChineseCategory}
                    result={result}
                    patientName={patientName}
                    currentVisit={currentVisit}
                    isDataValid={isDataValid}
                    modelColor={modelColor}
                    isFetchingData={isFetchingData}
                    missingRate={missingRate}
                />
                <GenerateTreeView
                    visitNameMappingList={visitNameMappingList}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    setSelectedIndex={setSelectedIndex}
                />
            </div>
            <div style={{overflow: 'auto', width: "80%"}}>
                {selectedTab==='modelDoc'?
                    <ModelDoc
                        modelCategory={modelCategory}
                        modelName={modelName}
                        modelFunction={modelFunction}
                    />:
                    <Fragment>
                        <div style={{
                            marginTop: 16,
                            marginLeft: 60,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography variant={'h4'}>{selectedTab}</Typography>
                            <Button
                                variant="outlined"
                                style={{marginLeft: 58, marginTop:10}}
                                color={'primary'}
                                disabled={hasNullValue}
                                onClick={()=>dispatch(executeModel(modelCategory, modelName, modelFunction, queryID))}
                            >
                                重新计算模型值
                            </Button>
                        </div>
                        <EventInfo
                            eventItemNameList={eventInfo}
                            originInputs={originInputs}
                            inputs={inputToFeedModel}
                            imputeStatus={inputImputeStatus}
                            selectedIndex={selectedIndex}
                            setInputs={setInputs}
                        />
                        <FeatureInfo
                            featureItemNameList={featureInfo}
                            originInputs={originInputs}
                            inputs={inputToFeedModel}
                            imputeStatus={inputImputeStatus}
                            selectedIndex={selectedIndex}
                            setInputs={setInputs}
                        />
                    </Fragment>}
            </div>
        </div>
    )
};

const ModelDoc=({modelCategory, modelFunction, modelName})=>{
    const [docMarkdown, setDocMarkdown] = useState(null);
    const param = {mainCategory: modelCategory, modelNameEnglish: modelName,
        modelFunctionEnglish: modelFunction};
    let url = RouteName.B_ALGORITHM_MANAGEMENT +RouteName.B_DOWNLOAD_MODEL_DOCUMENT +queryParamsTrans(param);

    let token = useSelector(state=>state.session.authenticToken);
    let header = {'Authorization': token,};
    useEffect(()=>{
        fetch(url, {headers:header})
            .then(response =>  response.text())
            .then(text=>{
                    setDocMarkdown(text);
                }
            );
    }, [modelCategory, modelFunction, modelName]);

    return (
        <div style={{width: '100%', height: '100%', marginTop: 15, marginLeft: 15, marginRight: 15, overflow: 'auto'}}>
            <ReactMarkdown source={docMarkdown}/>
        </div>)
};

const EventInfo =({eventItemNameList, originInputs, inputs, imputeStatus, selectedIndex, setInputs})=>{
    const eventToShow = inputs['event'][selectedIndex][0];
    const eventImputeStatus = imputeStatus['event_impute_status'][selectedIndex][0];
    const originEvent = originInputs['event'][selectedIndex][0];

    return (
        <Fragment>
            <Typography variant={'h3'} style={{marginLeft: 60, marginTop: 30}}>事件信息</Typography>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>

                {eventToShow.map((item, index)=>{
                    const isFeatureImpute = eventImputeStatus[index]===1;
                    const isFeatureUserDefined = originEvent[index]!==item;
                    const featureName = eventItemNameList[index];
                    return (
                        <InfoItem
                            label={featureName}
                            value={item}
                            isImputed={isFeatureImpute}
                            isUserDefined={isFeatureUserDefined}
                            setInputs={setInputs('event', selectedIndex, index)}
                        />
                    )
                })}
            </div>
        </Fragment>
    )
};

const FeatureInfo =({featureItemNameList, originInputs, inputs, imputeStatus, selectedIndex, setInputs})=>{
    const featureToShow = inputs['context'][selectedIndex][0];
    const featureImpute = imputeStatus['context_impute_status'][selectedIndex][0];
    const originFeature = originInputs['context'][selectedIndex][0];

    return (
        <Fragment>
            <Typography variant={'h3'} style={{marginLeft: 60, marginTop: 30}}>特征信息</Typography>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {featureToShow.map((item, index)=>{
                    const isFeatureImpute = featureImpute[index]===1;
                    const isFeatureUserDefined = item!==originFeature[index];
                    const featureName = featureItemNameList[index];
                    return (
                        <Fragment>
                            <InfoItem
                                label={featureName}
                                value={item}
                                isImputed={isFeatureImpute}
                                isUserDefined={isFeatureUserDefined}
                                setInputs={setInputs('context', selectedIndex, index)}
                            />
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
};

const InfoItem =({label, value, isImputed, isUserDefined, setInputs})=>{
    let showDefaultValue = true;
    if(isImputed){
        showDefaultValue=false;
    }
    if(isUserDefined) {
        showDefaultValue = true;
    }

    return (
        <div style={
            {display: 'flex', alignItems: 'center', width: 290, marginTop: 8, marginLeft: 60,
                flexWrap: 'wrap'}}>
            <Tooltip
                title={label[1]}
            >
                <Typography style={{width: 250}}>
                    {label[0]+":"}
                </Typography>
            </Tooltip>
            {(!showDefaultValue)?
                <Tooltip title={'如果文本框为红色，则该值缺失，默认使用插补值'}>
                    <Input
                        style={{width:30}}
                        error={!showDefaultValue}
                        value={value}
                        onChange={setInputs}
                    />
                </Tooltip> :
                <Input
                    style={{width:30}}
                    error={!showDefaultValue}
                    value={value}
                    onChange={setInputs}
                />}
        </div>
    )
};

const constructTreeItemContentMappingList = (visitList, currentVisit, maxVisit=10)=>{
    // 依据住院信息，构建TreeItem的内容的映射表
    // 首先先找到本次入院所对应的index
    let correspondingIndex = -1;
    for(const index in visitList){
        if(!visitList.hasOwnProperty(index))
            continue;
        const indexVisitID = visitList[index].visitID;
        const indexVisitType = visitList[index].visitType;
        const indexHospitalCode = visitList[index].hospitalCode;
        const visitID = currentVisit.visitID;
        const visitType = currentVisit.visitType;
        const hospitalCode = currentVisit.hospitalCode;
        if(indexHospitalCode===hospitalCode&&indexVisitType===visitType&&visitID===indexVisitID){
            correspondingIndex=index;
            break;
        }
    }
    if(correspondingIndex===-1){
        throw Error("Assertion failed");
    }

    const endIndex = correspondingIndex;
    const startIndex = correspondingIndex-maxVisit+1>=0?(correspondingIndex-maxVisit+1):0;
    const mapList = [];
    for(let i=startIndex;i<=endIndex;i++){
        const indexVisitID = visitList[i].visitID;
        const indexVisitType = visitList[i].visitType;
        const indexHospitalName = visitList[i].hospitalName;
        const treeItemLabel = indexHospitalName+'第'+indexVisitID+"次"+indexVisitType;
        mapList.push([treeItemLabel, i-startIndex])
    }
    return mapList;
};

const BriefResult=({patientName, currentVisit, modelChineseCategory, modelChineseName, modelChineseFunction,
                       result, isFetchingData, isDataValid, modelColor, missingRate})=>{
    const classes = useStyles();
    const visitLabel = currentVisit.hospitalName+'第'+currentVisit.visitID+'次'+currentVisit.visitType;
    return (
        <div style={{marginLeft: 26, marginTop: 8}}>
            <Typography
                style={{marginTop: 12}}
                variant={'h4'}
            >
                {patientName}
            </Typography>
            <Typography
                style={{marginTop: 8}}
                variant={'h5'}
            >
                {modelChineseName+' '+modelChineseFunction}
            </Typography>
            <Typography
                variant={'overline'}
            >
                {modelChineseCategory}
            </Typography>
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
            <Typography
                style={{marginTop: 8}}
                variant={'h6'}
            >
                {'数据缺失率：'+(missingRate*100).toFixed(2)+"%"}
            </Typography>
            <Typography
                style={{marginTop: 8}}
                variant={'overline'}
            >
                {'基于'+visitLabel+'及之前信息作出'}
            </Typography>

        </div>
    )
};

const GenerateTreeView =({selectedTab, setSelectedTab, visitNameMappingList, setSelectedIndex})=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <TreeView
            style={{marginTop: 16}}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            expanded={['modelData']}
            defaultEndIcon={<div style={{ width: 24, }}/>}
            onNodeToggle={(event, nodes)=>(dispatch(setExpandedQueryList(nodes)))}
        >
            <TreeItem
                key={'modelDoc'}
                nodeId={'modelDoc'}
                onClick={()=>{
                    setSelectedTab('modelDoc')
                }}
                classes={selectedTab==='modelDoc'?classes.treeItem:null}
                label={
                    <Typography variant="h5" color="inherit">
                        模型文档
                    </Typography>
                }
            />
            <TreeItem
                key={'modelData'}
                nodeId={'modelData'}
                classes={selectedTab==='modelData'?classes.treeItem:null}
                label={
                    <Typography variant="h5" color="inherit">
                        模型数据
                    </Typography>
                }
            >
                {visitNameMappingList.map((item)=>(
                    <TreeItem
                        key={item[0]}
                        nodeId={item[0]}
                        onClick={()=>{
                            setSelectedTab(item[0]);
                            setSelectedIndex(item[1])
                        }}
                        classes={selectedTab===item[0]?classes.treeItem:null}
                        label={
                            <div
                                className={classes.itemContent}
                            >
                                {item[0]}
                            </div>
                        }
                    />
                ))}
            </TreeItem>
        </TreeView>
    )
};

const isInputHasNullValue=(inputToFeedModel)=>{
    let hasNullValue = false;
    for(const visit of inputToFeedModel['context']){
        for(const feature of visit[0]){
            if(feature===""){
                hasNullValue=true
            }
        }
    }
    for(const visit of inputToFeedModel['event']){
        for(const feature of visit[0]){
            if(feature===""){
                hasNullValue=true
            }
        }
    }
    return hasNullValue;
};

const getMissingRate = (imputeData)=>{
    let missingCount = 0;
    let count = 0;
    for(const visit of imputeData['context_impute_status']){
        for(const feature of visit[0]){
            if(feature===1){
                missingCount+=1
            }
            count+=1
        }
    }
    for(const visit of imputeData['event_impute_status']){
        for(const feature of visit[0]){
            if(feature===1){
                missingCount+=1
            }
            count+=1
        }
    }
    return missingCount/count;
};

export default HawkesRNNDetail;