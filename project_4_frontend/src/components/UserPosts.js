import React, { Component } from 'react';
import Auth from '../modules/Auth.js'

class UserPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myPosts: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/profile',{
      method:'GET',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.setState({myPosts:data.posts})
      },(err) => {
        console.log(err);
      })
    })
  }

  render(){
    return(
      <>
      <h2>Your Posts</h2>
      {this.state.myPosts.map((post) => {
        return(
          <div key={post.id}>
            <h2>{post.title}</h2>
              <p>{post.info}</p>

          </div>
        )
      })}
      </>
    )
  }
}

export default UserPost;
