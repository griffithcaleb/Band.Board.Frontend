import React, { Component } from 'react';
import Auth from '../modules/Auth.js'
import EditPost from './EditPost'

class UserPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myPosts: [],
      editForm: false
    }
  }
  componentDidMount(){
    this.pageLoad()
  }

  pageLoad = () => {
    fetch('https://bandbandband.herokuapp.com/profile',{
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
    fetch("https://bandbandband.herokuapp.com/posts/"+id,{
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

  handleEdit = (post) => {
    this.setState({
      post:post
    })
    this.toggleEdit()
  }

  toggleEdit = () => {
    this.setState((pre) => {
      pre.editForm = !pre.editForm
      return{
        editForm: pre.editForm
      }
    })
  }

  render(){
    return(
      <div className = "userPosts">
      <h2>Your Posts</h2>
      {this.state.editForm? <EditPost reload={this.pageLoad}
        toggle={this.toggleEdit} post={this.state.post}/>:<span>
        {this.state.myPosts.map((post,index) => {
          return(
            <div key={post.id}>
              <h2> Title: </h2>
              <p>{post.title}</p>
              <h2> Post: </h2>
              <p>{post.info}
                <span
                onClick={()=>this.deletePost(post.id,index)}
                >  <img  className = 'delete' src = 'https://image.flaticon.com/icons/svg/126/126468.svg' /> </span>
                <h6 className ="edit" onClick={() => {
                  this.handleEdit(post)
                }}>Edit</h6>
                </p>

            </div>
          )
        })}
        </span>}

      </div>
    )
  }
}

export default UserPost;
