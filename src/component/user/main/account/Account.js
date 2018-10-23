import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { updateAccount, sendUpdate, updatePhoto } from '../../../../redux/user/actions/userAccountActions';

const styles = theme => ({
  title: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});
export class Account extends Component {

  constructor(props){
    super(props)

    this.updatePhoto = this.updatePhoto.bind(this);
  }

  handleKeyPress = (e)=>{
    this.props.onUpdateUser(e.target)
  }

  onSubmitChange = () => {
    this.props.submitChange(this.props.user)
  }

  updatePhoto = (event) => {
    console.log(event.target.result);
    this.props.updatePhoto(event.target.result);
  }

  onImageUpload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = this.updatePhoto;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={1} style={{margin: '3vw', marginTop: '15vh', padding: '2vw'}} >
          <div className={classes.title}>
            <Typography variant="title" >
              Welcome to your account page
            </Typography>
          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.card}
          >
            <Grid item sm={4} >
              <Toolbar style={{padding:0, marginTop:'2vh', marginBottom:'2vh'}} >
                <Card style={{width: '20vw', height:'40vh'}} >
                  <CardMedia
                    image= {`http://localhost:4200${this.props.user.photo}`}
                    title="Profile photo"
                    style={{width: '100%', height: '80%', margin:0}}
                  />
                  <CardActions>
                      <input
                      accept="image/*"
                      onInput={this.onImageUpload}
                      style={{display: 'none'}}
                      id="raised-button-file"
                       multiple
                      type="file"
                        />
      <label htmlFor="raised-button-file">
        <Button raised component="span" variant="contained" color="primary">
          Upload
        </Button>
      </label>
                  </CardActions>
                </Card>
              </Toolbar>
            </Grid>
            <Grid item sm={8}>
              <Toolbar>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Firstname"
                      name="firstName"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.firstName}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Lastname"
                      name="lastName"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.lastName}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Email"
                      name="email"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.email}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Username"
                      name="pseudo"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.pseudo}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Password"
                      name="password"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Toolbar>
            </Grid>
            <Grid item>
              <Button variant="raised" size="small" color="primary" onClick={this.onSubmitChange} >
                Submit
              </Button>
            </Grid>
           </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.account.connectedUser
})

const mapDispatchToProps = {
  onUpdateUser : updateAccount,
  submitChange : sendUpdate,
  updatePhoto : updatePhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
