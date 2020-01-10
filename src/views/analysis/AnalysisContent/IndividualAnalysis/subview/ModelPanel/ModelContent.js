import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {modelFetchPost} from "../../../../../../actions/individualAnalysisAction/modelAction";

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: '100%',
        width: '100%',
        maxHeight: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});

const ModelContent = ({queryID}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const modelDetail = useSelector(state=>state.individual.model[queryID].modelDetail);
    const selectedModelList = useSelector(state=>state.individual.model[queryID].selectedModelList);
    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const visitIdentifier = {...currentVisit, unifiedPatientID: unifiedPatientID};

    let checkFlag = false;
    if(unifiedPatientID&&unifiedPatientID.length>0&&currentVisit.visitID&&currentVisit.visitID.length>0
        &&currentVisit.visitType&&currentVisit.visitType.length>0&&currentVisit.hospitalCode&&currentVisit.hospitalCode.length>0
    )
        checkFlag=true;

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

    let result = [];
    for(let item in modelDetail){
        if(!modelDetail.hasOwnProperty(item))
            continue;
        result.push(<h5>{modelDetail[item]['modelFunction']+' '+modelDetail[item]['result']}</h5>)
    }

    return (
        <div className={classes.root}>
            {result.map(item=>item)}
        </div>
    )
};

export default ModelContent;

