const initStateInfo = {};
const visitListReducer = (state=initStateInfo, action) => {
    switch (action.type){
        case 'default1': return {...state};
        case 'default2': return {...state};
        case 'default3': return {...state};
        default: return {...state};
    }
};

export default visitListReducer;