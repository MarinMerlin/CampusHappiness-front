import axios from 'axios'
import { 
    POST_USERS_ACTION, 
    CLOSE_SUCCESS_MESSAGE_ACTION
} from "./adminTypes";

const postUsers  = (userList)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/postUsers", {userList: userList}).then(res=>{
        console.log(res.data)
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
export { postUsers, closeSuccessMessage }