import React, { Component } from 'react';
import Auth from './modules/Auth'
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import Login from './components/Login'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
  }

  signUp = (e,data) => {
    e.preventDefault()
    fetch('https://bandbandband.herokuapp.com/users',{
      method:'POST',
      body: JSON.stringify({user: data}),
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        Auth.authenticateToken(data.token)
        // this.setState({
        //   auth: Auth.isUserAuthenticated()
        // })
      },(err) => {
        console.log(err);
      })
    })
  }

  login = (e, data) => {
    console.log(data);
    e.preventDefault()
    fetch('https://bandbandband.herokuapp.com/login',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log('success');
      res.json()
      .then((data) => {
        Auth.authenticateToken(data.token)
        if(data.errors){
          console.log("invalid");
        }else{
          this.checkLogin()
        }
      },(err) => {
        console.log(err);
      })
    })
  }

  checkLogin = () => {
    this.setState({auth: Auth.isUserAuthenticated()})
  }

  render() {
    return (
      <div>
      {this.state.auth? <Nav logState={this.checkLogin}/>:
        <div>
          <SignUp signUp={this.signUp}/>
          <Login login={this.login}/>
        </div>
       }
      </div>

    );
  }
}

export default App;
