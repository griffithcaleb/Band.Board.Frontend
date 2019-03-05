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
    fetch('http://localhost:3000/profile',{
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
      <>
      {this.state.displayPage? <div>
        <h3>{this.state.user.username}'s Information</h3>
        <p>Name: {this.state.user.name}</p>
        <p>Email: {this.state.user.email}</p>
        <p>Location: {this.state.user.locations}</p>
        <p>Instrument: {this.state.user.instrument}</p>
        <p>Bio: {this.state.user.bio}</p>
        <br/>
        <br/>
        <button onClick={this.toggleEdit}>Edit Profile</button>
        </div>: <EditProfile
        reload={this.pageLoad}
        toggle={this.toggleEdit}
        user={this.state.user}/>}

      </>
    )
  }
}

export default UserProfile
