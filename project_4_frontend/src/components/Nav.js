import React, {Component} from 'react';
import MessageBoard from './MessageBoard.js'
import PostList from './PostList'
import UserPost from './UserPosts'
import UserProfile from './UserProfile'
import Auth from '../modules/Auth.js'

class Nav extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentVeiw:{
        board: false,
        posts: false,
        userPost:false,
        home:true,
        userProfile:false
      }
    }
  }



  changeNav = (e) => {
    let obj = {}
    for (let key in this.state.currentVeiw) {
      obj[key] = false
    }
    obj[e.target.id] = true
    this.setState({
      currentVeiw: obj
    })
  }

  logout = () => {
    fetch('http:localhost:3000/logout',{
      method:'DELETE',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      Auth.deauthenticateUser()
      this.props.logState()
    })
  }

  render(){
    return(
      <>
      <div onClick={this.changeNav}>
        <span id="posts">Posts </span>
        <span id="board">Board </span>
        <span id="userPost">User Post </span>
        <span id="userProfile">Profile </span>
        <span id="home" onClick={this.logout}>Logout </span>
      </div>
      {this.state.currentVeiw.board?
      <MessageBoard />:""}
      {this.state.currentVeiw.posts?
      <PostList />:""}
      {this.state.currentVeiw.userPost?
      <UserPost />:""}
      {this.state.currentVeiw.userProfile?
      <UserProfile />:""}

      </>
    )
  }
}

export default Nav
