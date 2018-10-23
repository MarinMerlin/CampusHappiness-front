import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Redirect } from 'react-router-dom';

import { switchPage } from '../../redux/user/actions/userMainActions';

class RedirectToUser extends Component {

    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }

    handleClick = () => {
        console.log("Boutton pageUitilisateur hadnel click");
        this.props.switchPage(0, this.setState({ redirect: true }));
        

    }
  render() {
    return (
      <div>
        <Button 
            style={{margin: 20, backgroundColor: '#4286f4'}} 
            variant="contained" 
            onClick={this.handleClick}> 
            <AccountCircle /> User page 
        </Button>
        {this.state.redirect && <Redirect to="/user" />}
      </div>
    )
  }
}

const mapActionToProps = {
    switchPage: switchPage
};

const mapStateToProps = () => ({

})

export default connect(mapStateToProps, mapActionToProps) (RedirectToUser);
