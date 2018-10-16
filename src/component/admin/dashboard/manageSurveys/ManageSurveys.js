import React, { Component } from 'react'
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder';

import { connect } from 'react-redux';
import { getSondageData, getKeywordList } from '../../../../redux/admin/actions/manageSurveyAction';

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }

class SurveyManager extends Component {

    componentDidMount(){
        this.props.getSondageData()
        this.props.getKeywordList()
    }
    
    render(){
        return(
            <div style={firstDivStyle} >
                {!this.props.loaded && <h1>Chargement</h1>}  
                {this.props.loaded && <SurveySelector currentSondage={this.props.currentSondage} sondageList={this.props.sondageList} />}
                <SurveyAdder/>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    getSondageData: getSondageData,
    getKeywordList: getKeywordList
}

export default connect(mapStateToProps, mapActionsToProps)(SurveyManager)
