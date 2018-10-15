import { 
    GET_USER_STAT_ACTION
} from '../actions/userTypes';

const userStatReducer = function(state = null, {type, payload}){
    switch(type) {
        case GET_USER_STAT_ACTION:
            return{
                ...state,
                monthSatisfaction: payload.data,
            }
        default:
            return state
    }
}

export default userStatReducer