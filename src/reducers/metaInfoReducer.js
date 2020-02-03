import {
    CREATE_NEW_QUERY,
    DELETE_QUERY,
    EDIT_QUERY_NAME,
    META_INFO_SET_STATE,
    SET_EXPANDED,
    SET_SELECTED_QUERY
} from "../actions/metaInfoAction";

// 个体分析和群体分析的元信息保存（包括查询类型，名称，筛选信息等）

// metaInfoMap结构
// {id: {queryType: (individual/group), queryName: (xxx), context: {xxx}}}
const initStateInfo = {
    nextID: 1,
    metaInfoMap: {},
    expandedNodeList: [],
    selectedQuery: "",
};
/*
const initStateInfo = {nextID: 1, metaInfoMap: {
        1:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'one', affiliated: null, context: {}},
        2:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'two', affiliated: 1, context: {}},
        7:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'seven', affiliated: 2, context: {}},
        10:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'ten', affiliated: 7, context: {}},
        9:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'nine', affiliated: 1, context: {}},
        8:{queryType: ParaName.GROUP_ANALYSIS, queryName: 'eight', affiliated: null, context: {}},
        3:{queryType: ParaName.INDIVIDUAL_ANALYSIS, queryName: 'three', context: '3'},
        4:{queryType: ParaName.INDIVIDUAL_ANALYSIS, queryName: 'four', context: '4'},
        6:{queryType: ParaName.INDIVIDUAL_ANALYSIS, queryName: 'five', context: '6'}
    }};
*/

// 目前暂未实现
// 用于维护每个Tab页的信息（是个体分析还是群体分析，这些分析（如果重命名了），叫什么名字
// 如果是个体分析查的是哪个人，如果是群体分析，他的父查询是什么，筛选条件是什么？）
// 如果我们的分析只有个体分析，那这个Reducer是不必要的
// 但是因为我们有群体分析，特别是黄老师之前谈到的缓存功能，如果我们实现了这个Reducer，那只要在每次退出前把这个Reducer信息保存到数据库里
// 我们就可以快速恢复上一次的查询
const metaInfoReducer = (state=initStateInfo, action) => {
    switch (action.type) {
        case SET_EXPANDED: return {...state, expandedNodeList: action.expandedQueryList};
        case SET_SELECTED_QUERY: return {...state, selectedQuery: action.selectedQuery};
        case META_INFO_SET_STATE: {
            return {...action.newState}
        }
        case CREATE_NEW_QUERY: {
            const queryID = state.nextID;

            let newQueryMetaInfo = {
                queryType: action.queryType,
                queryName: '查询'+queryID,
                isNameUserDefined: false,
                affiliated: action.affiliatedTo,
                context: {}
            };
            const metaInfoMap = {...state.metaInfoMap};
            metaInfoMap[queryID] = newQueryMetaInfo;

            return {...state, nextID: queryID+1, metaInfoMap: {...metaInfoMap}}
        }
        case DELETE_QUERY: {
            let toDeleteList = [action.id];
            const cascadeDeleteList=(fatherNodeID, queryToDeleteList) => {
                for(let id in metaInfoMap){
                    const affiliatedID = metaInfoMap[id].affiliated;
                    if(affiliatedID && Number.parseInt(affiliatedID)===Number.parseInt(fatherNodeID)){
                        queryToDeleteList.push(id);
                        cascadeDeleteList(id, queryToDeleteList);
                    }
                }
                return queryToDeleteList;
            };

            // 当删除一个父query时，级联删除所有下级query
            const metaInfoMap = {...state.metaInfoMap};
            toDeleteList=cascadeDeleteList(action.id, toDeleteList);
            for(const item of toDeleteList){
                delete metaInfoMap[Number.parseInt(item)];
            }

            // 每当delete一个query时，重新扫描所有id，将最大id进行重置，并将selectedQuery置空
            let currentMaxID = 0;
            for(let id in metaInfoMap){
                id = Number.parseInt(id);
                if(id>=currentMaxID)
                    currentMaxID=id;
            }

        return {...state, metaInfoMap: metaInfoMap, nextID: currentMaxID+1, selectedQuery: ""}
        }
        case EDIT_QUERY_NAME: {
            const metaInfoMap = {...state.metaInfoMap};
            metaInfoMap[action.id]['queryName'] = action.name;
            metaInfoMap[action.id]['isNameUserDefined'] = action.isNameUserDefined;
            return {...state, metaInfoMap: metaInfoMap}
        }
        default: return {...state}
    }
};


export default metaInfoReducer;