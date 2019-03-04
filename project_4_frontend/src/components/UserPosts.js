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

  deletePost = (id, index) => {
    fetch("http://localhost:3000/posts/"+id,{
      method: 'DELETE',
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then((res) => {
      this.removeFromArr(index)
    })
  }

  removeFromArr = (index) => {
    this.setState((prevState) => {
      prevState.myPosts.splice(index,1)
      return{
        myPosts: prevState.myPosts
      }
    })
  }

  render(){
    return(
      <>
      <h2>Your Posts</h2>
      {this.state.myPosts.map((post,index) => {
        return(
          <div key={post.id}>
            <h2>{post.title}</h2>
              <p>{post.info}
              <span
              onClick={()=>this.deletePost(post.id,index)}
              >   X</span>
              </p>

          </div>
        )
      })}
      </>
    )
  }
}

export default UserPost;
