import axios from 'axios'
import { 
    POST_USERS_ACTION, 
    POST_GROUP_ACTION,
    CLOSE_SUCCESS_MESSAGE_ACTION,
    GET_ALL_USERS_ACTION,
    CHECK_USER_ACTION,
    CHANGE_USER_GROUP_ACTION
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

const postGroup  = (groupName)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/postGroup", {groupName: groupName}).then(res=>{
        dispatch({
            type: POST_GROUP_ACTION,
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
        const selectedUsers = [];
        res.data.forEach(user => {
            selectedUsers.push({id: user.id, check: false})
        })
        dispatch({
            type: GET_ALL_USERS_ACTION,
            payload: {
                userArray: res.data,
                selectedUsers: selectedUsers
            }
        });
    })
}

const checkUser = (user_id, checked) => {
    return {
        type: CHECK_USER_ACTION,
        payload: {
            user_id: user_id,
            checked: checked
        }
    }
}

const changeUserGroup = (selectedUsers, group) => (dispatch) => {
    axios.post("http://localhost:4200/admin/changeUserGroup", {selectedUsers: selectedUsers, selectedGroup: group})
    .then( res => {
        dispatch({
            type: CHANGE_USER_GROUP_ACTION,
            payload: {
                success: res.data.success
            }
        })
    })
}
export { postUsers, postGroup, closeSuccessMessage, getAllUsers, checkUser, changeUserGroup }