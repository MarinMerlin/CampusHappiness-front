import React, { Component } from 'react'
import PostDisplayer from './PostDisplayer';
import Axios from 'axios';

class Home extends Component {

  state={
    posts: null
  }

  componentDidMount(){
    Axios.get('http://localhost:4200/user/getPosts').then(res=>{
      this.setState({posts: res.data})
    })
  }
  render() {
    return (
      <div>
        {this.state.posts ? <PostDisplayer postList={this.state.posts}/>:<p>Chargement...</p>}
      </div>
    )
  }
}

export default Home
