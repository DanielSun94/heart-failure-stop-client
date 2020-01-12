import React from "react";
import {
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    DialogContent} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {createNewQuery} from "../../../actions/metaInfoAction";
import ParaName from "../../../utils/ParaName";
import {useDispatch} from 'react-redux';
import {setSelectedQuery} from "../../../actions/metaInfoAction";
import {examInitialize} from "../../../actions/individualAnalysisAction/examAction";
import {labTestInitialize} from "../../../actions/individualAnalysisAction/labtestResultAction";
import {trajectoryInitialize} from "../../../actions/individualAnalysisAction/trajectoryAction";
import {unifiedIdAndBasicInfoInitialize} from "../../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction";
import {vitalSignInitialize} from "../../../actions/individualAnalysisAction/vitalSignAction";
import {orderInitialize} from "../../../actions/individualAnalysisAction/orderAction";
import {modelInitialize} from "../../../actions/individualAnalysisAction/modelAction";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

const QuerySelectionDialog =({openDialog, setOpenDialog})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [queryType, setQueryType] = React.useState(ParaName.INDIVIDUAL_ANALYSIS);

    const queryID = useSelector(state=>state.metaInfo.nextID);

    const handleConfirm = () =>{
        setOpenDialog(false);

        if(queryType===ParaName.INDIVIDUAL_ANALYSIS){
            // 对新查询进行初始化
            dispatch(createNewQuery(ParaName.INDIVIDUAL_ANALYSIS));
            dispatch(unifiedIdAndBasicInfoInitialize(queryID));
            dispatch(trajectoryInitialize(queryID));
            dispatch(orderInitialize(queryID));
            dispatch(labTestInitialize(queryID));
            dispatch(vitalSignInitialize(queryID));
            dispatch(examInitialize(queryID));
            dispatch(modelInitialize(queryID));
        }
        else if(queryType===ParaName.GROUP_ANALYSIS){
            dispatch(createNewQuery(ParaName.GROUP_ANALYSIS));
        }
        else {
            console.log('error')
        }
        dispatch(setSelectedQuery(queryID))
    };

    return (
        <Dialog
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
        >
            <DialogTitle id="query-type-selection">{"新查询类型"}</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup name="queryTypeSelection"
                                onChange={(event)=>setQueryType(event.target.value)}>
                        <FormControlLabel
                            value={ParaName.INDIVIDUAL_ANALYSIS}
                            control={<Radio color={'primary'} />}
                            label="个体分析"
                        />
                        <FormControlLabel
                            value={ParaName.GROUP_ANALYSIS}
                            control={<Radio color={'primary'}/>}
                            label="群体分析"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpenDialog(false)} color="primary">
                    取消
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default QuerySelectionDialog;