import React from 'react';
import ParaName from '../../../../../utils/ParaName'
import { Button } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {createNewQuery} from "../../../../../actions/metaInfoAction";
import {initializeManagementQuery} from "../../../../../actions/groupAnalysisAction/managementAction";

const StatisticPanel =({queryID, toggleFilter})=>{
    const dispatch = useDispatch();
    const nextID = useSelector(state=>state.metaInfo.nextID);

    return (
        toggleFilter&&(
            <div>
                <h4 style={{paddingTop: 18, paddingLeft: 12}}>StatisticPanel To Be Done</h4>
                <h4 style={{paddingTop: 18, paddingLeft: 12}}>当前Panel :{queryID}</h4>
                <Button
                    style={{paddingTop: 18, paddingLeft: 12}}
                    color={'primary'}
                    onClick={()=>{
                        dispatch(createNewQuery(ParaName.GROUP_ANALYSIS, null));
                        dispatch(initializeManagementQuery(nextID));
                    }}
                >
                    创建嵌套组
                </Button>
            </div>
        )
    )
};

export default StatisticPanel;