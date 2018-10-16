import axios from 'axios';
import id_generator from '../../../customFunction/idGenerator'

import { 
    GET_SONDAGE_DATA_ACTION,
    CHANGE_SONDAGE_SELECTION_ACTION ,
    POST_SURVEY_ACTION,
    GET_KEYWORDS_ACTION
} from "./adminTypes";

const getSondageData = ()=>(dispatch)=> {
    axios.get("http://localhost:4200/admin/getSondage")
    .then( res => {
        const sondage_list = res.data
        let currentSondage = sondage_list[0]
        sondage_list.forEach((sondage) => {
            if(sondage.current){
                currentSondage = sondage
            }
        });
        dispatch({
            type: GET_SONDAGE_DATA_ACTION,
            payload: {
                sondageList: sondage_list,
                loaded: true,
                currentSondage: currentSondage,
                selectedSondage: currentSondage,
            }
        })
    });
}

const getKeywordList = () => (dispatch) => {
    axios.get("http://localhost:4200/admin/getKeywords")
    .then( res => {
        dispatch({  
            type: GET_KEYWORDS_ACTION,
            payload: {
                list: res.data,
            }
        })
    })
}

const addKeyword = (newKeyword) => (dispatch) => {
    axios.post("http://localhost:4200/admin/addKeyWord", {name: newKeyword})
        .then(res => {
            dispatch({  
                type: GET_KEYWORDS_ACTION,
                payload: {
                    list: res.data,
                }
            })
        });
}

const changeSondageSelection = (sondage)=>(dispatch)=>{
    dispatch({
        type: CHANGE_SONDAGE_SELECTION_ACTION,
        payload: {selectedSondage: sondage}
    })
}

const postSurvey = (survey, sondageList)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/postSondage",survey).then((serverRes)=>{
        if (serverRes.data) {
            const newSondageList = sondageList
            // id from the server (real one)
            survey.id = serverRes.data.sondageId
            // fake thematique id and question id (only for correct front display)
            survey.thematiqueList.forEach(thematique=>{
                thematique.id = id_generator()
                thematique.questionList.forEach(question=>{
                    question.id = id_generator()
                })
            })
            survey.current = false
            newSondageList.push(survey)
            dispatch({
                type: POST_SURVEY_ACTION,
                payload: {
                    newSondageList: newSondageList
                }
            })
        }
    })
}


export { getSondageData, changeSondageSelection, postSurvey, getKeywordList, addKeyword }