import React, { Component } from 'react'
import { Paper, Card, Typography, Grid, Button } from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import SurveyDisplayer from './SurveyDisplayer';

import { connect } from 'react-redux';
import { changeSondageSelection, changeGroupSelection } from '../../../../../redux/admin/actions/manageSurveyAction'

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
        console.log(e.target.value)
        this.props.changeSondageSelection(this.getSondageById(e.target.value))
    }

    changeGroupSelection = (e)=>{
        console.log(e.target.value)
        this.props.changeGroupSelection(this.getGroupById(e.target.value))
    }

    handleClick = (e) => {
        axios.post("http://localhost:4200/admin/changeNextSondage",this.props.selectedSondage).then((res)=>{
            console.log(res);
        });
    }

    refreshSelection = ()=>{
        this.forceUpdate()
    } 
    
    render(){
        return(
            <Paper style={{padding: '2vh'}} >
                <Typography style={titleStyle} > Select the next sondage </Typography>
                <Grid container justify="space-between">
                    <Grid item>
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
                <Grid container alignItems="center" justify="space-between">
                    <Grid item sm={7}>
                        <SurveyDisplayer sondage={this.props.selectedSondage} />
                    </Grid>
                    <Grid item sm={1}>
                        <ArrowRightAltRounded style={{width:100, height:100}}/>
                    </Grid>
                    <Grid item md={4}>
                        <Card style={{margin:'2vh'}}>
                            <Typography variant="h6" style={{margin:20}} > {this.props.selectedGroup.name} </Typography>
                        </Card>
                    </Grid>
                </Grid>    
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
    changeGroupSelection: changeGroupSelection
}

export default connect(mapStateToProps, mapActionsToProps)(SurveySelector)
