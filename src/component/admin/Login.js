import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Grid from '@material-ui/core/Grid';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { changePseudo, changePassword, login } from '../../redux/admin/actions/authAction'
import img from '../../img/login.jpg'

import CustomInput from './CustomInput'
import Btn from './Btn'

const particleConfig = require('./options')

class Login extends Component {

    handleClick = ()=>{
        this.props.login(this.props.pseudo, this.props.password)
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    handleKeyPress = (e)=>{
        if (e.target.type==="text") {
            this.props.changePseudo(e)
        }
        if (e.target.type==="password") {
            this.props.changePassword(e)
        }
    }

    render(){
        return(
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat',
              }} >
                {this.props.isConnected && <Redirect to="/user" />}
                <Grid
                  container
                  justify= 'center'
                  alignItems = 'center'
                  spacing={32}
                  style={{
                  position: 'absolute',
                  top: '30vh',
                  zIndex:1,
                }}>
                  <Grid item >
                    <CustomInput placeHolder='Pseudo' keyPress={this.handleKeyPress} />
                  </Grid>
                  <Grid item >
                    <CustomInput placeHolder='Password' keyPress={this.handleKeyPress} />
                  </Grid>
                  <Grid item >
                    <Btn onClick={this.handleClick} />
                  </Grid>
                </Grid>
                <Particles 
                  params={particleConfig}
                  style={{
                      filter: 'brightness(200%)',
                      marginTop: '5vh'
                    }}
                />
              </div>
        )
    }
}

const mapStateToProps = state=>{
    return state.auth
}

const mapActionsToProps = {
    changePseudo: changePseudo,
    changePassword: changePassword,
    login: login,
}

export default connect(mapStateToProps, mapActionsToProps)(Login)