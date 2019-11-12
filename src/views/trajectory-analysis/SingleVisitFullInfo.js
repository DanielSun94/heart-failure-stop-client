import React from 'react';
import LabTestResult from './LabTestResult';
import OralMedicalIntervention from './OralMedicalIntervention';
import Exam from './Exam';
import VitalSign from './VitalSign';
import Risk from './Risk';
import NormalizedName from '../../utils/ParaName';

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