import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile, Card, Select, MenuItem } from '@material-ui/core';
import ThematiqueDisplayer from './ThematiqueDisplayer';
import CommentsDisplayer from './CommentsDisplayer';

import { connect } from 'react-redux';
import { handleDateChange } from '../../../../redux/admin/actions/specificSurveyAction'
import { changeGroupSelection } from '../../../../redux/admin/actions/manageSurveyAction'

class Survey extends React.Component {

    componentDidMount(){
      this.props.handleDateChange(moment(), this.props.group.selectedGroup.id);
    }

    getGroupById = (groupId)=>{
      let newSelectedGroup = this.props.group.groupList[0]
      this.props.group.groupList.forEach(group => {
          if (groupId === group.id) {
              newSelectedGroup = group
          }
      });
      return newSelectedGroup
    }

    handleDateChange = (e) => {
      console.log(e._d);
      this.props.handleDateChange(e, this.props.group.selectedGroup.id);
    }
    changeGroupSelection = (e)=>{
      this.props.changeGroupSelection(this.getGroupById(e.target.value));
      this.props.handleDateChange(moment(), e.target.value);
    }
   
    render() {
      return (
      <Grid container direction='column' justify='flex-start' alignItems='center' style={{backgroundColor:'#2c3e50'}} >
        <Grid item >
          <Paper style={{width:'20vw',  textAlign:'center', padding:'2vh', marginTop: '10vh'}} >
              <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Pick a date </Typography>
              <DatePicker selected={this.props.survey.startDate} onChange={this.handleDateChange}/>
              <Select
                  value={this.props.group.selectedGroup.id}
                  onChange={this.changeGroupSelection}
              >
                  {this.props.group.groupList.map(group=>(
                      <MenuItem key={group.id} value={group.id} >{group.name}</MenuItem>
                  ))}
              </Select>
          </Paper>
        </Grid>
        <Grid item style={{width:'97%'}} >
          {!this.props.survey.loaded && <h1>Loading</h1>}  
          {this.props.survey.loaded &&  
          <div>
            {this.props.survey.thematiqueList ? 
              <GridList spacing={20} cellHeight={'auto'} cols={3} style={{marginTop:'10vh'}} >
              {this.props.survey.thematiqueList.map(thematiqueData => (
                <GridListTile key={thematiqueData.name}>
                  <ThematiqueDisplayer thematique={thematiqueData}/>
                </GridListTile>
              ))}
            </GridList>
            : <Card style={{margin:10}}><Typography align="center" variant="h3" style={{margin:'10vw'}}>
                No survey today
              </Typography></Card>
            }
          </div>
          }
          {!this.props.survey.loaded && <h1>Loading</h1>}  
          {this.props.survey.loaded &&  <CommentsDisplayer comments={this.props.survey.comments} />}
        </Grid>
      </Grid>
    )}
  }

const mapStateToProps = state=>{
  return {
    survey: state.specificSurvey,
    group: state.manageSurvey,
  }
}

const mapActionsToProps = {
  handleDateChange: handleDateChange,
  changeGroupSelection: changeGroupSelection,
}  

export default connect(mapStateToProps, mapActionsToProps)(Survey);