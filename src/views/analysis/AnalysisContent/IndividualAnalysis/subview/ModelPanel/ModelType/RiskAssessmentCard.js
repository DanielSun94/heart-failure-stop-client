import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
    Card,
    CircularProgress,
    Typography,
    Button
} from '@material-ui/core'
import RouteName from "../../../../../../../utils/RouteName";

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        height: 100,
        width: 330,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: "center",
    },
    itemCard: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        marginRight: 5,
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
    const history = useHistory();

    // 当模型数据获取完毕时更新
    let result = 0;
    let isDataValid = false;
    let isFetchingData = false;
    let modelColor = 'black';
    let modelDetail = useSelector(state=>state.individual.model[queryID]['model'][unifiedModelName]);
    if(modelDetail!==undefined){
        result = modelDetail.output[0]*100;
        isDataValid = modelDetail.isInputsValid&&modelDetail.isOutputValid;
        isFetchingData = modelDetail.isFetchingInputs||modelDetail.isFetchingOutput;
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

    const jumpToDetailPage=()=> {
        //仅在载入完毕后允许跳转
        if (isDataValid) {
            history.push(RouteName.MAIN_PAGE + RouteName.ANALYSIS +
                RouteName.INDIVIDUAL_ANALYSIS + "/" + queryID + '/' + unifiedModelName);
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.itemCard}>
                <Button
                    style={{
                        height:'100%', width: '100%', textAlign: 'left'
                    }}
                    onClick={
                        jumpToDetailPage
                    }
                >
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
                    <div className={classes.modelInfo}>
                        <Typography style={{paddingTop:8, textTransform: "none"}} variant="h5">
                            {modelChineseFunctionName}
                        </Typography>
                        <Typography variant="h6" style={{paddingTop:6, textTransform: "none"}}>
                            {modelChineseName}
                        </Typography>
                        <Typography variant="caption">
                            风险预警
                        </Typography>
                    </div>
                </Button>
            </Card>
        </div>
    )
};

export default RiskAssessmentCard;

