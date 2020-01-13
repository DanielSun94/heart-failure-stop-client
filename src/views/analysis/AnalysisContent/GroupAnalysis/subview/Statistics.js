import React from 'react';
import {createNewQuery} from "../../../../../actions/metaInfoAction";
import ParaName from "../../../../../utils/ParaName";
import {Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

const Statistic =()=>{
    const dispatch = useDispatch();
    const {queryID} = useParams();
    return (
        <div>
            <h1>统计面板</h1>
            群体分析
            <Button
                color={'primary'}
                onClick={()=>dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, queryID))}
            >
                {queryID}
            </Button>
        </div>
    )
};

export default Statistic;