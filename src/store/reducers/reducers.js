import {
       SET_SINGLE_USER,
       SET_USER_TOKEN
    } from '../actions/actionTypes';


const initialState = {
    singleUser:"",
    userToken:undefined,    

}

export function rootReducer(state = initialState,  action) {
    switch (action.type) {
            case SET_SINGLE_USER: 
            return {
                ...state,
                singleUser : action.payload.user
            };
            case SET_USER_TOKEN:
                console.log(action.payload)    
            return {
                    ...state,
                    userToken : action.payload.token
                    
                };
            default:
            return state;
   }
}