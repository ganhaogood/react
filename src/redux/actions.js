
import {
  reqRegister,
  reqLogin,
  reqUpdateUser
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'
const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user})
const errorMsg = (msg) => ({type: ERROR_MSG, data:msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
const resetUser = (msg) => ({type: RESET_USER, data: msg})

export function register({username, password, password2, type}) {

  if(!username) {
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  } else if (password2!==password) {
    return errorMsg('密码必须一致')
  } else if (!type) {
    return errorMsg('必须指定用户类型')
  }

  return async dispatch => {
    const response = await reqRegister({username, password, type})

    const result = response.data // {code:0/1, msg: '', data: user}
    if(result.code==0) {
      const user = result.data
      dispatch(authSuccess(user))
    } else {
      const msg = result.msg
      dispatch(errorMsg(msg))
    }
  }
}
export function login(username, password) {
  return async dispatch => {

    if(!username) {
      return dispatch(errorMsg('必须指定用户名'))
    } else if (!password) {
      return dispatch(errorMsg('必须指定密码'))
    }

    const response = await reqLogin(username, password)
    const result = response.data // {code:0/1, msg: '', data: user}
    if(result.code==0) {
      const user = result.data
      dispatch(authSuccess(user))
    } else {
      const msg = result.msg
      dispatch(errorMsg(msg))
    }
  }
}

export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) {
      const user = result.data
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      dispatch(resetUser(msg))
    }
  }
}
