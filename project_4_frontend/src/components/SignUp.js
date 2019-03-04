import React, {Component} from 'react';

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password:"",
      email:"",
      name:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
      <>
      <form onSubmit={(e)=>this.props.signUp(e,this.state)}>
      <h3>Sign Up</h3>
        <input type="text" name="username" onChange={this.handleChange}
         value={this.state.username} placeholder="Username"/>
        <input type="password" name="password" onChange={this.handleChange}
         value={this.state.password} placeholder="Password"/>
        <input type="email" name="email" onChange={this.handleChange}
         value={this.state.email} placeholder="Email"/>
        <input type="text" name="name" onChange={this.handleChange}
         value={this.state.name} placeholder="Name"/>
         <input type="submit"/>
      </form>
      </>
    )
  }
}


export default SignUp
