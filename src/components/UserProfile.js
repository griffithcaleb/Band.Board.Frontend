import React, {Component} from 'react';
import Auth from '../modules/Auth.js'
import EditProfile from './EditProfile'

class UserProfile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      displayPage:true
    }
  }

  componentDidMount(){
    this.pageLoad()
  }

  pageLoad = () => {
    fetch('https://bandbandband.herokuapp.com/profile',{
      method:'GET',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.setState({user:data.user})
      },(err) => {
        console.log(err);
      })
    })
  }

  toggleEdit = () => {
    this.setState((pre) => {
      pre.displayPage = !pre.displayPage
      return{
        displayPage: pre.displayPage
      }
    })
  }


  render(){
    return(
      <div className = 'profile'>
      {this.state.displayPage? <div>
        <h4> Name:</h4>
        <p>{this.state.user.name}</p>
        <h4> email:</h4>
        <p>{this.state.user.email}</p>
        <h4> location:</h4>
        <p>{this.state.user.locations}</p>
        <h4>instrument:</h4>
        <p>{this.state.user.instrument}</p>
        <h4> bio:</h4>
        <p>{this.state.user.bio}</p>
        <br/>
        <br/>
        <button className = 'edit' onClick={this.toggleEdit}>Edit Profile</button>
        </div>: <EditProfile
        reload={this.pageLoad}
        toggle={this.toggleEdit}
        user={this.state.user}/>}
        </div>

    )
  }
}

export default UserProfile
