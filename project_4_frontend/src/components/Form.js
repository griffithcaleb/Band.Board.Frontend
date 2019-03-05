import React, {Component} from 'react'
import Auth from '../modules/Auth.js'
class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      info: '',
      number_of_likes: 0,
      author: '',
      title: '',
      showForm: false


    }
  }
  showForm = () => {
    this.setState({
      showForm: true
    })
  }
  hideForm = () => {
    this.setState({
      showForm: false,
      info: '',
      number_of_likes: 0,
      author: '',
      title: '',
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.id]:e.target.value,
    view:this.props.view})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://bandbandband.herokuapp.com/posts',{
      body:JSON.stringify(this.state),
      method: "POST",
      headers:{
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    }).then(createdPost => {
      return createdPost.json()
    }).then(data => {
       {this.props.updateArray(data)}
       this.setState({
         info:'',
         title:'',
         author:''
       })

    })
  }

  render(){
    return(
      <div  className = 'createPost'>
      <h3 className="addAPost" onClick={this.showForm}>Add a post </h3>
      {this.state.showForm ?
        <div>

           <div className = 'form'>
          <form onSubmit ={this.handleSubmit}>
          <input
          onChange ={this.handleChange}
          id='title'
          value = {this.state.title}
          type = 'text'
          placeholder = "title"
          />
          <textarea cols = "50" rows ="15"
          onChange ={this.handleChange}
          id='info'
          value = {this.state.info}
          type = 'text'
          placeholder ='your post here!'
          />
          <input
          onChange ={this.handleChange}
          id='author'
          value = {this.state.author}
          type = 'text'
          placeholder ='author'
          />
          <button id="submit" type='submit'>Post!</button>
          <h5 className = 'discardPost' onClick={this.hideForm}>discard post</h5>
          </form>
          </div>

        </div> : ''}
        </div>
    )
  }
}

export default Form
