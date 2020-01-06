import {CREATE_NEW_QUERY, DELETE_QUERY, EDIT_QUERY_NAME} from "../../actions/individualAnalysisAction/metaInfoAction";

const initStateInfo = {nextID: 1, metaInfoMap: {}};

// 目前暂未实现
// 用于维护每个Tab页的信息（是个体分析还是群体分析，这些分析（如果重命名了），叫什么名字
// 如果是个体分析查的是哪个人，如果是群体分析，他的父查询是什么，筛选条件是什么？）
// 如果我们的分析只有个体分析，那这个Reducer是不必要的
// 但是因为我们有群体分析，特别是黄老师之前谈到的缓存功能，如果我们实现了这个Reducer，那只要在每次退出前把这个Reducer信息保存到数据库里
// 我们就可以快速恢复上一次的查询
const metaInfoReducer = (state=initStateInfo, action) => {
    switch (action.type) {
        case CREATE_NEW_QUERY: {
            const nextID = state.nextID;
            const currentID = action.id;
            const newQueryMetaInfo = action.metaInfo;

            let metaInfoMap = {...state.metaInfoMap};
            metaInfoMap[currentID] = newQueryMetaInfo;
            return {...state, nextID: nextID, metaInfoMap: metaInfoMap}
        }
        case DELETE_QUERY: {
            const metaInfoMap = {...state.metaInfoMap};
            delete metaInfoMap[action.id];
            return {...state, metaInfoMap: metaInfoMap}
        }
        case EDIT_QUERY_NAME: {
            const metaInfoMap = {...state.metaInfoMap};
            metaInfoMap[action.id]['name'] = action.name;
            return {...state, metaInfoMap: metaInfoMap}
        }
        default: return {...state}
    }
};

export default metaInfoReducer;