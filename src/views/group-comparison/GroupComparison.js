import React from 'react';
import {useDispatch} from 'react-redux'
import {GROUP_ANALYSIS, changeFrontPage} from '../../actions/frontPageAction'
import ParaName from '../../utils/ParaName'

const GroupComparison = () => {
    document.title = ParaName.HF_STOP+GROUP_ANALYSIS
    const dispatch = useDispatch();
    dispatch(changeFrontPage(GROUP_ANALYSIS))
    return (
        <div>
            <h1>人群比较</h1>
        </div>
    )
}

export default GroupComparison