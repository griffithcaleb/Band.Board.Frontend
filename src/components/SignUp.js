import React, {Component} from 'react';

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password:"",
      email:"",
      name:'',
      showSignUp: false,
      ShowSignUpButton: true
    }
    this.handleChange = this.handleChange.bind(this)
  }
  showSignUp = () => {
    this.setState({
      showSignUp: !this.state.showSignUp,
      ShowSignUpButton: false
    })
  }
  setForm = () => {
    this.setState({
      showSignUp: false,
      username: '',
      password: '',
      email: '',
      name: '',
      ShowSignUpButton: true
    })
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(

      <div className = 'signUp top'>
      <h1 className = 'firstTimeTitle'> Band.Board </h1>
      {this.state.showSignUp?
      <form onSubmit={(e)=>this.props.signUp(e,this.state)}>
      <h3>Sign Up</h3>
        <input className = 'username'type="text" name="username" onChange={this.handleChange}
         value={this.state.username} placeholder="Username"/>
        <input  className = 'password 'type="password" name="password" onChange={this.handleChange}
         value={this.state.password} placeholder="Password"/>
        <input className = 'email' type="email" name="email" onChange={this.handleChange}
         value={this.state.email} placeholder="Email"/>
        <input className = 'name' type="text" name="name" onChange={this.handleChange}
         value={this.state.name} placeholder="Name"/>
         <input className='submit signIn' type="submit"/>
         <h6 onClick = {this.setForm} className = "submit">Cancel Sign Up </h6>
      </form>: '' }
      {this.state.ShowSignUpButton ? <h6 className = 'submit' onClick = {this.showSignUp}>Sign Up</h6>:''}
      </div>
    )
  }
}


export default SignUp
