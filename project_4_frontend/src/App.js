import React, { Component } from 'react';
import Auth from './modules/Auth'
import Nav from './components/Nav'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
  }

  render() {
    return (
      <div>
      <Nav />
      
      </div>

    );
  }
}

export default App;
