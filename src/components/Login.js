import React, { Component } from 'react';

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:'',
      showCreateForm: false,
      showLoginForm: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  showLoginForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    })
  }

  render(){
    return(

      <div className = 'login'>
      {this.state.showLoginForm?
      <form onSubmit={(e)=>this.props.login(e,this.state)}>
      <h3>Login</h3>
        <input className ='username' type="text" name="username" onChange={this.handleChange}
         value={this.state.username} placeholder="Username"/>
        <input className ='password' type="password" name="password" onChange={this.handleChange}
         value={this.state.password} placeholder="Password"/>
         <input className ='submit signIn' type="submit"/>
      </form> : ' '}
      <h6 className = 'submit' onClick = {this.showLoginForm}>Login</h6>
      </div>
    )
  }
}

export default Login
