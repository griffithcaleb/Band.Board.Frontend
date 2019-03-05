import React, {Component} from 'react';
import Auth from '../modules/Auth.js'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null
    }
  }

  pageLoad = () => {
    fetch('http://localhost:3000/messages',{
      method:'GET',
      headers:{
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        this.setState({messages:data.messages})
      },(err) => {
        console.log(err);
      })
    })
  }


  componentDidMount(){
    this.pageLoad()
  }

  render(){
    return(
      <>
      {this.state.messages? this.state.messages.map((message) => {
        return(
          <div key={message.id}>
            Sent By: {message.sent_name}
          </div>
        )
      }): "Loading messages...."}

      </>
    )
  }
}
{/*this.state.messages.map((message) => {
  <div>
    Sent By: message
  </div>
}): "Loading messages...."*/}

export default Messages
