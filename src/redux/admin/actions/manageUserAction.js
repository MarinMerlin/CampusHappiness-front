import axios from 'axios'
import { 
    POST_USERS_ACTION, 
    CLOSE_SUCCESS_MESSAGE_ACTION,
    GET_ALL_USERS_ACTION
} from "./adminTypes";

const postUsers  = (userList)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/postUsers", {userList: userList}).then(res=>{
        dispatch({
            type: POST_USERS_ACTION,
            payload: {
                success: res.data.success
            }
        })
    })
}

const closeSuccessMessage = ()=>(dispatch)=>{
    dispatch({
        type: CLOSE_SUCCESS_MESSAGE_ACTION,
        payload: {}
    })
}

const getAllUsers = ()=>(dispatch)=>{
    axios.get("http://localhost:4200/admin/getUsers").then(res=>{
        dispatch({
            type: GET_ALL_USERS_ACTION,
            payload: {
                userArray: res.data
            }
        })
    })
}
export { postUsers, closeSuccessMessage, getAllUsers }