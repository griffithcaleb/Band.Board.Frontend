import React, { Component } from 'react';

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }


  render(){
    return(
      <>
      <form onSubmit={(e)=>this.props.login(e,this.state)}>
      <h3>Login</h3>
        <input type="text" name="username" onChange={this.handleChange}
         value={this.state.username} placeholder="Username"/>
        <input type="password" name="password" onChange={this.handleChange}
         value={this.state.password} placeholder="Password"/>
         <input type="submit"/>
      </form>
      </>
    )
  }
}

export default Login
