import React from 'react';
import LabTestResult from './labTestResult';
import OralMedicalIntervention from './oralMedicalIntervention';
import Exam from './exam';
import VitalSign from './vitalSign';
import Risk from './risk';
import NormalizedName from '../../utils/normalizedName';
import * as supportFunction from '../../utils/queryUtilFunction';

const SingleVisitFullInfo = () => {
    return (
        <div id={NormalizedName.SINGLE_VISIT_FULL_INFO}>
            <Risk />
            <LabTestResult />
            <OralMedicalIntervention />
            <Exam />
            <VitalSign />
        </div>
    )
}

export default SingleVisitFullInfo;