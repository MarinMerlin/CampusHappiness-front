import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Adder from './Adder';
import GroupAdder from './GroupAdder';
import { connect } from 'react-redux';
import { postUsers, checkUser, postGroup, closeSuccessMessage, getAllUsers, changeUserGroup } from '../../../../redux/admin/actions/manageUserAction';
import { getGroupData, changeGroupSelection } from '../../../../redux/admin/actions/manageSurveyAction';
import UserTable from './UserTable';
import PostWriter from './PostWriter';
import Axios from 'axios';
import SelectedUsers from './SelectedUsers';


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
    admin: false,
  },
  groupName: '',
  userList: [],
  page: 0,
  rowsPerPage: 10,
  imageURL: 'https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a9b2c6e54342b63487ce461a5ee9872&auto=format&fit=crop&w=675&q=80',
  title: '',
  text: '',
  linkURL: '',
  openSnackBar: false,
  incorrectEmailAlert: false,
}

class ManageUser extends Component {

  state=initialState

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getGroupData();
  }

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
    if (event.target.name === "name") {
      this.setState({
        groupName: event.target.value,
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
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.singleUser.email) || /^[a-zA-Z0-9]+\.[A-Za-z]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.singleUser.email)) { 
      this.props.postUsers([this.state.singleUser])
    } else {
      this.setState({incorrectEmailAlert: true})
    }
  }

  groupPost = ()=>{
    this.props.postGroup(this.state.groupName)
  }

  csvPost = ()=>{
    this.props.postUsers(this.state.userList)  
  }

  closeSuccessMessage = ()=>{
    this.props.closeSuccessMessage()
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onChange = (event)=>{
    switch (event.target.id) {
        case 'imageURL':
            this.setState({imageURL: event.target.value})
            break;
        case 'title':
            this.setState({title: event.target.value})
            break;
        case 'text':
            this.setState({text: event.target.value})
            break;
        case 'linkURL':
            this.setState({linkURL: event.target.value})
            break;
        default:
            break;
    }
  }

  postNews = ()=>{
      const post = {
          imageURL: this.state.imageURL,
          title: this.state.title,
          text: this.state.text,
          linkURL: this.state.linkURL
      }
      Axios.post('http://localhost:4200/admin/addPost', {post: post}).then(res=>{
          if (res.data.success) {
              console.log('open snck')
              this.setState({openSnackBar: true})
          }
      })
  }

  closeSnackBar = ()=>{
    this.setState({openSnackBar: false})
  }
  handleCheck = (event) => {
    console.log(event.target.checked);
    this.props.checkUser(event.target.value, event.target.checked)
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

  changeUserGroup = () => {
      this.props.changeUserGroup(this.props.user.selectedUsers, this.props.group.selectedGroup)
  }

  changeGroupSelection = (e)=>{
      this.props.changeGroupSelection(this.getGroupById(e.target.value))
  }

  handleCloseAlert = () => {
    this.setState({ incorrectEmailAlert: false });
  }

  render() {
    const {imageURL, title, text, linkURL} = this.state
    const post = {imageURL: imageURL, title: title, text: text, linkURL}
    return (
      <div>
      <Grid
        container
        direction= 'column'
        justify= 'center'
        alignItems= 'center'
        style={{
          backgroundColor: '#2c3e50',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
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
            openSnackBar = {this.props.user.success}
            closeMessage = {this.closeSuccessMessage}
          />
        </Grid>
        <Grid item style={itemStyle} >
          <GroupAdder 
            onKeyPress={this.onKeyPress} 
            groupPost={this.groupPost}
            name = {this.state.groupName}
            openSnackBar = {this.props.user.successGroup}
            closeMessage = {this.closeSuccessMessage}
          />
        </Grid>
        <Grid item style={itemStyle}>
          {this.props.user.userArray && <UserTable 
            page={this.state.page} 
            handleChangePage= {this.handleChangePage}
            userArray = {this.props.user.userArray}
            rowsPerPage = {this.state.rowsPerPage}
            handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
            handleCheck = {this.handleCheck}
          />}
        </Grid>
        <Grid item style={itemStyle}>
          {this.props.group.loadedGroup && <SelectedUsers 
          changeUserGroup = {this.changeUserGroup}
          changeGroupSelection = {this.changeGroupSelection}
          selectedGroup = {this.props.group.selectedGroup}
          groupList = {this.props.group.groupList}
          openSnackBar = {this.props.user.successUpdate}
          closeMessage = {this.closeSuccessMessage}
          />}
        </Grid>
        <PostWriter 
          post={post} 
          openSnackBar={this.state.openSnackBar} 
          closeSnackBar={this.closeSnackBar} 
          onChange={this.onChange} 
          postNews={this.postNews} 
        />
      </Grid>
      <Dialog
        open={this.state.incorrectEmailAlert}
        onClose={this.handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter a correct email address
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseAlert} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
    user: state.manageUser,
    group: state.manageSurvey,
  }
}

const mapActionsToProps = {
  postUsers: postUsers,
  closeSuccessMessage: closeSuccessMessage,
  getAllUsers: getAllUsers,
  postGroup: postGroup,
  checkUser: checkUser,
  getGroupData: getGroupData,
  changeGroupSelection: changeGroupSelection,
  changeUserGroup: changeUserGroup,
}

export default connect(mapStateToProps, mapActionsToProps)(ManageUser)
