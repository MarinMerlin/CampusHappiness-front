import { 
    POST_USERS_ACTION, 
    CLOSE_SUCCESS_MESSAGE_ACTION,
    GET_ALL_USERS_ACTION
} from '../actions/adminTypes';

const manageUserReducer = function(state = null, {type, payload}){
    switch (type) {
        case POST_USERS_ACTION:
            return {
                ...state,
                success: payload.success
            }
        case CLOSE_SUCCESS_MESSAGE_ACTION:
            return {
                ...state,
                success: false
            }
        case GET_ALL_USERS_ACTION:
            return {
                ...state,
                userArray: payload.userArray
            }
        default:
            return state
    }
}

export default manageUserReducer