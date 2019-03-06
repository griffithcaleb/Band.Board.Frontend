import React, {Component} from 'react';
import Auth from '../modules/Auth.js'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      email:this.props.user.email,
      locations:this.props.user.locations,
      instrument:this.props.user.instrument,
      bio:this.props.user.bio
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://bandbandband.herokuapp.com/users/'+ this.props.user.id,{
      method:'PUT',
      body:JSON.stringify({user: this.state}),
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.props.reload()
        this.props.toggle()
      },(err) => {
        console.log(err);
      })
    })
  }

  render(){
    return(
      <>
      <h4>Edit your Profile</h4>
      <form onSubmit={this.handleSubmit}>
        <label>Name: </label>
        <input type="text" onChange={this.handleChange} name="name" value={this.state.name}/><br/>
        <label>Email: </label>
        <input type="email" onChange={this.handleChange} name="email" value={this.state.email}/><br/>
        <label>Location: </label>
        <input type="text" onChange={this.handleChange} name="locations" value={this.state.locations}/><br/>
        <label>Instrument: </label>
        <input type="text" onChange={this.handleChange} name="instrument" value={this.state.instrument}/><br/>
        <label>Bio: </label>
        <input type="text" onChange={this.handleChange} name="bio" value={this.state.bio}/><br/>
        <input type="submit" />
      </form>
      </>
    )
  }
}


export default EditProfile
