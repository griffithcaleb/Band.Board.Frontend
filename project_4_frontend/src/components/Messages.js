import React, {Component} from 'react';
import Auth from '../modules/Auth.js'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }




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
