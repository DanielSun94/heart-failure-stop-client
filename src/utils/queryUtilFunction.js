import pinyin from 'pinyin'

function queryParamsTrans(params) {
    return "?" + Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function monthAndDateTrans(globalDate, type='chinese'){
    const time = new Date(globalDate);
    const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate();
    const month = time.getMonth()+1;
    if(type==="chinese"){
        return  month + '月' + date + '日 ';
    }
    else{
        return  month + '-' + date + '- ';
    }
}

function monthAndDateAndTimeTrans(globalDate, dense=false){
    const time = new Date(globalDate);
    const year = time.getFullYear();
    const month = time.getMonth()+1 >= 10 ? time.getMonth()+1 :'0'+(time.getMonth()+1);
    const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate();
    const hour = time.getHours() >= 10 ? time.getHours() :'0'+time.getHours();
    const minute = time.getMinutes() >= 10 ? time.getMinutes() :'0'+time.getMinutes();
    const second = time.getSeconds() >= 10 ? time.getSeconds() :'0'+time.getSeconds();
    if(dense){
        return year + month + date + hour + minute + second;
    }
    else {
        return year + "/" + month + '/' + date + ' ' + hour + ':' + minute + ":" + second;
    }
}

const pinYinFilter = (listToFilter, text, textDefaultValue) => {

    let filteredList = [];
    const lowCaseText = text.toLowerCase();

    for(let item of listToFilter){
        const firstLetterList = pinyin(item, {style: pinyin.STYLE_FIRST_LETTER});
        let firstLetterStr = "";
        for(let strList of firstLetterList)
            firstLetterStr += strList[0];
        firstLetterStr = firstLetterStr.toLowerCase();

        if(firstLetterStr.includes(lowCaseText))
            filteredList.push(item)
    }
    return filteredList
};

const filter = (listToFilter, text, textDefaultValue, defaultShowAll, isPinyinContained=true) => {
    let filteredList = [];
    const lowCaseText = text.toLowerCase();

    if(!defaultShowAll&& (text==="" || text===textDefaultValue))
        return [];

    if(isPinyinContained) {
        for (let item of listToFilter) {
            const firstLetterStr = item[1].toLowerCase();
            if (firstLetterStr.includes(lowCaseText))
                filteredList.push(item)
        }
        return filteredList
    }
    else {
        for (let item of listToFilter) {
            const firstLetterList = pinyin(item[1], {style: pinyin.STYLE_FIRST_LETTER});
            let firstLetterStr = "";
            for(let strList of firstLetterList)
                firstLetterStr += strList[0];
            firstLetterStr = firstLetterStr.toLowerCase();
            if (firstLetterStr.includes(lowCaseText))
                filteredList.push(item)
        }
        return filteredList
    }
};

const pinyinSort = (listToSort) => {
    listToSort.sort(function(a, b){
        const aList = pinyin(a, {style: pinyin.STYLE_FIRST_LETTER});
        let aStr = "";
        for(let strList of aList)
            aStr += strList[0];
        aStr = aStr.toLowerCase();

        const bList = pinyin(b, {style: pinyin.STYLE_FIRST_LETTER});
        let bStr = "";
        for(let strList of bList)
            bStr += strList[0];
        bStr = bStr.toLowerCase();

        if(aStr > bStr)
            return 1;
        if(aStr < bStr)
            return -1;
        return 0
    })
};

const getModelChineseName =(allModelInfoList, unifiedModelName)=>{
    for(const item of allModelInfoList){
        const modelCategory = item.mainCategory;
        const modelEnglishName = item.modelEnglishName;
        const modelEnglishFunctionName = item.modelEnglishFunctionName;
        const modelChineseName = item.modelChineseName;
        const modelChineseFunctionName = item.modelChineseFunctionName;
        const currentUnifiedModelName = modelCategory+'_'+modelEnglishName+'_'+modelEnglishFunctionName;
        if(currentUnifiedModelName===unifiedModelName){
            let modelCategoryChinese;
            switch (modelCategory) {
                case 'riskAssessment': modelCategoryChinese='风险分析';break;
                case 'progressionAnalysis': modelCategoryChinese='演变过程';break;
                case 'survivalAnalysis': modelCategoryChinese='生存分析';break;
                case 'treatmentRecommendation': modelCategoryChinese='干预推荐';break;
                case 'treatmentComparison': modelCategoryChinese='干预比较';break;
                default: modelCategoryChinese=""; break;
            }
            return [modelCategoryChinese, modelChineseName, modelChineseFunctionName]
        }
    }
    return ["", "", ""];
};

const strToDate =(dateStr,separator)=>{
    if(!separator){
        separator="-";
    }
    let dateArr = dateStr.split(separator);
    let year = parseInt(dateArr[0]);
    let month;
    //处理月份为04这样的情况
    if(dateArr[1].indexOf("0") === 0){
        month = parseInt(dateArr[1].substring(1));
    }else{
        month = parseInt(dateArr[1]);
    }
    let day = parseInt(dateArr[2]);
    return new Date(year, month - 1, day);
}


export {queryParamsTrans, monthAndDateTrans, monthAndDateAndTimeTrans, pinYinFilter, pinyinSort, filter,
    getModelChineseName, strToDate};