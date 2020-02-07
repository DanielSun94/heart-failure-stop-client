import React from 'react'
import HawkesRNNDetail from "./HawkesRNNDetail/HawkesRNNDetail";
import {useParams} from "react-router-dom";

// 该映射的key是unifiedModelName，也就是模型类型+模型名称+模型功能所组成的字符串
const unifiedModelNameDetailPageMap =(unifiedModelName, queryID)=> {
    let returnComponent;
    switch (unifiedModelName) {
        case 'riskAssessment_HawkesRNNEnglishName_oneYearNYHAClass4':
            returnComponent=
                <HawkesRNNDetail
                    queryID={queryID}
                    unifiedModelName={'riskAssessment_HawkesRNNEnglishName_oneYearNYHAClass4'}
                />;
            break;
        case 'riskAssessment_HawkesRNNEnglishName_oneYearNYHAClass3':
            returnComponent= <h3>该算法细节页面尚未完成，无法提供</h3>; break;
        default :
            returnComponent= <h3>该算法细节页面尚未完成，无法提供</h3>
    }
    return returnComponent
};

const IndividualAlgorithmDetail=()=>{
    const {queryID, unifiedModelName} = useParams();

    return unifiedModelNameDetailPageMap(unifiedModelName, Number.parseInt(queryID));
};

export default IndividualAlgorithmDetail;