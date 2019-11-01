import React from 'react';
import NormalizedName from '../../utils/normalizedName';
import { connect } from 'react-redux';

const selectVisitDivPresentationalComponent = (content) => {
    let visitInfoList = [];
    for (let singleVisit of content){
        let singleVisitInfo = {hospitalCode: singleVisit[NormalizedName.HOSPITAL_CODE], visitType: singleVisit[NormalizedName.VISIT_TYPE],
        visitID: singleVisit[NormalizedName.VISIT_ID], unifiedPatientID: this.props.unifiedPatientID};
        visitInfoList.push(singleVisitInfo);
    }

    if(this.state.unifiedPatientID.length > 0){
        return(
        <select onChange={onChangeHandler}>
            {this.state.visitInfoList.map((item) =>
                <option
                    key={item[NormalizedName.HOSPITAL_CODE] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
                    data-value={item[NormalizedName.HOSPITAL_CODE] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
                    data-hospitalcode ={item[NormalizedName.HOSPITAL_CODE]}
                    data-visitid = {item[NormalizedName.VISIT_ID]}
                    data-visittype = {item[NormalizedName.VISIT_TYPE]}>
                    {item[NormalizedName.HOSPITAL_CODE] + "_" + item[NormalizedName.VISIT_TYPE] + "_" + item[NormalizedName.VISIT_ID]}
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
    let contentDict = state.dashboardReducer.trajectoryAnalysisReducer.oralInterventionReducer.content
    return ({content:contentDict})
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeHandler: (value) => dispatch(fetchPosts(value, this.context)),
    showDetailedInfo: (event) => dispatch(showDetailToggle(event)),
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(selectVisitDivPresentationalComponent)