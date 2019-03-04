import React, {Component} from 'react'

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: '',
      date_published: '',
      number_of_likes: 0,
      author: '',


    }
  }
  handleChange = (e) => {
    this.setState({[e.target.id]:e.target.value,
    view:this.props.view})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    fetch('http://localhost:3000/posts',{
      body:JSON.stringify(this.state),
      method: "POST",
      headers:{'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'}
    }).then(createdPost => {
      return createdPost.json()
    }).then(data => {
      console.log(data);
    })
  }

  render(){
    return(
      <div className = 'createPost'>
        <form onSubmit ={this.handleSubmit}>
        <textarea
        onChange ={this.handleChange}
        id='content'
        value = {this.state.content}
        type = 'text'
        />
        <label labelfor = 'author'> author </label>
        <input
        onChange ={this.handleChange}
        id='author'
        value = {this.state.author}
        type = 'text'
        />
        <button type='submit'>Post!</button>
        </form>
      </div>
    )
  }
}

export default Form
