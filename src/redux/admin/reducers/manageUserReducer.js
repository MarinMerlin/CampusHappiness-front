import { 
    POST_USERS_ACTION, 
    CLOSE_SUCCESS_MESSAGE_ACTION
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
        default:
            return state
    }
}

export default manageUserReducer