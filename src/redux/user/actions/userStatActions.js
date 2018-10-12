import axios from 'axios'

import { GET_USER_STAT_ACTION } from './userTypes';
import { cycleMonth } from '../../../component/admin/dashboard/generalStats/cycle';
import { 
    type_longSoftLine_constructor
} from '../../../component/admin/dashboard/chartConfig/chartConfig';

function monthSatisfaction(dataList){
    const input5 = {
        dataArray: dataList.slice(0,30).reverse(),
        xLabel: cycleMonth(),
        elementLabel: 'Satisfaction',
        boxColor: '#ecf0f1'
    }
    return(type_longSoftLine_constructor(input5));
}

const getUserStat = () => (dispatch) => {
    axios.get('http://localhost:4200/user/userStat')
    .then(res => {
        const dataList = [];
        res.data.forEach(thematique => {
            for(var key in thematique){
                dataList.push(monthSatisfaction(thematique[key]));
            }
        })
        console.log(dataList)
        dispatch({
            type: GET_USER_STAT_ACTION,
            payload: {data: dataList}
        })
    })
}
export {getUserStat}