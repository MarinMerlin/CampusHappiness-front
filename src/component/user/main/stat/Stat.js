import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Card, Typography, withStyles, Menu, Button, MenuItem } from '@material-ui/core';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import { getUserStat, changeStat } from '../../../../redux/user/actions/userStatActions';
import LongSoftLine from '../../../admin/dashboard/chartDisplayers/LongSoftLine';

const styles = theme => ({
    default :{
      margin: theme.spacing.unit,
    },
    title : {
      margin: theme.spacing.unit*5,
      width: 'auto',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    menu: {
      margin :theme.spacing.unit,
    }
  });
  
export class Stat extends Component {

  state = {
    anchorEl: null,
  }

  constructor(props){
    super(props);

    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  componentDidMount() {
    this.props.onGetUserStat();
  }

  handleChange = event => {
    this.setState({ anchorEl: null });
    this.props.changeStat(event.target.value);
  };

  onToggleMenu(event){
      this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
      this.setState({ anchorEl: null });
  };
  
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Card>
          <Grid container className={classes.title}>
            <Grid item>
              <Typography variant='h3' align='center'>
                Here you can see your monthly satisfaction on a certain subject.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.default}>
            <Grid item>
              <Typography className={classes.default} variant='h5'>
                Select which subject you wish to see: 
              </Typography>
            </Grid>
            {this.props.themList &&
            <div>
              <Button onClick={this.onToggleMenu} variant="contained" color="default" className={classes.button}>
                {this.props.themList[this.props.statShown]} 
                <KeyboardArrowDownRounded/>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={open}
                onClose={this.handleClose}
                >
                  {this.props.themList.map((stat, index) => {
                    return (<MenuItem key={stat} onClick={this.handleChange} value={index}>{stat}</MenuItem>)
                  })}
              </Menu>
            </div>}
          </Grid>
          {this.props.stat &&
          <Grid className={classes.default}>
            <LongSoftLine data= {this.props.stat[this.props.statShown]}/>
          </Grid>
          }
        </Card>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stat: state.userStat.monthSatisfaction,
    statShown: state.userStat.statShown,
    themList: state.userStat.thematiqueList,
  }
};

const mapDispatchToProps = {
  onGetUserStat: getUserStat,
  changeStat: changeStat
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stat))
