import RouteName from '../utils/RouteName';
import ParaName from '../utils/ParaName'
import {queryParamsTrans} from '../utils/queryUtilFunction'
export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILED = 'SESSION_LOGIN_FAILED';
export const SESSION_SIGNUP_REQUEST = 'SESSION_SIGNUP_REQUEST';
export const SESSION_SIGNUP_SUCCESS = 'SESSION_SIGNUP_SUCCESS';
export const SESSION_SIGNUP_FAILED = 'SESSION_SIGNUP_FAILED';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_USER_INFO_REQUEST = 'SESSION_USER_INFO_REQUEST';
export const SESSION_USER_INFO_REQUEST_SUCCESS = 'SESSION_USER_INFO_REQUEST_SUCCESS';
export const SESSION_USER_INFO_REQUEST_FAILED = 'SESSION_USER_INFO_REQUEST_FAILED';

export function loginPostRequest(){
  return {type: SESSION_LOGIN_REQUEST}
}

export function loginFailed(){
  return {type: SESSION_LOGIN_FAILED}
}

export function loginSuccess(res){
  return {type: SESSION_LOGIN_SUCCESS, content: res}
}

export function logout(){
  return {type: SESSION_LOGOUT}
}

export function login(params){
  return function(dispatch) {
    dispatch(loginPostRequest());
    let url = RouteName.B_AUTHENTIC + RouteName.B_AUTH_LOGIN;
    // Body中使用JSON要保证JSON字符化过，确保Header中定义content Type，不然会出错
    return fetch(url, {method: RouteName.POST, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(params)})
    .then(res => res.json())
    .then(res => {
      // 如果正确获取了token，则判定登录成功，反之失败
      if (res.tokenType === "Bearer" && res.accessToken.length > 0){
        res['isError'] = false;
        res['message'] = '登录成功';
        return res
      }
      else if (res.status === '401' || res.status === 401){
        res['isError'] = true;
        res['message'] = '用户名或密码输入错误'
      }
      else{
        res['isError'] = true;
        res['message'] = '由于未知原因导致的登陆失败'
      }
      return res
    })
    
  }
}

export function signUpPostRequest(){
  return {type: SESSION_SIGNUP_REQUEST}
}

export function signUpFailed(){
  return {type: SESSION_SIGNUP_FAILED}
}

export function signUpSuccess(res){
  return {type: SESSION_SIGNUP_SUCCESS, content: res}
}

export function signUp(params){
  return function(dispatch) {
    dispatch(signUpPostRequest());
    let url = RouteName.B_AUTHENTIC + RouteName.B_AUTH_SIGNUP;
    // Body中使用JSON要保证JSON字符化过，确保Header中定义content Type，不然会出错
    return fetch(url, {method: RouteName.POST, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(params)})
    .then(res => res.json())
    .then(res => {
      if(res.success) dispatch(signUpSuccess(res));
      else dispatch(signUpFailed());
      return res
    })
  }
}

export function getUserInfoRequest(){
  return {type: SESSION_USER_INFO_REQUEST}
}

export function getUserInfoSuccess(res){
  return {type: SESSION_USER_INFO_REQUEST_SUCCESS,
  content:res}
}

export function getUserInfoFailed(){
  return {type: SESSION_LOGIN_FAILED}
}



export function getAccountInfo(params){
  return function(dispatch, getState) {
    dispatch(getUserInfoRequest());
    let url = RouteName.B_USER_INFO_DATA_ROOT+RouteName.B_USER_INFO+queryParamsTrans(params);
    let token = getState().session.authenticToken;
    let header = {'Authorization': token};

    return fetch(url, {method: ParaName.GET, headers: header})
    .then(res => res.json())
    .then(res => dispatch(getUserInfoSuccess(res)));
  }
}

export function signupUserExistExam(params){
  return function(dispatch) {
    dispatch(loginPostRequest());
    let url = RouteName.B_AUTHENTIC + RouteName.B_AUTH_SIGNUP_USER_EXIST_TEST + queryParamsTrans(params)
    // Body中使用JSON要保证JSON字符化过，确保Header中定义content Type，不然会出错
    return fetch(url, {method: RouteName.GET})
    .then(res => res.json())
    .then(res => {
      return res
    })
  }
}