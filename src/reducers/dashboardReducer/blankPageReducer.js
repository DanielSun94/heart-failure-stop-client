const initStateInfo = {
    isDataFetching: false,
    isDataValid: false,
    content: 'blank page'
}
const blankPageReducer = (state=initStateInfo, action) => {}

export default blankPageReducer;