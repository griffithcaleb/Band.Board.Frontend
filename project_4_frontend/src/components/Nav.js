import React, {Component} from 'react';
import MessageBoard from './MessageBoard.js'
import PostList from './PostList'

class Nav extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentVeiw:{
        board: false,
        posts: false
      }
    }
  }

  changeNav = (e) => {
    let obj = {}
    for (let key in this.state.currentVeiw) {
      obj[key] = false
    }
    obj[e.target.id] = true
    this.setState({
      currentVeiw: obj
    })
  }

  render(){
    return(
      <>
      <div onClick={this.changeNav}>
        <a id="posts">Posts </a>
        <a id="board">Board </a>
      </div>
      {this.state.currentVeiw.board?
      <MessageBoard />:""}
      {this.state.currentVeiw.posts?
      <PostList />:""}

      </>
    )
  }
}

export default Nav
