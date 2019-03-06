import React, {Component}  from 'react';
import Auth from '../modules/Auth.js'

class DirectMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.sendTo,
      message:""
    }
  }

  pageLoad = () => {
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
        this.setState({
          sent_name: data.user.name,
          sent_user: data.user.username,
          sent_id: data.user.id
        })
      },(err) => {
        console.log(err);
      })
    })
  }

  handleChange = (e) => {
    this.setState({message:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/messages',{
      method:'POST',
      body: JSON.stringify({message: this.state}),
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
      console.log(data);
      this.setState({message:""})
      this.props.reload()
      },(err) => {
        console.log(err);
      })
    })
  }

  componentDidMount(){
    this.pageLoad()
  }

  render() {
    return (
      <>
       <form onSubmit={this.handleSubmit}>
          <input
          onChange={this.handleChange}
          type="text"
          placeholde="message"
           value={this.state.message} />
          <input type="submit"/>
       </form>
      </>
    )
  }
}

export default DirectMessage
