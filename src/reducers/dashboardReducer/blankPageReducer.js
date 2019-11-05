const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: 'blank page'
}
const blankPageReducer = (state=initStateInfo, action) => {
    return state;
}

export default blankPageReducer;