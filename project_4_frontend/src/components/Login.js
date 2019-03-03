import React, { Component } from 'react';

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      name:"",
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }

  formSubmit = (e) => {
    e.preventDefault()
    // this.props.addUser(this.state)
    console.log("Added User");
  }

  render(){
    return(
      <>
      <form onSubmit={this.formSubmit}>
      <h3>Sign Up</h3>
      <label htmlFor="name">Username: </label>
        <input type="text" onChange={this.handleChange}
         value={this.state.name} id="name" /> <br/>
         <input type="submit"/>
      </form>
      </>
    )
  }
}

export default Login
