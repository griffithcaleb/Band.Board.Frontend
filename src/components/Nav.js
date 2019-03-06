import React, {Component} from 'react';
import MessageBoard from './MessageBoard.js'
import Home from './Home'
import UserPost from './UserPosts'
import Auth from '../modules/Auth.js'
import UserProfile from './UserProfile'
import Messages from './Messages'

class Nav extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentVeiw:{
        board: false,
        posts: true,
        userPost:false,
        message:false,
        home:true
      }
    }
  }

  pageLoad = () => {
    fetch('https://bandbandband.herokuapp.com/messages',{
      method:'GET',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.setState({messages:data.messages})
      },(err) => {
        console.log(err);
      })
    })
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
    fetch('https://bandbandband.herokuapp.com/logout',{
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

  componentDidMount(){
    this.pageLoad()
  }

  render(){
    return(
      <div>
      <div className = "navBar" onClick={this.changeNav}>
        <h1 className ='title'>Band.Board</h1>
        <img src = "https://image.flaticon.com/icons/svg/149/149423.svg" alt = 'home' id = "posts"/>
        <img src = "https://image.flaticon.com/icons/svg/1078/1078011.svg" alt ='message board' id = "board"/>
        <img src = "https://image.flaticon.com/icons/svg/1246/1246351.svg" alt = 'user profile' id = "userProfile"/>
        <img src = "https://image.flaticon.com/icons/svg/453/453442.svg" alt = 'user posts' id = "userPost"/>
        <i className="far fa-envelope fa-4x" id="message"></i>
        <img src = "https://image.flaticon.com/icons/svg/182/182448.svg" alt = 'logout' id = "home" onClick={this.logout}/>


<hr/>
      </div>
      {this.state.currentVeiw.board?
      <MessageBoard reload={this.pageLoad}/>:""}
      {this.state.currentVeiw.posts?
      <Home />:""}
      {this.state.currentVeiw.userPost?
      <UserPost />:""}
      {this.state.currentVeiw.userProfile?
      <UserProfile />:""}
      {this.state.currentVeiw.message?
      <Messages reload={this.pageLoad}
      messages={this.state.messages}/>:""}
      </div>
    )
  }
}

export default Nav
