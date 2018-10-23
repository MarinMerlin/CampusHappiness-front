import axios from 'axios'

import { GET_USER_STAT_ACTION, CHANGE_STAT_ACTION,SET_THEMATIQUE_LIST_ACTION } from './userTypes';
import { cycleMonth } from '../../../component/admin/dashboard/generalStats/cycle';
import { 
    type_longSoftLine_constructor
} from '../../../component/admin/dashboard/chartConfig/chartConfig';

export function changeStat(nextStat){
    return {
        type: CHANGE_STAT_ACTION,
        payload: {
            nextStat: nextStat
        }
    }
}

function monthSatisfaction(dataList, name){
    const input5 = {
        dataArray: dataList.slice(0,30).reverse(),
        xLabel: cycleMonth(),
        elementLabel: 'Satisfaction',
        boxColor: '#ecf0f1',
        name: name,
    }
    return(type_longSoftLine_constructor(input5));
}

const getUserStat = () => (dispatch) => {
    axios.get('http://localhost:4200/user/userStat')
    .then(res => {
        console.log(res.data);
        const dataList = [];
        const themList = [];
        res.data.forEach(thematique => {
            for(var key in thematique){
                dataList.push(monthSatisfaction(thematique[key],key));
            }
        })
        dataList.map((thematique) => {
            themList.push(thematique.name)
        })
        dispatch({
            type: GET_USER_STAT_ACTION,
            payload: {data: dataList}
        });
        dispatch({
            type: SET_THEMATIQUE_LIST_ACTION,
            payload: {list: themList}
        })
    })
}
export {getUserStat}