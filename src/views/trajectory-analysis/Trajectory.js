import React, {useEffect, Fragment} from 'react';
import ParaName from '../../utils/ParaName';
import {useSelector, useDispatch} from 'react-redux';
import {getValidVisit} from '../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAction';
import HorizontalTimeline  from '../../components/HorizontalTimeLine/HorizontalTimeline'

const handleClick = (event) => {console.log('clicked')}

const Trajectory = () => {
    // 我们希望Trajectory能够监听unifiedPatientID的变化，从而完成合适的响应
    const dispatch = useDispatch();
    const unifiedPatientID = useSelector(state=>state.dashboard.trajectoryAnalysis.unifiedPatientIDAndPatientBasicInfo.unifiedPatientID)
    useEffect(()=>{
        if(unifiedPatientID!=="")
            dispatch(getValidVisit({unifiedPatientID: unifiedPatientID}))
    }, [unifiedPatientID]);

    // 以下是渲染部分
    const visitList = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.visitList)
    const currentVisit = useSelector(state=>state.dashboard.trajectoryAnalysis.trajectory.currentVisit)

    let timeline = <h1> 目前没有相关数据 </h1>
    if(visitList.length>0){
        timeline = 
        <Fragment>
            <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
                <HorizontalTimeline
                index={0}
                indexClick={handleClick}
                values={['2018-10-01', '2019-10-01']}/>
            </div>
            <div className='text-center'>
            </div>
        </Fragment>
    }

    return (
    <div id={ParaName.TRAJECTORY}>
        {timeline} 
    </div>)
}

export default Trajectory;