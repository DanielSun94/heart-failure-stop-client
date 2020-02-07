import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getModelChineseName} from "../../../../../utils/queryUtilFunction";
import {eventMeaning, featureMeaning} from './info'

// 本文件为与具体模型相关，由模型设计者自行写出
const HawkesRNNDetail =({queryID, unifiedModelName})=>{
    const dispatch = useDispatch();

    // 获取该页面所需的所有信息
    const modelInfo = useSelector(state=>state.individual.model[queryID]);
    const inputAlreadyImputed = modelInfo['model'][unifiedModelName]['inputs'];
    const inputImputeStatus = modelInfo['model'][unifiedModelName]['otherInputsInfo']['impute_status'];
    const allModels = useSelector(state=>state.algorithm.algorithmList);
    const [modelChineseCategory, modelChineseName, modelChineseFunction] = getModelChineseName(allModels, unifiedModelName);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const visitID = currentVisit.visitID;
    const visitType = currentVisit.visitType;
    const hospitalCode = currentVisit.hospitalCode;
    const visitList = useSelector(state=>state.individual.trajectory[queryID].visitList);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const patientName = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].
        patientBasicInfo.patientName);
    const featureInfo = featureMeaning();
    const eventInfo = eventMeaning();

    return (
        <div>
            <div>
                {visitID.toString()}
            </div>
            <div>
                {visitType.toString()}
            </div>
            <div>
                {hospitalCode.toString()}
            </div>
            <div>
                {patientName.toString()}
            </div>
            <div>
                {unifiedPatientID.toString()}
            </div>
            <div>
                {modelChineseCategory.toString()}
            </div>
            <div>
                {modelChineseName.toString()}
            </div>
            <div>
                {modelChineseFunction.toString()}
            </div>
            <div>
                {JSON.stringify(inputAlreadyImputed)}
            </div>
            <div>
                {JSON.stringify(inputImputeStatus)}
            </div>
            <div>
                {JSON.stringify(visitList)}
            </div>
            <div>
                {JSON.stringify(featureInfo)}
            </div>
            <div>
                {JSON.stringify(eventInfo)}
            </div>
        </div>)
};

export default HawkesRNNDetail;