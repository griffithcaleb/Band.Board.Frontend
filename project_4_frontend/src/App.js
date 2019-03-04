import React, { Component } from 'react';
import Auth from './modules/Auth'
import Nav from './components/Nav'
import SignUp from './components/SignUp'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
  }

  signUp = (e,data) => {
    e.preventDefault()
    fetch('http://localhost:3000/users',{
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
        this.setState({
          auth: Auth.isUserAuthenticated()
        })
      },(err) => {
        console.log(err);
      })
    })
  }

  render() {
    return (
      <div>
      {this.state.auth? <Nav />:
        <div>
          <SignUp signUp={this.signUp}/>
        </div>
       }
      </div>

    );
  }
}

export default App;
