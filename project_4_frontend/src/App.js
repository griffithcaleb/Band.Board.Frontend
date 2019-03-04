import React, { Component } from 'react';
import MessageBoard from './components/MessageBoard.js'
import Auth from './modules/Auth'
import PostList from './components/PostList'

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
      <MessageBoard />
      <PostList />
      </div>

    );
  }
}

export default App;
