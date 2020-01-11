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
import {modelReset} from "../../../../../actions/individualAnalysisAction/modelAction";
import {useSelector, useDispatch} from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 470,
    },
    container: {
        width: '100%',
        height: 470,
        display: 'flex',
        padding: '0px 0px 0px 0px'
    },
    list: {
        width: "25%",
        height: 417
    },
    content: {
        width: "75%",
        height: 417
    }
});

const ModelPanel = ({queryID}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const currentVisit = useSelector(state=>state.individual.trajectory[queryID].currentVisit);
    const unifiedPatientID = useSelector(state=>state.individual.unifiedPatientIDAndPatientBasicInfo[queryID].unifiedPatientID);
    const correspondingUnifiedPatientID = useSelector(state => state.individual.model[queryID].correspondingUnifiedPatientID);
    const correspondingHospitalCode = useSelector(state => state.individual.model[queryID].correspondingHospitalCode);
    const correspondingVisitID = useSelector(state => state.individual.model[queryID].correspondingVisitID);
    const correspondingVisitType = useSelector(state => state.individual.model[queryID].correspondingVisitType);

    const isChanged = !(correspondingHospitalCode===currentVisit.hospitalCode
        && correspondingUnifiedPatientID===unifiedPatientID && correspondingVisitID===currentVisit.visitID &&
        correspondingVisitType===currentVisit.visitType);

    useEffect(()=>{
        // LabTest和其它三项逻辑有些不同，其它三项都是VisitChange后重新获取数据，LabTest则是重置数据
        // 这是因为其他三项的数据都是一次获得，而LabTest的数据是即时获取的，VisitChange后LabTest只能确定原有的数据都过时了
        // 但是并不知道新的数据是什么
        const params = {
            unifiedPatientID: unifiedPatientID,
            hospitalCode: currentVisit.hospitalCode,
            visitType: currentVisit.visitType,
            visitID: currentVisit.visitID
        };
        if(isChanged){
            dispatch(modelReset(params, queryID))
        }
    }, [unifiedPatientID, currentVisit.hospitalCode, currentVisit.visitType, currentVisit.visitID,
        queryID]);

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