import { combineReducers } from 'redux';
import filterReducer from "./filterReducer";
import sexRatioReducer from "./sexRatioReducer";
import visitListReducer from "./visitListReducer";

const groupAnalysisReducer = combineReducers({
    // 此处filter代指筛选条件，visitList指代符合要求的病人，后面再加一堆数据的管理部分
    filter: filterReducer,
    visitList: visitListReducer,
    sexRatio: sexRatioReducer,
});

export default groupAnalysisReducer;