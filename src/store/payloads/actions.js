import {SET_SINGLE_USER, SET_USER_TOKEN}
from '../actions/actionTypes';


export function setSingleUser(user){
    return {type: SET_SINGLE_USER, payload: {user: user}}
}
export function setUserToken(token){
  
    return {type: SET_USER_TOKEN, payload: {token: token}}
}