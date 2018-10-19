import axios from 'axios';

import { 
    LOGIN_ACTION, 
    CHANGE_PASSWORD_ACTION, 
    CHANGE_PSEUDO_ACTION,
    CHANGE_DASHBOARD_PAGE_ACTION,
    LOGOUT_ACTION
} from "./adminTypes";

const changePseudo = (event)=>(dispatch)=>{
    dispatch({
        type: CHANGE_PSEUDO_ACTION,
        payload: {
            pseudo: event.target.value
        }
    })
}

const changePassword = (event)=>(dispatch)=>{
    dispatch({
        type: CHANGE_PASSWORD_ACTION,
        payload: {
            password: event.target.value
        }
    })
}

const checkLogin = () => (dispatch) => {
    axios.get('http://localhost:4200/login/check').then( (res) => {
        if (res.data){
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: true }
            });
            dispatch({
                type: 'GET_USER_ACTION',
                payload: {
                    connectedUser: res.data
                }
            });
            dispatch({
                type: 'GET_ACCOUNT_ACTION',
                payload: {
                    connectedUser: res.data
                }
            });
        } else {
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: false }
            });
        }
    });  
}

const login = (pseudo, password)=> (dispatch)=>{
    axios({
        url: "http://localhost:4200/login",
        data: {pseudo: pseudo, password: password},
        method: 'post',
    })
    .then(res=>{
        console.log(res)
        if(res.status === 200){
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: true }
            });
            dispatch({
                type: 'GET_USER_ACTION',
                payload: {
                    connectedUser: res.data
                }
            });
            dispatch({
                type: 'GET_ACCOUNT_ACTION',
                payload: {
                    connectedUser: res.data
                }
            });
        }
    })
}

const changeAdminPage = (pageNumber)=>(dispatch)=>{
    dispatch({
        type: CHANGE_DASHBOARD_PAGE_ACTION,
        payload: { onPage: pageNumber}
    })
}

const logout = ()=>(dispatch)=>{
    axios.get("http://localhost:4200/login/logout").then( () => {
        window.location = '/login';
        dispatch({
            type: LOGOUT_ACTION,
            payload: { }
        })
    });
}

export { changePassword, changePseudo, login, changeAdminPage, logout, checkLogin }