import React from 'react';
import {useDispatch} from 'react-redux'
import {ACCOUNT_MANAGEMENT, changeFrontPage} from '../../actions/frontPageAction'
import ParaName from '../../utils/ParaName'

const GroupComparison = () => {
    document.title = ParaName.HF_STOP+ACCOUNT_MANAGEMENT
    const dispatch = useDispatch();
    dispatch(changeFrontPage(ACCOUNT_MANAGEMENT))
    return (
        <div>
            <h1>账户管理</h1>
        </div>
    )
}

export default GroupComparison