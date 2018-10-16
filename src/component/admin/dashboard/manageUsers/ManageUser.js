import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Adder from './Adder';
import { connect } from 'react-redux';
import { postUsers, closeSuccessMessage } from '../../../../redux/admin/actions/manageUserAction';
import UserTable from './UserTable';


const itemStyle = {
  width: '100vw',
}

const initialState = {
  singleUser: {
    firstName: '',
    lastName: '',
    email: '',
    pseudo: '',
    password: '',
    admin: false
  },
  userList: []
}

class ManageUser extends Component {

  state=initialState

  uploadUserList = (csvData)=>{
    const userList = []
    csvData.forEach(csvLine => {
      userList.push({
        email: csvLine[0],
        firstName: csvLine[1],
        lastName: csvLine[2],
        pseudo: csvLine[1],
        password: csvLine[1],
        admin: false
      })
    });
    this.setState({userList: userList})
  }

  onKeyPress = (event)=>{
    if (event.target.name === "firstName") {
      this.setState({
        singleUser: Object.assign(
          {},
          this.state.singleUser,
          {
            firstName: event.target.value,
            pseudo: event.target.value,
            password: event.target.value
          })
      })
    }
    if (event.target.name === "lastName") {
      this.setState({
        singleUser: Object.assign({}, this.state.singleUser, {lastName: event.target.value})
      })
    }
    if (event.target.name === "email") {
      this.setState({
        singleUser: Object.assign({}, this.state.singleUser, {email: event.target.value})
      })
    }
  }

  adminCheckBox = ()=>{
    this.setState({
      singleUser: Object.assign(
        {},
        this.state.singleUser,
        { 
          admin: !this.state.singleUser.admin
        }
      )
    })
  }

  singlePost = ()=>{
    this.props.postUsers([this.state.singleUser])
  }

  csvPost = ()=>{
    this.props.postUsers(this.state.userList)  
  }

  closeSuccessMessage = ()=>{
    this.props.closeSuccessMessage()
  }

  render() {
    return (
      <Grid
        container
        direction= 'column'
        justify= 'center'
        alignItems= 'center'
        style={{
          backgroundColor: '#2c3e50',
          minHeight: '100vh',
          width: '100vw'
        }}
      >
        <Grid item style={itemStyle} >
          <h2>Manage User</h2>
        </Grid>
        <Grid item style={itemStyle} >
          <Adder 
            uploadUserList={this.uploadUserList} 
            onKeyPress={this.onKeyPress} 
            adminCheckBox={this.adminCheckBox}
            singlePost={this.singlePost}
            csvPost={this.csvPost}
            checkBoxState={this.state.singleUser.admin}
            firstName = {this.state.singleUser.firstName}
            lastName = {this.lastName}
            email = {this.state.singleUser.email}
            openSnackBar = {this.props.success}
            closeMessage = {this.closeSuccessMessage}
          />
        </Grid>
        <Grid item style={itemStyle}>
          <UserTable/>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state=>{
  return state.manageUser
}

const mapActionsToProps = {
  postUsers: postUsers,
  closeSuccessMessage: closeSuccessMessage
}

export default connect(mapStateToProps, mapActionsToProps)(ManageUser)
