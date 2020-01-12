import React from "react";
import ParaName from '../../../../utils/ParaName'
import { Button } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {createNewQuery} from "../../../../actions/metaInfoAction";


const GroupAnalysis = ({selectedQueryID}) =>{
    const dispatch = useDispatch();

    document.title = ParaName.HF_STOP+"群体分析";
    return (
        <div>
            群体分析
            <Button
                color={'primary'}
                onClick={()=>dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, selectedQueryID))}
            >
                创建嵌套组
            </Button>
        </div>
    )
};

export default GroupAnalysis;