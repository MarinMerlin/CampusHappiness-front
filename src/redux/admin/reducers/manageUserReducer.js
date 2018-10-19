import { 
    POST_USERS_ACTION, 
    POST_GROUP_ACTION,
    CLOSE_SUCCESS_MESSAGE_ACTION,
    GET_ALL_USERS_ACTION,
    CHECK_USER_ACTION,
    CHANGE_USER_GROUP_ACTION,
} from '../actions/adminTypes';

const manageUserReducer = function(state = null, {type, payload}){
    switch (type) {
        case POST_USERS_ACTION:
            return {
                ...state,
                success: payload.success
            }
        case POST_GROUP_ACTION:
            return {
                ...state,
                successGroup: payload.success
            }
        case CHANGE_USER_GROUP_ACTION:
            return {
                ...state,
                successUpdate: payload.success
            }
        case CLOSE_SUCCESS_MESSAGE_ACTION:
            return {
                ...state,
                success: false,
                successGroup: false,
                successUpdate: false,
            }
        case GET_ALL_USERS_ACTION:
            return {
                ...state,
                userArray: payload.userArray,
                selectedUsers: payload.selectedUsers
            }
        case CHECK_USER_ACTION:
            const newList = Array.from(state.selectedUsers)
            newList.forEach(user => {
                if(user.id === payload.user_id){
                    user.check = payload.checked
                }
            })
            return {
                ...state,
                selectedUsers: newList,
            }
        default:
            return state
    }
}

export default manageUserReducer