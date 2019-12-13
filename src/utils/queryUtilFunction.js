import pinyin from 'pinyin'

function queryParamsTrans(params) {
    return "?" + Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function monthAndDateTrans(globalDate){
    const time = new Date(globalDate)
    const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate()
    const month = time.getMonth()+1
    const timeStr = month + '月' + date + '日 '
    return timeStr
}

function monthAndDateAndTimeTrans(globalDate){
    const time = new Date(globalDate)
    const month = time.getMonth()+1
    const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate()
    const hour = time.getHours() >= 10 ? time.getHours() :'0'+time.getHours()
    const minute = time.getMinutes() >= 10 ? time.getMinutes() :'0'+time.getMinutes()
    const timeStr = month + '月' + date + '日 ' + hour +':'+minute
    return timeStr
}

function fullTimeTrans(globalDate){
  const time = new Date(globalDate)
  const year = time.getFullYear()
  const month = time.getMonth()+1
  const date = time.getDate() >= 10 ? time.getDate() :'0'+time.getDate()
  const hour = time.getHours() >= 10 ? time.getHours() :'0'+time.getHours()
  const minute = time.getMinutes() >= 10 ? time.getMinutes() :'0'+time.getMinutes()
  const timeStr1 = year+"年"+month + '月' + date + '日 ' + hour +':'+minute
  return timeStr1
}

const pinYinFilter = (listToFilter, text, textDefaultValue) => {

    if(text==="" || text===textDefaultValue)
      return listToFilter
  
    let filteredList = []
    const lowCaseText = text.toLowerCase()
  
    for(let item of listToFilter){
      const firstLetterList = pinyin(item, {style: pinyin.STYLE_FIRST_LETTER})
      let firstLetterStr = ""
      for(let strList of firstLetterList)
        firstLetterStr += strList[0]
      firstLetterStr = firstLetterStr.toLowerCase()
  
      if(firstLetterStr.includes(lowCaseText))
        filteredList.push(item)
    }
    return filteredList
  }

const filter = (listToFilter, text, textDefaultValue) => {
  let filteredList = []
  const lowCaseText = text.toLowerCase()
  
  for(let item of listToFilter){
    const firstLetterStr = item[1].toLowerCase()
    if(firstLetterStr.includes(lowCaseText))
      filteredList.push(item)
  }
  return filteredList
}

const pinyinSort = (listToSort) => {

    listToSort.sort(function(a, b){
        const aList = pinyin(a, {style: pinyin.STYLE_FIRST_LETTER})
        let aStr = ""
        for(let strList of aList)
          aStr += strList[0]
        aStr = aStr.toLowerCase()

        const bList = pinyin(b, {style: pinyin.STYLE_FIRST_LETTER})
        let bStr = ""
        for(let strList of bList)
          bStr += strList[0]
        bStr = bStr.toLowerCase()

        if(aStr > bStr)
          return 1
        if(aStr < bStr)
          return -1
        return 0
    })
}


export {queryParamsTrans, monthAndDateTrans, monthAndDateAndTimeTrans, pinYinFilter, pinyinSort, filter, fullTimeTrans};