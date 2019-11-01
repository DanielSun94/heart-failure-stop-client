function queryParamsTrans(params) {
    return "?" + Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function propertyConsistenceTest(props, state){
    let flag = true;
    if (props.unifiedPatientID === state.unifiedPatientID) {
        if (props.hospitalCode === state.hospitalCode)
            if (props.visitID === state.visitID)
                if (props.visitType === state.visitType)
                    flag = false;
    }
    if (props.unifiedPatientID.length === 0 || props.hospitalCode.length === 0 || props.visitID.length === 0
        || props.visitType.length === 0)
        flag = false;
    return {updateFlag: flag}
}

function propertyConsistenceTestOnlyUnifiedPatientID(props, state){
    let newUnifiedPatientID = props.unifiedPatientID;
    let prevUnifiedPatientID = state.unifiedPatientID;

    if (prevUnifiedPatientID === newUnifiedPatientID || newUnifiedPatientID.length === 0)
        return {updateFlag: false};
    else
        return {updateFlag: true};
}

export {queryParamsTrans, propertyConsistenceTest, propertyConsistenceTestOnlyUnifiedPatientID};