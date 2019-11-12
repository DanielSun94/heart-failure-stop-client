import React from 'react';
import NormalizedName from '../../utils/ParaName';
import { connect } from 'react-redux';
import {visitInfoFetch} from '../../actions/dashboardAction/trajectoryAnalysisAction/trajectoryAnalysisModuleSelectAction';

const SelectVisitDivPresentationalComponent = ({content, onChangeHandler}) => {
    if(content.length > 0){
        let visitInfoList = [];
        for (let singleVisit of content){
            let singleVisitInfo = {hospitalCode: singleVisit[NormalizedName.HOSPITAL_CODE], visitType: singleVisit[NormalizedName.VISIT_TYPE],
            visitID: singleVisit[NormalizedName.VISIT_ID]};
            visitInfoList.push(singleVisitInfo);
        }

        return(
        <select onChange={onChangeHandler}>
            {content.map((item) =>
                <option
                    key={item[NormalizedName.HOSPITAL_CODE] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
                    data-value={item[NormalizedName.HOSPITAL_CODE] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
                    data-hospitalcode ={item[NormalizedName.HOSPITAL_CODE]}
                    data-visitid = {item[NormalizedName.VISIT_ID]}
                    data-visittype = {item[NormalizedName.VISIT_TYPE]}>
                    {item[NormalizedName.HOSPITAL_NAME] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
                </option>)}
        </select>)
    }
    else{
        return(
        <select>
        </select>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let contentDict = state.dashboardContent.trajectoryAnalysis.trajectoryAnalysisGeneralInfo.validVisitList
    return ({content:contentDict})
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeHandler: (event) => dispatch(visitInfoFetch(event))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectVisitDivPresentationalComponent)