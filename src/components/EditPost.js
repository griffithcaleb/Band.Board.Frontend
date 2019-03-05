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
      <>
      <h4>Edit your post</h4>
      <form onSubmit={this.handleSubmit}>
        <label>Author: </label>
        <input type="text" onChange={this.handleChange} name="author" value={this.state.author}/><br/>
        <label>Description: </label>
        <input type="text" onChange={this.handleChange} name="info" value={this.state.info}/><br/>
        <label>Title: </label>
        <input type="text" onChange={this.handleChange} name="title" value={this.state.title}/><br/>
        <label>View: </label>
        <input type="text" onChange={this.handleChange} name="view" value={this.state.view}/><br/>
        <input type="submit" />
      </form>
      </>
    )
  }
}

export default EditPost
