import { 
    GET_USER_STAT_ACTION,
    CHANGE_STAT_ACTION,
    SET_THEMATIQUE_LIST_ACTION
} from '../actions/userTypes';

const userStatReducer = function(state = null, {type, payload}){
    switch(type) {
        case GET_USER_STAT_ACTION:
            return{
                ...state,
                monthSatisfaction: payload.data,
            }
        case CHANGE_STAT_ACTION:
            return{
                ...state,
                statShown: payload.nextStat,
            }
        case SET_THEMATIQUE_LIST_ACTION:
            return{
                ...state,
                thematiqueList: payload.list,
            }
        default:
            return state
    }
}

export default userStatReducer