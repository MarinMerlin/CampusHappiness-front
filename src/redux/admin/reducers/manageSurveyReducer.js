import { GET_SONDAGE_DATA_ACTION, GET_GROUP_DATA_ACTION, CHANGE_SONDAGE_SELECTION_ACTION, CHANGE_GROUP_SELECTION_ACTION, POST_SURVEY_ACTION, GET_KEYWORDS_ACTION } from '../actions/adminTypes';

const manageSurveyReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_SONDAGE_DATA_ACTION:
            return {
                ...state,
                sondageList: payload.sondageList,
                currentSondage: payload.currentSondage,
                loadedSondage: payload.loaded,
                selectedSondage: payload.selectedSondage
            }
        case GET_GROUP_DATA_ACTION:
            return {
                ...state,
                groupList: payload.groupList,
                currentGroup: payload.currentGroup,
                loadedGroup: payload.loaded,
                selectedGroup: payload.selectedGroup
            }
        case CHANGE_SONDAGE_SELECTION_ACTION:
            return {
                ...state,
                selectedSondage: payload.selectedSondage
            }
        case CHANGE_GROUP_SELECTION_ACTION:
            return {
                ...state,
                selectedGroup: payload.selectedGroup
            }
        case POST_SURVEY_ACTION:
            return {
                ...state,
                sondageList: payload.newSondageList
            }
        case GET_KEYWORDS_ACTION:
            return {
                ...state,
                keywordList: payload.list
            }
        default:
            return state
    }
}

export default manageSurveyReducer