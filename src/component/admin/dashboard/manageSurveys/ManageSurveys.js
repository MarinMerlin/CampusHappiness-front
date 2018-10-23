import React, { Component } from 'react'
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder';

import { connect } from 'react-redux';
import { getSondageData, getKeywordList, closeSurveyMessage } from '../../../../redux/admin/actions/manageSurveyAction';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }

class SurveyManager extends Component {

    componentDidMount(){
        this.props.getSondageData();
        this.props.getKeywordList();
    }
    
    render(){
        return(
            <div style={firstDivStyle} >
                {!(this.props.loadedSondage && this.props.loadedGroup) && <h1>Loading</h1>}  
                {(this.props.loadedSondage && this.props.loadedGroup) && <SurveySelector currentSondage={this.props.currentSondage} sondageList={this.props.sondageList} />}
                <SurveyAdder/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.openSurveyMessage}
                    onClose={this.props.closeSurveyMessage}
                    autoHideDuration={4500}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="sucess">{this.props.surveyMessage}</span>}
                    action={[
                    <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.props.closeSurveyMessage}
                    >
                    <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    getSondageData: getSondageData,
    getKeywordList: getKeywordList,
    closeSurveyMessage: closeSurveyMessage
}

export default connect(mapStateToProps, mapActionsToProps)(SurveyManager)
