import RouteName from '../utils/RouteName';
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
    dispatch(loginPostRequest())
    let url = RouteName.B_AUTHENTIC + RouteName.B_AUTH_LOGIN
    // Body中使用JSON要保证JSON字符化过，确保Header中定义content Type，不然会出错
    return fetch(url, {method: RouteName.POST, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(params)})
    .then(res => res.json(),
        error => {console.log(error); dispatch(loginFailed())})
    .then(res => dispatch(loginSuccess(res)))

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
    dispatch(signUpPostRequest())
    let url = RouteName.B_AUTHENTIC + RouteName.B_AUTH_SIGNUP
    // Body中使用JSON要保证JSON字符化过，确保Header中定义content Type，不然会出错
    return fetch(url, {method: RouteName.POST, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(params)})
    .then(res => res.json(),
        error => {console.log(error); dispatch(signUpFailed())})
    .then(res => dispatch(signUpSuccess(res)))
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
  return function(dispatch) {
    dispatch(getUserInfoRequest())
    let url = RouteName.USER_INFO+queryParamsTrans(params)
    return fetch(url, {method: RouteName.GET})
    .then(res => res.json(),
        error => {console.log(error); dispatch(getUserInfoFailed())})
    .then(res => dispatch(getUserInfoSuccess(res)));
  }
}