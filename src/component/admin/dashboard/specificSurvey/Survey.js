import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile, Card } from '@material-ui/core';
import ThematiqueDisplayer from './ThematiqueDisplayer';
import CommentsDisplayer from './CommentsDisplayer';

import { connect } from 'react-redux';
import { handleDateChange } from '../../../../redux/admin/actions/specificSurveyAction'

class Survey extends React.Component {

    componentDidMount(){
      this.props.handleDateChange(moment());
    }
   
    render() {
      return (
      <Grid container direction='column' justify='flex-start' alignItems='center' style={{backgroundColor:'#2c3e50'}} >
        <Grid item >
          <Paper style={{width:'20vw',  textAlign:'center', padding:'2vh', marginTop: '10vh'}} >
              <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Pick a date </Typography>
              <DatePicker selected={this.props.startDate} onChange={this.props.handleDateChange}/>
          </Paper>
        </Grid>
        <Grid item style={{width:'97%'}} >
          {!this.props.loaded && <h1>Chargement</h1>}  
          {this.props.loaded &&  
          <div>
            {this.props.thematiqueList ? 
              <GridList spacing={20} cellHeight={'auto'} cols={3} style={{marginTop:'10vh'}} >
              {this.props.thematiqueList.map(thematiqueData => (
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
          {!this.props.loaded && <h1>Chargement</h1>}  
          {this.props.loaded &&  <CommentsDisplayer comments={this.props.comments} />}
        </Grid>
      </Grid>
    )}
  }

const mapStateToProps = state=>{
  return state.specificSurvey
}

const mapActionsToProps = {
  handleDateChange: handleDateChange
}  

export default connect(mapStateToProps, mapActionsToProps)(Survey);