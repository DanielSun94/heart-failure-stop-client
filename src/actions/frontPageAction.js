export const CHANGE_FRONT_PAGE = 'CHANGE_FRONT_PAGE';
export const LOGIN = '登录';
export const SIGNUP = '注册'
export const TRAJECTORY_ANALYSIS = "轨迹分析"
export const KNOWLEDGE_GRAPH = "知识图谱"
export const GROUP_ANALYSIS = "人群分析"
export const OVERVIEW = "概览"
export const ACCOUNT_MANAGEMENT = "账户管理"

export function changeFrontPage(newPageName){
  return ({
    type: CHANGE_FRONT_PAGE,
    newPage: newPageName
  });
}