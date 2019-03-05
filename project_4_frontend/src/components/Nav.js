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
      <div>
      <h1 className ='title'>Band.Board</h1>
      <div className = "navBar" onClick={this.changeNav}>
        <img src = "https://image.flaticon.com/icons/svg/149/149423.svg" alt = 'home' id = "posts"/>
        <img src = "https://image.flaticon.com/icons/svg/1078/1078011.svg" alt ='message board' id = "board"/>
        <img src = "https://image.flaticon.com/icons/svg/1246/1246351.svg" alt = 'user page' id = "userPost"/>
        <img src = "https://image.flaticon.com/icons/svg/182/182448.svg" alt = 'logout' id = "home" onClick={this.logout}/>
<hr/>
      </div>
      {this.state.currentVeiw.board?
      <MessageBoard />:""}
      {this.state.currentVeiw.posts?
      <PostList />:""}
      {this.state.currentVeiw.userPost?
      <UserPost />:""}
      {this.state.currentVeiw.userProfile?
      <UserProfile />:""}

      </div>
    )
  }
}

export default Nav
