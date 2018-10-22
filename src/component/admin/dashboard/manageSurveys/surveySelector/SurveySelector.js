import React, { Component } from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SurveyDisplayer from './SurveyDisplayer';

import { connect } from 'react-redux';
import { changeSondageSelection, changeGroupSelection, changeGroupSondage } from '../../../../../redux/admin/actions/manageSurveyAction'

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveySelector extends Component {

    getSondageById = (sondageId)=>{
        let newSelectedSondage = this.props.sondageList[0]
        this.props.sondageList.forEach(sondage => {
            if (sondageId === sondage.id) {
                newSelectedSondage = sondage
            }
        });
        return newSelectedSondage
    }

    getGroupById = (groupId)=>{
        let newSelectedGroup = this.props.groupList[0]
        this.props.groupList.forEach(group => {
            if (groupId === group.id) {
                newSelectedGroup = group
            }
        });
        return newSelectedGroup
    }

    changeSondageSelection = (e)=>{
        this.props.changeSondageSelection(this.getSondageById(e.target.value))
    }

    changeGroupSelection = (e)=>{
        this.props.changeGroupSelection(this.getGroupById(e.target.value))
    }

    handleClick = () => {
        this.props.changeGroupSondage(this.props.selectedSondage.id,this.props.selectedGroup.id)
    }

    refreshSelection = ()=>{
        this.forceUpdate()
    } 
    
    render(){
        return(
            <Paper style={{padding: '2vh'}} >
                <h2 style={titleStyle} > Select the next sondage </h2>
                <Grid container justify="space-between">
                    <Grid container justify='flex-start' alignItems='center' spacing={32} >
                        <Grid item >
                            <h3 style={{fontFamily: 'Roboto', fontSize: '1.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}}>Survey : </h3>
                        </Grid>
                        <Grid item >
                            <Select
                                value={this.props.selectedSondage.id}
                                onClick= {this.refreshSelection}
                                onChange={this.changeSondageSelection}
                            >
                                {this.props.sondageList.map(sondage=>(
                                    <MenuItem key={sondage.id} value={sondage.id} >{sondage.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item >
                            <h3 style={{fontFamily: 'Roboto', fontSize: '1.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}}>Group : </h3>
                        </Grid>
                        <Grid item>
                            <Select
                                value={this.props.selectedGroup.id}
                                onClick= {this.refreshSelection}
                                onChange={this.changeGroupSelection}
                            >
                                {this.props.groupList.map(group=>(
                                    <MenuItem key={group.id} value={group.id} >{group.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <SurveyDisplayer sondage={this.props.selectedSondage} />
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item sm={1} >
                        <Button variant="contained" color="primary" aria-label="post" onClick={this.handleClick} >
                            Select
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    changeSondageSelection: changeSondageSelection,
    changeGroupSelection: changeGroupSelection,
    changeGroupSondage: changeGroupSondage
}

export default connect(mapStateToProps, mapActionsToProps)(SurveySelector)
