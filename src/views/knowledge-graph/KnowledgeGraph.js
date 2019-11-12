import React from 'react';
import {useDispatch} from 'react-redux'
import {KNOWLEDGE_GRAPH, changeFrontPage} from '../../actions/frontPageAction'
import ParaName from '../../utils/ParaName'

const GroupComparison = () => {
    document.title = ParaName.HF_STOP+KNOWLEDGE_GRAPH
    const dispatch = useDispatch();
    dispatch(changeFrontPage(KNOWLEDGE_GRAPH))
    return (
        <div>
            <h1>知识图谱</h1>
        </div>
    )
}

export default GroupComparison