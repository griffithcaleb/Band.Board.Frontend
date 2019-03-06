import React, {Component} from 'react';
import Auth from '../modules/Auth.js'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

<<<<<<< HEAD:project_4_frontend/src/components/Messages.js

=======
  pageLoad = () => {
    fetch('https://bandbandband.herokuapp.com/messages',{
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
>>>>>>> 2b6efdaca7402b332b1edf455b8f6ff7e6593c78:src/components/Messages.js


  componentDidMount(){
    console.log(this.props);
    this.props.reload()
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
