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


export {queryParamsTrans, monthAndDateTrans, monthAndDateAndTimeTrans};