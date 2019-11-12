import React from 'react';
import {useDispatch} from 'react-redux'
import {OVERVIEW, changeFrontPage} from '../../actions/frontPageAction'
import ParaName from '../../utils/ParaName'

const GroupComparison = () => {
    document.title = ParaName.HF_STOP+OVERVIEW
    const dispatch = useDispatch();
    dispatch(changeFrontPage(OVERVIEW))
    return (
        <div>
            <h1>概览</h1>
        </div>
    )
}

export default GroupComparison