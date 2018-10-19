import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Adder from './Adder';
import { connect } from 'react-redux';
import { postUsers, closeSuccessMessage, getAllUsers } from '../../../../redux/admin/actions/manageUserAction';
import UserTable from './UserTable';
import PostWriter from './PostWriter';
import Axios from 'axios';


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
  userList: [],
  page: 0,
  rowsPerPage: 10,
  imageURL: 'https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a9b2c6e54342b63487ce461a5ee9872&auto=format&fit=crop&w=675&q=80',
  title: '',
  text: '',
  linkURL: '',
  openSnackBar: false
}

class ManageUser extends Component {

  state=initialState

  componentDidMount() {
    this.props.getAllUsers()
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

  render() {
    const {imageURL, title, text, linkURL} = this.state
    const post = {imageURL: imageURL, title: title, text: text, linkURL}
    return (
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
            openSnackBar = {this.props.success}
            closeMessage = {this.closeSuccessMessage}
          />
        </Grid>
        <Grid item style={itemStyle}>
          {this.props.userArray && <UserTable 
            page={this.state.page} 
            handleChangePage= {this.handleChangePage}
            userArray = {this.props.userArray}
            rowsPerPage = {this.state.rowsPerPage}
            handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
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
    );
  }
}

const mapStateToProps = state=>{
  return state.manageUser
}

const mapActionsToProps = {
  postUsers: postUsers,
  closeSuccessMessage: closeSuccessMessage,
  getAllUsers: getAllUsers
}

export default connect(mapStateToProps, mapActionsToProps)(ManageUser)
