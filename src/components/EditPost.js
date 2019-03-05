import React, { Component } from 'react';
import Auth from '../modules/Auth.js'


class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.author,
      info: this.props.post.info,
      title: this.props.post.title,
      view: this.props.post.view
    }
  }

  handleSubmit = (e) => {
    let obj = this.state
    obj.number_of_likes = this.props.post.number_of_likes
    e.preventDefault()
    fetch('https://bandbandband.herokuapp.com/posts/'+ this.props.post.id,{
      method:'PUT',
      body:JSON.stringify({post: obj}),
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.props.reload()
        this.props.toggle()
      },(err) => {
        console.log(err);
      })
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    return(
      <div className = 'editost'>
      <h4>Edit your post</h4>
      <form onSubmit={this.handleSubmit}>
      <h6>Title: </h6>
      <input type="text" onChange={this.handleChange} name="title" value={this.state.title}/><br/>
      <h6>Post: </h6>
      <textarea cols = '30' rows = '10' type="text" onChange={this.handleChange} name="info" value={this.state.info}></textarea><br/>

      <input className = 'submit' type="submit" />
      </form>
      </div>
    )
  }
}

export default EditPost
